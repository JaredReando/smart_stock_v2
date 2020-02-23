import React, { useState } from 'react';
import {Header, AppText} from '../../styles/typography';
import {FlexColumn} from "../../styles/layout";

const CreateRestockReportModal = () => {
    const [fileName, setFileName] = useState();
    const handleChange = (e: any) => {
        const fileName = e.target.files[0].name;
        setFileName(fileName)
    };
    return (
        <FlexColumn
            height="600px"
            width="400px"
            justifyContent="center"
            alignItems="center"
        >
            <Header>Create Report</Header>
            <input type='file' onChange={handleChange}/>
            <Button></Button>
            <AppText>{fileName}</AppText>
        </FlexColumn>
    )
};

export default CreateRestockReportModal;