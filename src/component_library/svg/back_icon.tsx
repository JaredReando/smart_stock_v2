import React from 'react';

interface Props {
    color?: string;
}

const BackIcon: React.FC<Props> = ({ color, ...props }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <rect
                x="20"
                y="11"
                width="2"
                height="13"
                transform="rotate(90 20 11)"
                fill={color || '#2C2C2C'}
            />
            <path
                d="M13.3033 5.74694L11.7782 4.22182L4.00005 12L11.7782 19.7782L13.3033 18.2531L7.05029 12L13.3033 5.74694Z"
                fill={color || '#2C2C2C'}
            />
        </svg>
    );
};

export default BackIcon;
