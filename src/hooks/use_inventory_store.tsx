import { useState, useEffect } from 'react';
import { useFirebase } from './use_firebase_context';

const INVENTORY_REPORT_PATH = 'Companies/Nuna/inventory_report';

const useInventoryStore = () => {
    const firebase = useFirebase();
    const [inventoryStore, setInventoryStore] = useState([]);
    useEffect(() => {
        firebase.db.ref(INVENTORY_REPORT_PATH).on('value', (snap: any) => {
            const inventoryReport = snap.val();
            setInventoryStore(inventoryReport);
        });

        return () => {
            firebase.db.ref(INVENTORY_REPORT_PATH).off();
        };
    }, [firebase.db]);

    return inventoryStore;
};

export default useInventoryStore;
