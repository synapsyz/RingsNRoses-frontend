import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; 
import axios from 'axios';
import LocationSelector from '@/components/LocationSelector'; 

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

const EventForm = () => {
  const { data: session, status, update } = useSession();

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    eventDate: '',
    eventLocation: null,
    eventLocationName: '',
    groomName: '',
    brideName: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocationNameById = async (locationId) => {
    if (!locationId) return;
    try {
      const response = await api.get(`/locations/${locationId}/`);
      if (response.data && response.data.name) {
        setFormData((prev) => ({
          ...prev,
          eventLocationName: response.data.name,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch location name by ID:', error.response?.data || error.message);
      setFormData((prev) => ({
        ...prev,
        eventLocationName: 'Unknown Location',
      }));
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false);
      if (session && session.user && session.user.customer_profile) {
        const customerProfile = session.user.customer_profile;
        if (customerProfile.event_date === null) {
          setShowModal(true);
          setFormData({
            eventDate: customerProfile.event_date || '',
            eventLocation: customerProfile.event_location || null,
            eventLocationName: '',
            groomName: customerProfile.groom_name || '',
            brideName: customerProfile.bride_name || '',
          });
          if (customerProfile.event_location) {
            fetchLocationNameById(customerProfile.event_location);
          }
        } else {
          setShowModal(false);
          setFormData({
            eventDate: customerProfile.event_date || '',
            eventLocation: customerProfile.event_location || null,
            eventLocationName: '',
            groomName: customerProfile.groom_name || '',
            brideName: customerProfile.bride_name || '',
          });
          if (customerProfile.event_location) {
            fetchLocationNameById(customerProfile.event_location);
          }
        }
      } else {
        setShowModal(false);
        console.warn("Session user data or customer profile is not fully available or user is not logged in.");
      }
    }
  }, [session, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelected = (selectedLocationData) => {
    setFormData((prev) => ({
      ...prev,
      eventLocation: selectedLocationData.id,
      eventLocationName: selectedLocationData.location,
    }));
    setShowLocationModal(false);
  };

  const isStep1Valid = () => {
    return formData.eventDate !== '' && formData.eventLocation !== null;
  };

  const goNext = () => {
    if (step === 1 && !isStep1Valid()) {
      alert('Please fill in both Event Date and Event Location to proceed.');
      return;
    }
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const goSkip = () => {
    if (step === 2) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const accessToken = session?.accessToken;

    if (!accessToken) {
      alert('Authentication token is missing. Please log in.');
      return;
    }

    const eventDateToSend = formData.eventDate === '' ? null : formData.eventDate;
    const eventLocationToSend = formData.eventLocation;

    const dataToSend = {
      event_date: eventDateToSend,
      event_location: eventLocationToSend,
      groom_name: formData.groomName,
      bride_name: formData.brideName,
    };
    try {
      const response = await api.put('/customer-profile/update/', dataToSend, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log('Form Submitted Successfully!', response.data);
      alert('Form submitted successfully!');
      await update();
      reset();
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      alert(`Form submission failed: ${JSON.stringify(error.response?.data || error.message)}`);
      return;
    }
  };

  const reset = () => {
    setStep(1);
    setFormData({
      eventDate: '',
      eventLocation: null,
      eventLocationName: '',
      groomName: '',
      brideName: '',
    });
  };

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
              <div className="flex items-center gap-2">
                <span className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E91E63] focus:border-[#E91E63] dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 text-left">
                  {formData.eventLocationName || 'Select a location'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowLocationModal(true)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#E91E63] rounded-md dark:text-[#E91E63] dark:hover:bg-neutral-700 focus:outline-none"
                  title="Change Location"
                >
                  <svg
                    className="size-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                    <circle cx="12" cy="9" r="3"></circle>
                  </svg>
                  <u>Change</u>
                </button>
              </div>
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
        return (
          <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 text-gray-800 dark:text-neutral-200">
            <h3 className="text-lg font-semibold mb-2">Preview Your Details</h3>
            <div className="bg-gray-100 dark:bg-neutral-700 p-4 rounded-lg shadow-inner">
              <p className="mb-2">
                <strong className="text-[#E91E63]">Event Date:</strong> {formData.eventDate || 'Not provided'}
              </p>
              <p className="mb-2">
                <strong className="text-[#E91E63]">Event Location:</strong> {formData.eventLocationName || 'Not provided'}
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6  dark:bg-neutral-800/70 backdrop-blur-sm">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 relative">
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
            <div className="mt-5 sm:mt-8">
              <div className="p-4 h-auto min-h-48 bg-gray-50 dark:bg-neutral-800 flex justify-center items-center border border-dashed border-gray-200 dark:border-neutral-700 rounded-xl">
                {renderStepContent(step)}
              </div>
              <div className="mt-5 flex justify-between items-center gap-x-2">
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
                {step === 1 && <div className="w-1/4" />}
                <div className="flex items-center gap-x-2">
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
                  {step < totalSteps && (
                    <button
                      type="button"
                      onClick={goNext}
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
                  {step === totalSteps && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-[#E91E63] text-white hover:bg-[#C2185B] transition-colors duration-200"
                    >
                      Submit
                    </button>
                  )}
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
      <LocationSelector
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSave={handleLocationSelected}
      />
    </div>
  );
};

export default EventForm;
