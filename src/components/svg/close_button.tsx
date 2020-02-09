import React from 'react';
import styled from 'styled-components';

const Rectangle = styled.div<{ rotation: number }>(props => {
    return {
        position: 'absolute',
        width: '20px',
        height: '2px',
        transform: `rotate(${props.rotation}deg)`,
        borderRadius: '1px',
        backgroundColor: props.theme.colors.black,
        cursor: 'pointer',
    };
});

const ButtonWrapper = styled.button({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    marginLeft: '10px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
});

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export const CloseButton: React.FC<Props> = props => {
    return (
        <ButtonWrapper aria-label={props.label} {...props}>
            <Rectangle rotation={45} />
            <Rectangle rotation={-45} />
        </ButtonWrapper>
    );
};
