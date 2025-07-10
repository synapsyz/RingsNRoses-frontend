import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useId } from 'react';
import axios from 'axios';

async function initiateUpload(filename, contentType, size) {
  const api_url = process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;

  const { data } = await axios.post(`${api_url}/api/v1/upload/initiate/`, {
    filename: filename,
    content_type: contentType,
    size: size,
  });
  return data;
}

const CertificateManager = forwardRef(function BeautyCertificateManager({ initialMedia = [], onUpdate, pathPrefix }, ref) {
  const [existingMedia, setExistingMedia] = useState(initialMedia);
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef(null);
  const uniqueId = useId();

  useImperativeHandle(ref, () => ({
    async upload() {
        if (newFiles.length === 0) {
            return { success: true, keys: [] };
        }

        setIsUploading(true);
        const uploadedKeys = [];

        const file = newFiles[0]; 
        const uniqueFileName = `${pathPrefix}/${Date.now()}-${file.name}`;
        try {
            const uploadData = await initiateUpload(
                uniqueFileName,
                file.type,
                file.size
            );

            if (uploadData.upload_type === 'single') {
                console.log(`Performing single file upload for ${file.name}...`);
                await axios.put(uploadData.url, file, {
                    headers: { "Content-Type": file.type }
                });
                uploadedKeys.push(uploadData.key);
            } 
            else if (uploadData.upload_type === 'multipart') {
                const errorMessage = `Multipart upload for ${file.name} is not implemented.`;
                console.error(errorMessage);
            }
        } catch (err) {
            console.error(`Upload failed for file: ${file.name}`, err);
            return { success: false, message: `Upload failed for ${file.name}: ${err.message}`, keys: uploadedKeys };
        }
        
        setIsUploading(false);
        return { success: true, keys: uploadedKeys };
    }
  }));

  useEffect(() => {
    setExistingMedia(initialMedia);
  }, [initialMedia]);

  useEffect(() => {
    onUpdate(existingMedia, newFiles);
  }, [existingMedia, newFiles, onUpdate]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      if (previews.length > 0) { 
        URL.revokeObjectURL(previews[0].url);
      }
      setNewFiles([files[0]]);
      setPreviews([{
        url: URL.createObjectURL(files[0]),
        type: files[0].type,
      }]);
    } else {
      setNewFiles([]);
      setPreviews([]);
    }
    
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };
  
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveExisting = (index) => {
    setExistingMedia(current => current.filter((_, i) => i !== index));
    
    setNewFiles([]);
    setPreviews([]);
  };

  const handleRemoveNew = (index) => {
    URL.revokeObjectURL(previews[index].url);
    setNewFiles([]); 
    setPreviews([]); 
  };

  const renderMediaItem = (url, type, index, isNew = false) => {
  const isVideo = (type || '').startsWith('video/') || 
                    (url || '').endsWith('.mp4') || 
                    (url || '').endsWith('.mov');
    return (
      <div key={isNew ? `new-${index}` : `existing-${index}`} className="relative group bg-stone-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
        {isVideo ? (
          <video src={url} className="w-full h-24 object-cover" controls />
        ) : (
          <img src={url} alt={`Media item ${index + 1}`} className="w-full h-24 object-cover" />
        )}
        <button
          type="button"
          onClick={() => (isNew ? handleRemoveNew(index) : handleRemoveExisting(index))}
          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Remove media"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    );
  };

  const isGalleryEmpty = existingMedia.length === 0 && previews.length === 0;
  const canAddMore = existingMedia.length === 0 && newFiles.length === 0;

  return (
    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
      <div className="py-3 px-5 flex justify-between items-center border-b border-stone-200 dark:border-neutral-700">
        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
          Media Gallery
        </h2>
        
        {isUploading ? (
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">Uploading...</span>
        ) : (
          (!isGalleryEmpty && canAddMore) && (
            <button
              type="button"
              onClick={handleBrowseClick}
              className="text-sm font-semibold text-green-600 hover:text-green-700 focus:outline-none decoration-2 hover:underline disabled:opacity-50"
            >
              Add More
            </button>
          )
        )}
      </div>

      <div className="p-5 space-y-4">
        {!isGalleryEmpty ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingMedia.slice(0,1).map((url, index) => renderMediaItem(url, '', index, false))}
                {previews.slice(0,1).map((p, index) => renderMediaItem(p.url, p.type, index, true))}
            </div>
        ) : (
            <label htmlFor={uniqueId} className={`p-12 flex flex-col justify-center items-center text-center bg-white border border-dashed border-stone-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600 ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <svg className="w-16 text-stone-400 mx-auto dark:text-neutral-400" width="70" height="46" viewBox="0 0 70 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.05172 9.36853L17.2131 7.5083V41.3608L12.3018 42.3947C9.01306 43.0871 5.79705 40.9434 5.17081 37.6414L1.14319 16.4049C0.515988 13.0978 2.73148 9.92191 6.05172 9.36853Z" fill="currentColor" stroke="currentColor" strokeWidth="2" className="fill-white stroke-stone-400 dark:fill-neutral-800 dark:stroke-neutral-500" />
                  <path d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z" fill="currentColor" stroke="currentColor" strokeWidth="2" className="fill-white stroke-stone-400 dark:fill-neutral-800 dark:stroke-neutral-500" />
                  <rect x="17.0656" y="1.62305" width="35.8689" height="42.7541" rx="5" fill="currentColor" stroke="currentColor" strokeWidth="2" className="fill-white stroke-stone-400 dark:fill-neutral-800 dark:stroke-neutral-500" />
                  <path d="M47.9344 44.3772H22.0655C19.3041 44.3772 17.0656 42.1386 17.0656 39.3772L17.0656 35.9161L29.4724 22.7682L38.9825 33.7121C39.7832 34.6335 41.2154 34.629 42.0102 33.7025L47.2456 27.5996L52.9344 33.7209V39.3772C52.9344 42.1386 50.6958 44.3772 47.9344 44.3772Z" stroke="currentColor" strokeWidth="2" className="stroke-stone-400 dark:stroke-neutral-500" />
                  <circle cx="39.5902" cy="14.9672" r="4.16393" stroke="currentColor" strokeWidth="2" className="stroke-stone-400 dark:stroke-neutral-500" />
                </svg>
                <div className="mt-4 text-sm/6 text-stone-600">
                  <span className="pe-1 font-medium text-stone-800 dark:text-neutral-200">
                    {isUploading ? 'Uploading...' : 'Drop your file here or '}
                  </span>
                  {!isUploading && <span className="font-semibold text-green-600">browse</span>}
                </div>
                <p className="mt-1 text-xs text-stone-400 dark:text-neutral-400">Upload Image & Video</p>
            </label>
        )}
        
        <input
            ref={fileInputRef}
            id={uniqueId}
            type="file"
            className="sr-only"
            multiple={false} 
            accept="image/*,video/*"
            onChange={handleFileChange}
            disabled={isUploading || (!isGalleryEmpty && !canAddMore)} 
        />
      </div>
    </div>
  );
});

export default CertificateManager;