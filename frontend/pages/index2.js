// App.js
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession
import axios from 'axios'; // Import axios

// Define your location mapping
// IMPORTANT: These IDs (1, 2, 3, 4) MUST match the primary keys of your Location objects in the backend database.
const LOCATION_OPTIONS = [
  { id: 1, name: 'Grand Ballroom' },
  { id: 2, name: 'Garden Venue' },
  { id: 3, name: 'Beach Resort' },
  { id: 4, name: 'City Hall' },
  // Add more locations as needed, ensuring their IDs match your backend
];

// --- Axios Configuration ---
// Determine if it's a development environment (e.g., for Ngrok skip header)
const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;

// Get the base API URL based on the environment
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST // e.g., 'http://127.0.0.1:8000'
    : process.env.NEXT_PUBLIC_HOST; // e.g., 'https://your-production-api.com'
};

const api_url = getApiUrl();

// Create an Axios instance for client-side API calls
const api = axios.create({
  baseURL: `${api_url}/api/v1`, // This will now be http://127.0.0.1:8000/api/v1 or your production URL
  headers: {
    ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' }),
  },
});
// --- End Axios Configuration ---

export default function App() {
  // Destructure `update` from useSession. `update` is used to trigger a session refresh.
  const { data: session, status, update } = useSession();

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    eventDate: '',
    eventLocation: '', // This will now store the ID (e.g., 1, 2, 3)
    groomName: '',
    brideName: '',
  });

  // `showModal` controls the visibility of the pop-up form.
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // This effect determines whether to show the modal based on the user's session data.
  // It runs on initial load and whenever the `session` or `status` changes.
  useEffect(() => {
    // Only proceed if session status is not 'loading' (i.e., it's authenticated or unauthenticated).
    if (status !== 'loading') {
      setIsLoading(false); // End loading state once session status is determined.

      // Check if session data and customer profile are available.
      if (session && session.user && session.user.customer_profile) {
        const customerProfile = session.user.customer_profile;

        // CRITICAL LOGIC FOR HIDING/SHOWING THE FORM:
        // If event_date is null, the form should be shown.
        if (customerProfile.event_date === null) {
          setShowModal(true); // Show the pop-up form.
          // Pre-fill form data with any existing profile data (even if null, set to empty string).
          setFormData({
            eventDate: customerProfile.event_date || '',
            eventLocation: customerProfile.event_location || '',
            groomName: customerProfile.groom_name || '',
            brideName: customerProfile.bride_name || '',
          });
        } else {
          // If event_date is NOT null (meaning it has been successfully filled),
          // the form should be hidden. This is how it prevents reappearance.
          setShowModal(false);
        }
      } else {
        // If session data or customer profile is not available (e.g., not logged in), hide the modal.
        setShowModal(false);
        console.warn("Session user data or customer profile is not fully available or user is not logged in.");
      }
    }
  }, [session, status]); // Dependency array: re-run when 'session' or 'status' changes.


  // Handles changes in form input fields.
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for eventLocation to ensure it's stored as a number (ID).
    if (name === "eventLocation") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : Number(value), // Convert to number, keep empty string for "Select"
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validation for Step 1: Ensures Event Date and Event Location are filled.
  const isStep1Valid = () => {
    return formData.eventDate !== '' && formData.eventLocation !== '';
  };

  // Moves to the next step of the multi-step form.
  const goNext = () => {
    // Validate Step 1 before proceeding.
    if (step === 1 && !isStep1Valid()) {
      alert('Please fill in both Event Date and Event Location to proceed.');
      return;
    }
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  // Moves to the previous step of the multi-step form.
  const goBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Allows skipping Step 2 (Couple's Names).
  const goSkip = () => {
    if (step === 2) {
      setStep((prev) => prev + 1);
    }
  };

  // Handles the final submission of the form data to the backend API.
  const handleSubmit = async () => {
    const accessToken = session?.accessToken;

    if (!accessToken) {
      alert('Authentication token is missing. Please log in.');
      return;
    }

    // Prepare data for API: send null for empty date/location.
    const eventDateToSend = formData.eventDate === '' ? null : formData.eventDate;
    const eventLocationToSend = formData.eventLocation === '' ? null : formData.eventLocation;

    const dataToSend = {
      event_date: eventDateToSend,
      event_location: eventLocationToSend, // Send the numerical ID.
      groom_name: formData.groomName,
      bride_name: formData.brideName,
    };
    try {
      // Make the PUT request to update the customer profile.
      const response = await api.put('/customer-profile/update/', dataToSend, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Include the access token for authentication.
        },
      });

      console.log('Form Submitted Successfully!', response.data);
      alert('Form submitted successfully!');
      
      // Force a session refresh to get the updated profile data
      await update();

      reset();
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      alert(`Form submission failed: ${JSON.stringify(error.response?.data || error.message)}`);
      return;
    }
  };

  // Resets the form to its initial state.
  const reset = () => {
    setStep(1);
    setFormData({
      eventDate: '',
      eventLocation: '',
      groomName: '',
      brideName: '',
    });
  };

  // Renders the content for each step of the multi-step form.
  const renderStepContent = (current) => {
    switch (current) {
      case 1:
        return (
          <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-2">Event Details</h3>
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Event Date:
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E91E63] focus:border-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
              />
            </div>
            <div>
              <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Event Location:
              </label>
              <select
                id="eventLocation"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E91E63] focus:border-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
              >
                <option value="">Select a location</option>
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-2">Couple's Names</h3>
            <div>
              <label htmlFor="groomName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Groom's Name:
              </label>
              <input
                type="text"
                id="groomName"
                name="groomName"
                value={formData.groomName}
                onChange={handleChange}
                placeholder="Enter groom's name"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E91E63] focus:border-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
              />
            </div>
            <div>
              <label htmlFor="brideName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                Bride's Name:
              </label>
              <input
                type="text"
                id="brideName"
                name="brideName"
                value={formData.brideName}
                onChange={handleChange}
                placeholder="Enter bride's name"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E91E63] focus:border-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
              />
            </div>
          </div>
        );
      case 3:
        // For preview, map the numerical ID back to the human-readable name for display.
        const selectedLocation = LOCATION_OPTIONS.find(
          (option) => option.id === formData.eventLocation
        );
        const displayLocation = selectedLocation ? selectedLocation.name : 'Not provided';

        return (
          <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 text-gray-800 dark:text-neutral-200">
            <h3 className="text-lg font-semibold mb-2">Preview Your Details</h3>
            <div className="bg-gray-100 dark:bg-neutral-700 p-4 rounded-lg shadow-inner">
              <p className="mb-2">
                <strong className="text-[#E91E63]">Event Date:</strong> {formData.eventDate || 'Not provided'}
              </p>
              <p className="mb-2">
                <strong className="text-[#E91E63]">Event Location:</strong> {displayLocation}
              </p>
              <p className="mb-2">
                <strong className="text-[#E91E63]">Groom's Name:</strong> {formData.groomName || 'Not provided'}
              </p>
              <p>
                <strong className="text-[#E91E63]">Bride's Name:</strong> {formData.brideName || 'Not provided'}
              </p>
            </div>
          </div>
        );
      default:
        return 'Unknown Step';
    }
  };

  // Main render logic:
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100/70 dark:bg-neutral-800/70 backdrop-blur-sm">
      {/* Main content that will be visible when the modal is closed */}
      

      

      {/* Render the modal overlay and content if `showModal` is true */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          {/* Modal Content container, preserving existing form styles. */}
          <div className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 relative">
            {/* Stepper Navigation */}
            <ul className="relative flex flex-row gap-x-2 mb-8">
              {[1, 2, 3].map((index) => (
                <li
                  key={index}
                  className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ${
                    step === index ? 'hs-stepper-active' : ''
                  } ${step > index ? 'hs-stepper-completed' : ''}`}
                >
                  <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                    <span
                      className={`size-7 flex justify-center items-center shrink-0 rounded-full font-medium ${
                        step === index
                          ? 'bg-[#E91E63] text-white'
                          : step > index
                          ? 'bg-[#E91E63] text-white'
                          : 'bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {step > index ? (
                        <svg
                          className="shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        index
                      )}
                    </span>
                    <span className="ms-2 text-sm font-medium text-gray-800 dark:text-neutral-300">
                      {index === 1 ? 'Event' : index === 2 ? 'Names' : 'Preview'}
                    </span>
                  </span>
                  <div
                    className={`w-full h-px flex-1 ${
                      step > index ? 'bg-[#C2185B]' : 'bg-gray-200 dark:bg-neutral-700'
                    } group-last:hidden`}
                  ></div>
                </li>
              ))}
            </ul>
            {/* Stepper Content Area */}
            <div className="mt-5 sm:mt-8">
              <div className="p-4 h-auto min-h-48 bg-gray-50 dark:bg-neutral-800 flex justify-center items-center border border-dashed border-gray-200 dark:border-neutral-700 rounded-xl">
                {renderStepContent(step)}
              </div>

              {/* Action Buttons (Back, Skip, Next, Submit, Reset) */}
              <div className="mt-5 flex justify-between items-center gap-x-2">
                {/* Back button - hidden on step 1 */}
                {step > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    Back
                  </button>
                )}

                {/* Spacer to align buttons when 'Back' is hidden */}
                {step === 1 && <div className="w-1/4" />}

                <div className="flex items-center gap-x-2">
                  {/* Skip button - visible only on Step 2 */}
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={goSkip}
                      className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200"
                    >
                      Skip
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                  )}

                  {/* Next button - visible on steps before the last step (1 and 2) */}
                  {step < totalSteps && (
                    <button
                      type="button"
                      onClick={goNext}
                      // Disable next button on step 1 if validation fails
                      disabled={step === 1 && !isStep1Valid()}
                      className={`py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent
                                    ${step === 1 && !isStep1Valid() ? 'bg-[#E91E63] opacity-60 cursor-not-allowed' : 'bg-[#E91E63] hover:bg-[#C2185B]'}
                                    text-white transition-colors duration-200`}
                    >
                      Next
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                  )}

                  {/* Submit button - visible only on the last step (Step 3) */}
                  {step === totalSteps && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-[#E91E63] text-white hover:bg-[#C2185B] transition-colors duration-200"
                    >
                      Submit
                    </button>
                  )}

                  {/* Reset button - visible only on the last step (Step 3) */}
                  {step === totalSteps && (
                    <button
                      type="button"
                      onClick={reset}
                      className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}