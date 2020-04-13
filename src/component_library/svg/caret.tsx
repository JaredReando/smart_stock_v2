import React, { SVGAttributes } from 'react';



const Caret: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg
            width="24"
            height="24"
            opacity="0.7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.74694 7.69666L4.22182 9.22178L12 17L19.7782 9.22178L18.253 7.69666L12 13.9497L5.74694 7.69666Z"
                fill={color || "black"}
            />
        </svg>
    );
};

export default Caret;
