import React, { Component } from 'react';
import { withFirebase } from "../Firebase"
import Papa from 'papaparse';

import NunaStock from '../../helpers/nuna_stock';
import { fixedBins } from "../../constants/demo_data";
import RestockReport from "./restock_report";

const RESTOCK_REPORT_PATH = 'Companies/Nuna/restock_report';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
            restockReport: {},
            inventoryReport: {},
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
        this.props.firebase.users().off();
        this.props.firebase.db.ref('Companies/Nuna/restock_report').off()
    }


    readFile = () => {

    }

    handleFileInput = (event) => {
        event.preventDefault();
        const inventoryFile = event.target.files[0];
        const reader = new FileReader();
        //THIS WILL LOAD AFTER THE 'reader.readAsText' METHOD BELOW.
        reader.onload = (event) => {
            const data = event.target.result;
            const parsedInventoryCSV = Papa.parse(data, {header: true}).data;

            const nunaStock = new NunaStock(parsedInventoryCSV, fixedBins);
            // this.setState({restockReport: nunaStock.restockReportArray});

            this.setState({restockReport: nunaStock.restockReportObject});

            this.props.firebase.doOverwriteRestockReport(nunaStock.restockReportObject);
            console.log('inventory: ', nunaStock.inventoryReportObject);
            this.props.firebase.doOverwriteInventoryReport(nunaStock.inventoryReportObject);

            // console.log('nested: ', this.createRestockReportNestedObject(nunaStock.restockReport));

        };
        //THIS WILL LOAD BEFORE THE CODE ABOVE IS CALLED
        reader.readAsText(inventoryFile);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const searchString = this.refs.searchInput.value;

        const Firebase = this.props.firebase.db
            .ref('Companies')
            .child('Nuna')
            .child('inventory_report')
            .child(1)
            .child('ST2')
            .child(searchString)
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
                    onChange={this.handleFileInput}
                />

                <div>
                    <h1>Summary</h1>
                    {/*<h4>{`Records: ${this.state.restockReport.length}`}</h4>*/}
                </div>
                <form onSubmit={this.handleSubmit}>
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