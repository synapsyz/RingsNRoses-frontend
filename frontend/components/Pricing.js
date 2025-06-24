const Pricing = ({ perPlatePrice, setPerPlatePrice }) => {
    return (
                <div>
                    <label htmlFor="perPlatePrice" className="block mb-2 text-sm font-medium">Per Plate Price</label>
                    <div className="relative">
                        <input id="perPlatePrice" type="number" className="py-2 px-3 block w-full border border-stone-200 rounded-lg text-sm" placeholder="800.00" value={perPlatePrice} onChange={(e) => setPerPlatePrice(e.target.value)} />
                        <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-stone-600">
                            <span className="text-sm">INR</span>
                        </div>
                    </div>
                </div>  
    );
};

export default Pricing;