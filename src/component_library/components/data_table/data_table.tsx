import React from 'react';
import { Table, TableHead, TableBody, TableRow, TH, TD } from './data_table.styles';
import uuid from 'uuid';

export interface ColumnHeader extends Partial<StringKeys> {
    title: string;
    key: string;
    ratio: number;
    width?: string;
}

export interface RowData extends StringKeys {}

interface StringKeys {
    [key: string]: string | number;
}

interface Props {
    columnHeaders: ColumnHeader[];
    rowData: RowData[];
    loading?: boolean;
}

const DataTable: React.FC<Props> = ({ columnHeaders, rowData, loading }) => {
    function setRatio(grow = 1, columns = columnHeaders.length) {
        const baseWidth = 100 / columns;
        return `${baseWidth * grow}%`;
    }
    function rowBuilder(headers: ColumnHeader[], row: RowData) {
        const rowCells: React.ReactElement[] = [];
        columnHeaders.forEach(header => {
            if (`${header.key}` in row) {
                const detail = (
                    <TD key={header.key} width={setRatio(header.ratio)} minWidth={header.width}>
                        {row[header.key]}
                    </TD>
                );
                rowCells.push(detail);
            } else {
                console.log('misfit row: ', row);
            }
        });
        return <TableRow key={uuid()}>{rowCells}</TableRow>;
    }
    return (
        <>
            {loading && <h1 style={{ textAlign: 'center' }}>Loading</h1>}
            {!loading && (
                <Table>
                    <TableHead>
                        <TableRow>
                            {columnHeaders.map((header: ColumnHeader, i: number) => (
                                <TH
                                    key={header.title}
                                    width={setRatio(header.ratio)}
                                    //overrides any width % setting while keeping proportions
                                    minWidth={header.width}
                                >
                                    {header.title}
                                </TH>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{rowData.map(row => rowBuilder(columnHeaders, row))}</TableBody>
                </Table>
            )}
        </>
    );
};

export default DataTable;
