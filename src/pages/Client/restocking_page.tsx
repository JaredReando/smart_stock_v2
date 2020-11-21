import React, { useCallback, useEffect, useState } from 'react';
import { Box, Column, Row } from '../../component_library/styles/layout';
import { AppText, Header } from '../../component_library';
import { Container, Section } from './restocking_page.styles';
import { useRestockStore } from '../../hooks';
import { useFirebase } from '../../hooks/use_firebase_context';
import { Button } from '../../component_library/styles/buttons';
import App from '../../app';
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
    }, [restockRecords]);

    useEffect(() => {
        if (!checkboxValue) {
            setRecords(restockRecords);
            setRecordIndex(0);
        }

        if (checkboxValue) {
            const highPriorityRecords = records.reduce((acc: any, record) => {
                if (record.stockLevels.filled.length < 5) {
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
    const totalRecords = records.length;
    const currentRecord = recordIndex + 1;
    //@ts-ignore
    const testRecord =
        records[recordIndex].status === 'complete'
            ? { ...records[recordIndex], status: 'pending' }
            : { ...records[recordIndex], status: 'complete' };
    console.log(stockLevels);

    return (
        <Container>
            <Section>
                <Row px={4} flexGrow={0} border="1px solid green" justifyContent="center">
                    <AppText bold uppercase>
                        Source
                    </AppText>
                </Row>
                <Row
                    pl={4}
                    flexGrow={1}
                    justifyContent="center"
                    alignItems="center"
                    border="1px solid red"
                    width="100%"
                >
                    <AppText bold uppercase size="jumbo">
                        {sourceBin}
                    </AppText>
                </Row>
            </Section>
            <Section>
                <Row px={4} flexGrow={0} border="1px solid green" justifyContent="center">
                    <AppText bold uppercase>
                        Destination
                    </AppText>
                </Row>
                <Row
                    pl={4}
                    flexGrow={1}
                    justifyContent="center"
                    alignItems="center"
                    border="1px solid red"
                    width="100%"
                >
                    <AppText bold uppercase size="jumbo">
                        {destinationBin}
                    </AppText>
                </Row>
            </Section>
            <Section>
                <Row
                    px={4}
                    flexGrow={0}
                    border="1px solid green"
                    justifyContent="space-between"
                    width="100%"
                >
                    <Column>
                        <AppText bold uppercase>
                            Material
                        </AppText>
                        <AppText size="large">{material}</AppText>
                    </Column>
                    <Column flex="0 0 100px">
                        <AppText bold uppercase>
                            Qty.
                        </AppText>
                        <AppText size="large">{available}</AppText>
                    </Column>
                </Row>
                <Row
                    px={4}
                    flexGrow={0}
                    border="1px solid green"
                    justifyContent="space-between"
                    width="100%"
                >
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
                <Row
                    px={4}
                    flexGrow={0}
                    border="1px solid green"
                    justifyContent="space-between"
                    width="100%"
                >
                    <Column>
                        <AppText bold uppercase>
                            Storage Unit
                        </AppText>
                        <AppText bold uppercase size="large">
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
                <Box width="100%" border="1px solid green">
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
                        <AppText uppercase bold>
                            Prev
                        </AppText>
                    </Button>
                </Box>
                <Column flexGrow={2}>
                    <Box>
                        <Button
                            style={{ background: 'tomato' }}
                            width="100%"
                            onClick={() => {
                                firebase.doUpdateRestockRecord(recordIndex, {
                                    ...testRecord,
                                    status: 'missing',
                                });
                                console.log('test record: ', testRecord);
                            }}
                        >
                            <AppText uppercase bold>
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
                                firebase.doUpdateRestockRecord(recordIndex, testRecord);
                                console.log('test record: ', testRecord);
                            }}
                        >
                            {(status === 'pending' || status === 'missing') && (
                                <AppText uppercase bold>
                                    Complete
                                </AppText>
                            )}
                            {status === 'complete' && (
                                <AppText uppercase bold>
                                    Undo
                                </AppText>
                            )}
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
                        <AppText uppercase bold>
                            NEXT
                        </AppText>
                    </Button>
                </Box>
            </Row>
        </Container>
    );
};

export default Client;
