import React from 'react';
import { Header } from '../../component_library/styles/typography';
import { Button } from '../../component_library/styles/buttons';
import { Box } from '../../component_library/styles/layout';
import { useRestockStore } from '../../hooks';

interface Props {
    handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const RestockInfoDashboard: React.FC<Props> = ({ handleClick }) => {
    const { summary } = useRestockStore();
    return (
        <Box>
            <Button onClick={handleClick}>Reset</Button>
            <Header>{`Last Updated: ${summary?.lastUpdated ?? '---'}`}</Header>
        </Box>
    );
};

export default RestockInfoDashboard;
