import React, { useState } from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import AdminHeader from './admin_header';
import { Subheader } from '../../component_library/styles/typography';
import { Box, Column, Row } from '../../component_library/styles/layout';
import RestockInfoDashboard from './restock_info_dashboard';
import AppModal from '../../component_library/modals/app_modal';
// import CreateRestockReportModal from './create_restock_report_modal';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import { RestockRecord, StockSource } from '../../constants/types';
import { useFirebase } from '../../hooks/use_firebase_context';
import Button from '../../component_library/styles/buttons/button';
import { ModalCard } from '../../component_library/modals/modal_card';
import { useRestockStore } from '../../hooks';

interface Props {
    report?: any;
}

const RestockReport: React.FC<Props> = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { restockStore: report, fixedBinStore, localDB } = useAdminDataStore();
    const firebase = useFirebase();
    // console.log('firebase report: ', report)

    /**
     * Loops through fixed bins to find unique material names
     * For each unique name, create an object property matching the material name
     * The value of the property is the string array of fixed bin names assigned to that material
     * So, if 2 bins of MaterialA are needed: { MaterialA: ['A12-01-B', 'A13-01-A'] }
     * @param binsToRestock
     * @param fixedBins
     * */
    const restockMaterialsNeeded = (binsToRestock: string[], fixedBins: any[]) => {
        const materialsNeeded = binsToRestock.reduce(
            (acc: { [key: string]: string[] }, bin: any) => {
                const match = fixedBins.find(record => record.bin === bin);
                const material = match!.item;
                const destinationBin = match!.bin;
                if (material in acc) {
                    acc[material] = [...acc[material], destinationBin];
                } else {
                    acc[material] = [destinationBin];
                }
                return acc;
            },
            {},
        );
        return materialsNeeded;
    };

    const createRestockObjects = (stockSources: StockSource[]): RestockRecord[] => {
        const restockRecords = stockSources.map((stockSource: StockSource) => {
            const restockRecord: RestockRecord = {
                status: 'pending',
                sourceBin: stockSource.storageBin,
                destinationBin: stockSource.destinationBin,
                material: stockSource.material,
                description: stockSource.materialDescription,
                available: stockSource.available,
                storageUnit: stockSource.storageUnit,
                priority: 'low',
                id: stockSource.quant,
            };
            return restockRecord;
        });
        console.log('restock object tester: ', restockRecords);
        return restockRecords;
    };
    const createRestockReport = async () => {
        const fixedBinQueryParams = fixedBinStore.fixedBins.map(record => {
            return { storageBin: record.bin };
        });
        const binsToRestock = await localDB.getBinsToRestock(fixedBinQueryParams);
        const materialsNeeded = restockMaterialsNeeded(binsToRestock, fixedBinStore.fixedBins);
        const foundInOverstock = await localDB.findInOverstock(materialsNeeded); //array of inventory records + destination bin property
        console.log('out of stock: ', foundInOverstock.outOfStock);
        return createRestockObjects(foundInOverstock.stockSources);
    };

    const headerItems: {
        title: string;
        key: keyof RestockRecord;
        ratio: number;
    }[] = [
        {
            title: 'Status',
            key: 'status',
            ratio: 1,
        },
        {
            title: 'Source',
            key: 'sourceBin',
            ratio: 2,
        },
        {
            title: 'Destination',
            key: 'destinationBin',
            ratio: 2,
        },
        {
            title: 'Material',
            key: 'material',
            ratio: 3,
        },
        {
            title: 'Description',
            key: 'description',
            ratio: 4,
        },
        {
            title: 'Qty.',
            key: 'available',
            ratio: 1,
        },
        {
            title: 'Storage Unit',
            key: 'storageUnit',
            ratio: 2,
        },
    ];

    return (
        <>
            <AppModal isOpen={showModal} closeOnEscape={true} onClose={() => setShowModal(false)}>
                <ModalCard headingText="Confirm Reset">
                    <Column>
                        <Subheader mb={4}>
                            This action will configure a new restock report using current inventory
                            data.
                        </Subheader>
                        <Subheader mb={4}>
                            Existing restock report data will be overwritten for all users.
                        </Subheader>
                        <Subheader>Do you wish to proceed?</Subheader>
                    </Column>
                    <Row justifyContent="flex-end" mt={6}>
                        <Button variant="secondary" mr={4} onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={async () => {
                                setLoading(true);
                                const restockReport = await createRestockReport();
                                firebase.overwriteRestockReport(restockReport);
                                setLoading(false);
                            }}
                            disabled={loading}
                            loading={loading}
                        >
                            Reset
                        </Button>
                    </Row>
                </ModalCard>
            </AppModal>

            <Column height="100%">
                <AdminHeader title="Restock Report">
                    <RestockInfoDashboard handleClick={() => setShowModal(s => !s)} />
                </AdminHeader>
                <Box flexGrow={1} overflow="hidden">
                    <DataTable columnHeaders={headerItems} rowData={report} />
                </Box>
            </Column>
        </>
    );
};

export default RestockReport;
