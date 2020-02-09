import React, { SVGAttributes } from 'react';



const FlashlightIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M15.0518 15H14L10 13.0378H2.85714C2.38376 13.0378 2 12.6647 2 12.2044V7.87219C2 7.41196 2.38376 7.03886 2.85714 7.03886H10L14 5H15.0518"
                stroke={color || "black"}
                strokeWidth="2"
            />
            <path d="M14 5H18V15H14" stroke={color || "black"} strokeWidth="2" />
            <rect x="14" y="5" width="1.5" height="11" fill={color || "black"} />
        </svg>
    );
};

export default FlashlightIcon;
