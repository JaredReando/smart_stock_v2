import styled from "styled-components";
import {theme} from "../../constants/theme";

export const Table = styled.table({
    position: 'relative',
    display: 'flex',
    height: 'calc(100% - 40px)',
    flexDirection: 'column',
    borderRadius: '4px',
    boxShadow: theme.shadows.large,
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '1200px',
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

export const TableRow = styled.tr(({priority}) => ({
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


export const TH = styled.th(({width}) => ({
    textAlign: 'left',
    width: width,
}));


export const TD = styled.td(({width, align}) => ({
    textAlign: 'left',
    width: width,
}),
    ({flexBasis}) => ({
        flexBasis: flexBasis ? flexBasis : null,
    })
);