import React, { useState } from "react";

import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

export default function FileUpload({ label, accept, onFileChange }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };
//   const handleChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     if (onFileChange) {
//       onFileChange(selectedFile);
//     }

//     if (selectedFile && selectedFile.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setPreview(null);
//     }
//   };

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
          <Upload
      accept="image/*,.pdf,.xlsx,.xls"
      listType="picture"  // สำคัญ! ให้ขึ้นรูป
      fileList={fileList}
      onChange={handleChange}
    >
      <Button
        icon={<UploadOutlined />}
        className="text-blue-700 border border-blue-500"
      >
        Click to Upload
      </Button>
    </Upload>
    {/* input นี้ เห็นรูปใหญ่ แต่ button สีฟ้า */}
      {/* <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
        "
      /> */}

      {preview ? (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="h-32 rounded border border-gray-200 object-cover"
          />
        </div>
      ) : file ? (
        <div className="mt-2 text-sm text-gray-600">
          Selected file: {file.name}
        </div>
      ) : null}
    </div>
  );
}
