import React from 'react';



interface Props extends React.SVGAttributes<SVGElement> {
    color?: string;
}
const AddFile: React.FC<Props> = ({ color, ...props }) => {

    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M18 8V16.25C18 16.6642 17.5523 17 17 17H3C2.44772 17 2 16.6642 2 16.25V8V8"
                stroke={color || "black"}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <rect x="9" y="2" width="2" height="10" fill={color || "black"} />
            <path
                d="M14.2426 7.99996L10 12.2426L5.75736 7.99996"
                stroke={color || "black"}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default AddFile;
