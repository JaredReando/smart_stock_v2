import React from 'react';
import { Table, TableBody, TableHead, TableRow, TD, TH } from './data_table.styles';
import uuid from 'uuid';
import { ColumnHeader, RowData } from '../../../constants/types';
import { AppText, Header } from '../../styles/typography';
import { Column } from '../../styles/layout';
import { theme } from '../../styles/theme';

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
            //workaround for color status indicators:
            if (header.render) {
                const color =
                    row.status === 'pending'
                        ? theme.colors.warning
                        : row.status === 'complete'
                        ? theme.colors.green
                        : theme.colors.error;
                const detail = (
                    <TD key={header.key} width={setRatio(header.ratio)} minWidth={header.width}>
                        {header.render(color)}
                    </TD>
                );
                rowCells.push(detail);
            }
            if (!header.render && `${header.key}` in row) {
                const detail = (
                    <TD key={header.key} width={setRatio(header.ratio)} minWidth={header.width}>
                        <AppText uppercase size="medium">
                            {row[header.key].toString()}
                        </AppText>
                    </TD>
                );
                rowCells.push(detail);
            } else {
                // console.log('misfit row: ', row);
                // console.log('header key it failed on: ', header.key);
            }
        });
        return <TableRow key={uuid()}>{rowCells}</TableRow>;
    }
    return (
        <>
            {loading && (
                <Column height="100%" width="100%" justifyContent="center" alignItems="center">
                    <Header>Loading...</Header>
                </Column>
            )}
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
                                    <AppText bold uppercase>
                                        {header.title}
                                    </AppText>
                                </TH>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData && rowData.map(row => rowBuilder(columnHeaders, row))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default DataTable;
