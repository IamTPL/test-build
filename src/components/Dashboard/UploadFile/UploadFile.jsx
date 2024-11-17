import React, { useEffect, useState } from "react";
import UploadTable from "./UploadTable";
import DropFile from "./DropFile";
import DropFileTable from "./DropFileTable";
import { Button } from "antd";
import UploadFileService from "../../../services/api.upload-file.service";

import responeUpload from "../../../../database/uploadFile/responeUpload.json";

const UploadFile = ({
  isCancelDisabled,
  isOkDisabled,
  setIsCancelDisabled,
  setIsOkDisabled,
}) => {
  const [files, setFiles] = useState([]);
  const [responseFiles, setResponseFiles] = useState([]);
  const [selectedBank, setSelectedBank] = useState({});
  const [isReadyForUpload, setIsReadyForUpload] = useState(false);
  const [showUpdateTable, setShowUpdateTable] = useState(false);
  const [objectFile, setObjectFile] = useState({});
   useEffect(() => {
    console.log("isReadyForUpload", isReadyForUpload);
  }, [isReadyForUpload]);

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    const initialFiles = acceptedFiles.map((file) => ({
      file,
      status: "Uploading",
    }));
    setIsCancelDisabled(true);
    setObjectFile(initialFiles);
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {
    setIsReadyForUpload(false);
    setShowUpdateTable(true);
    // TestAPI.getTest().then((res) => {
    //   console.log(res);
    // }).catch((error) => {
    //   console.log(error);
    // });

    // const testconect = await TestAPI.getTest();
    // console.log(testconect);
    try {
      const formData = createFormData(files, selectedBank);
      // console.log(formData.getAll("file1"));
      // const response = await UploadFileService.uploadFile(formData);
      // if (response.status === 200) {
      //   setResponseFiles(response.data.documents);
      // }
      
      // console.log(formData);
      // console.log(responeUpload);
      setResponseFiles(responeUpload.documents);
      // console.log(responseFiles);
    } catch (error) {
      //go to error page
      console.log(error);
    }
  };

  const createFormData = (files, banks) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      console.log("file i: ", files[i]);
      formData.append(`file${i + 1}`, files[i]);
      formData.append(`bank${i + 1}`, "6425e5a7-b4c4-4436-a4c0-71fba20d873c");
    }
    formData.append("length", files.length);
    formData.append("type_of_pdf", "bank_statement");
    formData.append("created_by", "3478b218-b38d-4390-a2b7-25852007f611");
    console.log(formData.getAll("file1"));
    return formData;
  };

  useEffect(() => {
    const selectedBankLength = Object.keys(selectedBank).length;
    console.log(selectedBank);
    console.log(selectedBankLength, files.length);
    if (selectedBankLength > 0 && selectedBankLength == files.length) {
      setIsReadyForUpload(true);
    }
  }, [selectedBank]);

  useEffect(() => {
    console.log("files: ", files);
  }, [files]);

  return (
    <>
      <div className="p-4">
        {files.length === 0 ? (
          <DropFile onDrop={onDrop} />
        ) : showUpdateTable ? (
          <UploadTable data={responseFiles} />
        ) : (
          <DropFileTable data={objectFile} onChangeSelectedBank={setSelectedBank} />
        )}
        {isReadyForUpload && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleUpload}
              type="primary"
              className="text-orange-400 border-2 border-orange-400 bg-white uppercase font-bold"
            >
              Upload
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFile;
