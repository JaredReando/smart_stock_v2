import { useState, useEffect } from 'react'
import { useFirebaseContext } from "./use_firebase_context";

const FIXED_BIN_PATH = 'Companies/Nuna/fixed_bins';

const useFixedBinUpdater = () => {
    const firebase = useFirebaseContext();
    const [fixedBins, setFixedBins] = useState({});
    useEffect(() => {
        firebase.db.ref(FIXED_BIN_PATH).on('value', (snap: any) => {
            const fixedBins = snap.val();
            setFixedBins(fixedBins)
        });

        return () => {
            firebase.db.ref(FIXED_BIN_PATH).off()
        }
    },[firebase.db]);

    return fixedBins;
};

export default useFixedBinUpdater;