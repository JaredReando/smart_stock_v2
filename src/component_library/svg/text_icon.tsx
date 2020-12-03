import React, { SVGAttributes } from 'react';



const TextIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <rect x="2" y="2" width="16" height="2" rx="1" fill={color || "black"} />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 3L11 17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17L9 3L11 3Z"
                fill={color || "black"}
            />
        </svg>
    );
};

export default TextIcon;
