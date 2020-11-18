import { useEffect, useState } from 'react';
import { fetchAirtableFixedBins } from '../api/airtable';
import { FixedBinRecord, FixedBinStore } from '../constants/types';
import { useFirebase } from './use_firebase_context';

const FIXED_BIN_RECORDS_PATH = 'Companies/Nuna/fixed_bins/records';

function comparer(otherArray: any) {
    return function(current: any) {
        return (
            otherArray.filter(function(other: any) {
                return other.id === current.id && other.item === current.item;
            }).length === 0
        );
    };
}

function checkIfUpdateNeeded(
    airtableBins: FixedBinRecord[],
    firebaseBins: FixedBinRecord[],
): boolean {
    const onlyInFirebase = firebaseBins.filter(comparer(airtableBins));
    const onlyInAirtable = airtableBins.filter(comparer(firebaseBins));
    const differences = onlyInFirebase.concat(onlyInAirtable);
    return differences.length > 0;
}

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
            const updateNeeded = checkIfUpdateNeeded(airtableBins, firebaseBins);
            if (updateNeeded) {
                firebase.overwriteFixedBins(airtableBins);
                console.log('Updating Firebase with latest Airtable data.');
            }
        });
    }, [firebase]);
    return { loading, fixedBins, getFixedBins: () => fixedBins };
};

export default useFixedBinStore;
