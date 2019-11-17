import React from 'react';
import { TableRow, TD, Delete } from "./restock_report.styles";


const ReportItem = ({record, ...props}) => {
        const {
            isCompleted,
            isMissing,
            available,
            description,
            destinationBin,
            material,
            sourceBin,
            storageUnit,
            uuid,
        } = record;

    return (
        <TableRow>
            <TD><Delete onClick={() => console.log('Idex:', props.index)}>DELETE</Delete></TD>
            <TD>{sourceBin}</TD>
            <TD>{destinationBin}</TD>
            <TD>{material}</TD>
            <TD>{description}</TD>
            <TD
            color='red'
            >{available}</TD>
            <TD>{storageUnit}</TD>
        </TableRow>
    )
};

export default ReportItem;