import { createContext, useContext, useEffect, useRef, MutableRefObject } from 'react';
import { useFixedBinStore, useRestockStore } from './index';
import useInventoryStore from './use_inventory_store';
import { AdminDataStoreContext } from '../constants/types';
import { LocalDatabase } from '../helpers/local_database';
import PouchDb from 'pouchdb-browser';
PouchDb.plugin(require('pouchdb-find').default);

const adminDataStoreContext = createContext<AdminDataStoreContext | undefined>(undefined);

//TODO: consider adding additional localDB for Airtable fixed bins to optimize memory performance
export function useInitializeAdminDataStore() {
    const fixedBinStore = useFixedBinStore();
    const { getInventory, inventorySummary } = useInventoryStore();
    const restockStore = useRestockStore();
    let localDB: MutableRefObject<LocalDatabase> = useRef<LocalDatabase>(new LocalDatabase());
    /*
     * - if firebase details are fetched, check if lastUpdated matches localDB
     * - if there is no change, don't update localDB
     * - if there is a mismatch, delete and restore localDB with firebase clone
     * - if a match for 'lastUpdated' doesn't exist in db, the db is corrupt/deleted/first-run
     * - in that case, delete and restore localDD with firebase clone
     */
    function compareLocalAndFirebaseDBs<
        T extends { lastUpdated: string },
        U extends { lastUpdated: string }
    >(localSummary: T, firebaseSummary: U): boolean {
        return localSummary.lastUpdated === firebaseSummary.lastUpdated;
    }

    const rebootLocalDB = async () => {
        const fetchedInventory = await getInventory();
        const localInventoryDB = fetchedInventory.map((r: any, i: number) => {
            // pad single digits with leading '0' for sorting
            const id = i < 10 ? '0' + i : i;
            return { ...r, _id: 'invRec' + id };
        });
        localDB.current
            .resetDB()
            .then(() =>
                localDB.current.bulkAddRecords(localInventoryDB, {
                    _id: 'summary',
                    ...inventorySummary,
                }),
            )
            .then(() => localDB.current.find('storageType'));
    };

    useEffect(() => {
        if (!!inventorySummary) {
            localDB.current.summary
                .then((summary: any) => {
                    console.log('db get SUMMARY request: ', summary);
                    const comparison = compareLocalAndFirebaseDBs(summary, inventorySummary);
                    console.log('comparison: ', comparison);
                    if (!comparison) {
                        rebootLocalDB();
                    }
                })
                .catch((err: Error) => {
                    if (err.message === 'missing') {
                        rebootLocalDB();
                    } else {
                        console.error('Error refreshing getInventory: ', err);
                    }
                });
        }
    }, [inventorySummary]);

    return {
        fixedBinStore,
        inventoryStore: getInventory,
        restockStore,
        localDB: localDB.current,
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
