import FormInput from './FormInput'; // Make sure this path is correct

const ServicePackages = ({
  packages, // Renamed from photographyPackages to a more generic 'packages'
  togglePackage,
  addPackage,
  handlePackageChange,
  handleEquipmentBlur,
  handleEquipmentKeyDown,
  removeEquipmentTag,
  deletePackage,
  sectionTitle, // New prop for the title (e.g., "Photography Packages", "Beauty & Grooming Packages")
  equipmentLabel = "Equipment", // New prop for customizable equipment label, with a default
  equipmentPlaceholder = "e.g., 2 Cameras, 1 Drone, Lighting Kit", // New prop for customizable include_itwms placeholder
  errors,
}) => {
  return (
    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">{sectionTitle}</h2> {/* Use sectionTitle prop */}
      </div>
      <div className="p-5 space-y-6">
        {packages.map((pkg, index) => ( // Use 'packages' prop
          <div key={pkg.id} className="border border-stone-200 rounded-lg dark:border-neutral-700 overflow-hidden">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => togglePackage(pkg.id)}
            >
              <h3 className="font-semibold text-stone-700 dark:text-neutral-300">Package {index + 1}</h3>
              <div className="flex items-center gap-x-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePackage(pkg.id);
                  }}
                  className="text-sm font-medium text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <div
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${pkg.isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
            >
              <div className="px-4 pb-4 space-y-3">
                <FormInput
                  id={`packageName-${pkg.id}`}
                  label="Package Name"
                  placeholder="Basic Wedding Package"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(pkg.id, 'name', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <FormInput
                  id={`packageDescription-${pkg.id}`}
                  label="One-Line Description"
                  placeholder="Covers ceremony and reception for 4 hours."
                  value={pkg.description}
                  onChange={(e) => handlePackageChange(pkg.id, 'description', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <FormInput
                  id={`packagePricing-${pkg.id}`}
                  label="Package Pricing"
                  type="number"
                  placeholder="e.g., 15000"
                  value={pkg.pricing}
                  onChange={(e) => handlePackageChange(pkg.id, 'pricing', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  required
                  error={errors[`packagePricing-${pkg.id}`]} 
                />
                <div>
                  <label htmlFor={`packageEquipment-${pkg.id}`} className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                    {equipmentLabel} {/* Use equipmentLabel prop */}
                  </label>
                  <div className="flex flex-wrap items-center gap-2 p-1.5 sm:p-2 w-full border border-stone-200 rounded-lg focus-within:z-10 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:focus-within:ring-neutral-600">
                    {Array.isArray(pkg.included_items) && pkg.included_items.map((tag, tagIndex) => (
                      <div key={tagIndex} className="flex items-center gap-x-1 py-1 px-2 bg-green-100 text-green-800 border border-green-200 rounded-md text-sm dark:bg-green-800/30 dark:text-green-500 dark:border-green-700">
                        <span>{tag}</span>
                        <button
                          type="button"
                          className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
                          onClick={(e) => { e.stopPropagation(); removeEquipmentTag(pkg.id, tag); }}
                          aria-label={`Remove ${tag}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <input
                      id={`packageEquipment-${pkg.id}`}
                      type="text"
                      className="flex-grow bg-transparent outline-none sm:text-sm text-stone-800 placeholder:text-stone-500 dark:text-neutral-200 dark:placeholder:text-neutral-500"
                      placeholder={pkg.included_items.length === 0 ? equipmentPlaceholder : ""} 
                      value={pkg.equipmentInput || ''}
                      onChange={(e) => handlePackageChange(pkg.id, 'equipmentInput', e.target.value)}
                      onKeyDown={(e) => handleEquipmentKeyDown(pkg.id, e)}
                      onBlur={(e) => { handleEquipmentBlur(pkg.id, e.target.value); handlePackageChange(pkg.id, 'equipmentInput', ''); }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addPackage}
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          + Add Package
        </button>
      </div>
    </div>
  );
};

export default ServicePackages;