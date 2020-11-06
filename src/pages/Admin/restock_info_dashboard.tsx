import React from 'react';
import { Header } from '../../component_library/styles/typography';
import { Button } from '../../component_library/styles/buttons';
import { Box } from '../../component_library/styles/layout';

interface Props {
    handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}
const RestockInfoDashboard: React.FC<Props> = ({ handleClick }) => {
    return (
        <Box>
            <Button onClick={handleClick}>Reset</Button>
        </Box>
    );
};

export default RestockInfoDashboard;
