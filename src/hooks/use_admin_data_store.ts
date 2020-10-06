import { useEffect, createContext, useContext, useRef } from 'react';
import { useFixedBinStore, useRestockStore } from './index';
import { FixedBinStore } from './use_fixed_bin_store';
import PouchDb from 'pouchdb-browser';
import useInventoryStore from './use_inventory_store';
PouchDb.plugin(require('pouchdb-find').default);

interface AdminDataStoreContext {
    fixedBinStore: FixedBinStore;
    inventoryStore: any;
    restockStore: any[];
    localDB: any;
}
const adminDataStoreContext = createContext<AdminDataStoreContext | undefined>(undefined);

//TODO: consider adding additional localDB for Airtable fixed bins to optimize memory performance
export function useInitializeAdminDataStore() {
    const fixedBinStore = useFixedBinStore();
    const { inventoryDB, inventorySummary } = useInventoryStore();
    const restockStore = useRestockStore();
    let localDB: any = useRef(new PouchDb('smart-stock'));

    /*
     * - if firebase details are fetched, check if lastUpdated matches localDB
     * - if there is no change, don't update localDB
     * - if there is a mismatch, delete and restore localDB with firebase clone
     *
     * - if a match for 'lastUpdated' doesn't exist in db, the db is corrupt/deleted/first-run
     * - in that case, delete and restore localDD with firebase clone
     *
     *
     *
     */

    function compareLocalAndFirebaseDBs<
        T extends { lastUpdated: string },
        U extends { lastUpdated: string }
    >(localSummary: T, firebaseSummary: U): boolean {
        return localSummary.lastUpdated === firebaseSummary.lastUpdated;
    }

    const rebootLocalDB = () => {
        const localInventoryDB = inventoryDB.map((r: any, i: number) => {
            // pad single digits with leading '0' for sorting
            const id = i < 10 ? '0' + i : i;
            return { ...r, _id: 'invRec' + id };
        });

        new PouchDb('smart-stock')
            .destroy()
            .then(() => (localDB.current = new PouchDb('smart-stock')))
            .then(() => localDB.current.bulkDocs(localInventoryDB))
            .then(() =>
                localDB.current.put({
                    _id: 'summary',
                    ...inventorySummary,
                }),
            )
            .then(() => console.log('localDB inventory store updated!'));
    };

    useEffect(() => {
        if (!!inventorySummary && !!inventoryDB) {
            localDB.current
                .get('summary')
                .then((r: any) => {
                    console.log('db get SUMMARY request: ', r);
                    const comparison = compareLocalAndFirebaseDBs(r, inventorySummary);
                    console.log('comparison: ', comparison);
                    if (!comparison) {
                        rebootLocalDB();
                    }
                })
                .catch((err: Error) => {
                    if (err.message === 'missing') {
                        rebootLocalDB();
                    } else {
                        console.error('Exciting new error: ', err);
                    }
                });
        } else {
            console.log('either inventorySummary or inventoryDB were false');
        }
    }, [inventorySummary, inventoryDB]);

    return {
        fixedBinStore,
        inventoryStore: inventoryDB,
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