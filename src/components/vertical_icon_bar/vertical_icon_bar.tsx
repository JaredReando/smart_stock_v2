import React from 'react';
import { ButtonPanelWrapper, IconButton, Container } from './vertical_icon_bar.styles';
import {AppIcon} from "../icons";

export interface Tab {
    title: string;
    iconName: any;
    position?: 'top' | 'bottom';
    component?: React.FC<any>;
    props?: any;
}

interface Props {
    tabs: Tab[];
    handleClick: (tabIndex: number) => void;
    activeTabIndex: number | null;
    activeTabColor?: string;
    activeIconColor?: string;
    iconSize?: number;
}

export const VerticalIconBar: React.FC<Props> = ({
     tabs,
     handleClick,
     activeTabIndex,
     activeTabColor,
     activeIconColor,
 }) => {
    const renderTabs = (tabs: Tab[], indexOffset = 0) => (
        <Container>
            {tabs.map((tab: Tab, i: number) => {
                const index = i + indexOffset;
                const active = activeTabIndex === index;
                return (
                    <IconButton
                        role="button"
                        onClick={() => handleClick(index)}
                        key={tab.title}
                        active={active}
                        backgroundColor={activeTabColor}
                    >
                        <AppIcon
                            name={tab.iconName}
                            size="medium"
                            color={'white'}
                        />
                    </IconButton>
                );
            })}
        </Container>
    );

    const topTabs = tabs.filter(tab => tab.position === 'top' || tab.position === undefined);
    const bottomTabs = tabs.filter(tab => tab.position === 'bottom');

    return (
        <ButtonPanelWrapper>
            {renderTabs(topTabs)}
            {renderTabs(bottomTabs, topTabs.length)}
        </ButtonPanelWrapper>
    );
};
