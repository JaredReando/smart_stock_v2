import { useState, useEffect, useContext } from 'react'
import { Context as FirebaseContext } from "../context/firebase.context";

const RESTOCK_REPORT_PATH = 'Companies/Nuna/restock_report';

export const useRestockUpdater = () => {
    const firebase = useContext(FirebaseContext);
    const [restockReport, setRestockReport] = useState({});
    useEffect(() => {
        firebase.db.ref(RESTOCK_REPORT_PATH).on('value', (snap: any) => {
            const restockReport = snap.val();
            setRestockReport(restockReport)
        });

        return () => {
            console.log("turned off")
            firebase.db.ref(RESTOCK_REPORT_PATH).off()
        }
    });

    return restockReport
};