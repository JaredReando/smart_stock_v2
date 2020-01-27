import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TH,
    TD,
} from './restock_report.styles';
import DataTable from "../data_table";

const RestockReport = ({report}) => {
    function setRatio(grow = 1, columns = 6) {
        const baseWidth = 100 / columns;
        return `${baseWidth * grow}%`;
    }
    const headerItems = [
        {
            title: "Source", key: 'sourceBin', ratio: 2,
        },
        {
            title: "Destination",key: 'destinationBin', ratio: 2,
        },
        {
            title: "Material", key: 'material', ratio: 3,
        },
        {
            title: "Description", key: 'description', ratio: 4,
        },
        {
            title: "Qty.", key: 'available', ratio: 1,
        },
        {
            title: "Storage Unit", key: 'storageUnit', ratio: 2,
        },
    ];
    return (
        <DataTable
            columnHeaders={headerItems}
            rowData={report}
        />
    )
};

export default RestockReport;
