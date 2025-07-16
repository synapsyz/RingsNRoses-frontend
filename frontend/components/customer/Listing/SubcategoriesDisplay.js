const SubcategoriesDisplay = ({subcategories, handleCheckboxChange,checkedItems}) => {
  return (
    <>
      <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
        <div className="mb-3">
          <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">
            Category
          </span>
        </div>
        <ul className="space-y-2">
          {subcategories.map((sub) => (
            <li key={sub.id} className="flex items-center">
              <input
                type="checkbox"
                id={`sub-${sub.id}`}
                className="shrink-0 mt-0.5 border-gray-200 rounded text-[#E91E63] focus:ring-[#E91E63] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-[#E91E63] dark:checked:border-[#E91E63] dark:focus:ring-offset-gray-800"
                checked={checkedItems[sub.id] || false}
                onChange={() => handleCheckboxChange(sub.id)}
              />
              <label
                htmlFor={`sub-${sub.id}`}
                className="text-sm text-gray-500 ms-3 dark:text-neutral-500"
              >
                {sub.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default SubcategoriesDisplay;
