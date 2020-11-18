import React, { useEffect } from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import { Column } from '../../component_library/styles/layout';
import AdminHeader from './admin_header';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import Button from '../../component_library/styles/buttons/button';
import { Header, Subheader } from '../../component_library/styles/typography';

interface Props {
    fixedBins: any;
}

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

const FixedBins: React.FC<Props> = () => {
    const { fixedBinStore } = useAdminDataStore();
    useEffect(() => {
        document.title = 'Fixed Bins';
        return () => {
            document.title = 'Smart Stock';
        };
    });

    return (
        <Column height="100%">
            <AdminHeader>
                <Column>
                    <Header>Fixed Bins</Header>
                    <Subheader>Change fixed bins in Airtable:</Subheader>
                    <a
                        href="https://airtable.com/tblHImRJEKbWwvSZq/viw55Ghz3crFPCJOt?blocks=hide"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button mt={3} width={'100%'}>
                            Go to Airtable
                        </Button>
                    </a>
                </Column>
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
