import { useEffect, useState } from 'react';
import { fetchAirtableFixedBins } from '../api/airtable';
import { FixedBinRecord, FixedBinStore } from '../constants/types';

const useFixedBinStore = (): FixedBinStore => {
    const [fixedBins, setFixedBins] = useState<FixedBinRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function getAirtableBins() {
            setLoading(true);
            const bins = await fetchAirtableFixedBins();
            setFixedBins(bins);
            setLoading(false);
        }
        getAirtableBins();
    }, []);
    return { loading, fixedBins };
};

export default useFixedBinStore;
