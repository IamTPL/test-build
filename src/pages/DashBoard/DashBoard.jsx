import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import BaseTable from '../../components/Tables/BaseTable';
import ModalUpload from '../../components/Dashboard/UploadFile/PopUpUploadFile/ModalUpload';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    ArrowsAltOutlined,
} from '@ant-design/icons';
import ActionDropdown from '../../components/Dashboard/ActionDropdown/ActionDropdown';
import UploadStatus from '../../components/Statuses/UploadStatus/UploadStatus';
import dataTableDashBoard from '../../../database/dashboard/dataTableDashboard.json';
import FilterBar from '../../components/Dashboard/Filter/FilterBar';
// import UseStatementConverterService from "../../services/useService/useStatementConverterService";

import StatementService from '../../services/api.statement.service';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../../components/Dashboard/ActionButtonBar/ActionButons';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { offLoading, onLoading } from '../../features/loadingSlice';

const DashBoard = () => {
    //test
    const [items, setItems] = useState([]);
    // console.log(items);
    //test
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();
    const [selectedColumns, setSelectedColumns] = useState({
        Status: true,
        'Date Upload': true,
        Actions: true,
    });
    const [searchObject, setSearchObject] = useState({
        name: '',
        status: [],
        startDate: null,
        endDate: null,
    });
    // const [sortObject, setSortObject] = useState([]);
    const [activeSortColumn, setActiveSortColumn] = useState(false);
    const [sortState, setSortState] = useState({
        name: null,
        status: null,
        dateUpload: null,
    });
    const [pagination, setPagination] = useState({
        totalPage: 0,
        itemsPerPage: 10,
        currentPage: 1,
    });
    const previousSearchObject = useRef(searchObject);
    const { isLoading } = useSelector((state) => state.loading);
    console.log('isLoading: ', isLoading);
    let dispatch = useDispatch();

    //one way to update pagination
    const updatePagination = (key, value) => {
        setPagination((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    //another way to update pagination
    const setPaginationFields = (updates) => {
        setPagination((prev) => ({
            ...prev,
            ...updates,
        }));
    };

    const nameDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);
    const dateDropdownRef = useRef(null);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            const allIds = items
                .slice(0, pagination.itemsPerPage)
                .map((item) => item.id);
            setSelectedItems(allIds);
        } else {
            setSelectedItems([]);
        }
    };

    const shouldFetchData = useRef(true);

    const updatePageData = (data) => {
        let shouldUpdate = false;
        if (data?.num_of_pages >= 0) {
            console.log('update total page: ', data.num_of_pages);
            // setTotalPage(data.num_of_pages);

            updatePagination('totalPage', data.num_of_pages);
        }
        if (data?.page_id && pagination.currentPage !== data.page_id) {
            // setCurrentPage(data.page_id);
            console.log('update current page: ', data.page_id);
            updatePagination('currentPage', data.page_id);
            shouldUpdate = true;
        }
        if (data?.page_size && pagination.itemsPerPage !== data.page_size) {
            // setItemsPerPage(data.page_size);
            console.log('update items per page: ', data.page_size);
            updatePagination('itemsPerPage', data.page_size);
            shouldUpdate = true;
        }
        if (data?.documents) {
            setItems(data.documents);
        }

        if (shouldUpdate) {
            console.log('update page data: ');
            shouldFetchData.current = true;
        }
    };

    useEffect(() => {
        if (
            JSON.stringify(searchObject) !==
            JSON.stringify(previousSearchObject.current)
        ) {
            updatePagination('currentPage', 1);
        }

        previousSearchObject.current = searchObject;
        if (shouldFetchData.current) {
            retrieveData();
            shouldFetchData.current = true;
        }
    }, [
        searchObject,
        pagination.currentPage,
        pagination.itemsPerPage,
        sortState,
    ]);

    const handleCheckItem = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSortChange = (column, direction) => {
        setSortState({
            name: null,
            status: null,
            dateUpload: null,
            [column]: direction,
        });
        setActiveSortColumn(false);
    };

    useEffect(() => {
        console.log('sort state: ', sortState);
    }, [sortState]);

    const retrieveData = async () => {
        dispatch(onLoading());
        try {
            console.log('call retrieve data');
            const params = StatementService.setQuery(
                pagination.currentPage,
                pagination.itemsPerPage,
                searchObject,
                sortState
            );
            // console.log("call submit: ", params);
            const response = await StatementService.getAll(params);
            console.log('response: ', response);

            // setItems(response.data.documents);
            dispatch(offLoading());
            updatePageData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    //handle click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                nameDropdownRef.current &&
                !nameDropdownRef.current.contains(event.target) &&
                statusDropdownRef.current &&
                !statusDropdownRef.current.contains(event.target) &&
                dateDropdownRef.current &&
                !dateDropdownRef.current.contains(event.target)
            ) {
                setActiveSortColumn(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dashboard_page px-8 flex">
            <Sidebar />
            <div className="dashboard-right-side min-h-[93vh] flex-1 py-8 pl-12 pr-8">
                <h1 className="text-3xl font-bold mb-2 mt-2">
                    Bank statement converter
                </h1>
                <h2 className="text-lg text-gray-600">
                    Manage and view your documents
                </h2>

                <BaseTable
                    pagination={pagination}
                    setSelectedItems={setSelectedItems}
                    rowsSelected={selectedItems.length}
                    updatePagination={updatePagination}
                    setPaginationFields={setPaginationFields}
                >
                    <div className="flex justify-between items-center py-2 border-gray-300">
                        <FilterBar
                            externalQuery={searchObject}
                            onChangeExternalQuery={setSearchObject}
                            onSubmit={retrieveData}
                        />

                        {/* Upload File & Views Button component */}
                        <ActionButtons
                            items={items}
                            setItems={setItems}
                            showModal={showModal}
                            selectedColumns={selectedColumns}
                            setSelectedColumns={setSelectedColumns}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                            retrieveData={retrieveData}
                        ></ActionButtons>
                    </div>

                    {/* table content */}
                    {isLoading ? (
                        <Loading></Loading>
                    ) : (
                        <div className="border rounded">
                            <table className="min-w-full bg-white border-collapse separate">
                                <thead className="bg-gray-100 rounded-t-lg border-b">
                                    <tr>
                                        <th className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium w-1">
                                            <input
                                                type="checkbox"
                                                onChange={handleCheckAll}
                                                checked={
                                                    selectedItems.length ===
                                                    items.slice(
                                                        0,
                                                        pagination.itemsPerPage
                                                    ).length
                                                }
                                            />
                                        </th>

                                        <th
                                            className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium min-w-1/2"
                                            ref={nameDropdownRef}
                                        >
                                            <span
                                                onClick={() =>
                                                    setActiveSortColumn(
                                                        (prevColumn) =>
                                                            prevColumn ===
                                                            'name'
                                                                ? false
                                                                : 'name'
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                Name
                                                <span className="pl-2">
                                                    {sortState.name ===
                                                    'asc' ? (
                                                        <ArrowUpOutlined />
                                                    ) : sortState.name ===
                                                      'desc' ? (
                                                        <ArrowDownOutlined />
                                                    ) : (
                                                        <ArrowsAltOutlined className="-rotate-45" />
                                                    )}
                                                </span>
                                            </span>
                                            {activeSortColumn === 'name' && (
                                                <div className="absolute mt-2 w-30 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                    <ul className="py-2 mb-0">
                                                        <li
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                            onClick={() =>
                                                                handleSortChange(
                                                                    'name',
                                                                    'asc'
                                                                )
                                                            }
                                                        >
                                                            <ArrowUpOutlined />
                                                            <span className="ml-2">
                                                                ASC
                                                            </span>
                                                        </li>
                                                        <li
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                            onClick={() =>
                                                                handleSortChange(
                                                                    'name',
                                                                    'desc'
                                                                )
                                                            }
                                                        >
                                                            <ArrowDownOutlined />
                                                            <span className="ml-2">
                                                                DESC
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </th>

                                        {selectedColumns.Status && (
                                            <th
                                                className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium"
                                                ref={statusDropdownRef}
                                            >
                                                <span
                                                    onClick={() =>
                                                        setActiveSortColumn(
                                                            (prevColumn) =>
                                                                prevColumn ===
                                                                'status'
                                                                    ? false
                                                                    : 'status'
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    Status
                                                    <span className="pl-2">
                                                        {sortState.status ===
                                                        'asc' ? (
                                                            <ArrowUpOutlined />
                                                        ) : sortState.status ===
                                                          'desc' ? (
                                                            <ArrowDownOutlined />
                                                        ) : (
                                                            <ArrowsAltOutlined className="-rotate-45" />
                                                        )}
                                                    </span>
                                                </span>
                                                {activeSortColumn ===
                                                    'status' && (
                                                    <div
                                                        // Nếu không cần thiết, bạn có thể loại bỏ ref hoặc sử dụng ref riêng biệt
                                                        className="absolute mt-2 w-30 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                                    >
                                                        <ul className="py-2 mb-0">
                                                            <li
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                                onClick={() =>
                                                                    handleSortChange(
                                                                        'status',
                                                                        'asc'
                                                                    )
                                                                }
                                                            >
                                                                <ArrowUpOutlined />
                                                                <span className="ml-2">
                                                                    ASC
                                                                </span>
                                                            </li>
                                                            <li
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                                onClick={() =>
                                                                    handleSortChange(
                                                                        'status',
                                                                        'desc'
                                                                    )
                                                                }
                                                            >
                                                                <ArrowDownOutlined />
                                                                <span className="ml-2">
                                                                    DESC
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </th>
                                        )}
                                        {selectedColumns['Date Upload'] && (
                                            <th
                                                className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium"
                                                ref={dateDropdownRef}
                                            >
                                                <span
                                                    onClick={() =>
                                                        setActiveSortColumn(
                                                            (prevColumn) =>
                                                                prevColumn ===
                                                                'dateUpload'
                                                                    ? false
                                                                    : 'dateUpload'
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    Date Upload
                                                    <span className="pl-2">
                                                        {sortState.dateUpload ===
                                                        'asc' ? (
                                                            <ArrowUpOutlined />
                                                        ) : sortState.dateUpload ===
                                                          'desc' ? (
                                                            <ArrowDownOutlined />
                                                        ) : (
                                                            <ArrowsAltOutlined className="-rotate-45" />
                                                        )}
                                                    </span>
                                                </span>
                                                {activeSortColumn ===
                                                    'dateUpload' && (
                                                    <div
                                                        // Nếu không cần thiết, bạn có thể loại bỏ ref hoặc sử dụng ref riêng biệt
                                                        className="absolute mt-2 w-30 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                                    >
                                                        <ul className="py-2 mb-0">
                                                            <li
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                                onClick={() =>
                                                                    handleSortChange(
                                                                        'dateUpload',
                                                                        'asc'
                                                                    )
                                                                }
                                                            >
                                                                <ArrowUpOutlined />
                                                                <span className="ml-2">
                                                                    ASC
                                                                </span>
                                                            </li>
                                                            <li
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                                onClick={() =>
                                                                    handleSortChange(
                                                                        'dateUpload',
                                                                        'desc'
                                                                    )
                                                                }
                                                            >
                                                                <ArrowDownOutlined />
                                                                <span className="ml-2">
                                                                    DESC
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </th>
                                        )}
                                        {selectedColumns.Actions && (
                                            <th className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium">
                                                Actions
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items
                                        .slice(0, pagination.itemsPerPage)
                                        .map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="checkbox"
                                                        value={item.id}
                                                        checked={selectedItems.includes(
                                                            item.id
                                                        )}
                                                        onChange={() =>
                                                            handleCheckItem(
                                                                item.id
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div
                                                        onClick={() =>
                                                            navigate('/review')
                                                        }
                                                        className="hover:underline cursor-pointer text-[15px]"
                                                    >
                                                        {item.original_name}
                                                    </div>
                                                </td>
                                                {selectedColumns.Status && (
                                                    <td className="px-4 py-2">
                                                        <UploadStatus
                                                            status={item.status}
                                                        />
                                                    </td>
                                                )}
                                                {selectedColumns[
                                                    'Date Upload'
                                                ] && (
                                                    <td className="px-4 py-2 text-[15px]">
                                                        {item.created_at}
                                                    </td>
                                                )}
                                                {selectedColumns.Actions && (
                                                    <td className="px-6 py-2">
                                                        {' '}
                                                        <ActionDropdown
                                                            id={item.id}
                                                            status={item.status}
                                                            retrieveData={
                                                                retrieveData
                                                            }
                                                        ></ActionDropdown>{' '}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    {items.length == 0 && (
                                        <tr className="hover:bg-gray-50">
                                            <td
                                                className="px-4 text-center py-10"
                                                colSpan="5"
                                            >
                                                No result.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </BaseTable>
            </div>

            {/* Modal Upload */}
            {isModalOpen && (
                <ModalUpload
                    isOpenModalUpload={isModalOpen}
                    onClose={handleCloseModal}
                ></ModalUpload>
            )}
        </div>
    );
};

export default DashBoard;
