import { useState, useEffect } from 'react';
import { fetchAirtableFixedBins, FixedBinRecord } from '../api/airtable';

export interface FixedBinStore {
    loading: boolean;
    fixedBins: FixedBinRecord[];
}
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
