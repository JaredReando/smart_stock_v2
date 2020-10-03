import React from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import { useFixedBinUpdater } from '../../hooks';
import { Column } from '../../component_library/styles/layout';
import AdminHeader from './admin_header';
import { getAllFixedBinPages } from '../../api/airtable';
import { useFirebaseContext } from '../../hooks/use_firebase_context';

interface Props {
    fixedBins: any;
}

const FixedBins: React.FC<Props> = () => {
    const { loading, fixedBins } = useFixedBinUpdater();
    const firebase = useFirebaseContext();
    const headerItems = [
        {
            title: 'Bin',
            key: 'bin',
            ratio: 1,
        },
        {
            title: 'Product',
            key: 'item',
            ratio: 2,
        },
        {
            title: 'Description',
            key: 'description',
            ratio: 3,
        },
    ];
    return (
        <Column height="100%">
            <AdminHeader title="Fixed Bins">
                <button
                    onClick={async () => {
                        // const airtableBins = getAllFixedBins();
                        await firebase.addATestBin();
                    }}
                >
                    Update Bins
                </button>
            </AdminHeader>
            <DataTable columnHeaders={headerItems} rowData={fixedBins} loading={loading} />
        </Column>
    );
};

export default FixedBins;
