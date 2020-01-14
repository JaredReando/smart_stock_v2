import React from 'react';
import { withFirebase} from "../Firebase";

import { TableRow, TD, Delete } from "./restock_report.styles";


const ReportItem = ({record, firebase, recordKey}) => {
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
    const allTheThings = () => {
        console.log('Index:', recordKey);
        firebase.doDeleteRestockRecord(recordKey);
    }
    return (
        <>
            <TableRow>
                <TD><Delete onClick={allTheThings}>DELETE</Delete></TD>
                <TD>{sourceBin}</TD>
                <TD>{destinationBin}</TD>
                <TD>{material}</TD>
                <TD>{description}</TD>
                <TD
                color='red'
                >{available}</TD>
                <TD>{storageUnit}</TD>
            </TableRow>
            <hr
                style={{
                    width: '98%',
                    margin: '0 auto'

                }}

            />
        </>
    )
};

export default withFirebase(ReportItem);