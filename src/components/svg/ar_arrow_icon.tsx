import React, { SVGAttributes } from 'react';



const ARArrowIcon: React.FC<SVGAttributes<SVGElement>> = ({ color, ...props }) => {


    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" {...props}>
            <mask id="path-1-inside-1" fill="white">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.78518 5.64968C6.10027 5.52756 5.50305 6.12478 5.62517 6.80969L7.76429 18.8069C7.90616 19.6026 8.88438 19.91 9.45587 19.3385L11.5565 17.2379L16.5063 22.1876C16.8968 22.5781 17.53 22.5781 17.9205 22.1876L22.1631 17.945C22.5536 17.5545 22.5536 16.9213 22.1631 16.5308L17.2134 11.581L19.314 9.48042C19.8855 8.90893 19.5781 7.93071 18.7824 7.78884L6.78518 5.64968Z"
                />
            </mask>
            <path
                d="M5.62517 6.80969L3.65623 7.16075L3.65623 7.16075L5.62517 6.80969ZM6.78518 5.64968L6.43411 7.61863L6.43411 7.61863L6.78518 5.64968ZM7.76429 18.8069L5.79534 19.158L5.79534 19.158L7.76429 18.8069ZM9.45587 19.3385L8.04166 17.9243L9.45587 19.3385ZM11.5565 17.2379L12.9707 15.8237L11.5565 14.4094L10.1423 15.8237L11.5565 17.2379ZM17.2134 11.581L15.7992 10.1668L14.3849 11.581L15.7992 12.9952L17.2134 11.581ZM18.7824 7.78884L18.4313 9.75779H18.4313L18.7824 7.78884ZM7.59412 6.45862C7.71624 7.14354 7.11902 7.74075 6.43411 7.61863L7.13625 3.68074C5.08152 3.31437 3.28987 5.10602 3.65623 7.16075L7.59412 6.45862ZM9.73324 18.4559L7.59412 6.45862L3.65623 7.16075L5.79534 19.158L9.73324 18.4559ZM8.04166 17.9243C8.61316 17.3528 9.59137 17.6602 9.73324 18.4559L5.79534 19.158C6.22095 21.545 9.1556 22.4672 10.8701 20.7527L8.04166 17.9243ZM10.1423 15.8237L8.04166 17.9243L10.8701 20.7527L12.9707 18.6521L10.1423 15.8237ZM17.9205 20.7734L12.9707 15.8237L10.1423 18.6521L15.092 23.6018L17.9205 20.7734ZM16.5063 20.7734C16.8968 20.3829 17.53 20.3829 17.9205 20.7734L15.092 23.6018C16.2636 24.7734 18.1631 24.7734 19.3347 23.6018L16.5063 20.7734ZM20.7489 16.5308L16.5063 20.7734L19.3347 23.6018L23.5773 19.3592L20.7489 16.5308ZM20.7489 17.945C20.3584 17.5545 20.3584 16.9213 20.7489 16.5308L23.5773 19.3592C24.7489 18.1876 24.7489 16.2881 23.5773 15.1166L20.7489 17.945ZM15.7992 12.9952L20.7489 17.945L23.5773 15.1166L18.6276 10.1668L15.7992 12.9952ZM17.8998 8.06621L15.7992 10.1668L18.6276 12.9952L20.7282 10.8946L17.8998 8.06621ZM18.4313 9.75779C17.6357 9.61592 17.3283 8.63769 17.8998 8.06621L20.7282 10.8946C22.4427 9.18016 21.5205 6.24551 19.1335 5.8199L18.4313 9.75779ZM6.43411 7.61863L18.4313 9.75779L19.1335 5.8199L7.13625 3.68074L6.43411 7.61863Z"
                fill={color || "black"}
                mask="url(#path-1-inside-1)"
            />
        </svg>
    );
};

export default ARArrowIcon;
