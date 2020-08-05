import React, { useCallback, useEffect, useState } from 'react';
import { Box, Row } from '../../component_library/styles/layout';
import { Header, AppText } from '../../component_library';
import { Container, Section, DetailRow } from './restocking_page.styles';
import { useRestockUpdater } from '../../hooks';
import { useFirebaseContext } from '../../hooks/use_firebase_context';

const Client: React.FC = () => {
    const firebase = useFirebaseContext();
    const restockReport = useRestockUpdater();
    const [record, setRecord] = useState(0);
    const getRecord = useCallback(
        (direction: 'prev' | 'next') => {
            const limit = restockReport.length - 1;
            if (direction === 'prev') {
                if (record === 0) {
                    return limit;
                } else {
                    return record - 1;
                }
            }

            if (direction === 'next') {
                if (record === limit) {
                    return 0;
                } else {
                    return record + 1;
                }
            }
            return record;
        },
        [restockReport, record],
    );

    if (restockReport.length === 0) {
        return null;
    }

    const {
        available,
        description,
        destinationBin,
        isCompleted,
        isMissing,
        material,
        noneStocked,
        sourceBin,
        storageUnit,
        uuid,
    } = restockReport[record];
    //@ts-ignore
    const testRecord = { ...restockReport[record], available: 999 };
    console.log(restockReport[record]);

    return (
        <Container>
            <Section>
                <Row px={4} flexGrow={0} border="1px solid green" justifyContent="center">
                    <img src="https://img.icons8.com/ios/50/000000/pallet.png" />
                </Row>
                <Box ml={4} flexGrow={1}>
                    <Header>{sourceBin}</Header>
                </Box>
            </Section>
            <Section>
                <Row px={4} flexGrow={0} border="1px solid green" justifyContent="center">
                    <img
                        src="https://img.icons8.com/wired/64/000000/move-stock.png"
                        alt="move stock"
                    />
                </Row>
                <Box ml={4} flexGrow={1}>
                    <h1>{destinationBin}</h1>
                </Box>
            </Section>
            <Box width="100%" border="1px solid green">
                <h1>Details</h1>
                {Object.keys(restockReport[record]).map((key: string) => {
                    const data = restockReport[record][key];
                    const title = key;
                    return <DetailRow title={title} data={data} />;
                })}
            </Box>
            <Box>
                <h1>Buttons</h1>
                <button onClick={() => setRecord(getRecord('prev'))}>PREV</button>
                <button onClick={() => firebase.doUpdateRestockRecord(record, testRecord)}>
                    TEST
                </button>
                <button onClick={() => setRecord(getRecord('next'))}>NEXT</button>
            </Box>
        </Container>
    );
};

export default Client;
