import React from 'react';
import { ButtonPanelWrapper, IconButton } from './vertical_icon_bar.styles';
import { AppIcon } from '../icons';
import { Row, Box } from '../../styles/layout';
import { AppText } from '../../styles/typography';
import { NavTab } from '../../../constants/types';

export interface Tab {
    title: string;
    iconName: any;
    position?: 'top' | 'bottom';
    component?: React.FC<any>;
    props?: any;
}

interface Props {
    tabs: NavTab[];
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
    // const [activeTabIndex, setActiveTabIndex] = useState(0);

    const renderTabs = (tabs: NavTab[], indexOffset = 0) => (
        <Box>
            {tabs.map((tab: NavTab, i: number) => {
                const index = i + indexOffset;
                const active = activeTabIndex === index;
                return (
                    <IconButton
                        role="button"
                        onClick={() => handleClick(index)}
                        key={tab.title}
                        active={active}
                        px={3}
                        // backgroundColor={activeTabColor}
                    >
                        <Row width="40px" justifyContent="center">
                            <AppIcon name={tab.iconName} size="medium" color={'white'} />
                        </Row>
                        <Box ml={2}>{tab.render()}</Box>
                    </IconButton>
                );
            })}
        </Box>
    );

    const topTabs = tabs.filter(tab => tab.position === 'top' || tab.position === undefined);
    const bottomTabs = tabs.filter(tab => tab.position === 'bottom');

    return (
        <ButtonPanelWrapper>
            <Row justifyContent="center" alignItems="center">
                <AppText size="large" color="light" bold>
                    SmartStock
                </AppText>
            </Row>
            {renderTabs(topTabs)}
            {renderTabs(bottomTabs, topTabs.length)}
        </ButtonPanelWrapper>
    );
};
