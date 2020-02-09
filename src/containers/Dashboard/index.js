import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountPage from '../../pages/Account';
import AdminPage from '../../pages/Admin';
import Client from '../../pages/Client';

import { Container, ComponentContainer } from './dashboard.styles';


const RESTOCK_REPORT_PATH = 'Companies/Nuna/restock_report';
const LAST_UPDATED_PATH = 'Companies/Nuna/last_updated';
const FIXED_BIN_PATH = 'Companies/Nuna/fixed_bins';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restockReport: {},
      inventoryReport: {},
      lastUpdated: new Date(),
      fixedBins: {},
    };
  }

  componentDidMount() {
    const Firebase = this.props.firebase;

    Firebase.db.ref(RESTOCK_REPORT_PATH).on('value', snapshot => {
      const restockReport = snapshot.val();
      this.setState({ restockReport: restockReport });
    });
    Firebase.db.ref(LAST_UPDATED_PATH).on('value', snapshot => {
      const lastUpdated = snapshot.val();
      this.setState({ lastUpdated: new Date(lastUpdated) });
    });
    Firebase.db.ref(FIXED_BIN_PATH).on('value', snapshot => {
      const fixedBins = snapshot.val();
      this.setState({ fixedBins: fixedBins });
    });
  }

  componentWillUnmount() {
    this.props.firebase.db.ref('Companies/Nuna/restock_report').off();
  }

  readFile = () => {};

  handleRestockUpdate = restockReportObject => {
    this.setState({ restockReport: restockReportObject });
  };

  render() {
    const {
      restockReport,
      inventoryReport,
      lastUpdated,
      fixedBins,
    } = this.state;
    return (
      <Container>
        <hr />
        <ComponentContainer>
          {/*using 'render' here instead of 'component' let's me pass in stateful values and
                    methods from this Dashboard component while letting these Route components be
                    Functional. I can pass 'Firebase' down by wrapping Dashboard and passing down as an FC prop.*/}
          <Switch>
            <Route
              path={ROUTES.CLIENT}
              render={props => {
                return <Client restockReport={restockReport} />;
              }}
            />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route
              exact
              path={ROUTES.HOME}
              render={props => {
                return (
                  <AdminPage
                    restockReport={restockReport}
                    lastUpdated={lastUpdated}
                    fixedBins={fixedBins}
                    handleRestockUpdate={this.handleRestockUpdate}
                  />
                );
              }}
            />
            <Route path={ROUTES.ACCOUNT} component={AdminPage} />
            {/*<Route exact path={ROUTES.HOME} component={AccountPage}/>*/}
          </Switch>
        </ComponentContainer>
      </Container>
    );
  }
}

export default Dashboard;
