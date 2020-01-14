import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TH,
    TD,
} from './restock_report.styles';
import ReportItem from "./report_item";

const RestockReport = (props) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TH>Delete</TH>
                    <TH>Source</TH>
                    <TH>Destination</TH>
                    <TH>Material</TH>
                    <TH>Description</TH>
                    <TH>Qty.</TH>
                    <TH>Storage Unit</TH>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.report && Object.keys(props.report).map((recordKey) => {
                    const reportObject = props.report;
                    const record = reportObject[recordKey];
                    return (
                        <ReportItem
                            key={record.uuid}
                            recordKey={recordKey}
                            record={record}
                        />
                    )
                })
                }
            </TableBody>
        </Table>
    )
}

export default RestockReport;
