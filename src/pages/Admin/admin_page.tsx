import React, { useRef } from 'react';
import AdminHeader from './admin_header';
import { Column, Row } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import { useFirebase } from '../../hooks/use_firebase_context';
import moment from 'moment';
import { convertInventoryCSVFile, requiredHeaders } from '../../helpers/convert_inventory_csv_file';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';

const AdminPage = () => {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const { inventorySummary } = useAdminDataStore();
    const firebase = useFirebase();

    if (inventorySummary) {
        console.log('last updated: ', inventorySummary.lastUpdated);
        console.log('moment in time: ', moment(inventorySummary.lastUpdated).calendar());
    }
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
        firebase.overwriteInventoryReport(results);
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
                            New Inventory Report
                        </Button>
                    </>
                </AdminHeader>
                <h1>This is the admin dashboard!</h1>
                <Column>
                    <Row alignItems="center">
                        <h3>Last updated: </h3>
                        <p>
                            {!!inventorySummary
                                ? moment(inventorySummary.lastUpdated).calendar()
                                : ''}
                        </p>
                    </Row>
                    <Row alignItems="flex-start">
                        <h3>Out of Stock: </h3>
                        <Column>
                            <p>Peeper Neat</p>
                            <p>Peeper Neat</p>
                            <p>Peeper Neat</p>
                            <p>Peeper Neat</p>
                            <p>Peeper Neat</p>
                            <p>Peeper Neat</p>
                            <p>Peeper Neat</p>
                            <p>Peeper Neat</p>
                            <p>Peeper Neat</p>
                        </Column>
                    </Row>
                </Column>
                {/*<TestInventoryTable />*/}
            </Column>
        </>
    );
};

export default AdminPage;
