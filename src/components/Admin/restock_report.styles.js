import styled from "styled-components";

export const Table = styled.table`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    border: 1px solid black;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
`;

export const TableHead = styled.thead`
    width: 100%;
    border-bottom: 1px solid black;
`;

export const TH = styled.th`
   text-align: left;
   width: 16.6%;
`;

export const TD = styled.td`
    width: 16.6%;
    text-align: left;
`;

export const TableBody = styled.tbody`
    width: 100%;
`;

export const TableRow = styled.tr`
    width: 100%;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
`;