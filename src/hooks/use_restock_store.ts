import { useState, useEffect } from 'react';
import { useFirebase } from './use_firebase_context';

const RESTOCK_REPORT_PATH = 'Companies/Nuna/restock_report';

const useRestockStore = () => {
    const firebase = useFirebase();
    const [restockReport, setRestockReport] = useState([]);
    useEffect(() => {
        firebase.db.ref(RESTOCK_REPORT_PATH).on('value', (snap: any) => {
            const restockReport = snap.val();
            setRestockReport(restockReport);
        });

        return () => {
            firebase.db.ref(RESTOCK_REPORT_PATH).off();
        };
    }, [firebase.db]);

    return restockReport;
};

export default useRestockStore;