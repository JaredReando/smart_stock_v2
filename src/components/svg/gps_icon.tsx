import React, { SVGAttributes } from 'react';



const GPSIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M10 18C9.80778 18 9.57747 17.9653 9.38889 17.8475C9.28908 17.7851 9.20163 17.706 9.13067 17.614C7.705 15.7646 6.50734 13.9991 5.53768 12.3175C3.79722 9.29915 3.19934 5.94678 5.53768 3.69148C6.71799 2.55308 8.35638 1.98931 9.9904 2.00015"
                stroke={color || "black"}
                strokeWidth="2"
            />
            <path
                d="M12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8Z"
                stroke={color || "black"}
                strokeWidth="2"
            />
            <path
                d="M9.85896 17.9999C9.85896 17.9999 9.80778 17.9999 10 17.9999C10.1922 17.9999 10.0877 17.9982 10.1335 17.9942C10.293 17.9803 10.4646 17.9389 10.6111 17.8474C10.7109 17.785 10.7984 17.7059 10.8693 17.6139C12.295 15.7645 13.4927 13.999 14.4623 12.3174C16.2028 9.29906 16.8007 5.94669 14.4623 3.69139C13.282 2.55299 11.493 1.98906 9.85896 1.99991"
                stroke={color || "black"}
                strokeWidth="2"
            />
        </svg>
    );
};

export default GPSIcon;
