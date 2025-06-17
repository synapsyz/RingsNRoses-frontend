import { useState, useEffect } from "react";
import axios from "axios";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Revoke previews on component unmount
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  const uploadFile = async (file) => {
    const size = file.size;
    const contentType = file.type;
    const filename = encodeURIComponent(file.name);

    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/upload/initiate/", {
        filename,
        content_type: contentType,
        size,
      });

      const { upload_type, url, key, upload_id } = data;

      if (upload_type === "single") {
        await axios.put(url, file, {
          headers: { "Content-Type": contentType },
        });
        return { success: true, key };
      }

      // Multipart upload
      const partSize = 5 * 1024 * 1024;
      const totalParts = Math.ceil(size / partSize);
      const { data: urlRes } = await axios.post("http://localhost:8000/api/v1/upload/parts/", {
        upload_id,
        key,
        parts: totalParts,
      });

      const uploadedParts = [];

      for (let i = 0; i < totalParts; i++) {
        const start = i * partSize;
        const end = Math.min(start + partSize, file.size);
        const blob = file.slice(start, end);
        const partNumber = i + 1;

        const uploadRes = await axios.put(urlRes.urls[i].url, blob, {
          headers: { "Content-Type": contentType },
        });

        const etag = uploadRes.headers.etag?.replaceAll('"', '');
        uploadedParts.push({ ETag: etag, PartNumber: partNumber });
      }

      await axios.post("http://localhost:8000/api/v1/upload/complete/", {
        upload_id,
        key,
        parts: uploadedParts,
      });

      return { success: true, key };
    } catch (err) {
      console.error("Upload failed:", err);
      return { success: false };
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    for (const file of files) {
      const result = await uploadFile(file);
      if (!result.success) {
        alert(`Upload failed for ${file.name}`);
        setUploading(false);
        return;
      }
    }

    alert("All files uploaded successfully!");
    setFiles([]);
    setPreviews([]);
    setUploading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      <div className="grid grid-cols-3 gap-4 mb-4">
        {previews.map((src, index) => (
          <div key={index} className="border rounded overflow-hidden shadow-sm">
            {files[index]?.type.startsWith("image") ? (
              <img src={src} alt="preview" className="w-full h-32 object-cover" />
            ) : (
              <video src={src} className="w-full h-32 object-cover" controls />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUploader;
