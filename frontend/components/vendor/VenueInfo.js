import React from 'react';
import ThumbnailUploader from '@/components/ThumbnailUploader';
import TiptapEditor from '@/components/TiptapEditor';


const VenueInfo = ({ venueName, setVenueName, managerName, setManagerName, contactNumber, setContactNumber, emailAddress, setEmailAddress, about, setAbout, thumbnailUrl, handleFileChange, handleDeleteThumbnail, thumbnailUploaderRef }) => {
    return (
        <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                    Services info
                </h2>
            </div>
            <div className="p-5 space-y-4">
                <ThumbnailUploader
                    ref={thumbnailUploaderRef}
                    preview={thumbnailUrl}
                    onFileChange={handleFileChange}
                    onDelete={handleDeleteThumbnail}
                />
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                    <div>
                        <label htmlFor="venueName" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Name</label>
                        <input id="venueName" type="text" className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm" placeholder="Royal Palace Banquet" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="managerName" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Manager Name</label>
                        <input id="managerName" type="text" className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm" placeholder="John Doe" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                    <div>
                        <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Contact Number</label>
                        <input id="contactNumber" type="text" className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm" placeholder="+919999999998" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="emailAddress" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Email Address</label>
                        <input id="emailAddress" type="text" className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm" placeholder="mahal@email.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Description (About)</label>
                    <TiptapEditor
                        content={about}
                        onUpdate={setAbout}
                        placeholder="Add a detailed description of your venue..."
                    />
                </div>
            </div>
        </div>
    );
};

export default VenueInfo;