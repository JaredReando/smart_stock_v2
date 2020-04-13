import React, { SVGAttributes } from 'react';



const ItemsIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M12 12C12 14.2091 10.2091 16 8 16C5.79086 16 4 14.2091 4 12C4 9.79086 5.79086 8 8 8C10.2091 8 12 9.79086 12 12Z"
                stroke={color || "black"}
                strokeWidth="2"
            />
            <rect
                x="9"
                y="4"
                width="7"
                height="7"
                stroke={color || "black"}
                strokeWidth="2"
            />
            <rect x="9" y="9" width="2" height="2" fill={color || "black"} />
        </svg>
    );
};

export default ItemsIcon;
