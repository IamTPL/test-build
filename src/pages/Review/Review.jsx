import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import PDFViewer from "../../components/Review/PdfView";
import TableView from "../../components/Review/TableView";
import "./ReviewStyle.css";

const Review = () => {
  return (
    <div className="review-page min-h-[100vh] px-14 py-8">
      <div className="flex gap-4">
        <div className="pdf-side w-2/5 h-full">
          <a href="/" className="text-gray-600 hover:text-black">
            <ArrowLeftOutlined className="pr-2" />
            Back to dashboard
          </a>
          <div className="pdf-view-container h-full bg-gray-100 p-4 mt-4">
            <PDFViewer></PDFViewer>
          </div>
        </div>
        <div className="convert-side w-3/5 min-h-[100vh]">
          <TableView></TableView>
        </div>
      </div>
    </div>
  );
};

export default Review;
