import React, { useCallback, useEffect, useState } from 'react';
import { Box, Column, Row } from '../../component_library/styles/layout';
import { AppText } from '../../component_library';
import { useRestockStore } from '../../hooks';
import { useFirebase } from '../../hooks/use_firebase_context';
import { Button } from '../../component_library/styles/buttons';
import { RestockRecord } from '../../constants/types';
import styled from 'styled-components';
import { theme } from '../../component_library/styles/theme';

const ClientRestockingPage: React.FC = () => {
    const firebase = useFirebase();
    const { records: restockRecords } = useRestockStore();
    const [records, setRecords] = useState<RestockRecord[]>([]);
    const [recordIndex, setRecordIndex] = useState(0);
    const [threshold, setThreshold] = useState(2);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const currentRecord = records[recordIndex];

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restockRecords]);

    const resetRecords = () => {
        setCheckboxValue(false);
        setRecords(restockRecords);
        setRecordIndex(0);
    };

    const determinePrioritizedRecords = () => {
        const highPriorityRecords = records.reduce((acc: any, record) => {
            if (!record.stockLevels.filled || record.stockLevels.filled.length < threshold) {
                acc.push(record);
            }
            return acc;
        }, []);

        if (highPriorityRecords.length === 0) {
            alert('No records found. Try a value greater than ' + threshold);
            setCheckboxValue(false);
            return;
        }
        setCheckboxValue(true);
        setRecords(highPriorityRecords);
        setRecordIndex(0);
    };
    if (!currentRecord ?? records.length === 0) {
        return null;
    }

    const {
        destinationBin,
        sourceBin,
        material,
        storageUnit,
        description,
        // stockLevels,
        available,
        status,
    } = currentRecord;
    const matchedMaterials = records.filter(rec => rec.material === currentRecord.material);
    const matchedMaterialIndex = matchedMaterials.findIndex(mat => mat.id === currentRecord.id);
    const totalRecords = records.length;
    const adjustedCurrentIndex = recordIndex + 1;
    const statusColor =
        currentRecord.status === 'complete'
            ? theme.colors.primary
            : currentRecord.status === 'pending'
            ? theme.colors.white
            : theme.colors.error;
    return (
        <>
            <Container>
                <Row
                    backgroundColor={theme.colors.primary}
                    height="100%"
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <AppText bold color="light" size="xlarge">
                        SmartStock
                    </AppText>
                </Row>
                <Section>
                    <Row
                        px={4}
                        flexGrow={1}
                        alignItems="center"
                        backgroundColor={theme.colors.lightGrey}
                        width="100%"
                    >
                        <AppText bold uppercase>
                            Source
                        </AppText>
                    </Row>
                    <Row
                        pl={4}
                        flexGrow={1}
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        backgroundColor={statusColor}
                        style={{
                            transition: '200ms linear background-color',
                        }}
                    >
                        <AppText
                            bold
                            uppercase
                            size="jumbo"
                            color={status !== 'pending' ? 'light' : 'dark'}
                        >
                            {sourceBin}
                        </AppText>
                    </Row>
                </Section>
                <Section>
                    <Row
                        px={4}
                        flexGrow={1}
                        alignItems="center"
                        backgroundColor={theme.colors.lightGrey}
                        width="100%"
                    >
                        <AppText bold uppercase>
                            Destination
                        </AppText>
                    </Row>
                    <Row
                        pl={4}
                        flexGrow={1}
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        backgroundColor={statusColor}
                        style={{
                            transition: '200ms linear background-color',
                        }}
                    >
                        <AppText
                            bold
                            uppercase
                            size="jumbo"
                            color={status !== 'pending' ? 'light' : 'dark'}
                        >
                            {destinationBin}
                        </AppText>
                    </Row>
                </Section>
                <Section>
                    <Row
                        px={4}
                        flexGrow={1}
                        alignItems="center"
                        mb={3}
                        backgroundColor={theme.colors.lightGrey}
                        width="100%"
                    >
                        <AppText bold uppercase>
                            Filter
                        </AppText>
                    </Row>
                    <Row width="100%" alignItems="center" pb={3} px={4}>
                        <label htmlFor="checkbox">
                            <Row alignItems="center">
                                <CheckBox
                                    id="checkbox"
                                    checked={checkboxValue}
                                    onChange={() => {
                                        if (checkboxValue) {
                                            resetRecords();
                                        } else {
                                            determinePrioritizedRecords();
                                        }
                                    }}
                                    type="checkbox"
                                />
                                <AppText ml={4} bold uppercase size="medium" mr={3}>
                                    Max Pallet Threshold
                                </AppText>
                            </Row>
                        </label>
                        <label htmlFor="threshold">
                            <Row>
                                <ThresholdInput
                                    id="threshold"
                                    min="0"
                                    onClick={() => {
                                        const ref = document.querySelector(
                                            '#threshold',
                                        ) as HTMLInputElement;
                                        ref.select();
                                    }}
                                    value={threshold}
                                    onChange={e => {
                                        const value = parseInt(e.target.value);
                                        setThreshold(value);
                                    }}
                                    type="number"
                                    disabled={checkboxValue}
                                />
                            </Row>
                        </label>
                    </Row>
                </Section>
                <Section>
                    <Row flexGrow={1} justifyContent="space-between" width="100%">
                        <Column flex="1 0 auto">
                            <Box px={3} backgroundColor={theme.colors.lightGrey} width="100%">
                                <AppText bold uppercase>
                                    Material
                                </AppText>
                            </Box>
                            <Row alignItems="center" height="100%">
                                <AppText px={3} size="xlarge" bold>
                                    {material}
                                </AppText>
                            </Row>
                        </Column>
                        <Column flex="0 0 50px">
                            <Box backgroundColor={theme.colors.lightGrey} width="100%">
                                <AppText bold uppercase>
                                    Qty.
                                </AppText>
                            </Box>
                            <Row alignItems="center" height="100%">
                                <AppText size="large" bold>
                                    {available}
                                </AppText>
                            </Row>
                        </Column>
                        <Column flex="0 0 80px">
                            <Box backgroundColor={theme.colors.lightGrey} width="100%">
                                <AppText bold uppercase>
                                    Count
                                </AppText>
                            </Box>
                            <Row alignItems="center" height="100%">
                                <AppText size="large" bold>{`${matchedMaterialIndex + 1} of ${
                                    matchedMaterials.length
                                }`}</AppText>
                            </Row>
                        </Column>
                    </Row>
                    <Row flexGrow={1} justifyContent="space-between" width="100%">
                        <Column width="100%">
                            <Box px={3} backgroundColor={theme.colors.lightGrey} width="100%">
                                <AppText bold uppercase>
                                    Description
                                </AppText>
                            </Box>
                            <Row alignItems="center" height="100%">
                                <AppText
                                    px={3}
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
                            </Row>
                        </Column>
                    </Row>
                    <Row flexGrow={1} justifyContent="space-between" width="100%">
                        <Column width="100%">
                            <Box px={3} backgroundColor={theme.colors.lightGrey} width="100%">
                                <AppText bold uppercase>
                                    Storage Unit
                                </AppText>
                            </Box>
                            <Row alignItems="center" height="100%">
                                <AppText px={3} bold uppercase size="xlarge">
                                    {storageUnit}
                                </AppText>
                            </Row>
                        </Column>
                        <Column flex="0 0 130px" justifyContent="space-between" pb={3}>
                            <Box backgroundColor={theme.colors.lightGrey} width="100%">
                                <AppText bold uppercase>
                                    Record
                                </AppText>
                            </Box>
                            <Row alignItems="center" height="100%">
                                <AppText
                                    bold
                                    uppercase
                                    size="large"
                                >{`${adjustedCurrentIndex} of ${totalRecords}`}</AppText>
                            </Row>
                        </Column>
                    </Row>
                </Section>
                <ButtonGrid>
                    <Button
                        style={{
                            gridColumn: '1/1',
                            gridRow: '1/2',
                        }}
                        height="100%"
                        variant="secondary"
                        onClick={() => setRecordIndex(getRecord('prev'))}
                    >
                        <AppText noSelect uppercase bold size="large">
                            &#x027EA; Prev
                        </AppText>
                    </Button>
                    <Button
                        style={{
                            gridColumn: '2/3',
                            gridRow: '1/2',
                        }}
                        variant="danger"
                        height="100%"
                        onClick={() => {
                            const index = restockRecords.findIndex(
                                rec => rec.id === currentRecord.id,
                            );
                            firebase.doUpdateRestockRecord(index, {
                                ...currentRecord,
                                status: status === 'missing' ? 'pending' : 'missing',
                            });
                        }}
                    >
                        <AppText noSelect color="light" uppercase bold size="large">
                            Missing
                        </AppText>
                    </Button>
                    <Button
                        style={{
                            gridColumn: '1/4',
                            gridRow: '2/3',
                        }}
                        height="100%"
                        variant="primary"
                        onClick={() => {
                            const index = restockRecords.findIndex(
                                rec => rec.id === currentRecord.id,
                            );
                            firebase.doUpdateRestockRecord(index, {
                                ...currentRecord,
                                status: status === 'complete' ? 'pending' : 'complete',
                            });
                        }}
                    >
                        <AppText noSelect color="light" uppercase bold size="large">
                            Complete
                        </AppText>
                    </Button>
                    <Button
                        style={{
                            gridColumn: '3/3',
                            gridRow: '1/2',
                        }}
                        height="100%"
                        variant="secondary"
                        onClick={() => setRecordIndex(getRecord('next'))}
                    >
                        <AppText noSelect uppercase bold size="large">
                            NEXT &#x027EB;
                        </AppText>
                    </Button>
                </ButtonGrid>
            </Container>
        </>
    );
};

export default ClientRestockingPage;

const CheckBox = styled.input`
    width: 30px;
    height: 30px;
    &:hover {
        cursor: pointer;
    }
    &:checked {
        // styles go here
    }
`;
const ButtonGrid = styled(Box)`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 35% 30% 35%;
    grid-template-rows: repeat(2, 1fr);
`;

const ThresholdInput = styled.input`
    height: 30px;
    width: 50px;
    font-size: 1em;
    text-align: center;
`;

const Container = styled(Box)`
    display: grid;
    grid-template-rows: 50px repeat(2, auto) 70px auto 160px;
    grid-template-columns: 1fr;
    height: 100%;
    width: 100%;
    max-width: 600px;
    max-height: 800px;
    margin: 0 auto;
    overflow: scroll;
    touch-action: manipulation;
    box-shadow: ${props => props.theme.shadows.large};
`;

const Section = styled(Column)`
    height: 100%;
    width: 100%;
    justify-content: space-evenly;
    align-items: flex-start;
`;
