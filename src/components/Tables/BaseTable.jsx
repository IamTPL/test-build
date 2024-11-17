import { CaretDownOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const BaseTable = ({
  children,
  rowsSelected,
  setSelectedItems,
  // totalPage,
  // currentPage,
  pagination,
  // setItemsPerPage,
  // setCurrentPage,
  updatePagination,
  setPaginationFields,
  retrieveData,
}) => {
  const [selectedOption, setSelectedOption] = useState(10);
  const options = [10, 20, 30, 40, 50];
  console.log("totalPage", pagination.totalPage);

  const handleMenuClick = (e) => {
    console.log(e.key);
    setSelectedOption(parseInt(e.key, 10));
    setPaginationFields({ itemsPerPage: parseInt(e.key, 10), currentPage: 1 });
  };

  const menuItems = options.map((option) => ({
    key: option.toString(),
    label: (
      <span>
        {option} {selectedOption === option && <CheckOutlined />}
      </span>
    ),
  }));

  const handlePageClick = (event) => {
    setPaginationFields({ currentPage: event.selected + 1 });
    setSelectedItems([]);
  };

  return (
    <div className="base-table">
      <div className="table-content">{children}</div>

      <div className="table-footer py-2 flex justify-between items-center border-gray-300">
        <span className="text-gray-700">Rows selected: {rowsSelected}</span>
        <div className="flex items-center gap-14">
          <span className="text-gray-700">
            Rows per page:{" "}
            <Dropdown
              menu={{
                items: menuItems,
                onClick: handleMenuClick,
              }}
              trigger={["click"]}
            >
              <Button>
                {selectedOption} <CaretDownOutlined />
              </Button>
            </Dropdown>
          </span>
          <div className="paginate relative top-2">
            <ReactPaginate
              // pageCount={Math.ceil(totalItems / itemsPerPage)}
              pageCount={pagination.totalPage}
              onPageChange={handlePageClick}
              containerClassName="flex items-center space-x-2"
              pageClassName="border border-gray-300 rounded hover:bg-gray-100"
              pageLinkClassName="py-1 px-3 block w-full h-full text-gray-700 "
              activeClassName="bg-orange-400 hover:bg-orange-500 text-white"
              previousClassName="border border-gray-300 rounded hover:bg-gray-100"
              nextClassName="border border-gray-300 rounded hover:bg-gray-100"
              previousLinkClassName="py-1 px-3 block w-full h-full "
              nextLinkClassName="py-1 px-3 block w-full h-full "
              disabledClassName="text-gray-400 cursor-not-allowed"
              breakClassName="border border-gray-300 rounded cursor-pointer"
              previousLabel="&lt;"
              nextLabel="&gt;"
              forcePage={pagination.currentPage - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseTable;
