import { useState, useEffect, useContext } from 'react'
import { Context as FirebaseContext } from "../context/firebase.context";

const FIXED_BIN_PATH = 'Companies/Nuna/fixed_bins';

const useFixedBinUpdater = () => {
    const firebase = useContext(FirebaseContext);
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