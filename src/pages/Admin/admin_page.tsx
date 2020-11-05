import React, { useRef } from 'react';
import AdminHeader from './admin_header';
import { Column } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import { useFirebase } from '../../hooks/use_firebase_context';
// import TestInventoryTable from './test_inventory_table_page';
import { convertInventoryCSVFile, requiredHeaders } from '../../helpers/convert_inventory_csv_file';

const AdminPage = () => {
    const inputRef = useRef<null | HTMLInputElement>(null);

    const firebase = useFirebase();

    const handleClick = (e: any) => {
        e.preventDefault();
        inputRef.current!.click();
    };

    const handleChange = async (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const fileType = file.type;
        if (fileType !== 'text/csv') {
            alert('Invalid file type. Select only CSV files.');
            return;
        }
        const results = await convertInventoryCSVFile(file, requiredHeaders);
        console.log('results: ', results);
    };

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
                <h1>This is the admin dashboard</h1>
                {/*<TestInventoryTable />*/}
            </Column>
        </>
    );
};

export default AdminPage;
