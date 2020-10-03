import React, { useRef, useState } from 'react';
import { Header, AppText } from '../../component_library/styles/typography';
import { Column } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import { csvToObject } from '../../helpers/csv_to_object';
import NunaStock from '../../helpers/nuna_stock';
import { fixedBins } from '../../constants';
import DataTable from '../../component_library/components/data_table/data_table';
import { useFirebaseContext } from '../../hooks/use_firebase_context';

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

    const requiredHeaders = [
        'Storage Bin',
        'Material',
        'Available stock',
        'Storage Unit',
        'Storage Type',
        'Storage Location',
    ];

    //checks if uploaded report contains all necessary inventory header fields
    const hasValidHeaders = (required: string[], evaluate: string[]) => {
        let missing: string[] | null = [];
        const isValid = required.reduce((matches, header) => {
            if (!evaluate.includes(header)) {
                missing!.push(header);
                matches = false;
            }
            return matches;
        }, true);
        missing = missing.length === 0 ? null : missing;
        return { isValid, missing };
    };

    const readTextFile = (file: any, callback: (data: any) => void) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = e.target.result;
            const parsedData = csvToObject(data);
            const csvKeys = Object.keys(parsedData[0]);
            const isValid = hasValidHeaders(requiredHeaders, csvKeys);
            if (!isValid.missing) {
                const draftRestock = new NunaStock(parsedData, fixedBins);
                console.log(draftRestock.restockReportArray);
                callback(draftRestock.restockReportArray);
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
        readTextFile(file, setDraftReport);
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
