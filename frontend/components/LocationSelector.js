import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

let api_url;
let isNgrok;
isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
api_url = getApiUrl();

const LocationSelector = ({ isOpen, onClose, onSave, onChange }) => {
  const [countries, setCountries] = useState([]); // State to store fetched countries
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // Changed to null initially
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State to hold menu portal target and styles, initialized to null
  const [menuPortalProps, setMenuPortalProps] = useState({});

  useEffect(() => {
    // Set menuPortalProps only when window (and thus document) is defined
    if (typeof window !== 'undefined') {
      setMenuPortalProps({
        menuPortalTarget: document.body,
        styles: { menuPortal: (base) => ({ ...base, zIndex: 9999 }) },
      });
    }

    const fetchCountries = async () => {
  try {
    let allCountries = [];
    let nextUrl = api_url + `/api/v1/locations/countries/`;

    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: {
          ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
        },
      });

      const data = await res.json();
      allCountries = [...allCountries, ...data.results];
      nextUrl = data.next; // Will be null if it's the last page
    }

    const formattedCountries = allCountries.map((country) => ({
      value: country.code,
      label: country.name,
    }));
    setCountries(formattedCountries);

    // Set default country to India if available and not already set by user location
    const defaultCountry = formattedCountries.find(
      (country) => country.value === 'IN'
    );
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    }
  } catch (error) {
    console.error('Failed to fetch countries:', error);
  }
};


    const getUserLocation = async () => {
      try {
        // const res = await fetch('https://ipinfo.io/json');
        // const data = await res.json();
        const countryCode =  'IN';
        const region = "Telangana";
        const city = 'Hyderabad';

        // Set the country based on detected location, then fetch states
        const initialCountry = countries.find(
          (c) => c.value === countryCode
        );
        setSelectedCountry(initialCountry || null);
        if (initialCountry) {
          fetchStates(initialCountry.value, region, city);
        }
      } catch (error) {
        console.error('Failed to fetch user location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries(); // Fetch countries first
    // Only call getUserLocation once countries are potentially loaded, or if countries.length is 0
    // to avoid an infinite loop or incorrect initial state.
    // The dependency array handles re-runs for countries.length.
    if (countries.length > 0 || !isLoading) { // Ensure countries are loaded or loading is complete
      getUserLocation();
    }
  }, [countries.length, isLoading]); // Re-run if countries array length changes or loading state changes

  const fetchStates = async (countryCode, regionToSelect = '', cityToMatch = '') => {
    try {
      const res = await fetch(
        api_url + `/api/v1/locations/state/?country=${countryCode}`,
        {
          headers: {
            ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
          },
        }
      );
      const data = await res.json();
      const formattedStates = data.results.map((s) => ({
        value: s.name,
        label: s.name,
      }));
      setStates(formattedStates);

      if (regionToSelect) {
        const matched = formattedStates.find(
          (state) => state.label.toLowerCase() === regionToSelect.toLowerCase()
        );
        setSelectedState(matched || null);
        if (matched) {
          fetchInitialLocation(matched.value, cityToMatch);
        }
      }
    } catch (error) {
      console.error('Failed to fetch states:', error);
    }
  };

  const fetchInitialLocation = async (stateName, matchCity = '') => {
    try {
      const url =
        api_url +
        `/api/v1/locations/?state=${encodeURIComponent(
          stateName
        )}&search=${encodeURIComponent(matchCity)}`;
      const res = await fetch(url, {
        headers: {
          ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
        },
      });
      const data = await res.json();
      const formattedLocations = data.results.map((loc) => ({
        value: loc.id,
        label: loc.name,
        name: loc.name,
      }));

      if (matchCity) {
        const matchedLocation = formattedLocations.find(
          (loc) => loc.label.toLowerCase() === matchCity.toLowerCase()
        );
        setSelectedLocation(matchedLocation || null);

        if (matchedLocation && typeof onChange === 'function') {
          onChange({
            country: selectedCountry?.label || '',
            state: stateName,
            location: matchedLocation.label,
            locationId: matchedLocation.value,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch initial location:', error);
    }
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null); // Clear state and location when country changes
    setSelectedLocation(null);
    if (selectedOption) {
      fetchStates(selectedOption.value);
    } else {
      setStates([]); // Clear states if no country is selected
    }
    if (onChange) {
      onChange({
        country: selectedOption?.label || '',
        state: '',
        location: '',
        locationId: null,
      });
    }
  };

  const handleStateChange = async (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedLocation(null);

    if (selectedOption) {
      try {
        const url =
          api_url +
          `/api/v1/locations/?state=${encodeURIComponent(
            selectedOption.value
          )}&search=`;
        const res = await fetch(url, {
          headers: {
            ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
          },
        });
        const data = await res.json();
        const formattedLocations = data.results.map((loc) => ({
          value: loc.id, // Changed to loc.id for value
          label: loc.name,
        }));

        if (formattedLocations.length === 1) {
          setSelectedLocation(formattedLocations[0]);
          if (onChange) {
            onChange({
              country: selectedCountry?.label || '',
              state: selectedOption.label,
              location: formattedLocations[0].label,
              locationId: formattedLocations[0].value,
            });
          }
        } else {
          // If there are multiple locations, the AsyncSelect will handle it.
          // We still need to ensure the onChange is called with state selected
          if (onChange) {
            onChange({
              country: selectedCountry?.label || '',
              state: selectedOption.label,
              location: '',
              locationId: null,
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch locations for selected state:', err);
      }
    } else {
      if (onChange) {
        onChange({
          country: selectedCountry?.label || '',
          state: '',
          location: '',
          locationId: null,
        });
      }
    }
  };

  const loadLocationOptions = async (inputValue) => {
    if (!selectedState?.value) return [];

    try {
      const res = await fetch(
        api_url +
          `/api/v1/locations/?state=${encodeURIComponent(
            selectedState.value
          )}&search=${encodeURIComponent(inputValue)}`,
        {
          headers: {
            ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
          },
        }
      );
      const data = await res.json();
      return data.results.map((loc) => ({
        value: loc.id, // Changed to loc.id for value
        label: loc.name,
      }));
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      return [];
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* Removed overflow-hidden from here */}
              <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
  <Dialog.Title
    as="h3"
    className="text-lg font-medium leading-6 text-gray-900"
  >
    Select Your Location
  </Dialog.Title>

  {/* Wrap Country and State in a flex container */}
  <div className="flex gap-4">
    {/* Country Dropdown */}
    <div className="flex-1">
      <label className="block mb-1 text-sm font-medium">Country</label>
      <Select
        options={countries}
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder="Select country"
        {...menuPortalProps}
      />
    </div>

    {/* State Dropdown */}
    <div className="flex-1">
      <label className="block mb-1 text-sm font-medium">State</label>
      <Select
        options={states}
        value={selectedState}
        onChange={handleStateChange}
        placeholder="Select state"
        isDisabled={!selectedCountry} // Disable if no country is selected
        {...menuPortalProps}
      />
    </div>
  </div>

  {/* Location Dropdown - Always rendered, but disabled if no state is selected */}
  <div> {/* Removed the `selectedState &&` conditional here */}
    <label className="block mb-1 text-sm font-medium">Location</label>
    <AsyncSelect
      key={selectedState?.value} // Keep the key for proper re-initialization if state changes
      cacheOptions
      defaultOptions
      loadOptions={loadLocationOptions}
      value={selectedLocation}
      onChange={(val) => {
        setSelectedLocation(val);
        if (val && typeof onChange === 'function') {
          onChange({
            country: selectedCountry?.label || '',
            state: selectedState.label,
            location: val.label,
            locationId: val.value,
          });
        } else if (typeof onChange === 'function') {
          // Handle clearable case
          onChange({
            country: selectedCountry?.label || '',
            state: selectedState.label,
            location: '',
            locationId: null,
          });
        }
      }}
      placeholder="Search location"
      isClearable
      isDisabled={!selectedState} 
      {...menuPortalProps}
    />
  </div>

  <div className="mt-4 flex justify-end space-x-2">
    <button
      type="button"
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
      onClick={onClose}
    >
      Cancel
    </button>
    <button
      type="button"
      className="px-4 py-2 text-sm font-medium text-white bg-[#E91E63] rounded hover:bg-[#E91E63]"
      onClick={() => {
        if (onSave) {
          onSave({
            country: selectedCountry?.label || '',
            state: selectedState?.label || '',
            location: selectedLocation?.label || '',
            locationId: selectedLocation?.value || null,
          });
        }
      }}
    >
      Save
    </button>
  </div>
</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LocationSelector;
