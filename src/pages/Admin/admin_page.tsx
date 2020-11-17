import React, { useRef } from 'react';
import AdminHeader from './admin_header';
import { Column, Row } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import moment from 'moment';
import { convertInventoryCSVFile, requiredHeaders } from '../../helpers/convert_inventory_csv_file';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import AppModal from '../../component_library/modals/app_modal';
import { ModalCard } from '../../component_library/modals/modal_card';
import { Subheader } from '../../component_library/styles/typography';

const AdminPage = () => {
    const [showModal, setShowModal] = React.useState(false);
    const inputRef = useRef<null | HTMLInputElement>(null);
    const { inventorySummary, overwriteDBs } = useAdminDataStore();
    const lastUpdated = inventorySummary ? moment(inventorySummary.lastUpdated).calendar() : '';

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
        const newSummary = {
            lastUpdated: new Date().toJSON(),
            recordCount: results.length,
        };
        overwriteDBs(results, newSummary);
    };

    return (
        <>
            <AppModal isOpen={showModal} closeOnEscape={true} onClose={() => setShowModal(false)}>
                <ModalCard headingText="Confirm Upload">
                    <Column>
                        <Subheader mb={4}>
                            Uploading a new inventory report will update the application with the
                            most recent available data.
                        </Subheader>
                        <Subheader mb={4}>
                            Active restock reports will not be affected by a new upload.
                        </Subheader>
                        <Subheader>Do you wish to select a file and update inventory?</Subheader>
                    </Column>
                    <Row justifyContent="flex-end" mt={6}>
                        <Button variant="secondary" mr={4} onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <>
                            <input
                                ref={inputRef}
                                type="file"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <Button variant="primary" onClick={handleClick}>
                                Select File
                            </Button>
                        </>
                    </Row>
                </ModalCard>
            </AppModal>
            <Column height="100%">
                <AdminHeader title="Inventory">
                    <Subheader>{`Last Updated: ${lastUpdated}`}</Subheader>
                    <Button mt={3} onClick={() => setShowModal(s => !s)}>
                        Upload New Inventory File
                    </Button>
                </AdminHeader>
                <h1>This is the admin dashboard!</h1>
                <Column>
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
            </Column>
        </>
    );
};

export default AdminPage;
