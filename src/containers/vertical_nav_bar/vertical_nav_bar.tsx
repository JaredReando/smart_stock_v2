import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { VerticalIconBar } from '../../component_library/components/vertical_icon_bar/vertical_icon_bar';
import { Container } from './vertical_nav_bar.styles';
import { theme } from '../../component_library/styles/theme';
import { NavTab } from '../../constants/types';
import { useFirebase } from '../../hooks/use_firebase_context';

const VerticalNavBar: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const firebase = useFirebase();

    const tempTabs: NavTab[] = [
        {
            iconName: 'home',
            title: 'Admin Home',
            path: '/admin',
            onClick: () => history.push('/admin'),
        },
        {
            iconName: 'settings',
            title: 'Restock Report',
            path: '/admin/restock_report',
            onClick: () => history.push('/admin/restock_report'),
        },
        {
            iconName: 'developer',
            title: 'Fixed Bins',
            path: '/admin/fixed_bins',
            onClick: () => history.push('/admin/fixed_bins'),
        },
        {
            iconName: 'help',
            title: 'Help',
            position: 'bottom',
            onClick: () => firebase.signOut(),
        },
    ];
    const getTabs = (): NavTab[] => {
        return [...tempTabs];
    };
    const tabs = getTabs();
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
        if (tab.onClick) {
            tab.onClick();
        }
    };

    // const handleSignOut = () => {
    //     history.push('/');
    // };

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
