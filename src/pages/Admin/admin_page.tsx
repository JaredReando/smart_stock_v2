import React, { useRef } from 'react';
import { useActiveUsers } from '../../hooks';
import AdminHeader from './admin_header';
import { Column } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import { csvToObject } from '../../helpers/csv_to_object';
import { useFirebase } from '../../hooks/use_firebase_context';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import DataTable from '../../component_library/components/data_table/data_table';

interface RawInventoryRecord {
    'Storage Bin': string;
    Material: string;
    'Available stock': number;
    'Storage Unit': string;
    'Storage Type': string;
    'Storage Location': number;
}

const AdminPage = () => {
    const users = useActiveUsers();
    const [localDdInventory, setLocalDdInventory] = React.useState<{ [key: string]: any }[] | null>(
        null,
    );
    const { localDB, inventoryStore } = useAdminDataStore();
    const inputRef = useRef<null | HTMLInputElement>(null);
    const firebase = useFirebase();

    React.useEffect(() => {
        try {
            localDB.current.allDocs({ include_docs: true }).then((r: any) => {
                setLocalDdInventory(r.rows.map((row: any) => row.doc));
                console.log('all docs: ', r.rows);
            });
        } catch (err) {
            console.error('error: ', err);
        }
    }, [localDB.current]);
    console.log('local db inventory: ', localDdInventory);
    console.log('users: ', users);

    const requiredHeaders: Array<keyof RawInventoryRecord> = [
        'Storage Bin',
        'Material',
        'Available stock',
        'Storage Unit',
        'Storage Type',
        'Storage Location',
    ];

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

    const convertCSVFile = (file: any, callback?: (data: any) => void) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = e.target.result;
            const parsedData: RawInventoryRecord[] = csvToObject(data);
            const csvKeys = Object.keys(parsedData[0]);
            let { isValid, missingHeaders } = hasRequiredKeys(requiredHeaders, csvKeys);
            if (isValid) {
                console.log('report data: ', parsedData);
                firebase.doOverwriteInventoryReport(parsedData);
                localDB.current.bulkDocs(parsedData).then(() => console.log('localDB populated!'));
                // const draftRestock = new NunaStock(parsedData, fixedBins);
                // callback(draftRestock.restockReportArray);
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

    return (
        <>
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
                {/*<Column style={{height: '1px', overflow: 'auto', flex: '1 0 auto'}}>*/}
                {/*    <ul style={{ listStyle: "none", textAlign: "left"}}>*/}
                {/*        {Array.isArray(localDdInventory) && localDdInventory.length > 0 &&*/}
                {/*        localDdInventory.map((u: any, i: number) => {*/}
                {/*            return (*/}
                {/*                <li key={i}>*/}
                {/*                    <pre>{JSON.stringify(u, undefined, "  ")}</pre>*/}
                {/*                </li>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </ul>*/}
                {/*</Column>*/}
                <DataTable columnHeaders={headerItems} rowData={localDdInventory || []} />
            </Column>
        </>
    );
};

export default AdminPage;
