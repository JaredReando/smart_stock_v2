import React, {useState} from 'react';

import { withFirebase } from "../Firebase"
import Papa from 'papaparse';
import NewReportModal from '../Modals/new_report_modal';
import NunaStock from '../../helpers/nuna_stock';
import { fixedBins } from "../../constants/demo_data";
import RestockReport from "./restock_report";
import {
    Container,
    ReportContainer,
    DashContainer
} from './admin.styles';

const Admin = ({
                   restockReport,
                   inventoryReport,
                    lastUpdated = new Date(),
                   handleRestockUpdate,
                   firebase
}) => {

    const handleFileInput = (event) => {
        event.preventDefault();
        const inventoryFile = event.target.files[0];
        const reader = new FileReader();
        //THIS WILL LOAD AFTER THE 'reader.readAsText' METHOD BELOW.
        reader.onload = (event) => {
            const data = event.target.result;
            const parsedInventoryCSV = Papa.parse(data, {header: true}).data;

            const nunaStock = new NunaStock(parsedInventoryCSV, fixedBins);

            handleRestockUpdate(nunaStock.restockReportObject);

            firebase.doOverwriteRestockReport(nunaStock.restockReportObject);
            firebase.doOverwriteInventoryReport(nunaStock.inventoryReportObject);
            firebase.doOverwriteLastUpdated();

            // console.log('nested: ', this.createRestockReportNestedObject(nunaStock.restockReport));

        };
        //THIS WILL LOAD BEFORE THE CODE ABOVE IS CALLED
        reader.readAsText(inventoryFile);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const searchString = this.refs.searchInput.value;
    //     //TODO: figure out how to search for Bin/SU/Material values across all Firebase nodes without high cost super-searching.
    //     const Firebase = firebase.db
    //         .ref('Companies')
    //         .child('Nuna')
    //         .child('inventory_report')
    //         .child(1)
    //         .child('ST2')
    //         .child(searchString)
    //         .once('value', snapshot => {
    //             console.log('results: ', snapshot.val())
    //
    //         })
    // };

    let notFound, complete, incomplete, recordCount = 'N/A';

    if (restockReport) {
        recordCount = Object.keys(restockReport).length;
        notFound = Object.keys(restockReport).reduce((value, recordKey) => {
            const record = restockReport[recordKey];
            if (record.isMissing) {
                value += 1;
            }
            return value
        }, 0);

        complete = Object.keys(restockReport).reduce((value, recordKey) => {
            const record = restockReport[recordKey];
            if (record.isCompleted) {
                value += 1;
            }
            return value;
        }, 0);

        incomplete = Object.keys(restockReport).reduce((value, recordKey) => {
            const record = restockReport[recordKey];
            if (!record.isCompleted && !record.isMissing) {
                value += 1;
            }
            return value;
        }, 0);

    }

    const [showModal, setShowModal] = useState(false);

    return (
        <Container>
            {showModal && (
                <NewReportModal
                    handleUpload={handleFileInput}
                    handleClick={() => setShowModal(false)}
                />
            )}
            <DashContainer>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        // alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <div>
                        <h3>Records: {recordCount}</h3>
                        <h3>Complete: {complete}</h3>
                        <h3>Incomplete: {incomplete}</h3>
                        <h3>Not Found: {notFound}</h3>
                        <h3>Last Updated: {lastUpdated.toString() || 'N/A'}</h3>
                        <button onClick={() => setShowModal(true)}>New Report</button>
                    </div>
                </div>
            </DashContainer>
            <ReportContainer>
               <RestockReport
                   report={restockReport}
               />
            </ReportContainer>
        </Container>
    );
};

export default withFirebase(Admin);
