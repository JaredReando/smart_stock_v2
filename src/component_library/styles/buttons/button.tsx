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
import { Spinner } from '../spinner/spinner';
import styled from 'styled-components';
import { AppText } from '../typography';

export type ButtonVariants = 'primary' | 'secondary' | 'danger' | 'link';

interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        SpaceProps,
        BorderRadiusProps,
        LayoutProps {
    loading?: boolean;
    variant?: ButtonVariants;
}

const ButtonAppText = styled(AppText)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledButton = styled.button<Props>(
    ({ theme }) => ({
        cursor: 'pointer',
        minWidth: '100px',
        height: '40px',
        textAlign: 'center',
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        boxShadow: theme.shadows.small,
        ':hover': {
            boxShadow: theme.shadows.large,
        },
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

const Button: React.FC<Props> = ({ loading, variant, children, ...rest }) => {
    return (
        <StyledButton variant={variant} {...rest}>
            {loading && <Spinner size="30px" color={'white'} />}
            {!loading && (
                <ButtonAppText bold color="inherit">
                    {children}
                </ButtonAppText>
            )}
        </StyledButton>
    );
};

Button.defaultProps = {
    borderRadius: '4px',
    variant: 'secondary',
};

export default Button;
