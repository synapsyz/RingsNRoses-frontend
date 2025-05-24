import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const LocationSelector = ({ isOpen, onClose, onSave, onChange }) => {
  const [countries] = useState([{ code: 'IN', name: 'India' }]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const res = await fetch('https://ipinfo.io/json');
        const data = await res.json();
        const country = data.country || 'IN';
        const region = data.region;
        const city = data.city;

        setSelectedCountry(country);
        fetchStates(country, region, city);
      } catch (error) {
        console.error('Failed to fetch user location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserLocation();
  }, []);

  const fetchStates = async (countryCode, regionToSelect = '', cityToMatch = '') => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/locations/state/?country=${countryCode}`);
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
      const url = `http://localhost:8000/api/v1/locations/?state=${encodeURIComponent(stateName)}&search=${encodeURIComponent(matchCity)}`;
      const res = await fetch(url);
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
            country: selectedCountry,
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

  const handleStateChange = async (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedLocation(null);

    if (selectedOption) {
      try {
        const url = `http://localhost:8000/api/v1/locations/?state=${encodeURIComponent(selectedOption.value)}&search=`;
        const res = await fetch(url);
        const data = await res.json();
        const formattedLocations = data.results.map((loc) => ({
          value: loc.name,
          label: loc.name,
        }));

        if (formattedLocations.length === 1) {
          setSelectedLocation(formattedLocations[0]);
          if (onChange) {
            onChange({
              country: selectedCountry,
              state: selectedOption.label,
              location: formattedLocations[0].label,
            });
          }
        }

        if (typeof loadLocationOptions === 'function') {
          loadLocationOptions('');
        }
      } catch (err) {
        console.error('Failed to fetch locations for selected state:', err);
      }
    }
  };

  const loadLocationOptions = async (inputValue) => {
    if (!selectedState?.value) return [];

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/locations/?state=${encodeURIComponent(selectedState.value)}&search=${encodeURIComponent(inputValue)}`
      );
      const data = await res.json();
      return data.results.map((loc) => ({
        value: loc.name,
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Select Your Location
                </Dialog.Title>

                {/* State Dropdown */}
                <div>
                  <label className="block mb-1 text-sm font-medium">State</label>
                  <Select
                    options={states}
                    value={selectedState}
                    onChange={handleStateChange}
                    placeholder="Select state"
                  />
                </div>

                {/* Location Dropdown */}
                {selectedState && (
                  <div>
                    <label className="block mb-1 text-sm font-medium">Location</label>
                    <AsyncSelect
                      key={selectedState?.value}
                      cacheOptions
                      defaultOptions
                      loadOptions={loadLocationOptions}
                      value={selectedLocation}
                      onChange={(val) => {
                        setSelectedLocation(val);
                        if (val && typeof onChange === 'function') {
                          onChange({
                            country: selectedCountry,
                            state: selectedState.label,
                            location: val.label,
                            id: val.value,
                          });
                        }
                      }}
                      placeholder="Search location"
                      isClearable
                    />
                  </div>
                )}

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
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => {
                      if (onSave) {
                        onSave({
                          country: selectedCountry,
                          state: selectedState?.label || '',
                          location: selectedLocation?.label || '',
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
