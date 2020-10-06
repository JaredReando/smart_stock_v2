import React, { useRef, useState } from 'react';
import { Header, AppText } from '../../component_library/styles/typography';
import { Column } from '../../component_library/styles/layout';
import { Button } from '../../component_library/styles/buttons';
import { csvToObject } from '../../helpers/csv_to_object';
import DataTable from '../../component_library/components/data_table/data_table';
import { useFirebase } from '../../hooks/use_firebase_context';

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
interface RawInventoryRecord {
    'Storage Bin': string;
    Material: string;
    'Available stock': number;
    'Storage Unit': string;
    'Storage Type': string;
    'Storage Location': number;
}

const CreateRestockReportModal = ({ closeModal }: any) => {
    const firebase = useFirebase();
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

    //checks if uploaded report contains all necessary inventory object keys
    const hasRequiredKeys = (
        requiredKeys: string[],
        compareKeys: string[],
    ): { isValid: boolean; missingHeaders: string[] } => {
        const missingHeaders: string[] = [];
        const isValid: boolean = requiredKeys.reduce((matches: boolean, header: string) => {
            if (!compareKeys.includes(header)) {
                missingHeaders.push(header);
                matches = false;
            }
            return matches;
        }, true);
        return { isValid, missingHeaders };
    };

    const formatInventoryObjects = (inventoryReport: RawInventoryRecord[]) => {};

    const convertCSVFile = (file: any, callback: (data: any) => void) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = e.target.result;
            const parsedData: RawInventoryRecord[] = csvToObject(data);
            const csvKeys = Object.keys(parsedData[0]);
            let { isValid, missingHeaders } = hasRequiredKeys(requiredHeaders, csvKeys);
            if (isValid) {
                console.log('report data: ', parsedData);
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
