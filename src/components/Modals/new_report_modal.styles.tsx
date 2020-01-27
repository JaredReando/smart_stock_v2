import styled from "styled-components";

export const ModalContainer = styled.div({
    width: '100%',
    height: '100%',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    overflow: 'scroll',
    background: 'rgba(0,0,0, .5)',
});

export const Close = styled.button({
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(50%, -50%)',
    width: '30px',
    height: '30px',
    borderRadius: '25px',
    border: 'none',
    outline: 'none',
    background: 'white',
    transition: 'font-size .15s ease-in-out',
    fontSize: '1em',

    ':hover': {
        fontSize: '1.2em',
        cursor: 'pointer',
    }

});

export const InnerModal = styled.div({
    border: '5px solid white',
    width: '600px',
    height: '500px',
    position: 'relative',
    background: 'lightgrey',
});
