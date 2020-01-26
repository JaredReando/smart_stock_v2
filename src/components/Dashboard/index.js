import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withAuthConsumer } from '../Session';
import { withFirebase } from '../Firebase';

import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import LandingPage from '../Landing';

import {
    Container,
    ComponentContainer
} from './dashboard.styles';

import Navigation from "../Navigation";

const RESTOCK_REPORT_PATH = 'Companies/Nuna/restock_report';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restockReport: {},
            inventoryReport: {},
        }
    }


    componentDidMount() {
        const Firebase = this.props.firebase;

        Firebase.db.ref(RESTOCK_REPORT_PATH).on('value', snapshot => {
            const restockReport = snapshot.val();
            this.setState({ restockReport: restockReport})
        });
        // restock_records.on('value', snapshot => {
        //     const firebaseRestockRecords = snapshot.val();
        //     this.props.dispatch(loadRestockRecords(firebaseRestockRecords))
        // })
    }

    componentWillUnmount() {
        this.props.firebase.db.ref('Companies/Nuna/restock_report').off()
    }


    readFile = () => {

    }

    handleRestockUpdate = (restockReportObject) => {
        this.setState({restockReport: restockReportObject})
    };

    render() {
        const {restockReport, inventoryReport} = this.state;
        return (
            <Container>
                <Navigation />
                <hr/>
                <ComponentContainer>
                    {/*using 'render' here instead of 'component' let's me pass in stateful values and
                    methods from this Dashboard component while letting these Route components be
                    Functional. I can pass 'Firebase' down by wrapping Dashboard and passing down as an FC prop.*/}
                    <Switch>
                        {/*<Route path={ROUTES.HOME} component={AdminPage}/>*/}
                        <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                        <Route path={ROUTES.LANDING} render={() => {
                            return (
                                <AdminPage
                                    restockReport={restockReport}
                                    handleRestockUpdate={this.handleRestockUpdate}
                                />
                            )}}
                        />
                        <Route path={ROUTES.ACCOUNT} component={AdminPage}/>
                        <Route path={ROUTES.HOME} component={AccountPage}/>
                    </Switch>
                </ComponentContainer>

            </Container>
        )
    }
}

export default withFirebase(withAuthConsumer(Dashboard));