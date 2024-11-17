import {
    DashOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FileSyncOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import StatementService from '../../../services/api.statement.service';
import { message, Modal } from 'antd';

const ActionDropdown = ({ id, status, retrieveData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const showSuccess = () => {
        message.success('Success');
    };

    //cancel dropdown when clicked outside
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    const handleDelete = async () => {
        const deletedItemsRequest = {
            documents: [{ id: id, status: status }],
            user_id: '7964e489-5d4d-4a2f-ac4c-ad5ac6e22730',
        };
        const response = await StatementService.deleteSelected(
            deletedItemsRequest
        );
        retrieveData();
        showSuccess();
    };

    const showConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };
    const handleOk = () => {
        setIsConfirmModalOpen(false);
        handleDelete();
    };
    const handleCancel = () => {
        setIsConfirmModalOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            >
                <DashOutlined />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2 font-bold text-gray-700 border-b border-gray-200">
                        Document actions
                    </div>
                    <ul className="mb-0">
                        {status === 'new' && (
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={() => alert('Convert clicked')}
                            >
                                <span className="mr-2">
                                    <FileSyncOutlined />
                                </span>{' '}
                                Convert
                            </li>
                        )}
                        {status === 'failed' && (
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={() => alert('Re-run clicked')}
                            >
                                <span className="mr-2">
                                    <ReloadOutlined />
                                </span>{' '}
                                Re-run
                            </li>
                        )}
                        {status === 'success' && (
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={() => alert('Download clicked')}
                            >
                                <span className="mr-2">
                                    <DownloadOutlined />
                                </span>{' '}
                                Download
                            </li>
                        )}
                        {status !== 'processing' && (
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointer text-red-500 flex items-center"
                                onClick={() => showConfirmModal()}
                            >
                                <span className="mr-2">
                                    <DeleteOutlined />
                                </span>{' '}
                                Delete
                            </li>
                        )}
                        {status === 'processing' && (
                            <li className="p-2 hover:bg-gray-100 text-sm text-nowrap">
                                No actions for processing
                            </li>
                        )}
                    </ul>
                </div>
            )}
            {/* Modal Confirm Delete Selected */}
            <Modal
                title="Are you absolutely sure?"
                open={isConfirmModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                    className: 'primary-button',
                }}
                cancelButtonProps={{
                    className: 'secondary-button',
                }}
            >
                <p>This action cannot be undone.</p>
            </Modal>
        </div>
    );
};

export default ActionDropdown;
