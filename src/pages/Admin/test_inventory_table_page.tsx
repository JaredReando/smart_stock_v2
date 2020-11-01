import React, { useEffect } from 'react';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import DataTable from '../../component_library/components/data_table/data_table';
import { PouchInventoryDoc } from '../../constants/types';

const TestInventoryTable = () => {
    const [localDocs, setLocalDocs] = React.useState([]);

    const { localDB } = useAdminDataStore();

    useEffect(() => {
        localDB
            //loads all documents from localDB storage
            .allDocs({ include_docs: true })
            .then((docs: any) => {
                setLocalDocs(docs.rows.map((r: PouchInventoryDoc) => r.doc));
            })
            .catch((err: Error) => console.error('AdminPage Error: ', err));
        return () => console.warn('admin unmounted');
    }, []);

    const headerItems = [
        {
            title: 'Storage Bin',
            key: 'Storage Bin',
            ratio: 1,
        },
        {
            title: 'Material',
            key: 'Material',
            ratio: 2,
        },
        {
            title: 'Available',
            key: 'Available stock',
            ratio: 2,
        },
        {
            title: 'Storage Unit',
            key: 'Storage Unit',
            ratio: 3,
        },
        {
            title: 'Storage Type',
            key: 'Storage Type',
            ratio: 4,
        },
        {
            title: 'Storage Location',
            key: 'Storage Location',
            ratio: 1,
        },
    ];

    return <DataTable columnHeaders={headerItems} rowData={localDocs || []} />;
};

export default TestInventoryTable;
