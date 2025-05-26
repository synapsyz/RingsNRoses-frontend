import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
let api_url;
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
api_url = getApiUrl()
// Axios instance
const api = axios.create({
  baseURL: api_url+"/api/v1",
});

// Fetch countries
const fetchCountries = async (inputValue) => {
  const response = await api.get("/locations/countries/", {
    params: { search: inputValue },
  });
  return response.data.results.map((country) => ({
    label: country.name,
    value: country.code,
  }));
};

// Fetch states
const fetchStates = async (countryCode) => {
  const response = await api.get("/locations/state/", {
    params: { country: countryCode },
  });
  return response.data.results.map((state) => ({
    label: state.name,
    value: state.id,
  }));
};

// Fetch locations
const fetchLocations = async (inputValue, stateId) => {
  const response = await api.get("/locations/", {
    params: { search: inputValue, state: stateId },
  });
  return response.data.results.map((location) => ({
    label: location.name,
    value: location.id,
  }));
};

// Wedding roles
const weddingRoles = [
  { label: "Bride", value: 1 },
  { label: "Groom", value: 2 },
  { label: "Guest", value: 3 },
];

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    wedding_date: "",
  });

  const [selectedRole, setSelectedRole] = useState(weddingRoles[2]); // Default to Guest
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        wedding_role: selectedRole.value,
        wedding_location: selectedLocation?.value ?? null,
      };

      const res = await api.post("/signup/customer/", payload);

      const { access, refresh, email, user_id } = res.data;
      sessionStorage.setItem("accessToken", access);
      sessionStorage.setItem("refreshToken", refresh);
      sessionStorage.setItem("user_email", email);
      sessionStorage.setItem("user_id", user_id);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-4 max-w-md mx-auto p-6" onSubmit={handleSignup}>
      <h2 className="text-xl font-bold mb-4">Customer Signup</h2>

      <input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        value={formData.wedding_date}
        onChange={(e) => setFormData({ ...formData, wedding_date: e.target.value })}
        className="w-full p-2 border rounded"
      />

      {/* Role Selection */}
      <select
        value={selectedRole.value}
        onChange={(e) =>
          setSelectedRole(
            weddingRoles.find((role) => role.value === parseInt(e.target.value))
          )
        }
        className="w-full p-2 border rounded"
      >
        {weddingRoles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>

      {/* Country Selector */}
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={fetchCountries}
        value={selectedCountry}
        onChange={(value) => {
          setSelectedCountry(value);
          setSelectedState(null);
          setSelectedLocation(null);
        }}
        placeholder="Select Country"
      />

      {/* State Selector */}
      {selectedCountry && (
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={() => fetchStates(selectedCountry.value)}
          value={selectedState}
          onChange={(value) => {
            setSelectedState(value);
            setSelectedLocation(null);
          }}
          placeholder="Select State"
        />
      )}

      {/* Location Selector */}
      {selectedState && (
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={(inputValue) =>
            fetchLocations(inputValue, selectedState.value)
          }
          value={selectedLocation}
          onChange={setSelectedLocation}
          placeholder="Select Wedding Location"
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default CustomerSignup;
