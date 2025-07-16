import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const CapacityCard = ({selectedCategoryId, capacities, selectedCapacity, setSelectedCapacity,capacitySliderValue, setCapacitySliderValue})=>{
    return(
        <>
        {selectedCategoryId === 1 && (
        <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
          <div className="mb-3">
            <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">Capacity</span>
          </div>
          <div className="space-y-2">
            {capacities.map((capacity) => (
                      <li key={capacity.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`capacity-${capacity.id}`}
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-[#E91E63] focus:ring-[#E91E63] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-[#E91E63] dark:checked:border-[#E91E63] dark:focus:ring-offset-gray-800"
                          checked={selectedCapacity && selectedCapacity.id === capacity.id}
                          onChange={() => setSelectedCapacity(selectedCapacity && selectedCapacity.id === capacity.id ? null : capacity)}
                        />
                        <label
                          htmlFor={`capacity-${capacity.id}`}
                          className="text-sm text-gray-500 ms-3 dark:text-neutral-500"
                        >
                          {capacity.label}
                        </label>
                      </li>
                    ))}
          </div>
          <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
            <Slider
                range
                min={0}
                max={1000} // Set max capacity to 1000
                defaultValue={[0, 1000]}
                value={capacitySliderValue}
                onChange={value => setCapacitySliderValue(value)}
                onAfterChange={value => setSelectedCapacity({ min: value[0], max: value[1] })}
                trackStyle={[{ backgroundColor: '#E91E63' }]}
                handleStyle={[{ borderColor: '#E91E63' }, { borderColor: '#E91E63' }]}
                railStyle={{ backgroundColor: '#e0e0e0' }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-neutral-400">
                <span>{capacitySliderValue[0]}</span>
                <span>{capacitySliderValue[1] === 1000 ? '1000+' : capacitySliderValue[1]}</span>
            </div>
          </div>
        </div>
      )}
        </>
    )
}
export default  CapacityCard;