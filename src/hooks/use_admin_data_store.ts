import { createContext, useContext, useEffect, useRef, MutableRefObject } from 'react';
import { useFixedBinStore } from './index';
import useInventoryStore from './use_inventory_store';
import { AdminDataStoreContext, InventoryRecord, InventorySummary } from '../constants/types';
import { LocalDatabase } from '../helpers/local_database';
import PouchDb from 'pouchdb-browser';
import { useFirebase } from './use_firebase_context';
PouchDb.plugin(require('pouchdb-find').default);

const adminDataStoreContext = createContext<AdminDataStoreContext | undefined>(undefined);

//TODO: consider adding additional localDB for Airtable fixed bins to optimize memory performance
export function useInitializeAdminDataStore() {
    const firebase = useFirebase();
    const fixedBinStore = useFixedBinStore();
    const { getInventory, inventorySummary: remoteSummary } = useInventoryStore();
    let localDB: MutableRefObject<LocalDatabase> = useRef<LocalDatabase>(new LocalDatabase());

    const overwriteLocalAndRemote = async (
        inventory: InventoryRecord[],
        inventorySummary: InventorySummary,
    ) => {
        await restoreLocalFromRemote(localDB.current, inventory, inventorySummary);
        await updateRemoteFromLocal(localDB.current, firebase);
    };

    /*
     * - if firebase details are fetched, check if lastUpdated matches localDB
     * - if there is no change, don't update localDB
     * - if there is a mismatch, delete and restore localDB with firebase clone
     * - if a match for 'lastUpdated' doesn't exist in db, the db is corrupt/deleted/first-run
     * - in that case, delete and restore localDD with firebase clone
     */

    useEffect(() => {
        const syncLocalAndRemoteDBs = async () => {
            try {
                const localSummary = await localDB.current.summary;
                const mostUpToDate = compareLocalAndRemoteDBs(localSummary, remoteSummary!);
                if (mostUpToDate === 'local') {
                    await updateRemoteFromLocal(localDB.current, firebase);
                }
                if (mostUpToDate === 'remote') {
                    const remoteInventory = await getInventory();
                    await restoreLocalFromRemote(localDB.current, remoteInventory, remoteSummary!);
                }
                if (mostUpToDate === 'match') {
                    // console.log('mostUpToDate passed. No update required');
                }
            } catch (err) {
                if (err.message === 'missing') {
                    const remoteInventory = await getInventory();
                    await restoreLocalFromRemote(localDB.current, remoteInventory, remoteSummary!);
                } else {
                    console.error('Error refreshing getInventory: ', err);
                }
            }
        };
        if (!!remoteSummary) {
            syncLocalAndRemoteDBs();
        }
    }, [remoteSummary, firebase, getInventory]);

    return {
        fixedBinStore,
        inventorySummary: remoteSummary,
        inventoryStore: getInventory,
        localDB: localDB.current,
        overwriteDBs: overwriteLocalAndRemote,
    };
}

export function useAdminDataStore() {
    const context = useContext(adminDataStoreContext);

    if (!context) {
        throw new Error('Unable to useAdminDataStore without parent <AdminDataStoreProvider />');
    }

    return context;
}

export const AdminDataStoreProvider = adminDataStoreContext.Provider;

function compareLocalAndRemoteDBs<
    T extends { lastUpdated: string },
    U extends { lastUpdated: string }
>(localSummary: T, firebaseSummary: U): 'local' | 'remote' | 'match' {
    const local = new Date(localSummary.lastUpdated);
    const remote = new Date(firebaseSummary.lastUpdated);
    if (local > remote) {
        return 'local';
    }
    if (local < remote) {
        return 'remote';
    }
    return 'match';
}

const restoreLocalFromRemote = async (
    localDBRef: LocalDatabase,
    inventory: InventoryRecord[],
    remoteSummary: InventorySummary,
) => {
    await restoreLocalDB(localDBRef, inventory, {
        lastUpdated: remoteSummary.lastUpdated,
        recordCount: remoteSummary.recordCount,
    });
};

const updateRemoteFromLocal = async (localDBRef: LocalDatabase, firebaseRef: any) => {
    const localInventory = await localDBRef.getLocalInventory();
    const localSummary = await localDBRef.summary;
    firebaseRef.overwriteInventoryReport(localInventory, {
        lastUpdated: localSummary.lastUpdated,
        recordCount: localSummary.recordCount,
    });
};

const restoreLocalDB = async (
    localDBRef: LocalDatabase,
    inventory: InventoryRecord[],
    summary: InventorySummary,
) => {
    const localDbInventory = inventory.map((r: any, i: number) => {
        //remove PouchDB properties, if present
        if ('_id' in r) {
            delete r._id;
        }
        if ('_rev' in r) {
            delete r._rev;
        }
        // pad single digits with leading '0' for sorting
        const id = i < 10 ? '0' + i : i;
        return { ...r, _id: 'invRec' + id };
    });
    try {
        await localDBRef.rebootDB();
        await localDBRef.bulkAddRecords(localDbInventory, {
            ...summary,
        });
    } catch (e) {
        console.error('Error restoring local database: ', e);
    }
};
