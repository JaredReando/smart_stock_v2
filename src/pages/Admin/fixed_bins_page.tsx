import React from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import { Column } from '../../component_library/styles/layout';
import AdminHeader from './admin_header';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import Button from '../../component_library/styles/buttons/button';

interface Props {
    fixedBins: any;
}

const FixedBins: React.FC<Props> = () => {
    const { fixedBinStore } = useAdminDataStore();
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
                <Button variant="secondary">
                    <a
                        href="https://airtable.com/tblHImRJEKbWwvSZq/viw55Ghz3crFPCJOt?blocks=hide"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Go to Airtable
                    </a>
                </Button>
            </AdminHeader>
            <DataTable
                columnHeaders={headerItems}
                rowData={fixedBinStore.fixedBins}
                loading={fixedBinStore.loading}
            />
        </Column>
    );
};

export default FixedBins;
