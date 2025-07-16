const DealToggle =({isOn, handleToggle})=>{
    return (
<>
<div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <label
                htmlFor="hs-pro-sale"
                className="flex-1 cursor-pointer font-medium text-sm text-gray-800 dark:text-neutral-200"
              >
                Deal
              </label>
              <label htmlFor="hs-pro-sale" className="relative inline-block w-11 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  id="hs-pro-sale"
                  className="peer sr-only"
                  checked={isOn} 
                  onChange={handleToggle} 
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-[#E91E63] dark:bg-neutral-700 dark:peer-checked:bg-[#E91E63] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
              </label>
            </div>
          </div>
</>
    )
}
export default DealToggle;