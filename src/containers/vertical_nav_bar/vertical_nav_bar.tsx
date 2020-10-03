import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { VerticalIconBar } from '../../component_library/components/vertical_icon_bar/vertical_icon_bar';
import { Container } from './vertical_nav_bar.styles';
import { Tab } from '../../component_library/components/vertical_icon_bar/vertical_icon_bar';
import { theme } from '../../component_library/styles/theme';

interface NavTab extends Tab {
    path?: string;
}

const tempTabs: NavTab[] = [
    {
        iconName: 'home',
        title: 'Admin Home',
        path: '/admin',
    },
    {
        iconName: 'settings',
        title: 'Restock Report',
        path: '/admin/restock_report',
    },
    {
        iconName: 'developer',
        title: 'Fixed Bins',
        path: '/admin/fixed_bins',
    },
    {
        iconName: 'help',
        title: 'Help',
        position: 'bottom',
    },
];

interface Props {}

const VerticalNavBar: FC<Props> = () => {
    const getTabs = (): NavTab[] => {
        return [...tempTabs];
    };

    const tabs = getTabs();
    const history = useHistory();
    const location = useLocation();

    const getCurrentTabIndex = () => {
        //checks 'path' prop of tab. If === current location, that becomes active tab.
        for (let i in tabs) {
            if (!!tabs[i].path && tabs[i].path === location.pathname) return parseInt(i);
        }
        //if no match is found, useState sets activeTab to 'null'
        return null;
    };

    const handleIconClick = (index: number) => {
        const tab = tabs[index];
        if (tab.path) {
            return history.push(tabs[index].path!);
        }
    };

    const handleSignOut = () => {
        history.push('/');
    };

    return (
        <Container>
            <VerticalIconBar
                tabs={tabs}
                handleClick={handleIconClick}
                activeTabIndex={getCurrentTabIndex()}
                activeTabColor={theme.colors.lightGrey}
                activeIconColor={theme.colors.black}
            />
        </Container>
    );
};

export default VerticalNavBar;
