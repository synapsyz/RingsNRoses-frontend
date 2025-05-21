import { useEffect, useState } from "react";

export default function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [locations, setLocations] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Load all countries initially
  useEffect(() => {
    fetch("/api/locations/countries/")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetch(`/api/locations/state/?country=${selectedCountry}`)
        .then((res) => res.json())
        .then(setStates);
    } else {
      setStates([]);
      setSelectedState("");
    }
  }, [selectedCountry]);

  // Load locations when state and country are selected
  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(`/api/locations/?country=${selectedCountry}&state=${selectedState}`)
        .then((res) => res.json())
        .then(setLocations);
    } else {
      setLocations([]);
      setSelectedLocation("");
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="space-y-4">
      {/* Country Dropdown */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="border p-2 rounded"
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.code} value={s.code}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Location Dropdown */}
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="border p-2 rounded"
        disabled={!selectedState}
      >
        <option value="">Select Location</option>
        {locations.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
