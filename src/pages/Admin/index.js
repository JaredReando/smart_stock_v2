import React, {useState} from 'react';

import { withFirebase } from "../../components/Firebase"
import Papa from 'papaparse';
import NewReportModal from '../../components/Modals/new_report_modal';
import NunaStock from '../../helpers/nuna_stock';
import { fixedBins } from "../../constants";
import RestockReport from "./restock_report";
import {
    Container,
    ReportContainer,
    DashContainer,
    TestButton,
} from './admin.styles';
import FixedBins from "./fixed_bins";

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
    function overwriteFixedBins() {
        firebase.doOverwriteFixedBins(fixedBins);
    }

    const [showModal, setShowModal] = useState(false);
    const [toggleView, setToggleView] = useState(false);
    return (
        <Container>
            {showModal && (
                <NewReportModal
                    handleUpload={handleFileInput}
                    handleClick={() => setShowModal(false)}
                />
            )}
            <DashContainer>
                <h3>Records: {recordCount}</h3>
                <h3>Complete: {complete}</h3>
                <h3>Incomplete: {incomplete}</h3>
                <h3>Not Found: {notFound}</h3>
                <h3>Last Updated: {lastUpdated.toString() || 'N/A'}</h3>
                <TestButton onClick={() => setShowModal(true)}>New Report</TestButton>
                <TestButton onClick={() => setToggleView(t => !t)}>Toggle View</TestButton>
                <TestButton onClick={overwriteFixedBins}>Set Fixed Bins</TestButton>
            </DashContainer>
            <ReportContainer>
                {!toggleView && (
                   <RestockReport
                       report={restockReport}
                   />
                )}
                {toggleView && (
                    <FixedBins
                        fixedBins={fixedBins}
                    />
                )}
            </ReportContainer>
        </Container>
    );
};

export default withFirebase(Admin);
