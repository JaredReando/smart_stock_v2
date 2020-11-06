import React from 'react';
import {
    space,
    layout,
    buttonStyle,
    borderRadius,
    SpaceProps,
    BorderRadiusProps,
    LayoutProps,
} from 'styled-system';

import styled from 'styled-components';
import { AppText } from '../typography';

interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        SpaceProps,
        BorderRadiusProps,
        LayoutProps {}

const ButtonAppText = styled(AppText)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledButton = styled.button<Props>(
    ({ theme }) => ({
        border: '1px solid black',
        cursor: 'pointer',
        minWidth: '100px',
        height: '40px',
        textAlign: 'center',
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        boxShadow: theme.shadows.small,
        ':active': {
            boxShadow: 'none',
        },
        ':focus:not(.focus-visible)': {
            outline: 'none',
        },
        ':disabled': {
            cursor: 'not-allowed',
        },
    }),
    layout,
    space,
    buttonStyle,
    borderRadius,
);

const Button: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <StyledButton {...rest}>
            <ButtonAppText bold color="inherit">
                {children}
            </ButtonAppText>
        </StyledButton>
    );
};

Button.defaultProps = {
    borderRadius: 4,
};

export default Button;
