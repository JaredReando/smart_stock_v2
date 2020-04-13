import React, { SVGAttributes } from 'react';



const SearchGlass: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width={25} height={25} viewBox="0 0 25 25" fill="none" {...props}>
            <path d="M.896 1h23.843v24H.896V1z" fill="#EEE" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.48 12.941a6.002 6.002 0 00-9.134-7.72 6 6 0 007.72 9.135l.75.75a1 1 0 00.258.966l4.603 4.603a1 1 0 001.415 0l.707-.707a1 1 0 000-1.414l-4.604-4.604a1 1 0 00-.966-.259l-.75-.75zm-2.063-.648A4 4 0 106.76 6.636a4 4 0 005.657 5.657z"
                fill={color || 'grey'}
            />
        </svg>
    );
};

export default SearchGlass;
