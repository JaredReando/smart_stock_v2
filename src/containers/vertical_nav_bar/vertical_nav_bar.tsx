import React, { FC, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {VerticalIconBar} from "../../components/vertical_icon_bar/vertical_icon_bar";
import { Container } from './vertical_nav_bar.styles';
import { Tab } from "../../components/vertical_icon_bar/vertical_icon_bar";
import { theme } from "../../styles/theme";

interface NavTab extends Tab {
    path?: string;
}

const tempTabs: NavTab[] = [
    {
        iconName: 'home',
        title: 'Home',
        path: '/admin/home',
    },
    {
        iconName: 'settings',
        title: 'Settings',
        path: '/admin/settings',
    },
    {
        iconName: 'text',
        title: 'Text',
        path: '/admin/hello',
    },
    {
        iconName: 'log',
        title: 'Log',
        path: '/agent/log',
    },
    {
        iconName: 'developer',
        title: 'Developer',
        path: '/admin/developer',
    },
    {
        iconName: 'help',
        title: 'Help',
        position: 'bottom',
    },
];

interface Props {
}

const VerticalNavBar: FC<Props> = () => {
    const [profileShown, setProfileShown] = useState(false);

    const getTabs = (): NavTab[] => {
        const profileTab: NavTab = {
            iconName: 'gps',
            title: 'jared reando',
        };

        return [profileTab, ...tempTabs];
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
            console.log('gone to: ', tabs[index].path);
            return history.push(tabs[index].path!)
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
