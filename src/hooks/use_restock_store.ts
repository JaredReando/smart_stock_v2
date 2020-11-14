import { useState, useEffect } from 'react';
import { useFirebase } from './use_firebase_context';
import { RestockRecord, RestockSummary } from '../constants/types';

const RESTOCK_REPORT_PATH = 'Companies/Nuna/restock/records';
const RESTOCK_SUMMARY_PATAH = 'Companies/Nuna/restock/summary';

const useRestockStore = (): { records: RestockRecord[]; summary: RestockSummary } => {
    const firebase = useFirebase();
    const [restockSummary, setRestockSummary] = useState<any>(null);
    const [restockReport, setRestockReport] = useState<any[]>([]);
    useEffect(() => {
        firebase.db.ref(RESTOCK_REPORT_PATH).on('value', (snap: any) => {
            const records = snap.val();
            console.log('restock: ', records);
            setRestockReport(records);
        });
        firebase.db.ref(RESTOCK_SUMMARY_PATAH).on('value', (snap: any) => {
            const summary = snap.val();
            console.log('summary: ', summary);
            setRestockSummary(summary);
        });

        return () => {
            firebase.db.ref(RESTOCK_REPORT_PATH).off();
        };
    }, [firebase.db]);

    return { records: restockReport, summary: restockSummary };
};

export default useRestockStore;
