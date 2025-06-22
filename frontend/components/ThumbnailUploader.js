import React, { forwardRef, useImperativeHandle, useState } from 'react';
import axios from 'axios';

// This is a re-usable helper. It now sends all the parameters
// your backend endpoint expects.
async function initiateUpload(filename, contentType, size) {
    const api_url = process.env.NEXT_PUBLIC_APP_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_HOST;

    // The endpoint and payload now match your Django view
    const { data } = await axios.post(`${api_url}/api/v1/upload/initiate/`, {
        filename: filename,
        content_type: contentType,
        size: size,
    });
    return data; // Returns data for either single or multipart upload
}

const ThumbnailUploader = forwardRef(function ThumbnailUploader({ preview, onFileChange, onDelete }, ref) {
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useImperativeHandle(ref, () => ({
        async upload() {
            if (!selectedFile) {
                // No new file was selected, so we don't need to do anything.
                // Return success so the form submission can proceed.
                return { success: true, key: null };
            }

            setIsUploading(true);
            const pathPrefix = 'vendors/thumbnail';
            const uniqueFileName = `${pathPrefix}/${Date.now()}-${selectedFile.name}`;

            try {
                // Initiate the upload process with the backend
                const uploadData = await initiateUpload(
                    uniqueFileName,
                    selectedFile.type,
                    selectedFile.size
                );

                // Check the upload type returned by the backend
                if (uploadData.upload_type === 'single') {
                    // --- SINGLE FILE UPLOAD ---
                    // This is for files < 5MB.
                    console.log("Performing single file upload...");
                    await axios.put(uploadData.url, selectedFile, {
                        headers: { "Content-Type": selectedFile.type }
                    });
                    return { success: true, key: uploadData.key };
                }
                else if (uploadData.upload_type === 'multipart') {
                    // --- MULTIPART FILE UPLOAD ---
                    // This is for files >= 5MB. This is a complex process
                    // that requires additional backend endpoints.
                    
                    // TODO: Implement the multipart upload logic.
                    // 1. Slice the `selectedFile` into chunks (e.g., 5MB each).
                    // 2. For each chunk (part):
                    //    a. Request a pre-signed URL for that specific part from a new
                    //       backend endpoint (e.g., `/api/v1/upload/part/`).
                    //    b. Upload the chunk using axios.put() to the URL from step 2a.
                    //    c. Collect the `ETag` header from the response of each part upload.
                    // 3. After all parts are uploaded, send a final request to another
                    //    new backend endpoint (e.g., `/api/v1/upload/complete/`) with
                    //    the `upload_id` and the list of all part numbers and their ETags.

                    const errorMessage = "Multipart upload for files > 5MB is not yet implemented on the frontend.";
                    console.error(errorMessage, "Upload ID:", uploadData.upload_id);
                    return { success: false, message: errorMessage };
                } else {
                     throw new Error("Invalid upload type from server.");
                }

            } catch (err) {
                console.error("Thumbnail upload failed:", err);
                return { success: false, message: err.message };
            } finally {
                setIsUploading(false);
            }
        }
    }));

    const handleFileChange = (file) => {
        if (file) {
            setSelectedFile(file);
            onFileChange(file); // This updates the preview in the parent
        }
    };

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                Thumbnail
            </label>
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                <span className="flex justify-center items-center size-20 border-2 border-dotted border-stone-300 text-stone-400 rounded-full overflow-hidden">
                    {preview ? (
                        <img src={preview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    ) : (
                        <svg className="shrink-0 size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                    )}
                </span>
                <div className="grow">
                    <div className="flex items-center gap-x-2">
                        <label htmlFor="thumbnail-input" className="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700">
                            {isUploading ? "Uploading..." : "Choose Photo"}
                        </label>
                        <input id="thumbnail-input" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e.target.files[0])} />
                        <button type="button" onClick={onDelete} disabled={!preview} className="py-2 px-3 text-xs font-medium rounded-lg border border-stone-200 text-red-500 hover:bg-stone-50 disabled:opacity-50">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ThumbnailUploader;