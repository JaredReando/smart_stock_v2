import React from "react";
import {
    ModalContainer,
    InnerModal,
    Close,
} from './new_report_modal.styles';

interface Props {
    handleClick: (e: any) => void;
    handleUpload: () => void;
}

const NewReportModal: React.FC<Props> = ({handleClick, handleUpload}) => {
    return (
        <ModalContainer>
            <InnerModal>
                <h1>New Report</h1>
                <input
                    type='file'
                    onChange={handleUpload}
                />
                <Close onClick={handleClick}>X</Close>
            </InnerModal>
        </ModalContainer>
    )
}

export default NewReportModal;