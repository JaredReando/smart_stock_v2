import React, { useEffect } from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import { Column } from '../../component_library/styles/layout';
import AdminHeader from './admin_header';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import Button from '../../component_library/styles/buttons/button';
import { AppText, Header } from '../../component_library/styles/typography';
import moment from 'moment';

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
        ratio: 1,
    },
    {
        title: 'Description',
        key: 'description',
        ratio: 3,
    },
    {
        title: 'Last Modified',
        key: 'lastModified',
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
                <Column margin={3}>
                    <Header uppercase>Fixed Bins</Header>
                    <AppText mt={3} uppercase bold>
                        Change fixed bins in Airtable:
                    </AppText>
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
                rowData={fixedBinStore.fixedBins.map(bin => ({
                    ...bin,
                    lastModified: moment(bin.lastModified).calendar(),
                }))}
                loading={fixedBinStore.loading}
            />
        </Column>
    );
};

export default FixedBins;
