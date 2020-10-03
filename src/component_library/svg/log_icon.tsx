import React, { SVGAttributes } from 'react';



const LogIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.945 7.826c.467-.459.127-1.171-.279-2.021-.475-.997-1.764-1.374-1.764-1.374s-.516 1.239-.04 2.235c.458.961.833 1.747 1.668 1.416l.609.939-.54.979H4.825C2.713 10 1 12.239 1 15s1.713 5 3.826 5h14.348C21.287 20 23 17.761 23 15s-1.713-5-3.826-5h-5.367l.903-1.635c-.394-.848-.725-1.124-1.657-1l-.647 1.172-.461-.711zM4.348 19c1.32 0 2.391-1.79 2.391-4s-1.07-4-2.391-4c-1.32 0-2.391 1.79-2.391 4s1.07 4 2.39 4zm2.32-8.075c5.429 1.11 8.005.826 12.434 0l.957 1c-.487.061-.947.123-1.388.182-3.46.463-5.775.772-11.047-.182l-.957-1zM19.173 19H6.739l.478-.5c1.964.334 5.568.22 11.508.03l.927-.03-.478.5zm-11.41-4h13.323v1c-2.953-.818-4.979-1.143-13.323 0v-1zm8.544-1.681c-4.753.347-8.536.623-8.544-.313V14h13.323v-1c-1.631.088-3.255.207-4.78.319zM5.444 14.332c.211.608.339.974.339.322C5.783 13.189 5.14 12 4.348 12c-.793 0-1.913 1.189-1.913 2.655 0 .563.07.375.239-.073.27-.718.79-2.104 1.674-2.14.44 0 .833 1.134 1.096 1.892z"
                fill={color || "black"}
            />
        </svg>
    );
};

export default LogIcon;