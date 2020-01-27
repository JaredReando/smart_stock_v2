import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TH,
    TD,
} from './restock_report.styles';

const RestockReport = ({report}) => {
    function setRatio(grow = 1, columns = 6) {
        const baseWidth = 100 / columns;
        return `${baseWidth * grow}%`;
    }

    const headerItems = [
        {
            title: "Source", key: 'row_data_key', width: setRatio(2),
        },
        {
            title: "Destination", width: setRatio(2),
        },
        {
            title: "Material", width: setRatio(3),
        },
        {
            title: "Description", width: setRatio(4),
        },
        {
            title: "Qty.", width: setRatio(1),
        },
        {
            title: "Storage Unit", width: setRatio(2),
        },
    ];
    const tableProps = {columnHeaders: headerItems, rowData: report};
    const {columnHeaders, rowData} = tableProps;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columnHeaders.map(item => (
                        <TH
                            key={item.item}
                            width={item.width}
                        >
                            {item.title}
                        </TH>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rowData && Object.keys(rowData).map((recordKey) => {
                    // const {
                    //     isCompleted,
                    //     isMissing,
                    //     available,
                    //     description,
                    //     destinationBin,
                    //     material,
                    //     sourceBin,
                    //     storageUnit,
                    //     noneStocked,
                    // } = rowData[recordKey];

                    const rowRecord = rowData[recordKey];
                    const returnToMe = columnHeaders.map(header => {
                        if (rowRecord[header.key]) {
                            return (
                                <TD
                                    width={header.width}
                                >
                                    {rowRecord[header.key]}
                                </TD>
                            )
                        }
                        return null
                    });
                    return (
                        <TableRow>
                            {returnToMe}
                        </TableRow>
                    )
                    // return (
                    //     <TableRow
                    //         priority={noneStocked}
                    //         key={recordKey}
                    //     >
                    //         <TD
                    //             width={headerItems[0].width}
                    //         >
                    //             {sourceBin}
                    //         </TD>
                    //         <TD
                    //             width={headerItems[1].width}
                    //         >
                    //             {destinationBin}
                    //         </TD>
                    //         <TD
                    //             width={headerItems[2].width}
                    //         >
                    //             {material}
                    //         </TD>
                    //         <TD
                    //             width={headerItems[3].width}
                    //         >
                    //             {description}
                    //         </TD>
                    //         <TD
                    //             width={headerItems[4].width}
                    //         >
                    //             {available}
                    //         </TD>
                    //         <TD
                    //             width={headerItems[5].width}
                    //         >
                    //             {storageUnit}
                    //         </TD>
                    //     </TableRow>
                    // )
                })
                }
            </TableBody>
        </Table>
    )
}

export default RestockReport;
