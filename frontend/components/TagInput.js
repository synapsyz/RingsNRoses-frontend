import React, { useState } from 'react';

const TagInput = () => {
  // State to hold the current value of the input field
  const [inputValue, setInputValue] = useState('');
  // State to hold the array of tags
  const [tags, setTags] = useState([]);

  // Handle the keydown event in the input field
  const handleKeyDown = (e) => {
    if (e.key === ',') {
      // Prevent the comma from being entered into the input
      e.preventDefault();

      // Trim whitespace from the input and check if it's not empty
      const newTag = inputValue.trim();
      if (newTag) {
        // Add the new tag to the tags array
        setTags([...tags, newTag]);
        // Clear the input field
        setInputValue('');
      }
    }
  };

  // Remove a tag from the tags array
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <label htmlFor="eventSpaces" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
        Event Spaces
      </label>
      {/* Container for the tags and the input field */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 sm:p-2 w-full border border-stone-200 rounded-lg focus-within:z-10 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:focus-within:ring-neutral-600">
        {/* Map over the tags array and display each tag */}
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-x-1 py-1 px-2 bg-green-100 text-green-800 border border-green-200 rounded-md text-sm dark:bg-green-800/30 dark:text-green-500 dark:border-green-700">
            <span>{tag}</span>
            <button
              type="button"
              className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        {/* The actual input field */}
        <input
          id="eventSpaces"
          type="text"
          className="flex-grow bg-transparent outline-none sm:text-sm text-stone-800 placeholder:text-stone-500 dark:text-neutral-200 dark:placeholder:text-neutral-500"
          placeholder={tags.length === 0 ? "e.g., halls, lawns" : ""}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagInput;