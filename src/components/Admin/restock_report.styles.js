import styled from "styled-components";

export const Delete = styled.button({
    width: '100%',
    height: '100%',
    border: 'none',

    ':hover': {
        color: 'red',
        cursor: 'pointer',
    }
});

export const Table = styled.table({
    position: 'relative',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    maxWidth: '1200px',
    borderRadius: '4px',
    border: '1px solid #dddddd',
    marginRight: 'auto',
    marginLeft: 'auto',
    overflow: 'scroll',
});


export const TableHead = styled.thead({
    position: 'sticky',
    backgroundColor: '#f5f5f5',
    top: 0,
    width: '100%',
    // borderBottom: '1px solid black',
});


export const TH = styled.th({
   alignSelf: 'flex-start',
   flexBasis: '16%',
   flexGrow: 1,
   // border: '1px solid blue',
});


export const TD = styled.td({
    flexBasis: '16%',
    flexGrow: 1,
    alignSelf: 'flex-start',
    // border: '1px solid blue',
},
    ({flexBasis}) => ({
        flexBasis: flexBasis ? flexBasis : null,
    })
);

export const TableBody = styled.tbody({
    width: '100%'
});

export const TableRow = styled.tr({
    width: '100%',
    display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    // border: '1px solid black',
});