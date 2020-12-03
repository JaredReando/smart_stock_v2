import React, { SVGAttributes } from 'react';
import * as icons from '../../svg';
export type IconNames = keyof typeof icons;

export interface Props extends SVGAttributes<SVGElement> {
    name: IconNames;
    size: 'small' | 'medium' | 'large';
    color?: string;
}
const iconSizes = {
    small: 0.75,
    medium: 1.0,
    large: 1.5,
};

export const AppIcon: React.FC<Props> = ({ name, size = 'medium', ...props }) => {
    const scale = iconSizes[size];
    //@ts-ignore
    const Icon = icons[name];
    return <Icon {...props} style={{ transform: `scale(${scale})` }} />;
};

