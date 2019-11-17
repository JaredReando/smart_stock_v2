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

class RestockReport extends React.Component {
    render() {
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
                    <TableRow>
                        <TD>Delete?</TD>
                        <TD>sourceBin</TD>
                        <TD>destinationBin</TD>
                        <TD>material</TD>
                        <TD>description</TD>
                        <TD>available</TD>
                        <TD>storageUnit</TD>
                    </TableRow>
                    {this.props.report && Object.keys(this.props.report).map((recordKey) => {
                        const reportObject = this.props.report;
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
}

export default RestockReport;
