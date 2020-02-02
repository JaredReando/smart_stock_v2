import styled from "styled-components";
import {theme} from "../constants/theme";

export const Table = styled.table({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    borderRadius: '4px',
    boxShadow: theme.shadows.large,
    overflow: 'scroll',
});


export const TableHead = styled.thead({
    backgroundColor: 'lightgrey',
    width: '100%',
    display: 'flex',
});

export const TableBody = styled.tbody({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll'
});

export const TableRow = styled.tr(() => ({
    flexGrow: 1,
    display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',

    '&:nth-child(even)': {
        background: '#f5f5f5',
    }
}));


export const TH = styled.th<{width: string}>(({width}) => ({
    textAlign: 'left',
    width: width,
}));


export const TD = styled.td<{width: string, align?: string}>(({width, align}) => ({
        textAlign: 'left',
        width: width,
        fontSize: '.75em'
    })
);