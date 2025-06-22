import { useState, useEffect } from "react";

const FileUploader = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Effect to create and revoke object URLs for previews
  useEffect(() => {
    // When files change, create new previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Cleanup function to revoke the object URLs when the component
    // unmounts or when the files are changed, to avoid memory leaks.
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    // Pass the selected files to the parent component
    if (onFilesChange) {
      onFilesChange(selectedFiles);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Select Files
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {previews.map((src, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            {files[index]?.type.startsWith("image") ? (
              <img src={src} alt="preview" className="w-full h-32 object-cover" />
            ) : (
              <video src={src} className="w-full h-32 object-cover" controls />
            )}
            <p className="text-xs text-center p-1 truncate">{files[index]?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;