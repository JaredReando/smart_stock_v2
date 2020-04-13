import React, { SVGAttributes } from 'react';



const DeveloperIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M8.839 15.632v-2.23L5.873 11.84l-2.075-1.103v-.092L5.873 9.54l2.966-1.563v-2.23L2 9.724v1.931l6.839 3.977zM9.54 22h1.2l3.58-20h-1.199l-3.58 20zM15.161 15.632L22 11.655v-1.93l-6.839-3.978v2.23l2.966 1.563 2.075 1.104v.092l-2.075 1.103-2.966 1.563v2.23z"
                fill={color || "black"}
            />
        </svg>
    );
};

export default DeveloperIcon;
