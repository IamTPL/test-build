import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import ViewDropdown from '../ViewDropdown/ViewDropdown';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import StatementService from '../../../services/api.statement.service';

const ActionButtons = ({
    items,
    setItems,
    showModal,
    selectedColumns,
    setSelectedColumns,
    selectedItems,
    setSelectedItems,
    retrieveData,
}) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const showConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };
    const handleOk = () => {
        setIsConfirmModalOpen(false);
        handleDeleteSelectedItems();
    };
    const handleCancel = () => {
        setIsConfirmModalOpen(false);
    };

    const showSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'Success',
        });
    };
    const showWarning = (message) => {
        messageApi.open({
            type: 'warning',
            content: message,
            duration: 5,
        });
    };

    const handleDeleteSelectedItems = async () => {
        let hasProcessingItems = false;
        let deletedItemsRequest = {
            documents: [],
            user_id: '7964e489-5d4d-4a2f-ac4c-ad5ac6e22730',
        };

        items.forEach((item) => {
            if (selectedItems.includes(item.id)) {
                if (item.status === 'processing') {
                    hasProcessingItems = true;
                }
                deletedItemsRequest.documents.push({
                    id: item.id,
                    status: item.status,
                });
            }
        });
        const response = await StatementService.deleteSelected(
            deletedItemsRequest
        );
        retrieveData();
        setSelectedItems([]);
        showSuccess();

        if (hasProcessingItems) {
            showWarning('Processing items cannot be deleted');
        }
    };

    const handleDownloadSelectedItems = () => {
        showSuccess();

        const hasSuccessItems = items.some(
            (item) =>
                selectedItems.includes(item.id) && item.status !== 'success'
        );
        if (hasSuccessItems) {
            showWarning('Only success items can be downloaded');
        }
    };

    const handleConvertSelectedItems = () => {
        showSuccess();

        const hasNewAndFailedItems = items.some(
            (item) =>
                selectedItems.includes(item.id) &&
                (item.status !== 'new' || item.status !== 'failed')
        );
        if (hasNewAndFailedItems) {
            showWarning('Only new and failed items can be converted');
        }
    };
    return (
        <div className="flex items-center space-x-2">
            {contextHolder}

            {selectedItems.length > 0 && (
                <>
                    {/*Button Delete*/}
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={() => {
                            showConfirmModal();
                        }}
                    >
                        <span>Delete</span>
                    </button>

                    {/*Button Download or combine*/}
                    <button
                        className="px-4 py-2 bg-blue-400 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={() => {
                            handleDownloadSelectedItems();
                        }}
                    >
                        <span>Download</span>
                    </button>

                    {/*Button Download*/}
                    <button
                        className="px-4 py-2 bg-orange-400 text-white rounded-lg flex items-center space-x-2 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={() => {
                            handleConvertSelectedItems();
                        }}
                    >
                        <span>Convert</span>
                    </button>
                </>
            )}

            {/*Button Upload */}
            {selectedItems.length == 0 && (
                <button
                    className="primary-button px-4 py-2 rounded-lg flex items-center space-x-2"
                    onClick={() => showModal()}
                >
                    <span className="text-black">Upload files</span>
                    <UploadOutlined className="text-black" />
                </button>
            )}

            {/* Button View */}
            <ViewDropdown
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
            />
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

export default ActionButtons;
