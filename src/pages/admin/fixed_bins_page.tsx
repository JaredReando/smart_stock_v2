import React, { useEffect, useState } from 'react';
import DataTable from '../../component_library/components/data_table/data_table';
import { Column } from '../../component_library/styles/layout';
import PageHeader from './page_header';
import { useAdminDataStore } from '../../hooks/use_admin_data_store';
import Button from '../../component_library/styles/buttons/button';
import { AppText, Header } from '../../component_library/styles/typography';
import moment from 'moment';
import { InfoBlub, BlubHeader } from './restock_report_page';

interface Props {
    fixedBins: any;
}

const headerItems = [
    {
        title: 'Bin',
        key: 'bin',
        ratio: 1,
    },
    {
        title: 'Product',
        key: 'item',
        ratio: 1,
    },
    {
        title: 'Description',
        key: 'description',
        ratio: 3,
    },
    {
        title: 'Last Modified',
        key: 'lastModified',
        ratio: 3,
    },
];
interface SummaryItem {
    desc: string;
    material: string;
    allocated: number;
}

const FixedBins: React.FC<Props> = () => {
    const { fixedBinStore } = useAdminDataStore();
    const [materialsSummary, setMaterialsSummary] = useState<SummaryItem[]>([]);
    useEffect(() => {
        document.title = 'Fixed Bins';
        return () => {
            document.title = 'Smart Stock';
        };
    });

    useEffect(() => {
        const { fixedBins } = fixedBinStore;
        const summary: SummaryItem[] = [];
        fixedBins.forEach(fixedBin => {
            const matchIndex = summary.findIndex(s => s.material === fixedBin.item);
            if (matchIndex !== -1) {
                summary[matchIndex] = {
                    ...summary[matchIndex],
                    allocated: summary[matchIndex].allocated + 1,
                };
            } else {
                const itemSummary = {
                    material: fixedBin.item,
                    desc: fixedBin.description,
                    allocated: 1,
                };
                summary.push(itemSummary);
            }
        });
        setMaterialsSummary(summary);
    }, [fixedBinStore]);

    return (
        <Column height="100%">
            <PageHeader>
                <Column margin={3}>
                    <Header uppercase>Fixed Bins</Header>
                    <AppText mt={3} uppercase bold>
                        Change fixed bins in Airtable:
                    </AppText>
                    <a
                        href="https://airtable.com/tblHImRJEKbWwvSZq/viw55Ghz3crFPCJOt?blocks=hide"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button mt={3} width={'100%'}>
                            Go to Airtable
                        </Button>
                    </a>
                </Column>
                <InfoBlub maxHeight="200px" overflow="auto" margin={3}>
                    <BlubHeader>
                        <AppText bold uppercase color="light">
                            Material Allocation
                        </AppText>
                    </BlubHeader>
                    {materialsSummary && (
                        <Column margin={2} overflow="scroll">
                            <DataTable
                                textSize="small"
                                columnHeaders={[
                                    {
                                        title: 'Material',
                                        key: 'material',
                                        ratio: 1,
                                    },
                                    {
                                        title: 'Description',
                                        key: 'desc',
                                        ratio: 2,
                                    },
                                    {
                                        title: 'Count',
                                        key: 'allocated',
                                        ratio: 2,
                                    },
                                ]}
                                rowData={materialsSummary}
                            />
                        </Column>
                    )}
                </InfoBlub>
            </PageHeader>
            <DataTable
                columnHeaders={headerItems}
                rowData={fixedBinStore.fixedBins.map(bin => ({
                    ...bin,
                    lastModified: moment(bin.lastModified).calendar(),
                }))}
                loading={fixedBinStore.loading}
            />
        </Column>
    );
};

export default FixedBins;
