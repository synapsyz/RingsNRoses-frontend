import React from 'react';

const Pricing = ({ perPlatePrice, setPerPlatePrice }) => {
    return (
        <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="py-3 px-5 border-b">
                <h2 className="font-semibold">Pricing</h2>
            </div>
            <div className="p-5 space-y-4">
                <div>
                    <label htmlFor="perPlatePrice" className="block mb-2 text-sm font-medium">Per Plate Price</label>
                    <div className="relative">
                        <input id="perPlatePrice" type="number" className="py-2 px-3 block w-full border border-stone-200 rounded-lg text-sm" placeholder="800.00" value={perPlatePrice} onChange={(e) => setPerPlatePrice(e.target.value)} />
                        <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-stone-600">
                            <span className="text-sm">INR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;