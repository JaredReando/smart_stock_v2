import React, { useCallback, useEffect, useState } from 'react';
import { Box, Column, Row } from '../../component_library/styles/layout';
import { AppText } from '../../component_library';
import { Container, Section } from './restocking_page.styles';
import { useRestockStore } from '../../hooks';
import { useFirebase } from '../../hooks/use_firebase_context';
import { Button } from '../../component_library/styles/buttons';
import { RestockRecord } from '../../constants/types';

const Client: React.FC = () => {
    const firebase = useFirebase();
    const { records: restockRecords } = useRestockStore();
    const [records, setRecords] = useState<RestockRecord[]>([]);
    const [recordIndex, setRecordIndex] = useState(0);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const getRecord = useCallback(
        (direction: 'prev' | 'next') => {
            const limit = records.length - 1;
            if (direction === 'prev') {
                if (recordIndex === 0) {
                    return limit;
                } else {
                    return recordIndex - 1;
                }
            }
            if (direction === 'next') {
                if (recordIndex === limit) {
                    return 0;
                } else {
                    return recordIndex + 1;
                }
            }
            return recordIndex;
        },
        [records, recordIndex],
    );

    useEffect(() => {
        if (!checkboxValue) {
            setRecords(restockRecords);
        }
        if (checkboxValue) {
            const updatedRecords = records.map(recA => {
                return restockRecords.find(recB => recB.id === recA.id) ?? recA;
            });
            setRecords(updatedRecords);
        }
    }, [restockRecords]);

    useEffect(() => {
        if (!checkboxValue) {
            setRecords(restockRecords);
            setRecordIndex(0);
        }

        if (checkboxValue) {
            const highPriorityRecords = records.reduce((acc: any, record) => {
                if (!record.stockLevels.filled || record.stockLevels.filled.length < 5) {
                    console.log('low stock: ', record);
                    acc.push(record);
                }
                return acc;
            }, []);
            setRecords(highPriorityRecords);
            setRecordIndex(0);
            console.log({ highPriorityRecords });
        }
    }, [checkboxValue]);

    if (records.length === 0) {
        return null;
    }

    const {
        destinationBin,
        sourceBin,
        material,
        storageUnit,
        description,
        stockLevels,
        available,
        status,
    } = records[recordIndex];
    const matchedMaterials = records.filter(rec => rec.material === records[recordIndex].material);
    const matchedMaterialIndex = matchedMaterials.findIndex(
        mat => mat.id === records[recordIndex].id,
    );
    const totalRecords = records.length;
    const currentRecord = recordIndex + 1;
    //@ts-ignore
    const testRecord =
        records[recordIndex].status === 'complete'
            ? { ...records[recordIndex], status: 'pending' }
            : { ...records[recordIndex], status: 'complete' };

    return (
        <Container>
            <Section>
                <Row px={4} flexGrow={0} justifyContent="center">
                    <AppText bold uppercase>
                        Source
                    </AppText>
                </Row>
                <Row pl={4} flexGrow={1} justifyContent="center" alignItems="center" width="100%">
                    <AppText bold uppercase size="jumbo">
                        {sourceBin}
                    </AppText>
                </Row>
            </Section>
            <Section>
                <Row px={4} flexGrow={0} justifyContent="center">
                    <AppText bold uppercase>
                        Destination
                    </AppText>
                </Row>
                <Row pl={4} flexGrow={1} justifyContent="center" alignItems="center" width="100%">
                    <AppText bold uppercase size="jumbo">
                        {destinationBin}
                    </AppText>
                </Row>
            </Section>
            <Section>
                <Row px={3} flexGrow={0} justifyContent="space-between" width="100%">
                    <Column flex="1 0 auto">
                        <AppText bold uppercase>
                            Material
                        </AppText>
                        <AppText size="xlarge" bold>
                            {material}
                        </AppText>
                    </Column>
                    <Column flex="0 0 50px">
                        <AppText bold uppercase>
                            Qty.
                        </AppText>
                        <AppText size="large" bold>
                            {available}
                        </AppText>
                    </Column>
                    <Column flex="0 0 80px">
                        <AppText bold uppercase>
                            Count
                        </AppText>
                        <AppText size="large" bold>{`${matchedMaterialIndex + 1} of ${
                            matchedMaterials.length
                        }`}</AppText>
                    </Column>
                </Row>
                <Row px={3} flexGrow={0} justifyContent="space-between" width="100%">
                    <Column>
                        <AppText bold uppercase>
                            Description
                        </AppText>
                        <AppText
                            bold
                            uppercase
                            size="large"
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {description}
                        </AppText>
                    </Column>
                </Row>
                <Row px={3} flexGrow={0} justifyContent="space-between" width="100%">
                    <Column>
                        <AppText bold uppercase>
                            Storage Unit
                        </AppText>
                        <AppText bold uppercase size="xlarge">
                            {storageUnit}
                        </AppText>
                    </Column>
                    <Column flex="0 0 100px">
                        <AppText bold uppercase>
                            Record
                        </AppText>
                        <AppText
                            bold
                            uppercase
                            size="large"
                        >{`${currentRecord} of ${totalRecords}`}</AppText>
                    </Column>
                </Row>
            </Section>
            <Section>
                <Box width="100%">
                    <Row alignItems="center">
                        <AppText bold uppercase size="large" mr={3}>
                            High Priority Only
                        </AppText>
                        <input
                            checked={checkboxValue}
                            onChange={() => setCheckboxValue(v => !v)}
                            type="checkbox"
                        />
                    </Row>
                    <Row justifyContent="space-between">
                        <AppText uppercase bold>
                            Status
                        </AppText>
                    </Row>
                    <Row>
                        <AppText size="large">{records[recordIndex].status}</AppText>
                    </Row>
                </Box>
            </Section>
            <Row>
                <Box flexGrow={1}>
                    <Button
                        height="100%"
                        width="100%"
                        variant="secondary"
                        onClick={() => setRecordIndex(getRecord('prev'))}
                    >
                        <AppText uppercase bold size="xlarge">
                            &#x027EA; Prev
                        </AppText>
                    </Button>
                </Box>
                <Column flexGrow={2}>
                    <Box>
                        <Button
                            style={{ background: 'tomato' }}
                            width="100%"
                            onClick={() => {
                                const index = restockRecords.findIndex(
                                    rec => rec.id === records[recordIndex].id,
                                );
                                firebase.doUpdateRestockRecord(index, {
                                    ...testRecord,
                                    status: 'missing',
                                });
                            }}
                        >
                            <AppText uppercase bold size="xlarge">
                                Missing
                            </AppText>
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            height="100px"
                            width="100%"
                            variant={
                                status === 'pending' || status === 'missing'
                                    ? 'primary'
                                    : 'secondary'
                            }
                            onClick={() => {
                                const index = restockRecords.findIndex(
                                    rec => rec.id === records[recordIndex].id,
                                );
                                firebase.doUpdateRestockRecord(index, testRecord);
                            }}
                        >
                            <AppText uppercase bold size="xlarge">
                                Complete
                            </AppText>
                        </Button>
                    </Box>
                </Column>
                <Box>
                    <Button
                        height="100%"
                        width="100%"
                        variant="secondary"
                        onClick={() => setRecordIndex(getRecord('next'))}
                    >
                        <AppText uppercase bold size="xlarge">
                            NEXT &#x027EB;
                        </AppText>
                    </Button>
                </Box>
            </Row>
        </Container>
    );
};

export default Client;
