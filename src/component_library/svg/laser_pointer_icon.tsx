import React, { SVGAttributes } from 'react';



const LaserPointerIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.25815 18.006C4.84394 17.4202 4.84394 16.4704 4.25815 15.8847C3.67237 15.2989 2.72262 15.2989 2.13683 15.8847C1.55105 16.4704 1.55105 17.4202 2.13683 18.006C2.72262 18.5918 3.67237 18.5918 4.25815 18.006Z"
                fill={color || "black"}
            />
            <path
                d="M8.24234 9.13135L14.9126 2.46111L17.539 5.08751L10.8687 11.7577L8.24234 9.13135Z"
                stroke={color || "black"}
                strokeWidth="2"
            />
            <rect
                x="7.1668"
                y="11.823"
                width="0.47619"
                height="1.42857"
                transform="rotate(-45 7.1668 11.823)"
                fill={color || "black"}
                stroke={color || "black"}
                strokeWidth="0.47619"
            />
            <rect
                x="5.82012"
                y="13.1699"
                width="0.47619"
                height="1.42857"
                transform="rotate(-45 5.82012 13.1699)"
                fill={color || "black"}
                stroke={color || "black"}
                strokeWidth="0.47619"
            />
            <rect
                x="4.47295"
                y="14.5168"
                width="0.47619"
                height="1.42857"
                transform="rotate(-45 4.47295 14.5168)"
                fill={color || "black"}
                stroke={color || "black"}
                strokeWidth="0.47619"
            />
        </svg>
    );
};

export default LaserPointerIcon;
