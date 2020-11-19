import React, { useEffect, useState } from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import AdminHeader from './admin_header';
import { AppText, Header, Subheader } from '../../component_library/styles/typography';
import { Box, Column, Row } from '../../component_library/styles/layout';
import AppModal from '../../component_library/modals/app_modal';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import {
    FixedBinRecord,
    RestockRecord,
    RowData,
    StockLevels,
    StockSource,
} from '../../constants/types';
import { useFirebase } from '../../hooks/use_firebase_context';
import Button from '../../component_library/styles/buttons/button';
import { ModalCard } from '../../component_library/modals/modal_card';
import { useRestockStore } from '../../hooks';
import moment from 'moment';
import styled from 'styled-components';

interface Props {
    report?: any;
}

/**
 * Derives the fixed bins assigned to all materials in fixedBinStore
 * Returns an object with material strings as keys and string arrays containing assigned fixedBins
 * @param fixedBins
 */
const deriveAllottedBinsByMaterial = (fixedBins: FixedBinRecord[]): { [key: string]: string[] } => {
    return fixedBins.reduce((acc: any, record) => {
        if (record.item in acc) {
            acc[record.item] = [...acc[record.item], record.bin];
        } else {
            acc[record.item] = [record.bin];
        }
        return acc;
    }, {});
};

/**
 * Loops through fixed bins to find unique material names
 * For each unique name, create an object property matching the material name
 * The value of the property is the string array of fixed bin names assigned to that material
 * So, if 2 bins of MaterialA are needed: { MaterialA: ['A12-01-B', 'A13-01-A'] }
 * @param binsToRestock
 * @param fixedBins
 * */
const restockMaterialsNeeded = (binsToRestock: string[], fixedBins: any[]) => {
    return binsToRestock.reduce((acc: { [key: string]: string[] }, bin: any) => {
        const match = fixedBins.find(record => record.bin === bin);
        const material = match!.item;
        const destinationBin = match!.bin;
        if (material in acc) {
            acc[material] = [...acc[material], destinationBin];
        } else {
            acc[material] = [destinationBin];
        }
        return acc;
    }, {});
};

/**
 * Derives empty bins and filled bins relative to fixed bin material assignment'
 * Returns object with material string keys and arrays containing filled and empty bin names
 * @param allottedBinsByMaterial
 * @param binsToRestock
 */
const getFilledToEmptyMaterials = (
    allottedBinsByMaterial: { [key: string]: string[] },
    binsToRestock: string[],
) => {
    const prioritizedMaterials: {
        [key: string]: {
            total: number;
            filled: string[];
            empty: string[];
        };
    } = {};
    for (let material in allottedBinsByMaterial) {
        prioritizedMaterials[material] = {
            total: allottedBinsByMaterial[material].length,
            filled: [],
            empty: [],
        };
        allottedBinsByMaterial[material].forEach(binName => {
            const empty = binsToRestock.includes(binName);
            if (empty) {
                prioritizedMaterials[material].empty = [
                    ...prioritizedMaterials[material].empty,
                    binName,
                ];
            } else {
                prioritizedMaterials[material].filled = [
                    ...prioritizedMaterials[material].filled,
                    binName,
                ];
            }
        });
    }
    return prioritizedMaterials;
};

const createRestockObjects = (
    stockSources: StockSource[],
    materialStockLevels: { [key: string]: StockLevels },
): RestockRecord[] => {
    const restockRecords = stockSources.map((stockSource: StockSource) => {
        const restockRecord: RestockRecord = {
            status: 'pending',
            sourceBin: stockSource.storageBin,
            destinationBin: stockSource.destinationBin,
            material: stockSource.material,
            description: stockSource.materialDescription,
            available: stockSource.available,
            storageUnit: stockSource.storageUnit,
            stockLevels: materialStockLevels[stockSource.material],
            id: stockSource.quant,
        };
        return restockRecord;
    });
    return restockRecords;
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

const RestockReport: React.FC<Props> = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [outOfStock, setOutOfStock] = useState<any[] | null>(null);
    const [dashboardInfo, setDashboardInfo] = useState({
        completed: 0,
        pending: 0,
        missing: 0,
    });
    const { records: report, summary } = useRestockStore();
    const {
        fixedBinStore: { getFixedBins },
        localDB,
    } = useAdminDataStore();
    const firebase = useFirebase();
    const lastUpdated = summary?.lastUpdated ? moment(summary.lastUpdated).calendar() : '--';

    useEffect(() => {
        document.title = 'Restock';
        return () => {
            document.title = 'Smart Stock';
        };
    });
    useEffect(() => {
        if (summary?.outOfStock) {
            setOutOfStock(summary.outOfStock);
        }
    }, [summary]);
    useEffect(() => {
        if (report.length > 0) {
            const updatedDashboardInfo = report.reduce(
                (acc: any, record) => {
                    if (record.status === 'pending') {
                        acc.pending = acc.pending + 1;
                    }
                    if (record.status === 'complete') {
                        acc.completed = acc.completed + 1;
                    }
                    if (record.status === 'missing') {
                        acc.missing = acc.missing + 1;
                    }
                    return acc;
                },
                {
                    completed: 0,
                    pending: 0,
                    missing: 0,
                },
            );
            setDashboardInfo(updatedDashboardInfo);
        }
    }, [report]);

    const createRestockReport = async () => {
        const fixedBins = getFixedBins();
        const fixedBinQueryParams = fixedBins.map(record => {
            return { storageBin: record.bin };
        });
        const binsToRestock = await localDB.getBinsToRestock(fixedBinQueryParams);
        const materialsNeeded = restockMaterialsNeeded(binsToRestock, fixedBins);
        const allottedBinsByMaterial = deriveAllottedBinsByMaterial(fixedBins);
        const materialStockLevels = getFilledToEmptyMaterials(
            allottedBinsByMaterial,
            binsToRestock,
        );
        const foundInOverstock = await localDB.findInOverstock(materialsNeeded); //array of inventory records + destination bin property
        return {
            records: createRestockObjects(foundInOverstock.stockSources, materialStockLevels),
            outOfStock: foundInOverstock.outOfStock,
        };
    };

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
                                const { records, outOfStock } = await createRestockReport();
                                firebase.overwriteRestockReport(records, outOfStock);
                                setLoading(false);
                                setShowModal(false);
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
                <AdminHeader>
                    <Column>
                        <Header uppercase>Restock Report</Header>
                        <AppText
                            mt={3}
                            bold
                            uppercase
                            size="medium"
                        >{`Updated: ${lastUpdated}`}</AppText>
                        <Button mt={3} onClick={() => setShowModal(s => !s)}>
                            Configure New Report
                        </Button>
                    </Column>
                    <InfoBlub>
                        <BlubHeader>
                            <AppText bold uppercase color="light">
                                Status
                            </AppText>
                        </BlubHeader>
                        <Box margin={2}>
                            <AppText uppercase bold>{`Pending: ${dashboardInfo.pending}`}</AppText>
                            <AppText
                                uppercase
                                bold
                            >{`Stocked: ${dashboardInfo.completed}`}</AppText>
                            <AppText uppercase bold>{`Missing: ${dashboardInfo.missing}`}</AppText>
                        </Box>
                    </InfoBlub>
                    <InfoBlub maxHeight="150px" overflow="auto">
                        <BlubHeader>
                            <AppText bold uppercase color="light">
                                Out of Stock
                            </AppText>
                        </BlubHeader>
                        {outOfStock && (
                            <Box margin={2} overflow="scroll">
                                {outOfStock.sort().map(out => {
                                    return (
                                        <AppText margin={2} size="small" bold key={out}>
                                            {out}
                                        </AppText>
                                    );
                                })}
                            </Box>
                        )}
                    </InfoBlub>
                </AdminHeader>
                <Box flexGrow={1} overflow="hidden">
                    <DataTable
                        columnHeaders={headerItems}
                        rowData={(report as unknown) as RowData[]}
                    />
                </Box>
            </Column>
        </>
    );
};

export default RestockReport;

const InfoBlub = styled(Column)`
    border-radius: 4px;
    box-shadow: ${props => props.theme.shadows.large};
    flex-grow: 1;
    margin-left: 20px;
    position: relative;
    overflow: hidden;
`;

const BlubHeader = styled(Row)`
    height: 30px;
    flex-shrink: 0;
    background: ${props => props.theme.colors.primary};
    align-items: center;
    padding: 5px;
`;
