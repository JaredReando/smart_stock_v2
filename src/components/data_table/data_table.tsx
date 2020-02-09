import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from './data_table.styles';

interface Props {
  columnHeaders: any;
  rowData: any;
}
const DataTable: React.FC<Props> = ({ columnHeaders, rowData }) => {
  function setRatio(grow = 1, columns = columnHeaders.length) {
    const baseWidth = 100 / columns;
    return `${baseWidth * grow}%`;
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columnHeaders.map((item: any) => (
            <TH key={item.item} width={setRatio(item.ratio)}>
              {item.title}
            </TH>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rowData &&
          Object.keys(rowData).map(recordKey => {
            const rowRecord = rowData[recordKey];
            const returnToMe = columnHeaders.map((header: any) => {
              if (rowRecord[header.key]) {
                return (
                  <TD width={setRatio(header.ratio)}>
                    {rowRecord[header.key]}
                  </TD>
                );
              }
              return null;
            });
            if (returnToMe) {
              return <TableRow>{returnToMe}</TableRow>;
            }
            return null;
          })}
      </TableBody>
    </Table>
  );
};

export default DataTable;
