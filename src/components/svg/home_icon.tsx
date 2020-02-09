import React, { SVGAttributes } from 'react';



const HomeIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 22a1 1 0 001-1V9.412a1 1 0 00-.344-.754l-7-6.087a1 1 0 00-1.312 0l-7 6.087A1 1 0 004 9.412V21a1 1 0 001 1h4a1 1 0 001-1v-6h4v6a1 1 0 001 1h4zM18 9.868L12 4.65 6 9.868V20h2v-6a1 1 0 011-1h6a1 1 0 011 1v6h2V9.868z"
                fill={color || "black"}
            />
        </svg>
    );
};

export default HomeIcon;
