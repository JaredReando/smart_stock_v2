import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withAuthConsumer } from '../Session';
import { withFirebase } from '../Firebase';

import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import LandingPage from '../Landing';

import styled from 'styled-components';
import Navigation from "../Navigation";

class Dashboard extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Navigation />
                <hr/>
                <h1>Dashboard</h1>

                <Switch>
                    <Route path={ROUTES.HOME} component={AdminPage}/>
                    <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                    <Route path={ROUTES.ADMIN} component={AdminPage}/>
                    <Route path={ROUTES.ACCOUNT} component={AdminPage}/>
                    <Route path={ROUTES.LANDING} component={AccountPage}/>
                </Switch>

            </div>
        )
    }
}

export default withFirebase(withAuthConsumer(Dashboard));