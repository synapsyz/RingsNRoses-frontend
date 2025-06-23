import React from 'react';

const SocialLinks = ({ websiteLink, setWebsiteLink, instagramLink, setInstagramLink, facebookLink, setFacebookLink }) => {
    return (
        <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="py-3 px-5 border-b">
                <h2 className="font-semibold">Social Media Links</h2>
            </div>
            <div className="p-5 grid sm:grid-cols-1 gap-5">
                <div>
                    <label htmlFor="websiteLink" className="block mb-2 text-sm font-medium">Website Link</label>
                    <input id="websiteLink" type="url" className="py-2 px-3 block w-full border border-stone-200 rounded-lg text-sm" placeholder="https://example.com" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="instagramLink" className="block mb-2 text-sm font-medium">Instagram Link</label>
                    <input id="instagramLink" type="url" className="py-2 px-3 block w-full border border-stone-200 rounded-lg text-sm" placeholder="https://instagram.com/yourvenue" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="facebookLink" className="block mb-2 text-sm font-medium">Facebook Link</label>
                    <input id="facebookLink" type="url" className="py-2 px-3 block w-full border border-stone-200 rounded-lg text-sm" placeholder="https://facebook.com/yourvenue" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} />
                </div>
            </div>
        </div>
    );
};

export default SocialLinks;