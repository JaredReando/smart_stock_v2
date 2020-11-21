import React, { useEffect, useRef } from 'react';
import AdminHeader from './admin_header';
import { Column, Row } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import moment from 'moment';
import { convertInventoryCSVFile, requiredHeaders } from '../../helpers/convert_inventory_csv_file';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import AppModal from '../../component_library/modals/app_modal';
import { ModalCard } from '../../component_library/modals/modal_card';
import { AppText, Header, Subheader } from '../../component_library/styles/typography';

const AdminPage = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
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
        setLoading(true);
        const results = await convertInventoryCSVFile(file, requiredHeaders);
        const newSummary = {
            lastUpdated: new Date().toJSON(),
            recordCount: results.length,
        };
        await overwriteDBs(results, newSummary);
    };
    useEffect(() => {
        document.title = 'Admin';
        return () => {
            document.title = 'Smart Stock';
        };
    });

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
                                accept=".csv"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <Button
                                variant="primary"
                                onClick={handleClick}
                                loading={loading}
                                disabled={loading}
                            >
                                Select File
                            </Button>
                        </>
                    </Row>
                </ModalCard>
            </AppModal>
            <Column height="100%">
                <AdminHeader>
                    <Column margin={3}>
                        <Header uppercase>Inventory</Header>
                        <AppText
                            mt={3}
                            uppercase
                            bold
                            size="medium"
                        >{`Updated: ${lastUpdated}`}</AppText>
                        <Button mt={3} onClick={() => setShowModal(s => !s)}>
                            Upload New Inventory File
                        </Button>
                    </Column>
                </AdminHeader>
                <Column mx={3}>
                    <Row alignItems="center" margin={3}>
                        <AppText bold uppercase size="large">
                            Inventory Search
                        </AppText>
                        <input type="text" />
                        <Button>Submit</Button>
                    </Row>
                </Column>
            </Column>
        </>
    );
};

export default AdminPage;
