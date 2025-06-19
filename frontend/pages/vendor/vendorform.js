import { useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

// ... (isNgrok, getApiUrl, api_url, api constants remain the same) ...
const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};

const api_url = getApiUrl();
const api = axios.create({
  baseURL: `${api_url}/api/v1`,
  headers: {
    ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
  },
});

const VendorForm = () => {
  const { data: session, status, update } = useSession();

  const [formData, setFormData] = useState({
    gstNumber: '',
    businessRegistrationNumber: '',
  });

  const [isLoading, setIsLoading] = useState(true); // For initial loading of existing data
  const [showModal, setShowModal] = useState(false); // Only show if data is missing initially

  // Effect to load existing data from local storage or API (if applicable)
  useEffect(() => {
    setIsLoading(true);
    let dataFromLocalStorage = null;
    try {
      const storedBusinessDataString = localStorage.getItem('vendorFormData'); // Changed key
      if (storedBusinessDataString) {
        dataFromLocalStorage = JSON.parse(storedBusinessDataString);
      }
    } catch (error) {
      console.error("Error reading or parsing vendorFormData from local storage:", error);
      dataFromLocalStorage = null;
    }

    if (dataFromLocalStorage) {
      setFormData({
        gstNumber: dataFromLocalStorage.gst_number || '',
        businessRegistrationNumber: dataFromLocalStorage.business_registration_number || '',
      });
      setShowModal(false); // Data found, hide modal
    } else {
      setShowModal(true); // No data found, show modal to input
    }
    setIsLoading(false);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      gstNumber: '',
      businessRegistrationNumber: '',
    });
    setShowModal(true); // Re-show modal after reset
  }, []);

  const handleSubmit = useCallback(async () => {
    const accessToken = session?.accessToken;

    if (!accessToken) {
      alert('Authentication token is missing. Please log in.');
      return;
    }

    const dataToSend = {
      gst_number: formData.gstNumber.trim() || null,
      business_registration_number: formData.businessRegistrationNumber.trim() || null,
    };
    try {
      const response = await api.put('/vendor-profile/update/', dataToSend, { // Modified API endpoint
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log('Business Details Submitted Successfully!', response.data);
      alert('Business details updated successfully!');

      try {
        localStorage.setItem('vendorFormData', JSON.stringify(dataToSend)); // Changed key
        console.log('Vendor form data saved to local storage:', dataToSend);
        setShowModal(false); // Hide modal on successful submission and save
      } catch (storageError) {
        console.error('Failed to save vendor form data to local storage:', storageError);
      }

      await update(); // Refresh session data (next-auth)
      window.location.reload();
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || error.message || 'Unknown error';
      console.error('API Error:', error.response?.data || errorMessage);
      alert(`Form submission failed: ${typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage}`);
    }
  }, [session, formData, update]);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 dark:bg-neutral-800/70 backdrop-blur-sm">
        <p className="text-lg text-gray-800 dark:text-neutral-200">Loading vendor information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 dark:bg-neutral-800/70 backdrop-blur-sm">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="w-full max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 relative">
            {/* Close button added here */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-neutral-400 dark:hover:text-neutral-200"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-gray-900 dark:text-neutral-100 mb-6 text-center">
              Vendor Business Details
            </h2>
            <div className="flex flex-col space-y-4 w-full p-4">
              <div>
                <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                  GST Number: (Optional)
                </label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="Enter GST Number"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E91E63] focus:border-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                />
              </div>
              <div>
                <label htmlFor="businessRegistrationNumber" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                  Business Registration Number: (Optional)
                </label>
                <input
                  type="text"
                  id="businessRegistrationNumber"
                  name="businessRegistrationNumber"
                  value={formData.businessRegistrationNumber}
                  onChange={handleChange}
                  placeholder="Enter Business Registration Number"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E91E63] focus:border-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="py-2 px-4 inline-flex items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="py-2 px-4 inline-flex items-center text-sm font-medium rounded-lg bg-[#E91E63] text-white hover:bg-[#C2185B] transition-colors duration-200"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorForm;