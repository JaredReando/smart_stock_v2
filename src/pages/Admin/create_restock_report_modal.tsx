import React, { useCallback, useRef, useState } from 'react';
import {Header, AppText} from '../../styles/typography';
import {FlexColumn} from "../../styles/layout";
import {Button} from "../../styles/buttons";
import { csvToObject } from "../../helpers/csv_to_object";

const CreateRestockReportModal = () => {
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState();
    const [fileError, setFileError] = useState<null | string>(null);
    const [uploadData, setUploadData] = useState('no data');
    const handleClick = (e: any) => {
        e.preventDefault();
        setFileError(null);
        //@ts-ignore
        inputRef.current!.click()
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
        const missing: string[] = [];
        const isValid =  required.reduce((matches, header) => {
            if(!evaluate.includes(header)) {
                missing.push(header);
                matches = false;
            }
            return matches;
        }, true);
        return {isValid, missing}
    };

    const readTextFile = (file: any, callback: (data: any) => void) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = e.target.result;
            const parsedData = csvToObject(data);
            callback(parsedData)
            const csvKeys = Object.keys(parsedData[0])
            const isValid = hasValidHeaders(requiredHeaders, csvKeys);
            console.log("valid? ", isValid.isValid);
            console.log("missing: ", isValid.missing);
        };
        reader.readAsText(file);
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const fileName = file.name;
        const fileType = file.type;
        if (fileType !== 'text/csv') {
            setFileError('Invalid file type. Select only CSV files.');
            return
        }
        setFileName(fileName);
        readTextFile(file, setUploadData);
    };
    return (
        <FlexColumn
            height="100vh"
            maxHeight="500px"
            width="300px"
            border="1px solid red"
            backgroundColor="grey"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Header>Create Report</Header>
            <input
                ref={inputRef}
                type='file' onChange={handleChange}
                style={{display: 'none'}}
            />
            <Button
                onClick={handleClick}
            >Upload</Button>
            <AppText>{fileError || fileName}</AppText>
        </FlexColumn>
    )
};

export default CreateRestockReportModal;