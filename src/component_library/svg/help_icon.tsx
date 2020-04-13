import React, { SVGAttributes } from 'react';



const HelpIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {

    return (
        <svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"
                fill={color || "black"}
            />
            <path
                d="M11.117 15.03h1.731c-.24-2.215 2.358-2.85 2.358-5.03 0-1.871-1.312-2.97-3.095-2.97-1.285 0-2.151.515-2.905 1.39l1.14 1.1c.497-.55 1.063-.893 1.765-.893.875 0 1.389.55 1.389 1.373 0 1.545-2.743 2.524-2.383 5.03zM13 17a1 1 0 11-2 0 1 1 0 012 0z"
                fill={color || "black"}
            />
        </svg>
    );
};

export default HelpIcon;
