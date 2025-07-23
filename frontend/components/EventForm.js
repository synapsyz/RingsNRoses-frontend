"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import LocationSelector from '@/components/LocationSelector';
import PhoneNumberInput from '@/components/PhoneNumberInput'; // IMPORT THE COMPONENT

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

    // State for phone details, managed by the parent form
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState({ code: '+91', name: 'India', flag: '🇮🇳' });
    const [isWhatsApp, setIsWhatsApp] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getFullPhoneNumber = () => {
        if (!phoneNumber.trim()) return null;
        return selectedCountry.code + phoneNumber;
    };

    const fetchLocationNameById = useCallback(async (locationId) => {
        if (!locationId) return;
        try {
            const response = await api.get(`/locations/${locationId}/`);
            if (response.data && response.data.name) {
                setFormData((prev) => ({ ...prev, eventLocationName: response.data.name }));
            }
        } catch (error) {
            console.error('Failed to fetch location name by ID:', error);
            setFormData((prev) => ({ ...prev, eventLocationName: 'Unknown Location' }));
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);
        let dataFromLocalStorage = null;

        try {
            const storedEventDataString = localStorage.getItem('eventFormData');
            if (storedEventDataString) {
                dataFromLocalStorage = JSON.parse(storedEventDataString);
            }
        } catch (error) {
            console.error("Error reading from local storage:", error);
        }

        if (dataFromLocalStorage && dataFromLocalStorage.event_date && dataFromLocalStorage.event_location) {
            setFormData({
                eventDate: dataFromLocalStorage.event_date || '',
                eventLocation: dataFromLocalStorage.event_location || null,
                groomName: dataFromLocalStorage.groom_name || '',
                brideName: dataFromLocalStorage.bride_name || '',
                eventLocationName: '',
            });
            setPhoneNumber(dataFromLocalStorage.phone_number || '');
            if (dataFromLocalStorage.selected_country) {
                setSelectedCountry(dataFromLocalStorage.selected_country);
            }
            setIsWhatsApp(dataFromLocalStorage.is_whatsapp || false);

            setShowModal(false);
            if (dataFromLocalStorage.event_location) {
                fetchLocationNameById(dataFromLocalStorage.event_location);
            }
        } else {
            setShowModal(true);
        }
        setIsLoading(false);
    }, [fetchLocationNameById]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleLocationSelected = useCallback((selectedLocationData) => {
        setFormData((prev) => ({
            ...prev,
            eventLocation: selectedLocationData.id,
            eventLocationName: selectedLocationData.location,
        }));
        setShowLocationModal(false);
    }, []);
    
    const closeLocationModal = useCallback(() => setShowLocationModal(false), []);

    const isStep1Valid = useCallback(() => formData.eventDate !== '' && formData.eventLocation !== null, [formData]);
    const isStep2Valid = useCallback(() => phoneNumber.trim() !== '', [phoneNumber]);

    const goNext = useCallback(() => {
        if (step === 1 && !isStep1Valid()) {
            alert('Please fill in both Event Date and Event Location.');
            return;
        }
        if (step === 2 && !isStep2Valid()) {
            alert('Please provide a phone number to proceed.');
            return;
        }
        if (step < totalSteps) setStep((prev) => prev + 1);
    }, [step, isStep1Valid, isStep2Valid]);

    const goBack = useCallback(() => {
        if (step > 1) setStep((prev) => prev - 1);
    }, [step]);

    const goSkip = useCallback(() => {
        if (step === 2) setStep((prev) => prev + 1);
    }, [step]);

    const reset = useCallback(() => {
        setStep(1);
        setFormData({
            eventDate: '', eventLocation: null, eventLocationName: '',
            groomName: '', brideName: '',
        });
        setPhoneNumber('');
        setSelectedCountry({ code: '+91', name: 'India', flag: '🇮🇳' });
        setIsWhatsApp(false);
    }, []);

    const handleSubmit = useCallback(async () => {
        
let accessToken = session?.accessToken;

  
  const storedDataString = sessionStorage.getItem('session');
  if (storedDataString) {
    try {
      const storedData = JSON.parse(storedDataString);
   
      if (storedData && storedData.tokens && storedData.tokens.access) {
        accessToken = storedData.tokens.access;
      }
    } catch (error) {
      console.error("Failed to parse session data from sessionStorage:", error);
    }
  }

 
  if (!accessToken) {
    alert('Authentication error. Your session may have expired. Please log in again.');
    setIsLoading(false);
    return;
  }

        if (!accessToken) {
            alert('Authentication token is missing.');
            return;
        }

        const fullPhoneNumber = getFullPhoneNumber();

        const dataToSend = {
            event_date: formData.eventDate || null,
            event_location: formData.eventLocation,
            groom_name: formData.groomName.trim() || null,
            bride_name: formData.brideName.trim() || null,
            phone: fullPhoneNumber,
            is_whatsapp: isWhatsApp,
        };

        const dataToStore = { ...dataToSend, phone_number: phoneNumber, selected_country: selectedCountry };

        try {
            await api.put('/customer-profile/update/', dataToSend, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            alert('Form submitted successfully!');
            localStorage.setItem('eventFormData', JSON.stringify(dataToStore));
            setShowModal(false);
            await update();
            reset();
            window.location.reload();
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message || 'Unknown error';
            alert(`Form submission failed: ${errorMessage}`);
        }
    }, [session, formData, phoneNumber, selectedCountry, isWhatsApp, update, reset]);

    const renderStepContent = (current) => {
        switch (current) {
            case 1:
                return (
                    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-2">Event Details</h3>
                        <div>
                           <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Event Date:</label>
                           <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
                         </div>
                         <div>
                           <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Event Location:</label>
                           <div className="flex items-center gap-2">
                             <span className="block w-full p-2 text-left">{formData.eventLocationName || 'Select a location'}</span>
                             <button type="button" onClick={() => setShowLocationModal(true)} className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[#E91E63] rounded-md focus:outline-none">
                                <svg className="size-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="3"></circle></svg>
                                <u>Change</u>
                             </button>
                           </div>
                         </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-2">Contact & Couple's Names</h3>
                        <div>
                           <label htmlFor="groomName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Groom's Name:</label>
                           <input type="text" id="groomName" name="groomName" value={formData.groomName} onChange={handleChange} placeholder="Enter groom's name" className="w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <div>
                           <label htmlFor="brideName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Bride's Name:</label>
                           <input type="text" id="brideName" name="brideName" value={formData.brideName} onChange={handleChange} placeholder="Enter bride's name" className="w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <hr className="my-2 border-gray-200 dark:border-neutral-700" />
                        <PhoneNumberInput
                            phoneNumber={phoneNumber}
                            onPhoneNumberChange={setPhoneNumber}
                            selectedCountry={selectedCountry}
                            onCountryChange={setSelectedCountry}
                        />
                        <div className="flex items-center gap-x-2 pt-2">
                            <input type="checkbox" id="is-whatsapp" checked={isWhatsApp} onChange={(e) => setIsWhatsApp(e.target.checked)} className="shrink-0 size-4 rounded-sm border-gray-300" style={{ accentColor: '#128c7e' }}/>
                            <label htmlFor="is-whatsapp" className="text-sm text-gray-700 dark:text-neutral-300">Is this number on <span style={{ color: '#128c7e', fontWeight: 'bold' }}>WhatsApp?</span></label>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 text-gray-800 dark:text-neutral-200">
                        <h3 className="text-lg font-semibold mb-2">Preview Your Details</h3>
                        <div className="bg-gray-100 dark:bg-neutral-700 p-4 rounded-lg shadow-inner space-y-2">
                           <p><strong className="text-[#E91E63]">Event Date:</strong> {formData.eventDate || 'Not provided'}</p>
                           <p><strong className="text-[#E91E63]">Event Location:</strong> {formData.eventLocationName || 'Not provided'}</p>
                           <p><strong className="text-[#E91E63]">Groom's Name:</strong> {formData.groomName || 'Not provided'}</p>
                           <p><strong className="text-[#E91E63]">Bride's Name:</strong> {formData.brideName || 'Not provided'}</p>
                           <p><strong className="text-[#E91E63]">Phone:</strong> {getFullPhoneNumber() || 'Not provided'}</p>
                           <p><strong className="text-[#E91E63]">WhatsApp:</strong> {isWhatsApp ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                );
            default:
                return 'Unknown Step';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6"><p>Loading...</p></div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 dark:bg-neutral-800/70 backdrop-blur-sm">
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 relative">
                        <ul className="relative flex flex-row gap-x-2 mb-8">
                            {[1, 2, 3].map((index) => (
                                <li key={index} className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ${step === index ? 'hs-stepper-active' : ''} ${step > index ? 'hs-stepper-completed' : ''}`}>
                                    <span className="min-w-7 min-h-7 group inline-flex items-center text-xs align-middle">
                                        <span className={`size-7 flex justify-center items-center shrink-0 rounded-full font-medium ${step >= index ? 'bg-[#E91E63] text-white' : 'bg-gray-100 text-gray-800'}`}>
                                            {step > index ? (<svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>) : (index)}
                                        </span>
                                        <span className="ms-2 text-sm font-medium text-gray-800 dark:text-neutral-300">{index === 1 ? 'Event' : index === 2 ? 'Details' : 'Preview'}</span>
                                    </span>
                                    <div className={`w-full h-px flex-1 ${step > index ? 'bg-[#C2185B]' : 'bg-gray-200'} group-last:hidden`}></div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-5 sm:mt-8">
                            <div className="p-4 h-auto min-h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
                                {renderStepContent(step)}
                            </div>
                            <div className="mt-5 flex justify-between items-center gap-x-2">
                                {step > 1 ? (<button type="button" onClick={goBack} className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50">Back</button>) : (<div style={{ minWidth: '70px' }} />) }
                                <div className="flex items-center gap-x-2">
                                    {step === 2 && (<button type="button" onClick={goSkip} className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50">Skip</button>)}
                                    {step < totalSteps && (<button type="button" onClick={goNext} disabled={(step === 1 && !isStep1Valid()) || (step === 2 && !isStep2Valid())} className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-[#E91E63] text-white hover:bg-[#C2185B] disabled:opacity-50">Next</button>)}
                                    {step === totalSteps && (<button type="button" onClick={handleSubmit} className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-[#E91E63] text-white hover:bg-[#C2185B]">Submit</button>)}
                                    {step === totalSteps && (<button type="button" onClick={reset} className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg bg-gray-500 text-white hover:bg-gray-600">Reset</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <LocationSelector isOpen={showLocationModal} onClose={closeLocationModal} onSave={handleLocationSelected} />
        </div>
    );
};

export default EventForm;