import React, { SVGAttributes } from 'react';



const CallMuteIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <rect
                x="7.375"
                y="17.375"
                width="5.25"
                height="0.75"
                rx="0.375"
                fill="#FAFAFA"
                stroke={color || "black"}
                strokeWidth="0.75"
            />
            <rect
                x="9.625"
                y="15.375"
                width="0.75"
                height="1.25"
                fill="#FAFAFA"
                stroke={color || "black"}
                strokeWidth="0.75"
            />
            <rect
                x="6.75"
                y="1.75"
                width="6.5"
                height="10.5"
                rx="3.25"
                stroke={color || "black"}
                strokeWidth="1.5"
            />
            <path
                d="M16 8.04698V8.63192C16 12.1489 13.3137 15 10 15C6.68629 15 4 12.1489 4 8.63192V8"
                stroke={color || "black"}
                strokeWidth="1.5"
            />
            <path
                d="M15.8679 2.18285C15.3797 1.69469 14.5882 1.69469 14.1001 2.18285L2.43283 13.8501C1.94468 14.3383 1.94468 15.1297 2.43283 15.6179C2.92099 16.106 3.71245 16.106 4.2006 15.6179L15.8679 3.95062C16.356 3.46246 16.356 2.67101 15.8679 2.18285Z"
                stroke="#FAFAFA"
                fill={color || "black"}
            />
        </svg>
    );
};

export default CallMuteIcon;
