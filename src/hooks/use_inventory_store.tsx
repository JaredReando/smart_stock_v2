import { useState, useEffect } from 'react';
import { useFirebase } from './use_firebase_context';

const NUNA_INVENTORY_PATH = 'Companies/Nuna/inventory';

interface InventorySummary {
    lastUpdated: string;
    recordCount: number;
}

type InventoryDB = any[];

interface InventoryStore {
    inventoryDB: InventoryDB;
    inventorySummary: InventorySummary | null;
}

const useInventoryStore = (): InventoryStore => {
    const firebase = useFirebase();
    const [inventoryDB, setInventoryDB] = useState([]);
    const [inventorySummary, setInventorySummary] = useState<InventorySummary | null>(null);

    useEffect(() => {
        firebase.db.ref(NUNA_INVENTORY_PATH + '/summary').on('value', (summary: any) => {
            setInventorySummary(summary.val());
            firebase.db.ref(NUNA_INVENTORY_PATH + '/database').once('value', (db: any) => {
                console.log('firebase inventory DB updated');
                const inventoryReport = db.val();
                setInventoryDB(inventoryReport);
            });
        });

        return () => {
            firebase.db.ref(NUNA_INVENTORY_PATH).off();
        };
    }, []);

    return { inventoryDB, inventorySummary };
};

export default useInventoryStore;
