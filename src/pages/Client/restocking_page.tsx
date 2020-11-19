import React, { useCallback, useState } from 'react';
import { Box, Row } from '../../component_library/styles/layout';
import { AppText, Header } from '../../component_library';
import { Container, Section, DetailRow } from './restocking_page.styles';
import { useRestockStore } from '../../hooks';
import { useFirebase } from '../../hooks/use_firebase_context';
import { Button } from '../../component_library/styles/buttons';

const Client: React.FC = () => {
    const firebase = useFirebase();
    const { records } = useRestockStore();
    const [record, setRecord] = useState(0);
    const getRecord = useCallback(
        (direction: 'prev' | 'next') => {
            const limit = records.length - 1;
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
        [records, record],
    );

    if (records.length === 0) {
        return null;
    }

    const { destinationBin, sourceBin } = records[record];
    //@ts-ignore
    const testRecord =
        records[record].status === 'complete'
            ? { ...records[record], status: 'pending' }
            : { ...records[record], status: 'complete' };
    console.log(records[record]);

    return (
        <Container>
            <Section>
                <Row px={4} flexGrow={0} border="1px solid green" justifyContent="center">
                    <AppText bold uppercase>
                        Source
                    </AppText>
                </Row>
                <Box ml={4} flexGrow={1}>
                    <Header>{sourceBin}</Header>
                </Box>
                <Row>
                    <AppText size="large">{records[record].material}</AppText>
                    <AppText size="large">{records[record].description}</AppText>
                </Row>
            </Section>
            <Section>
                <Row px={4} flexGrow={0} border="1px solid green" justifyContent="center">
                    <AppText bold uppercase>
                        Destination
                    </AppText>
                </Row>
                <Box ml={4} flexGrow={1}>
                    <h1>{destinationBin}</h1>
                </Box>
            </Section>
            <Box width="100%" border="1px solid green">
                <h1>Details</h1>
                <Row>
                    <AppText size="large">{records[record].status}</AppText>
                </Row>
                {/*{Object.keys(records[record]).map((key: string) => {*/}
                {/*    //@ts-ignore*/}
                {/*    const data = records[record][key];*/}
                {/*    const title = key;*/}
                {/*    return <DetailRow title={title} data={data} key={key} />;*/}
                {/*})}*/}
            </Box>
            <Box>
                <h1>Buttons</h1>
                <Button variant="secondary" onClick={() => setRecord(getRecord('prev'))}>
                    <AppText uppercase bold>
                        Prev
                    </AppText>
                </Button>
                <Button
                    style={{ background: 'tomato' }}
                    onClick={() => {
                        firebase.doUpdateRestockRecord(record, {
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
                <Button
                    onClick={() => {
                        firebase.doUpdateRestockRecord(record, testRecord);
                        console.log('test record: ', testRecord);
                    }}
                >
                    <AppText uppercase bold>
                        Complete
                    </AppText>
                </Button>
                <Button variant="secondary" onClick={() => setRecord(getRecord('next'))}>
                    <AppText uppercase bold>
                        NEXT
                    </AppText>
                </Button>
            </Box>
        </Container>
    );
};

export default Client;
