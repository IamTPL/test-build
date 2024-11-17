import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react';
import UploadFile from '../UploadFile';
import './ModalUploadStyle.css';
import { Button } from 'antd';

const ModalUpload = ({ isOpenModalUpload, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelDisabled, setIsCancelDisabled] = useState(false);
    const [isOkDisabled, setIsOkDisabled] = useState(true);

    useEffect(() => {
        setIsModalOpen(isOpenModalUpload);
    }, [isOpenModalUpload]);

    useEffect(() => {
        console.log('isCancelDisabled:', isCancelDisabled);
        console.log('isOkDisabled: ', isOkDisabled);
    }, [isCancelDisabled, isOkDisabled]);

    return (
        <Modal
            title="Upload files"
            open={isModalOpen}
            onOk={onClose}
            onCancel={() => {
                if (!isCancelDisabled) {
                    onClose();
                }
            }}
            width={'50vw'}
            centered
            maskClosable={false}
            cancelButtonProps={{ style: { display: 'none' } }}
            footer={
                !isOkDisabled && (
                    <Button
                        onClick={onClose}
                        type="primary"
                        className="text-orange-400 border-2 border-orange-400 bg-white uppercase font-bold"
                    >
                        Ok
                    </Button>
                )
            }
        >
            <p>Select modal and upload your files</p>
            <p>Click or drop file list</p>
            <div className="text-gray-500">
                <ul className="list-disc pl-5">
                    <li>#Max 20 files / upload.</li>
                    <li>#Max 50MB / file.</li>
                    <li>#Only PDF files are allowed.</li>
                </ul>
            </div>
            <UploadFile
                isOkDisabled={isOkDisabled}
                isCancelDisabled={isCancelDisabled}
                setIsCancelDisabled={setIsCancelDisabled}
                setIsOkDisabled={setIsOkDisabled}
            ></UploadFile>
        </Modal>
    );
};

export default ModalUpload;
