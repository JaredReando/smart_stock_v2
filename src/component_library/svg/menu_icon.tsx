import React, { SVGAttributes } from 'react';



const MenuIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path
                d="M13 24H27"
                stroke={color || "black"}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M13 20H27"
                stroke={color || "black"}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M13 16H27"
                stroke={color || "black"}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default MenuIcon;
