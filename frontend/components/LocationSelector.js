import { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";

const fetchCountries = async (inputValue) => {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/locations/countries/", {
      params: { search: inputValue },
    });
    return res.data.results.map((c) => ({
      label: c.name,
      value: c.code,
    }));
  } catch {
    return [];
  }
};

const fetchStates = async (inputValue, countryCode) => {
  if (!countryCode) return [];
  try {
    const res = await axios.get("http://localhost:8000/api/v1/locations/state/", {
      params: { search: inputValue, country: countryCode },
    });
    return res.data.results.map((s) => ({
      label: s.name,
      value: s.id,
    }));
  } catch {
    return [];
  }
};

const fetchLocations = async (inputValue, stateId) => {
  if (!stateId) return [];
  try {
    const res = await axios.get("http://localhost:8000/api/v1/locations/", {
      params: { search: inputValue, state: stateId },
    });
    return res.data.results.map((l) => ({
      label: l.name,
      value: l.id,
    }));
  } catch {
    return [];
  }
};

const LocationSelector = ({ onCountryChange, onStateChange, onLocationChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const loadCountries = (input, cb) => fetchCountries(input).then(cb);
  const loadStates = (input, cb) => fetchStates(input, selectedCountry?.value).then(cb);
  const loadLocations = (input, cb) => fetchLocations(input, selectedState?.value).then(cb);

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label className="text-sm font-medium">Country</label>
        <AsyncSelect
          loadOptions={loadCountries}
          defaultOptions
          onChange={(val) => {
            setSelectedCountry(val);
            setSelectedState(null);
            onCountryChange?.(val);
          }}
          value={selectedCountry}
          placeholder="Select country"
        />
      </div>
      <div>
        <label className="text-sm font-medium">State</label>
        <AsyncSelect
          loadOptions={loadStates}
          defaultOptions
          isDisabled={!selectedCountry}
          onChange={(val) => {
            setSelectedState(val);
            onStateChange?.(val);
          }}
          value={selectedState}
          placeholder="Select state"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Location</label>
        <AsyncSelect
          loadOptions={loadLocations}
          defaultOptions
          isDisabled={!selectedState}
          onChange={onLocationChange}
          placeholder="Select location"
        />
      </div>
    </div>
  );
};

export default LocationSelector;
