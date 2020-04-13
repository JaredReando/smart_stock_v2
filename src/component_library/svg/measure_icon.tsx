import React, { SVGAttributes } from 'react';



const MeasureIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <mask id="path-1-inside-1" fill="white">
                <rect
                    x="0.413879"
                    y="14.5248"
                    width="20"
                    height="7"
                    rx="1"
                    transform="rotate(-45 0.413879 14.5248)"
                />
            </mask>
            <rect
                x="0.413879"
                y="14.5248"
                width="20"
                height="7"
                rx="1"
                transform="rotate(-45 0.413879 14.5248)"
                stroke={color || "black"}
                strokeWidth="3"
                mask="url(#path-1-inside-1)"
            />
            <rect
                x="3.41907"
                y="12.9338"
                width="1.5"
                height="3"
                transform="rotate(-45 3.41907 12.9338)"
                fill={color || "black"}
            />
            <rect
                x="5.54041"
                y="10.8125"
                width="1.5"
                height="3"
                transform="rotate(-45 5.54041 10.8125)"
                fill={color || "black"}
            />
            <rect
                x="7.66171"
                y="8.69114"
                width="1.5"
                height="3"
                transform="rotate(-45 7.66171 8.69114)"
                fill={color || "black"}
            />
            <rect
                x="9.78302"
                y="6.56982"
                width="1.5"
                height="3"
                transform="rotate(-45 9.78302 6.56982)"
                fill={color || "black"}
            />
            <rect
                x="11.9044"
                y="4.4485"
                width="1.5"
                height="3"
                transform="rotate(-45 11.9044 4.4485)"
                fill={color || "black"}
            />
        </svg>
    );
};

export default MeasureIcon;
