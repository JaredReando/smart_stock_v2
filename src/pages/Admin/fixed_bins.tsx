import React from 'react';

import {Container}  from './fixed_bins.styles';
import DataTable from "../../components/data_table";

interface Props {
    fixedBins: any;
}
const FixedBins: React.FC<Props> = ({fixedBins}) => {
    const headerItems = [
        {
            title: "Bin",key: 'Bin', ratio: 1,
        },
        {
            title: "Product", key: 'Product', ratio: 2,
        },
        {
            title: "Description", key: 'Description', ratio: 3,
        },
    ];
    return (
        <Container>
            <DataTable columnHeaders={headerItems} rowData={fixedBins}/>
        </Container>
    )
};

export default FixedBins;