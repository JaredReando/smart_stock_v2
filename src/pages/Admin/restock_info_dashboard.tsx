import React from 'react';
import {Header} from '../../styles/typography'
import { Button } from "../../styles/buttons";
import { Box } from '../../styles/layout';

interface Props {
    handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}
const RestockInfoDashboard: React.FC<Props> = ({handleClick}) => {
    return (
        <Box>
            <Header size="large">New Report</Header>
            <Button onClick={handleClick}>New</Button>
        </Box>
    )
};

export default RestockInfoDashboard;