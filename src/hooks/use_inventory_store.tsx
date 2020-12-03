import { useEffect, useState } from 'react';
import { useFirebase } from './use_firebase_context';
import { InventoryRecord, InventoryStore, InventorySummary } from '../constants/types';

const NUNA_INVENTORY_PATH = 'Companies/Nuna/inventory/records';
const NUNA_INVENTORY_SUMMARY_PATH = 'Companies/Nuna/inventory/summary';

const useInventoryStore = (): InventoryStore => {
    const firebase = useFirebase();
    const [inventorySummary, setInventorySummary] = useState<InventorySummary | null>(null);
    const fetchFirebaseInventory = async (): Promise<InventoryRecord[]> => {
        return new Promise(res => {
            firebase.db.ref(NUNA_INVENTORY_PATH).once('value', (snap: any) => {
                const inventoryRecords = snap.val();
                res(inventoryRecords);
            });
        });
    };

    useEffect(() => {
        firebase.db.ref(NUNA_INVENTORY_SUMMARY_PATH).on('value', (summary: any) => {
            setInventorySummary(summary.val());
        });

        return () => {
            firebase.db.ref(NUNA_INVENTORY_SUMMARY_PATH).off();
        };
    }, [firebase.db]);

    return { getInventory: fetchFirebaseInventory, inventorySummary };
};

export default useInventoryStore;
