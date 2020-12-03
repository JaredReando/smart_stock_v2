import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../theme';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

interface ItemProps {
    delay: string;
    color?: string;
    size?: string;
}

interface SizeProps {
    size?: string;
}

const Ring = styled.div<SizeProps>(
    {
        display: 'inline-block',
        position: 'relative',
    },
    ({ size }) => {
        return {
            width: size,
            height: size,
        };
    },
);

// const Item = styled.div<ItemProps>(
//     {
//         boxSizing: 'border-box',
//         display: 'block',
//         position: 'absolute',
//         borderRadius: '50%',
//         animation: `${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
//     },
//     ({ delay, size, color }) => {
//         return {
//             border: `6px solid ${color}`,
//             borderColor: `${color} transparent transparent transparent`,
//             animationDelay: delay,
//             width: size,
//             height: size,
//         };
//     },
// );

const Item = styled.div<ItemProps>`
    box-sizing: border-box;
    display: block;
    position: absolute;
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: 6px solid ${props => props.color};
    border-color: ${props => props.color} transparent transparent transparent;
    animation-delay: ${props => props.delay};
    width: ${props => props.size};
    height: ${props => props.size};
`;

interface Props {
    color?: string;
    size?: string;
    style?: any;
}

export const Spinner: React.FC<Props> = ({ color, size }) => {
    return (
        <Ring size={size} role="img" aria-busy="true" aria-live="polite">
            <Item delay="0s" color={color} size={size} />
            <Item delay="-0.45s" color={color} size={size} />
            <Item delay="-0.3s" color={color} size={size} />
            <Item delay="-0.15s" color={color} size={size} />
        </Ring>
    );
};

Spinner.defaultProps = {
    color: theme.colors.white,
    size: '51px',
};
