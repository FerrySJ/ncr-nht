import React, { useState } from "react";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">
        ATTACHED FILE/PICTURE
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
        "
      />

      {preview ? (
        <div className="mt-2">
          <img src={preview} alt="Preview" className="h-32 rounded border border-gray-200" />
        </div>
      ) : file ? (
        <div className="mt-2 text-sm text-gray-600">
          Selected file: {file.name}
        </div>
      ) : null}
    </div>
  );
}
