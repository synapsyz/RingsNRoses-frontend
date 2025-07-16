import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const PriceCard =({prices, selectedPriceRange, setSelectedPriceRange, priceSliderValue, setPriceSliderValue})=>{
    return (
        <>
        <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
            <div className="mb-3">
              <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">Price</span>
            </div>
            <ul className="space-y-2">
                    {prices.map((price) => (
                      <li key={price.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`price-${price.id}`}
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-[#E91E63] focus:ring-[#E91E63] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-[#E91E63] dark:checked:border-[#E91E63] dark:focus:ring-offset-gray-800"
                          checked={selectedPriceRange && selectedPriceRange.id === price.id}
                          onChange={() => setSelectedPriceRange(selectedPriceRange && selectedPriceRange.id === price.id ? null : price)}
                        />
                        <label
                          htmlFor={`price-${price.id}`}
                          className="text-sm text-gray-500 ms-3 dark:text-neutral-500"
                        >
                          {price.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
            <Slider
                range
                min={0}
                max={10000} // Set max price to 10000
                defaultValue={[0, 10000]}
                value={priceSliderValue}
                onChange={value => setPriceSliderValue(value)}
                onAfterChange={value => setSelectedPriceRange({ min: value[0], max: value[1] })}
                trackStyle={[{ backgroundColor: '#E91E63' }]}
                handleStyle={[{ borderColor: '#E91E63' }, { borderColor: '#E91E63' }]}
                railStyle={{ backgroundColor: '#e0e0e0' }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-neutral-400">
                <span>₹{priceSliderValue[0]}</span>
                <span>₹{priceSliderValue[1] === 10000 ? '10000+' : priceSliderValue[1]}</span>
            </div>
          </div>
          </div>
        </>
    )
}
export default PriceCard;