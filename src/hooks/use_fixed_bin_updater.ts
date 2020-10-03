import { useState, useEffect } from 'react';
import { fetchAirtableFixedBins, FixedBinRecord } from '../api/airtable';

const useFixedBinUpdater = (): { loading: boolean; fixedBins: FixedBinRecord[] } => {
    const [fixedBins, setFixedBins] = useState<FixedBinRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function getAirtableBins() {
            setLoading(true);
            const bins = await fetchAirtableFixedBins();
            setFixedBins(bins);
            setLoading(false);
            console.log('bings: ', bins);
        }
        getAirtableBins();
    }, []);
    return { loading, fixedBins };
};

export default useFixedBinUpdater;
