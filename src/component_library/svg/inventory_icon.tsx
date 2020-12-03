import React, { SVGAttributes } from 'react';

const InventoryIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {
    return (
        <svg height={24} width={24} viewBox="0 0 64 64" x="0px" y="0px">
            <title>Inventory</title>
            <g>
                <path
                    fill={color || 'black'}
                    d="M61,2H57a1,1,0,0,0-1,1V4H8V3A1,1,0,0,0,7,2H3A1,1,0,0,0,2,3V61a1,1,0,0,0,1,1H7a1,1,0,0,0,1-1V60H56v1a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V21H60V60H58V4h2V15h2V3A1,1,0,0,0,61,2ZM41,38h4v3.132l-1.445-.964a1,1,0,0,0-1.11,0L41,41.132Zm-1.472,5.882a1,1,0,0,0,1.027-.05L43,42.2l2.445,1.63A1,1,0,0,0,47,43V38h3V54H36V38h3v5A1,1,0,0,0,39.528,43.882ZM51,36H35a1,1,0,0,0-1,1V54H30V37a1,1,0,0,0-1-1H13a1,1,0,0,0-1,1V54H8V34H56V54H52V37A1,1,0,0,0,51,36ZM19,38h4v3.132l-1.445-.964a1,1,0,0,0-1.11,0L19,41.132Zm-1.472,5.882a1,1,0,0,0,1.027-.05L21,42.2l2.445,1.63A1,1,0,0,0,25,43V38h3V54H14V38h3v5A1,1,0,0,0,17.528,43.882ZM56,32H8V30H56ZM30,14h4v3.132l-1.445-.964a1,1,0,0,0-1.11,0L30,17.132Zm-1.472,5.882a1,1,0,0,0,1.027-.05L32,18.2l2.445,1.63A1,1,0,0,0,36,19V14H46V28H18V14H28v5A1,1,0,0,0,28.528,19.882ZM48,28V13a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1V28H8V10H56V28ZM56,6V8H8V6ZM6,60H4V4H6V60Zm2-2V56H56v2Z"
                />
                <rect fill={color || 'black'} x="60" y="17" width="2" height="2" />
                <rect fill={color || 'black'} x="16" y="50" width="3" height="2" />
                <rect fill={color || 'black'} x="16" y="46" width="3" height="2" />
                <rect fill={color || 'black'} x="23" y="50" width="3" height="2" />
                <rect fill={color || 'black'} x="23" y="46" width="3" height="2" />
                <rect fill={color || 'black'} x="20" y="24" width="4" height="2" />
                <rect fill={color || 'black'} x="20" y="20" width="4" height="2" />
                <rect fill={color || 'black'} x="40" y="24" width="4" height="2" />
                <rect fill={color || 'black'} x="40" y="20" width="4" height="2" />
                <rect fill={color || 'black'} x="38" y="50" width="3" height="2" />
                <rect fill={color || 'black'} x="38" y="46" width="3" height="2" />
                <rect fill={color || 'black'} x="45" y="50" width="3" height="2" />
                <rect fill={color || 'black'} x="45" y="46" width="3" height="2" />
            </g>
        </svg>
    );
};

export default InventoryIcon;
