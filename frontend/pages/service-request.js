"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Header from "@/components/customer/Header";
import LocationSelector from "@/components/LocationSelector";
import { useSession } from "next-auth/react";
const isNgrok = process.env.NEXT_PUBLIC_AP1P_ENV !== "development";
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
const api_url = getApiUrl();
const api = axios.create({
  baseURL: `${api_url}/api/v1`,
  headers: {
    ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
  },
});

const VENUES_CATEGORY_API_ID = 1;
const VENUES_SERVICE_KEY = 'venues';

const ATTIRE_CATEGORY_API_ID = 2;
const ATTIRE_SERVICE_KEY = 'attire';

const BEAUTY_CATEGORY_API_ID = 3;
const BEAUTY_SERVICE_KEY = 'beauty';

const PHOTOGRAPHY_CATEGORY_API_ID = 4;
const PHOTOGRAPHY_SERVICE_KEY = 'photography';

const ENTERTAINMENT_CATEGORY_API_ID = 5;
const ENTERTAINMENT_SERVICE_KEY = 'entertainment';

const CATERING_CATEGORY_API_ID = 6;
const CATERING_SERVICE_KEY = 'catering';

const DECORATION_CATEGORY_API_ID = 7;
const DECORATION_SERVICE_KEY = 'decoration';

const INVITATIONS_CATEGORY_API_ID = 8;
const INVITATIONS_SERVICE_KEY = 'invitations';

const GIFTS_CATEGORY_API_ID = 9;
const GIFTS_SERVICE_KEY = 'gifts';

const TRANSPORTATION_CATEGORY_API_ID = 10;
const TRANSPORTATION_SERVICE_KEY = 'transportation';

const TECH_CATEGORY_API_ID = 12;
const TECH_SERVICE_KEY = 'tech';

const ACCESSORIES_CATEGORY_API_ID = 13;
const ACCESSORIES_SERVICE_KEY = 'accessories';

const MISC_CATEGORY_API_ID = 14;
const MISC_SERVICE_KEY = 'misc';

const EFFECTS_CATEGORY_API_ID = 15;
const EFFECTS_SERVICE_KEY = 'effects';

const STAFFING_CATEGORY_API_ID = 16;
const STAFFING_SERVICE_KEY = 'staffing';

const serviceDetailsData = {
    [VENUES_SERVICE_KEY]: {
        name: 'Venues',
        allowMultiple: true,
        fields: [
            { label: 'Event Type / Name', type: 'text', name: 'venue_event_name', placeholder: 'e.g., Sangeet, Reception' },
            { label: 'Guest Capacity', type: 'number', name: 'venue_capacity', placeholder: 'e.g., 150' },
            { label: 'Do you require catering from the venue?', type: 'radio', name: 'venue_catering', options: ['Yes', 'No', 'Not Sure'] }
        ]
    },
    [ATTIRE_SERVICE_KEY]: {
        name: 'Bride & Groom Attire',
        allowMultiple: false,
        fields: [
            { label: 'For Whom is the Attire?', type: 'text', name: 'attire_for', placeholder: 'e.g., Bride, Groom, Both' },
            { label: 'Type of Attire Needed', type: 'text', name: 'attire_type', placeholder: 'e.g., Wedding Gown, Tuxedo' }
        ]
    },
    [BEAUTY_SERVICE_KEY]: {
        name: 'Beauty & Grooming',
        allowMultiple: true,
        fields: [
            { label: 'Number of Individuals for Service', type: 'number', name: 'beauty_count', placeholder: 'e.g., 5' },
            { label: 'Any Specific Requirements/Notes', type: 'textarea', name: 'beauty_notes', placeholder: 'e.g., Airbrush makeup...' }
        ]
    },
    [PHOTOGRAPHY_SERVICE_KEY]: {
        name: 'Photography & Videography',
        allowMultiple: true,
        fields: [
            { label: 'Event to Cover', type: 'text', name: 'photo_event_name', placeholder: 'e.g., Full Wedding, Pre-wedding Shoot' },
            { label: 'Desired Deliverables', type: 'checkbox-group', name: 'photo_deliverables', options: ['Online Gallery', 'Album', 'Film', 'Drone', 'Same-day Edit'] },
            { label: 'Duration of Coverage', type: 'text', name: 'photo_duration', placeholder: 'e.g., 8 hours' },
        ]
    },
    [ENTERTAINMENT_SERVICE_KEY]: {
        name: 'Entertainment',
        allowMultiple: true,
        fields: [
            { label: 'Event for Entertainment', type: 'text', name: 'entertainment_event_name', placeholder: 'e.g., Sangeet Night' },
            { label: 'Select Entertainment Options', type: 'checkbox-group', name: 'entertainment_options', options: ['Live Band', 'DJ', 'MC / Host', 'Dancers', 'Photobooth'] },
            { label: 'Duration of Performance', type: 'text', name: 'entertainment_duration', placeholder: 'e.g., 3 hours' },
        ]
    },
    [CATERING_SERVICE_KEY]: {
        name: 'Catering',
        allowMultiple: true,
        fields: [
            { label: 'Event / Meal Type', type: 'text', name: 'catering_event_name', placeholder: 'e.g., Wedding Lunch, Reception Dinner' },
            { label: 'Food Package Preference', type: 'radio', name: 'catering_package', options: ['Vegetarian', 'Non-Vegetarian', 'Both'] },
            { label: 'Cuisine Preference', type: 'text', name: 'catering_cuisine', placeholder: 'e.g., Italian, Indian, Fusion' }
        ]
    },
    [DECORATION_SERVICE_KEY]: {
        name: 'Decoration',
        allowMultiple: true,
        fields: [
            { label: 'Event to Decorate', type: 'text', name: 'decoration_event_name', placeholder: 'e.g., Mehendi, Main Ceremony' },
            { label: 'Select Decoration Types', type: 'checkbox-group', name: 'decoration_types', options: ['Floral', 'Lighting', 'Stage', 'Entrance', 'Mandap'] },
            { label: 'Describe your theme or vision', type: 'textarea', name: 'decoration_vision', placeholder: 'e.g., Rustic chic, Tropical...' }
        ]
    },
    [INVITATIONS_SERVICE_KEY]: {
        name: 'Invitations & Stationery',
        allowMultiple: false,
        fields: [
            { label: 'Type of Stationery Needed', type: 'text', name: 'invitation_type', placeholder: 'e.g., Save the Dates, Wedding Invitations' },
            { label: 'Personalization/Customization Needs', type: 'textarea', name: 'invitation_customization', placeholder: 'e.g., Custom monogram, specific color scheme...' }
        ]
    },
    [GIFTS_SERVICE_KEY]: {
        name: 'Gifts & Favors',
        allowMultiple: false,
        fields: [
            { label: 'Type of Gifts/Favors Needed', type: 'text', name: 'gift_type', placeholder: 'e.g., Personalized candles' },
            { label: 'Quantity Needed', type: 'number', name: 'gift_quantity', placeholder: 'e.g., 200' }
        ]
    },
    [TRANSPORTATION_SERVICE_KEY]: {
        name: 'Transportation',
        allowMultiple: true,
        fields: [
            { label: 'Purpose of Transportation', type: 'text', name: 'transport_purpose', placeholder: 'e.g., Guest Shuttle, Bride & Groom Car' },
            { label: 'Type of Vehicle/Transportation Needed', type: 'text', name: 'transport_type', placeholder: 'e.g., Vintage car, 50-seater bus' },
            { label: 'Specific Preferences / Amenities', type: 'textarea', name: 'transport_amenities', placeholder: 'e.g., Champagne, specific decorations...' }
        ]
    },
    [TECH_SERVICE_KEY]: {
        name: 'Tech Support',
        allowMultiple: true,
        fields: [
            { label: 'Type of Tech Support Service Needed', type: 'text', name: 'tech_type', placeholder: 'e.g., Livestreaming setup, AV technician' }
        ]
    },
    [ACCESSORIES_SERVICE_KEY]: {
        name: 'Accessories & Jewelry',
        allowMultiple: false,
        fields: [
            { label: 'Type of Accessory/Jewelry Needed', type: 'text', name: 'accessory_type', placeholder: 'e.g., Veil, Cufflinks, Necklace' }
        ]
    },
    [MISC_SERVICE_KEY]: {
        name: 'Miscellaneous Support',
        allowMultiple: true, // Assuming miscellaneous support might be needed for multiple items/services
        fields: [
            { label: 'Specific Equipment/Items Needed', type: 'text', name: 'misc_equipment', placeholder: 'e.g., Projector, sound system' },
            { label: 'Type of Miscellaneous Support Service Needed', type: 'text', name: 'misc_service', placeholder: 'e.g., Childcare services' }
        ]
    },
    [EFFECTS_SERVICE_KEY]: {
        name: 'Special Effects & Props',
        allowMultiple: true, // Assuming multiple effects/props might be needed
        fields: [
            { label: 'Type of Special Effects / Props Needed', type: 'text', name: 'effects_type', placeholder: 'e.g., Dry ice, photo booth props' }
        ]
    },
    [STAFFING_SERVICE_KEY]: {
        name: 'Event Staffing',
        allowMultiple: true, // Assuming multiple staffing needs
        fields: [
            { label: 'Type of Staff Needed & Quantity', type: 'text', name: 'staff_type', placeholder: 'e.g., 4 Waiters, 1 Coordinator' },
            { label: 'Specific Duties / Responsibilities', type: 'textarea', name: 'staff_duties', placeholder: 'Describe the tasks for the staff...' }
        ]
    },
};

// Map API category IDs to service keys for dynamic data
const categoryIdToServiceKeyMap = {
    [VENUES_CATEGORY_API_ID]: VENUES_SERVICE_KEY,
    [ATTIRE_CATEGORY_API_ID]: ATTIRE_SERVICE_KEY,
    [BEAUTY_CATEGORY_API_ID]: BEAUTY_SERVICE_KEY,
    [PHOTOGRAPHY_CATEGORY_API_ID]: PHOTOGRAPHY_SERVICE_KEY,
    [ENTERTAINMENT_CATEGORY_API_ID]: ENTERTAINMENT_SERVICE_KEY,
    [CATERING_CATEGORY_API_ID]: CATERING_SERVICE_KEY,
    [DECORATION_CATEGORY_API_ID]: DECORATION_SERVICE_KEY,
    [INVITATIONS_CATEGORY_API_ID]: INVITATIONS_SERVICE_KEY,
    [GIFTS_CATEGORY_API_ID]: GIFTS_SERVICE_KEY,
    [TRANSPORTATION_CATEGORY_API_ID]: TRANSPORTATION_SERVICE_KEY,
    // New mappings
    [TECH_CATEGORY_API_ID]: TECH_SERVICE_KEY,
    [ACCESSORIES_CATEGORY_API_ID]: ACCESSORIES_SERVICE_KEY,
    [MISC_CATEGORY_API_ID]: MISC_SERVICE_KEY,
    [EFFECTS_CATEGORY_API_ID]: EFFECTS_SERVICE_KEY,
    [STAFFING_CATEGORY_API_ID]: STAFFING_SERVICE_KEY,
    // Category ID 11 is intentionally left out as per your requirement (no questions needed)
};


// --- Reusable UI Components ---

// FormField component
const FormField = ({ field, value, onChange }) => {
    // Keep original classes consistent with the provided CSS
    const commonClasses = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 dark:bg-neutral-800 dark:text-white dark:border-neutral-600";
    const primaryColor = '#E91E63'; // Extracted primary color for consistency
    const fieldId = `${field.name}-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <div className={field.type === 'checkbox-group' || field.type === 'textarea' ? 'col-span-full' : ''}> {/* Adjusted col-span for checkbox-group and textarea */}
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">{field.label}</label>
            {field.type === 'textarea' ? (
                <textarea id={fieldId} name={field.name} rows="3" className={commonClasses} placeholder={field.placeholder || ''} value={value || ''} onChange={onChange} />
            ) : field.type === 'radio' ? (
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                    {field.options.map((option, index) => (
                        <div key={index} className="flex items-center">
                            <input id={`${fieldId}_${index}`} name={field.name} type="radio" value={option} checked={value === option} onChange={onChange} className="h-4 w-4 rounded focus:ring-rose-500 border-gray-300 dark:border-neutral-600 dark:bg-neutral-800" style={{ color: primaryColor }} /> {/* Using style prop for dynamic color */}
                            <label htmlFor={`${fieldId}_${index}`} className="ml-2 block text-sm text-gray-900 dark:text-neutral-300">{option}</label>
                        </div>
                    ))}
                </div>
            ) : field.type === 'checkbox-group' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-2">
                    {field.options.map((option, index) => (
                        <div key={index} className="flex items-center">
                            <input id={`${fieldId}_${index}`} name={field.name} type="checkbox" value={option} checked={value && value.includes(option)} onChange={onChange} className="h-4 w-4 rounded focus:ring-rose-500 border-gray-300 dark:border-neutral-600 dark:bg-neutral-800" style={{ color: primaryColor }} /> {/* Using style prop for dynamic color */}
                            <label htmlFor={`${fieldId}_${index}`} className="ml-2 block text-sm text-gray-900 dark:text-neutral-300">{option}</label>
                        </div>
                    ))}
                </div>
            ) : (
                <input type={field.type} id={fieldId} name={field.name} className={commonClasses} placeholder={field.placeholder || ''} value={value || ''} onChange={onChange} />
            )}
        </div>
    );
};
const Stepper = ({ currentStep, steps }) => {
    const primaryColor = '#E91E63'; // Extracted primary color for consistency

    return (
        <div className="flex justify-center mt-4 mb-8"> {/* Added mb-8 for spacing */}
            {steps.map((step, index) => (
                <React.Fragment key={step.name}>
                    <div className="flex flex-col items-center mx-4"> {/* Container for number and name, added mx-4 for spacing */}
                        <div className={`px-4 py-2 rounded-full text-sm font-medium ${currentStep === (index + 1) ? 'text-white' : 'bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-neutral-300'}`}
                            style={{ backgroundColor: currentStep === (index + 1) ? primaryColor : undefined }}> {/* Dynamic background for active step */}
                            {index + 1}
                        </div>
                        <div className="mt-2 text-sm text-gray-700 dark:text-neutral-300 text-center">
                            {step.name}
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className="-mt-6 mx-6 h-0.5 w-16 bg-gray-300 dark:bg-neutral-600 self-center"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// Notification component
const Notification = ({ message, count, type, onClose }) => {
    const [width, setWidth] = useState(100);
    const primaryColor = '#E91E63'; // Extracted primary color for consistency

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // 3 seconds

        const interval = setInterval(() => {
            setWidth(prevWidth => {
                if (prevWidth <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevWidth - (100 / 60); // Decrease by 100% over 3 seconds (3000ms / 50ms interval = 60 steps)
            });
        }, 50); // Update every 50ms for smooth animation

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onClose]);

    const bgColor = type === 'added' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-4 right-4 ${bgColor} text-white p-4 rounded-lg shadow-lg z-50 w-80`}>
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{message}</span>
                <button onClick={onClose} className="text-white hover:text-gray-200">
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="text-sm mb-2">Total selected: {count}</div>
            <div className="w-full bg-gray-300 rounded-full h-1.5 dark:bg-gray-700">
                <div className="h-1.5 rounded-full" style={{ width: `${width}%`, backgroundColor: primaryColor }}></div>
            </div>
        </div>
    );
};

export default function ServiceRequest() {
  const { data: session, status } = useSession();
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [subcategoriesError, setSubcategoriesError] = useState(null);

  // Stores all selected subcategories across all categories: { subcategoryId: true/false }
  const [selectedSubcategories, setSelectedSubcategories] = useState({});

  // Caches fetched subcategories to avoid refetching on category accordion close/open
  const subcategoryCache = useRef({});

  // Stores data for dynamic service forms: { serviceKey: { fieldName: value } or [{ instanceId: ..., fieldName: value }] }
  const [dynamicServiceData, setDynamicServiceData] = useState({});

  // Notification state
  const [notification, setNotification] = useState(null); // { message: '', count: 0, type: 'added'/'removed' }

  // Primary color for dynamic styling
  const primaryColor = '#E91E63';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get("/categories");
        setCategories(response.data.results);
      } catch (err) {
        setError("Failed to fetch categories. Please try again later.");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Effect to initialize or clean up dynamicServiceData based on selected subcategories (mapped to categories)
  useEffect(() => {
    const updatedDynamicServiceData = { ...dynamicServiceData };
    const currentlySelectedCategoryIds = new Set(
        Object.keys(selectedSubcategories)
              .filter(id => selectedSubcategories[id])
              .map(subId => {
                  // Find the category ID for this subcategory
                  for (const catId in subcategoryCache.current) {
                      if (subcategoryCache.current[catId].some(sub => String(sub.id) === String(subId))) {
                          return parseInt(catId, 10);
                      }
                  }
                  return null;
              })
              .filter(id => id !== null)
    );

    // Filter down to unique category IDs that have at least one subservice selected
    const uniqueSelectedCategoryIds = Array.from(currentlySelectedCategoryIds);


    Object.keys(categoryIdToServiceKeyMap).forEach(catIdString => {
        const catId = parseInt(catIdString, 10);
        const serviceKey = categoryIdToServiceKeyMap[catId];
        const serviceConfig = serviceDetailsData[serviceKey];

        if (!serviceConfig) return; // Skip if no config exists for this service key

        const isCategoryActuallySelected = uniqueSelectedCategoryIds.includes(catId);

        if (isCategoryActuallySelected) {
            if (serviceConfig.allowMultiple) {
                // For services that allow multiple instances
                if (!updatedDynamicServiceData[serviceKey] || updatedDynamicDataEmpty(updatedDynamicServiceData[serviceKey], serviceConfig.fields)) {
                    const newInstance = { instanceId: Date.now() };
                    serviceConfig.fields.forEach(field => { newInstance[field.name] = field.type === 'checkbox-group' ? [] : ''; });
                    updatedDynamicServiceData[serviceKey] = [newInstance];
                }
            } else {
                // For services that do not allow multiple instances
                if (!updatedDynamicServiceData[serviceKey] || updatedDynamicDataEmpty(updatedDynamicServiceData[serviceKey], serviceConfig.fields)) {
                    const newEntry = {};
                    serviceConfig.fields.forEach(field => { newEntry[field.name] = field.type === 'checkbox-group' ? [] : ''; });
                    updatedDynamicServiceData[serviceKey] = newEntry;
                }
            }
        } else {
            // If category is no longer selected (no subservices from it are selected), remove its data
            if (updatedDynamicServiceData[serviceKey]) {
                delete updatedDynamicServiceData[serviceKey];
            }
        }
    });

    setDynamicServiceData(updatedDynamicServiceData);

    // Helper to check if dynamic data for a service is effectively "empty"
    function updatedDynamicDataEmpty(data, fields) {
        if (Array.isArray(data)) {
            return data.length === 0; // For allowMultiple, check if array is empty
        } else if (typeof data === 'object' && data !== null) {
            // For single instance, check if all fields are empty
            return fields.every(field => {
                const value = data[field.name];
                if (Array.isArray(value)) return value.length === 0;
                return value === '' || value === null || value === undefined;
            });
        }
        return true; // If data is not an array or object, consider it empty
    }

  }, [selectedSubcategories]); // Rerun when selected subcategories change


  const fetchSubcategories = async (categoryId) => {
    if (subcategoryCache.current[categoryId]) {
      setSubcategories(subcategoryCache.current[categoryId]);
      setLoadingSubcategories(false);
      return;
    }

    setLoadingSubcategories(true);
    setSubcategoriesError(null);
    try {
      const response = await api.get(`/categories/${categoryId}/subcategories/`);
      const fetchedSubcategories = response.data.results;
      setSubcategories(fetchedSubcategories);
      subcategoryCache.current[categoryId] = fetchedSubcategories;
    } catch (err) {
      setSubcategoriesError("Failed to fetch subcategories. Please try again.");
      console.error(`Error fetching subcategories for category ${categoryId}:`, err);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
      setSubcategories([]);
      setSubcategoriesError(null);
    } else {
      setSelectedCategoryId(categoryId);
      fetchSubcategories(categoryId);
    }
  };

  const handleSubcategoryChange = (subcategoryId, subcategoryName) => {
    setSelectedSubcategories((prevSelected) => {
      const isSelected = prevSelected[subcategoryId];
      const newState = {
        ...prevSelected,
        [subcategoryId]: !isSelected,
      };

      const newCount = Object.values(newState).filter(Boolean).length;
      setNotification({
          message: `${isSelected ? 'Removed' : 'Added'}: ${subcategoryName}`,
          count: newCount,
          type: isSelected ? 'removed' : 'added',
      });

      return newState;
    });
  };

  const handleRemoveSelectedSubcategory = (subcategoryId) => {
    setSelectedSubcategories((prevSelected) => {
      const subcategoryName = getSubcategoryNameById(subcategoryId); // Get name for notification
      const newState = { ...prevSelected, [subcategoryId]: false };
      const newCount = Object.values(newState).filter(Boolean).length;
      setNotification({
          message: `Removed: ${subcategoryName}`,
          count: newCount,
          type: 'removed',
      });
      return newState;
    });
  };

  const getSubcategoryNameById = (subcategoryId) => {
    for (const categoryId in subcategoryCache.current) {
        const subcategoryList = subcategoryCache.current[categoryId];
        const sub = subcategoryList.find(s => String(s.id) === String(subcategoryId));
        if (sub) return sub.name;
    }
    return 'Unknown Subcategory';
  };

  const getSelectedSubservices = () => {
    const selected = [];
    for (const categoryId in subcategoryCache.current) {
      const subcategoryList = subcategoryCache.current[categoryId];
      subcategoryList.forEach((sub) => {
        if (selectedSubcategories[sub.id]) {
          selected.push({ id: sub.id, name: sub.name, categoryId: parseInt(categoryId, 10) });
        }
      });
    }
    return selected;
  };

  const selectedSubservices = getSelectedSubservices();

  // --- Dynamic Form Handling for Step 2 ---

  const handleAddInstance = (serviceKey) => {
    const serviceConfig = serviceDetailsData[serviceKey];
    if (!serviceConfig || !serviceConfig.allowMultiple) return;

    const newInstance = { instanceId: Date.now() };
    serviceConfig.fields.forEach(field => {
      newInstance[field.name] = field.type === 'checkbox-group' ? [] : '';
    });

    setDynamicServiceData(prev => ({
      ...prev,
      [serviceKey]: [...(prev[serviceKey] || []), newInstance]
    }));
  };

  const handleRemoveInstance = (serviceKey, instanceId) => {
    setDynamicServiceData(prev => ({
      ...prev,
      [serviceKey]: prev[serviceKey].filter(item => item.instanceId !== instanceId)
    }));
  };

  const handleDynamicInputChange = (serviceKey, instanceId, e) => {
    const { name, value, type, checked } = e.target;
    setDynamicServiceData(prev => ({
      ...prev,
      [serviceKey]: prev[serviceKey].map(entry => {
        if (entry.instanceId === instanceId) {
          if (type === 'checkbox') {
            const currentValues = entry[name] || [];
            const newValues = checked ? [...currentValues, value] : currentValues.filter(item => item !== value);
            return { ...entry, [name]: newValues };
          }
          return { ...entry, [name]: value };
        }
        return entry;
      })
    }));
  };

  const handleSingleDynamicInputChange = (serviceKey, e) => {
    const { name, value, type, checked } = e.target;
    setDynamicServiceData(prev => {
      const currentData = prev[serviceKey] || {};
      if (type === 'checkbox') {
        const currentValues = currentData[name] || [];
        const newValues = checked ? [...currentValues, value] : currentValues.filter(item => item !== value);
        return { ...prev, [serviceKey]: { ...currentData, [name]: newValues } };
      }
      return { ...prev, [serviceKey]: { ...currentData, [name]: value } };
    });
  };

  const renderDynamicServiceDetails = () => {
    const detailSections = [];
    const selectedCategoryIdsForDetails = new Set(selectedSubservices.map(sub => sub.categoryId));

    Object.keys(categoryIdToServiceKeyMap).forEach(catIdString => {
        const catId = parseInt(catIdString, 10);
        const serviceKey = categoryIdToServiceKeyMap[catId];
        const serviceConfig = serviceDetailsData[serviceKey];

        // Only render if this category has been selected (i.e., has at least one subservice selected)
        // AND if it has a serviceConfig (i.e., not category ID 11)
        if (selectedCategoryIdsForDetails.has(catId) && serviceConfig) {
            // Determine the number of columns based on the number of fields
            // Max out at 3 columns for responsiveness to avoid squishing
            let numberOfColumns = serviceConfig.fields.length;
            if (numberOfColumns === 0) numberOfColumns = 1; // Default to 1 if no fields
            const gridColsClass = `grid-cols-1 md:grid-cols-${Math.min(numberOfColumns, 3)}`;

            if (serviceConfig.allowMultiple) {
                const currentInstances = dynamicServiceData[serviceKey] || [];
                // Ensure there's at least one instance if it's supposed to be rendered
                const instancesToRender = currentInstances.length > 0 ? currentInstances : [{ instanceId: Date.now() }];

                instancesToRender.forEach((instance, idx) => {
                    detailSections.push(
                        <div key={`${serviceKey}-${instance.instanceId}`} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 mb-4">
                            <h4 className="font-semibold text-md text-gray-700 dark:text-neutral-300 mb-4">{serviceConfig.name} Entry #{idx + 1}</h4>
                            {instancesToRender.length > 1 && ( // Only show remove if there's more than one instance
                                <button type="button" onClick={() => handleRemoveInstance(serviceKey, instance.instanceId)} className="absolute top-3 right-3 text-gray-400 hover:text-[--primary-color] transition-colors" style={{'--primary-color': primaryColor}}>
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            )}
                            <div className={`grid ${gridColsClass} gap-x-6 gap-y-4`}> {/* Dynamic columns */}
                                {serviceConfig.fields.map((field, fieldIdx) => (
                                    <FormField
                                        key={`${serviceKey}-${instance.instanceId}-${fieldIdx}`}
                                        field={field}
                                        value={instance[field.name]}
                                        onChange={(e) => handleDynamicInputChange(serviceKey, instance.instanceId, e)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                });
                detailSections.push(
                    <button key={`add-${serviceKey}`} type="button" onClick={() => handleAddInstance(serviceKey)} className="w-full text-[--primary-color] font-semibold border-2 border-dashed border-gray-300 rounded-lg py-3 hover:bg-gray-50 hover:border-[--primary-color] transition-all dark:border-neutral-700 dark:text-[--primary-color] dark:hover:bg-neutral-800 mb-6" style={{'--primary-color': primaryColor}}>
                        + Add Another {serviceConfig.name} Entry
                    </button>
                );

            } else {
                const currentData = dynamicServiceData[serviceKey] || {};
                detailSections.push(
                    <div key={serviceKey} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 mb-6">
                        <h4 className="font-semibold text-md text-gray-700 dark:text-neutral-300 mb-4">{serviceConfig.name} Details</h4>
                        <div className={`grid ${gridColsClass} gap-x-6 gap-y-4`}> {/* Dynamic columns */}
                            {serviceConfig.fields.map((field, fieldIdx) => (
                                <FormField
                                    key={`${serviceKey}-${fieldIdx}`}
                                    field={field}
                                    value={currentData[field.name]}
                                    onChange={(e) => handleSingleDynamicInputChange(serviceKey, e)}
                                />
                            ))}
                        </div>
                    </div>
                );
            }
        }
    });

    return (
        <div>
            {detailSections.length > 0 ? (
                <div className="space-y-6">
                    {detailSections}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-neutral-400">No additional details required for selected services.</p>
            )}
        </div>
    );
  };


  // --- Stepper Logic ---
  const getSteps = () => {
    const steps = [
        { name: 'Select Services' },
    ];

    const hasAnyDynamicDataCategory = selectedSubservices.some(sub => Object.values(categoryIdToServiceKeyMap).includes(categoryIdToServiceKeyMap[sub.categoryId]));

    if (hasAnyDynamicDataCategory) {
        steps.push({ name: 'Service Details' });
    }
    steps.push({ name: 'Review' });
    return steps;
  };

  const steps = getSteps();

  const handleNextStep = () => {
    if (currentStep === 1 && selectedSubservices.length === 0) {
        alert("Please select at least one service before proceeding.");
        return;
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitServiceRequest = () => {
    console.log("Submitting Service Request:");
    console.log("Selected Subservices:", selectedSubservices);
    console.log("Dynamic Service Data:", dynamicServiceData);
    // Here you would typically send this data to your backend API
    alert("Service request submitted! (Check console for data)");
    // Optionally reset states after submission
    setSelectedCategoryId(null);
    setSubcategories([]);
    setSelectedSubcategories({});
    setDynamicServiceData({});
    setCurrentStep(1);
  };

  const getCategoryNameById = (categoryId) => {
      const category = categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Unknown Category';
  };
const handleOpenLocationSelector = () => {
    setIsLocationSelectorOpen(true);
  };
  const handleCloseLocationSelector = () => {
    setIsLocationSelectorOpen(false);
  };
  const handleLocationSave = (selectedLocationData) => {
    console.log("Selected Location:", selectedLocationData);
    setSelectedLocationName(selectedLocationData.location || "Chennai");
    setSelectedLocationId(selectedLocationData.locationId);
    console.log(selectedLocationId);
    setIsLocationSelectorOpen(false);
  };
  const handleLocationChange = (currentSelection) => {
    console.log("Current Selection:", currentSelection);
  };
  return (
    <>
    {true ?(
    <main>
    <Header
                onOpenLocationSelector={handleOpenLocationSelector}
                selectedLocationName={selectedLocationName}
              />
              <LocationSelector
                isOpen={isLocationSelectorOpen}
                onClose={handleCloseLocationSelector}
                onSave={handleLocationSave}
                onChange={handleLocationChange}
              />
    <div className="min-h-screen bg-white dark:bg-neutral-900 font-sans text-gray-800 dark:text-white">
        {notification && (
            <Notification
                message={notification.message}
                count={notification.count}
                type={notification.type}
                onClose={() => setNotification(null)}
            />
        )}
      <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2 text-center">
          Select Services
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Choose from our wide range of services below.
        </p>
      </div>

      <Stepper currentStep={currentStep} steps={steps} />

      <div className="p-6">
        {/* Step 1: Select Services */}
        {currentStep === 1 && (
          <>
            {loading && (
              <div className="text-center text-lg text-blue-500 dark:text-blue-400">
                Loading categories...
              </div>
            )}

            {error && (
              <div className="text-center text-lg text-red-500 dark:text-red-400">
                {error}
              </div>
            )}

            {!loading && !error && categories.length === 0 && (
              <div className="text-center text-lg text-gray-500 dark:text-gray-400">
                No categories found.
              </div>
            )}

            {!loading && !error && categories.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div key={category.id}>
                    <div
                      className={`flex justify-between items-center bg-white dark:bg-neutral-800 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-neutral-700 transform hover:-translate-y-1 ${
                        selectedCategoryId === category.id ? "ring-2" : ""
                      }`}
                      style={{'--primary-color': primaryColor, borderColor: selectedCategoryId === category.id ? primaryColor : undefined, ringColor: selectedCategoryId === category.id ? primaryColor : undefined}}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <h3 className="text-l font-semibold text-gray-900 dark:text-white text-left">
                        {category.name || "Category Name"}{" "}
                      </h3>
                      {selectedCategoryId === category.id ? (
                        <ChevronUpIcon className="h-5 w-5" style={{ color: primaryColor }} />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" style={{ color: primaryColor }} />
                      )}
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        selectedCategoryId === category.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {selectedCategoryId === category.id && (
                        <div className="mt-2 pl-4 border-l-2 border-gray-300 dark:border-neutral-600">
                          {loadingSubcategories && (
                            <div className="text-center text-sm py-2" style={{ color: primaryColor }}>
                              Loading subcategories...
                            </div>
                          )}

                          {subcategoriesError && (
                            <div className="text-center text-sm text-red-500 dark:text-red-400 py-2">
                              {subcategoriesError}
                            </div>
                          )}

                          {!loadingSubcategories && !subcategoriesError && subcategories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {subcategories.map((subcategory) => (
                                <label
                                  key={subcategory.id}
                                  htmlFor={`subcategory-${subcategory.id}`}
                                  className="inline-flex items-center bg-white dark:bg-neutral-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    id={`subcategory-${subcategory.id}`}
                                    name="subcategory"
                                    value={subcategory.id}
                                    checked={selectedSubcategories[subcategory.id] || false}
                                    onChange={() => handleSubcategoryChange(subcategory.id, subcategory.name)}
                                    className="form-checkbox h-4 w-4 rounded focus:ring-[--primary-color] mr-2"
                                    style={{'--primary-color': primaryColor, color: primaryColor}}
                                   />
                                  <span className="text-sm text-gray-800 dark:text-white">
                                    {subcategory.name || "Subcategory Name"}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}

                          {!loadingSubcategories && !subcategoriesError && subcategories.length === 0 && (
                            <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                              No subcategories found for this category.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Step 2: Service Details */}
        {currentStep === 2 && (
            <>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Provide Details for Selected Services</h3>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                  Please fill out the specific requirements for each service you've chosen.
              </p>
              {renderDynamicServiceDetails()}
            </>
        )}

        {/* Step 3: Review Selection */}
        {currentStep === steps.length && (
            <>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Review Your Service Request</h3>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    Please review all the services you've selected and the details provided before submitting.
                </p>

                <div className="space-y-6">
                    {selectedSubservices.length === 0 ? (
                        <p className="text-gray-500 dark:text-neutral-400 text-center">No services selected.</p>
                    ) : (
                        selectedSubservices.map(subservice => {
                            const serviceKey = categoryIdToServiceKeyMap[subservice.categoryId];
                            const serviceConfig = serviceDetailsData[serviceKey];
                            const details = dynamicServiceData[serviceKey];

                            return (
                                <div key={subservice.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700">
                                    <h4 className="font-bold text-lg" style={{ color: primaryColor }}>
                                        {getCategoryNameById(subservice.categoryId)}: {subservice.name}
                                    </h4>
                                    {serviceConfig && details ? (
                                        serviceConfig.allowMultiple ? (
                                            (Array.isArray(details) && details.length > 0) ? (
                                                details.map((instance, idx) => (
                                                    <div key={instance.instanceId} className="mt-2 pl-4 border-l border-gray-300 dark:border-neutral-600">
                                                        <p className="font-semibold text-gray-700 dark:text-neutral-300">Entry #{idx + 1}</p>
                                                        {serviceConfig.fields.map(field => (
                                                            <p key={field.name} className="text-sm text-gray-600 dark:text-neutral-400">
                                                                <strong>{field.label}:</strong> {Array.isArray(instance[field.name]) ? instance[field.name].join(', ') : instance[field.name] || 'N/A'}
                                                            </p>
                                                        ))}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2">No details provided for this service.</p>
                                            )
                                        ) : (
                                            <div className="mt-2">
                                                {serviceConfig.fields.map(field => (
                                                    <p key={field.name} className="text-sm text-gray-600 dark:text-neutral-400">
                                                        <strong>{field.label}:</strong> {Array.isArray(details[field.name]) ? details[field.name].join(', ') : details[field.name] || 'N/A'}
                                                    </p>
                                                ))}
                                            </div>
                                        )
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2">No additional details required for this service.</p>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </>
        )}

        {/* Selected Sub-Services (remains visible regardless of step) */}
        {selectedSubservices.length > 0 && currentStep === 1 && ( // Only show on step 1
          <div className="p-6 mt-6 border-t border-gray-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Selected Sub-Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedSubservices.map((subservice) => (
                <div
                  key={subservice.id}
                  className="inline-flex items-center text-white px-3 py-1 rounded-full text-sm font-medium pr-1 group"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span>{subservice.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSelectedSubcategory(subservice.id)}
                    className="ml-2 p-0.5 rounded-full hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200"
                    style={{ color: primaryColor }}
                    aria-label={`Remove ${subservice.name}`}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons (at the bottom of the main page) */}
        <div className="p-6 mt-6 border-t border-gray-200 dark:border-neutral-700 flex justify-between items-center">
            {currentStep > 1 && (
                <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                    Back
                </button>
            )}

            {currentStep < steps.length ? (
                <button
                    type="button"
                    onClick={handleNextStep}
                    className={`px-6 py-2 text-white rounded-full hover:brightness-90 transition-all ${currentStep === 1 ? 'ml-auto' : ''}`}
                    style={{ backgroundColor: primaryColor }}
                >
                    Next
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleSubmitServiceRequest}
                    className="ml-auto px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                    Submit Request
                </button>
            )}
        </div>
      </div>
    </div>
    </main>
    ):(
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
          <p className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Authentication expired, Please Login again</p>
          <a
            href="/login"
            className="inline-block bg-[#E91E63] hover:bg-[#d81b60] text-white font-medium py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg"
          >
            Login
          </a>
        </div>
    )}
    </>
  );
}