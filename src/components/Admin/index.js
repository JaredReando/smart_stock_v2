import React, { Component } from 'react';
import { withFirebase } from "../Firebase"
import Papa from 'papaparse';

import NunaStock from '../../helpers/nuna_stock';
import { fixedBins } from "../../constants/demo_data";
import RestockReport from "./restock_report";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
            restockReport: [],
        }
    }

    componentDidMount() {
        const Firebase = this.props.firebase;
        this.setState({loading: true});

        Firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });

        Firebase.db.ref('restock_report').on('value', snapshot => {
            const restockReport = snapshot.val();
            this.setState({ restockReport: restockReport})
        });
        // restock_records.on('value', snapshot => {
        //     const firebaseRestockRecords = snapshot.val();
        //     this.props.dispatch(loadRestockRecords(firebaseRestockRecords))
        // })
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    testNunaClass = (event) => {
        event.preventDefault();
        const inventoryFile = event.target.files[0];
        const reader = new FileReader();
        //THIS WILL LOAD AFTER THE 'reader.readAsText' METHOD BELOW.
        reader.onload = (event) => {
            const data = event.target.result;
            const parsedInventoryCSV = Papa.parse(data, {header: true}).data;
            const nunaStock = new NunaStock(parsedInventoryCSV, fixedBins);
            this.setState({restockReport: nunaStock.restockReport});
            this.props.firebase.doOverwriteRestockReport(nunaStock.restockReport);
            const newFifoInventoryReport = nunaStock.getFifoSortedInventory();
            const newFixedBinRestockReport = nunaStock.getFixedBinRestockReport();
        };
        //THIS WILL LOAD BEFORE THE CODE ABOVE IS CALLED
        reader.readAsText(inventoryFile);
    };
    handleSubtmit = (e) => {
        e.preventDefault();
        const Firebase = this.props.firebase.db
            .ref('Companies')
            .child('Nuna')
            .child('restock_report')
            .orderByChild('sourceBin')
            .once('value', snapshot => {
                console.log('results: ', snapshot.val())

            })
        // debugger;
    };

    render() {
        const { users, loading } = this.state;
        return (
            <div>
                <h1>Admin</h1>
                {loading && <div>Loading ...</div>}
                <UserList users={users} />

                <input
                    type='file'
                    onChange={this.testNunaClass}
                />

                <div>
                    <h1>Summary</h1>
                    <h4>{`Records: ${this.state.restockReport.length}`}</h4>
                </div>
                <form onSubmit={this.handleSubtmit}>
                    <input
                        ref='searchInput'
                        type='text'
                        placeholder='Search bin names...'
                    />
                    <button type='submit'>Search</button>
                </form>

               <RestockReport
                   report={this.state.restockReport}
               />
            </div>
        );
    }
}
const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
        <span>
          <strong>ID: </strong> {user.uid }
        </span>
                <span>
          <strong> E-Mail:</strong> {user.email }
        </span>
                <span>
          <strong> Username:</strong> {user.username }
        </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(Admin);