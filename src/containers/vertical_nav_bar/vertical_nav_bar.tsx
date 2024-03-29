import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { VerticalIconBar } from '../../component_library/components/vertical_icon_bar/vertical_icon_bar';
import { Container } from './vertical_nav_bar.styles';
import { theme } from '../../component_library/styles/theme';
import { NavTab } from '../../constants/types';
import { useFirebase } from '../../hooks/use_firebase_context';
import { AppText } from '../../component_library/styles/typography';

const VerticalNavBar: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const firebase = useFirebase();

    const tempTabs: NavTab[] = [
        {
            iconName: 'inventory',
            title: 'Inventory',
            path: '/',
            render: () => (
                <AppText bold color="light">
                    Inventory
                </AppText>
            ),
            onClick: () => history.push('/'),
        },
        {
            iconName: 'forklift',
            title: 'Restock Report',
            path: '/restock_report',
            render: () => (
                <AppText bold color="light">
                    Restock
                </AppText>
            ),
            onClick: () => history.push('/restock_report'),
        },
        {
            iconName: 'settings',
            title: 'Fixed Bins',
            path: '/fixed_bins',
            render: () => (
                <AppText bold color="light">
                    Fixed Bins
                </AppText>
            ),
            onClick: () => history.push('/fixed_bins'),
        },
        {
            iconName: 'user',
            title: 'Logout',
            position: 'bottom',
            render: () => (
                <AppText bold color="light">
                    Sign Out
                </AppText>
            ),
            onClick: () => {
                firebase.signOut();
                history.push('/login');
            },
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
