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
        'Material Description',
        'Available stock',
        'Storage Unit',
        'Storage Type',
        'Storage Location',
    ];

    /**
     * converts an instance of RawInventoryRecord into
     * @param object
     * @param nameConversion
     * */
    function renameRawInventoryRecord(
        object: RawInventoryRecord,
        nameConversion: { [name: string]: string },
    ) {
        const renamedRecordObject: { [name: string]: string | number } = {};
        const objectKeys = Object.keys(object);
        objectKeys.forEach(key => {
            const convertKeyTo = nameConversion[key];
            const objectValueAtKey = object[key];
            renamedRecordObject[convertKeyTo] = objectValueAtKey;
        });
        return renamedRecordObject;
    }
    const convertCSVFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const csvFile = e.target!.result; //selected local .csv file
            const parsedFile: RawInventoryRecord[] = csvToObject(csvFile);
            const csvKeys: string[] = Object.keys(parsedFile[0]);
            let { isValid, missingHeaders } = hasRequiredKeys(requiredHeaders as string[], csvKeys);
            if (isValid) {
                const inventoryNameConversion: { [key: string]: string } = {
                    'Storage Location': 'storageLocation',
                    'Storage Type': 'storageType',
                    'Storage Bin': 'storageBin',
                    Material: 'material',
                    'Material Description': 'materialDescription',
                    'Available stock': 'available',
                    'Storage Unit': 'storageUnit',
                    Plant: 'plant',
                    'Pick Quantity': 'pickQuantity',
                    'Storage Unit Type': 'storageUnitType',
                    Quant: 'quant',
                    Duration: 'duration',
                    'GR Date': 'grDate',
                };
                const latestInventory = parsedFile.map((record: RawInventoryRecord) => {
                    //@ts-ignore
                    return renameRawInventoryRecord(record, inventoryNameConversion);
                });
                console.log('lastest: ', latestInventory);
                //writes report to Firebase -- should trigger localDB update in useAdminDataStore
                firebase.doOverwriteInventoryReport(latestInventory);
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
