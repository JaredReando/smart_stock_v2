import React from 'react';
import styled from 'styled-components';
import { Column, Row, Box } from '../../component_library/styles/layout';
import { SubsectionHeader, AppText } from '../../component_library';

const flexCentered = {
    justifyContent: 'space-evenly',
    alignItems: 'center',
};

export const Container = styled(Column)({
    ...flexCentered,
    height: '100%',
    maxHeight: '900px',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    border: '1px solid green',
    touchAction: 'manipulation',
});

export const Section = styled(Row)({
    flexGrow: 0,
    border: '1px solid red',
    width: '100%',
    ...flexCentered,
});

interface DetailProps {
    title: string;
    data: string;
}
export const DetailRow: React.FC<DetailProps> = ({ title, data }) => {
    return (
        <Row alignItems="center" border="1px solid red">
            <Box mx={4}>
                <SubsectionHeader bold>{title}</SubsectionHeader>
            </Box>
            <Box>
                <SubsectionHeader>{data}</SubsectionHeader>
            </Box>
        </Row>
    );
};
