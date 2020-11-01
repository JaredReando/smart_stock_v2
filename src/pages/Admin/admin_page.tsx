import React, { useRef } from 'react';
import AdminHeader from './admin_header';
import { Column } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import { csvToObject } from '../../helpers/csv_to_object';
import { useFirebase } from '../../hooks/use_firebase_context';
import {
    AdminDataStoreProvider,
    useInitializeAdminDataStore,
} from '../../hooks/use_admin_data_store';
import TestInventoryTable from './test_inventory_table_page';
import { RawInventoryRecord } from '../../constants/types';

const AdminPage = () => {
    const adminDataStore = useInitializeAdminDataStore();
    const inputRef = useRef<null | HTMLInputElement>(null);

    const firebase = useFirebase();

    const handleClick = (e: any) => {
        e.preventDefault();
        inputRef.current!.click();
    };

    //checks if uploaded report contains all necessary inventory object keys
    const hasRequiredKeys = (
        requiredKeys: string[],
        compareKeys: string[],
    ): { isValid: boolean; missingHeaders: string[] } => {
        const missingHeaders: string[] = [];
        const isValid: boolean = requiredKeys.reduce((matches: boolean, header: string) => {
            if (!compareKeys.includes(header)) {
                missingHeaders.push(header);
                matches = false;
            }
            return matches;
        }, true);
        return { isValid, missingHeaders };
    };

    const requiredHeaders: Array<keyof RawInventoryRecord> = [
        'Storage Bin',
        'Material',
        'Available stock',
        'Storage Unit',
        'Storage Type',
        'Storage Location',
    ];

    const convertCSVFile = (file: any, callback?: (data: any) => void) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = e.target.result;
            const parsedData: RawInventoryRecord[] = csvToObject(data);
            const csvKeys = Object.keys(parsedData[0]);
            let { isValid, missingHeaders } = hasRequiredKeys(requiredHeaders, csvKeys);
            if (isValid) {
                //writes report to Firebase -- should trigger localDB update in useAdminDataStore
                firebase.doOverwriteInventoryReport(parsedData);
            } else {
                missingHeaders = missingHeaders.map(h => `"${h}"`);
                const pluralOrSingular = missingHeaders.length === 1 ? 'field' : 'fields';
                alert(
                    `UPLOAD ERROR: Missing required report ${pluralOrSingular} -- ${missingHeaders.join(
                        ', ',
                    )}`,
                );
            }
        };
        reader.readAsText(file);
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const fileType = file.type;
        if (fileType !== 'text/csv') {
            alert('Invalid file type. Select only CSV files.');
            return;
        }
        convertCSVFile(file);
    };

    return (
        <>
            <AdminDataStoreProvider value={adminDataStore}>
                <Column height="100%">
                    <AdminHeader title="Admin Page">
                        <>
                            <input
                                ref={inputRef}
                                type="file"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <Button onClick={handleClick} style={{ flexShrink: 0 }}>
                                Upload Inventory Report
                            </Button>
                        </>
                    </AdminHeader>
                    <TestInventoryTable />
                </Column>
            </AdminDataStoreProvider>
        </>
    );
};

export default AdminPage;
