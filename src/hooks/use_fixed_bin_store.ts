import { useEffect, useState } from 'react';
import { fetchAirtableFixedBins } from '../api/airtable';
import { FixedBinRecord, FixedBinStore } from '../constants/types';
import { useFirebase } from './use_firebase_context';

const FIXED_BIN_RECORDS_PATH = 'Companies/Nuna/fixed_bins/records';

const useFixedBinStore = (): FixedBinStore => {
    const firebase = useFirebase();
    const [fixedBins, setFixedBins] = useState<FixedBinRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        firebase.db.ref(FIXED_BIN_RECORDS_PATH).on('value', async (snap: any) => {
            const firebaseBins = snap.val().sort((a: any, b: any) => (a.bin > b.bin ? 1 : -1));
            setFixedBins(firebaseBins);
            setLoading(false);
            const airtableBins = await fetchAirtableFixedBins();
            firebase.overwriteFixedBins(airtableBins);
        });
    }, [firebase]);
    return { loading, fixedBins, getFixedBins: () => fixedBins };
};

export default useFixedBinStore;
