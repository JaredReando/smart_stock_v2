import React from 'react';
import { TableRow, TD } from "./restock_report.styles";


const ReportItem = ({record}) => {
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
        <TableRow key={uuid}>
            <TD>{sourceBin}</TD>
            <TD>{destinationBin}</TD>
            <TD>{material}</TD>
            <TD>{description}</TD>
            <TD>{available}</TD>
            <TD>{storageUnit}</TD>
        </TableRow>
    )
};

export default ReportItem;