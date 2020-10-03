import { useState, useEffect } from 'react';
import { useFirebaseContext } from './use_firebase_context';
import { RowData } from '../component_library/components/data_table/data_table';

const FIXED_BIN_PATH = 'Companies/Nuna/fixed_bins';

const useFixedBinUpdater = (): { loading: boolean; fixedBins: RowData[] } => {
    const firebase = useFirebaseContext();
    const [fixedBins, setFixedBins] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        firebase.db.ref(FIXED_BIN_PATH).on('value', (snap: any) => {
            let fixedBins = snap.val();
            if (!Array.isArray(fixedBins)) {
                fixedBins = Object.assign([], fixedBins);
            }
            setFixedBins(fixedBins);
            setLoading(false);
        });
        return () => {
            firebase.db.ref(FIXED_BIN_PATH).off();
        };
    }, [firebase.db]);
    return { loading, fixedBins };
};

export default useFixedBinUpdater;
