{
  /* <table className="min-w-full bg-white border-collapse border separate border-gray-200 rounded-lg ">
  <thead className="bg-gray-100 rounded-t-lg">
    <tr>
      <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700 font-medium w-1">
        <input
          type="checkbox"
          onChange={handleCheckAll}
          checked={selectedItems.length === items.slice(0, itemsPerPage).length}
        />
      </th>
      <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700 font-medium w-1/2">
        Name <CaretDownOutlined />
      </th>
      <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700 font-medium">
        Status <CaretDownOutlined />
      </th>
      <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700 font-medium">
        Date Uploads <CaretDownOutlined />
      </th>
      <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700 font-medium">
        Actions
      </th>
    </tr>
  </thead>
  <tbody>
    {items.slice(0, itemsPerPage).map((item) => (
      <tr key={item.id} className="border-b hover:bg-gray-50">
        <td className="px-4 py-2">
          <input
            type="checkbox"
            value={item.id}
            checked={selectedItems.includes(item.id)}
            onChange={() => handleCheckItem(item.id)}
          />
        </td>
        <td className="px-4 py-2">
          <a href="#" className="hover:underline">
            {item.name} <SearchOutlined className="text-sm text-gray-400" />
          </a>
        </td>
        <td className="px-4 py-2">
          <UploadStatus status={item.status} />
        </td>
        <td className="px-4 py-2">{item.dateUploaded}</td>
        <td className="pl-6 py-2">
          {" "}
          <ActionDropdown status={item.status}></ActionDropdown>{" "}
        </td>
      </tr>
    ))}
  </tbody>
</table>; */
}
