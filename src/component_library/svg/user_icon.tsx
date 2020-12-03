import React, { SVGAttributes } from 'react';

const UserIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 282 282"
            x="0px"
            y="0px"
            fillRule="evenodd"
            clipRule="evenodd"
            {...props}
        >
            <g>
                <path
                    fill={color || 'black'}
                    d="M141 0c78,0 141,63 141,141 0,78 -63,141 -141,141 -78,0 -141,-63 -141,-141 0,-78 63,-141 141,-141zm0 20c-67,0 -121,54 -121,121 0,67 54,121 121,121 67,0 121,-54 121,-121 0,-67 -54,-121 -121,-121z"
                />
                <path
                    fill={color || 'black'}
                    d="M141 72c23,0 41,19 41,41 0,23 -18,42 -41,42 -23,0 -41,-19 -41,-42 0,-22 18,-41 41,-41z"
                />
                <path
                    fill={color || 'black'}
                    d="M141 170c32,0 60,18 74,45 -19,19 -45,30 -74,30 -29,0 -55,-11 -74,-30 14,-27 42,-45 74,-45z"
                />
            </g>
        </svg>
    );
};

export default UserIcon;
