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

export function useInitializeAdminDataStore() {
    const fixedBinStore = useFixedBinStore();
    const inventoryStore = useInventoryStore();
    const restockStore = useRestockStore();
    let localDB: any = useRef(new PouchDb('smart-stock'));

    useEffect(() => {
        if (inventoryStore.length > 0) {
            new PouchDb('smart-stock')
                .destroy()
                .then(() => (localDB.current = new PouchDb('smart-stock')))
                .then(() => localDB.current.bulkDocs(inventoryStore))
                .then(() => console.log('localDB inventory store updated!'));
        }
    }, [inventoryStore]);
    return {
        fixedBinStore,
        inventoryStore,
        restockStore,
        localDB,
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
