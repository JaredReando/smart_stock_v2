import React, { useRef, useState } from 'react';
import { Header, AppText } from '../../component_library/styles/typography';
import { Column } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import { csvToObject } from '../../helpers/csv_to_object';
import NunaStock from '../../helpers/nuna_stock';
import { fixedBins } from '../../constants';
import DataTable from '../../component_library/components/data_table/data_table';
import { useFirebaseContext } from '../../hooks/use_firebase_context';

import PouchDB from 'pouchdb-browser';
import uuid from 'uuid';

const db = new PouchDB('inventory');

async function addRecords(records: { _id: string; [key: string]: any }[]) {
    const result = await db.bulkDocs(records);
    console.log('record added! : ', result);
    return result;
}

const CreateRestockReportModal = ({ closeModal }: any) => {
    const firebase = useFirebaseContext();
    const inputRef = useRef<null | HTMLInputElement>(null);
    const [fileName, setFileName] = useState();
    const [fileError, setFileError] = useState<null | string>(null);
    const [draftReport, setDraftReport] = useState([]);
    const handleClick = (e: any) => {
        e.preventDefault();
        setFileError(null);
        inputRef.current!.click();
    };

    const requiredHeaders: Array<keyof RawInventoryRecord> = [
        'Storage Bin',
        'Material',
        'Available stock',
        'Storage Unit',
        'Storage Type',
        'Storage Location',
    ];

    //checks if uploaded report contains all necessary inventory header fields
    const hasValidHeaders = (
        required: string[],
        evaluate: string[],
    ): { isValid: boolean; missingHeaders: string[] } => {
        const missingHeaders: string[] = [];
        const isValid: boolean = required.reduce((matches: boolean, header: string) => {
            if (!evaluate.includes(header)) {
                missingHeaders.push(header);
                matches = false;
            }
            return matches;
        }, true);
        return { isValid, missingHeaders };
    };

    interface RawInventoryRecord {
        'Storage Bin': string;
        Material: string;
        'Available stock': number;
        'Storage Unit': string;
        'Storage Type': string;
        'Storage Location': number;
    }

    const formatInventoryObjects = (inventoryReport: RawInventoryRecord[]) => {};

    const convertCSVFile = (file: any, callback: (data: any) => void) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = e.target.result;
            const parsedData: RawInventoryRecord[] = csvToObject(data);
            const csvKeys = Object.keys(parsedData[0]);
            let { isValid, missingHeaders } = hasValidHeaders(requiredHeaders, csvKeys);
            if (isValid) {
                console.log('report data: ', parsedData);
                const withIDs = parsedData.map(d => {
                    return { _id: uuid(), ...d };
                });
                const result = addRecords(withIDs);
                result.then(r => console.log('result: ', r));
                // const draftRestock = new NunaStock(parsedData, fixedBins);
                // callback(draftRestock.restockReportArray);
            } else {
                missingHeaders = missingHeaders.map(h => `"${h}"`);
                const pluralOrSingular = missingHeaders.length === 1 ? 'header' : 'headers';
                alert(
                    `UPLOAD ERROR: Missing required column ${pluralOrSingular} -- ${missingHeaders.join(
                        ', ',
                    )}`,
                );
            }
        };
        reader.readAsText(file);
    };
    const handleSetReport = (e: any) => {
        e.preventDefault();
        firebase.doOverwriteRestockReport(draftReport);
        closeModal();
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const fileName = file.name;
        const fileType = file.type;
        if (fileType !== 'text/csv') {
            setFileError('Invalid file type. Select only CSV files.');
            return;
        }
        setFileName(fileName);
        convertCSVFile(file, setDraftReport);
    };

    const headerItems = [
        {
            title: 'Source',
            key: 'sourceBin',
            ratio: 2,
        },
        {
            title: 'Destination',
            key: 'destinationBin',
            ratio: 2,
        },
        {
            title: 'Material',
            key: 'material',
            ratio: 3,
        },
        {
            title: 'Description',
            key: 'description',
            ratio: 4,
        },
        {
            title: 'Qty.',
            key: 'available',
            ratio: 1,
        },
        {
            title: 'Storage Unit',
            key: 'storageUnit',
            ratio: 2,
        },
    ];
    return (
        <Column
            height="100vh"
            maxHeight="80vh"
            width="80vw"
            border="1px solid red"
            backgroundColor="lightgrey"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Header>Create Report</Header>
            <input ref={inputRef} type="file" onChange={handleChange} style={{ display: 'none' }} />
            <Button onClick={handleClick}>Upload</Button>
            <AppText>{fileError || fileName}</AppText>
            {draftReport && (
                <div style={{ height: '500px', width: '100%', overflow: 'scroll' }}>
                    <DataTable columnHeaders={headerItems} rowData={draftReport} />
                    <Button onClick={handleSetReport}>Confirm</Button>
                </div>
            )}
        </Column>
    );
};

export default CreateRestockReportModal;
