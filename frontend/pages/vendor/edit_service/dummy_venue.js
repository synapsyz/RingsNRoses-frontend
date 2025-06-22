import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// Import all the components
import PrelineTiptapEditor from '@/components/PrelineTiptapEditor';
import FormInput from '@/components/FormInput';
import CheckboxGroup from '@/components/CheckboxGroup';
import LocationSelector from '@/components/LocationSelector';
import ThumbnailUploader from '@/components/ThumbnailUploader';
import FAQEditor from '@/components/FAQEditor'; // Added back

const API_URL = process.env.NEXT_PUBLIC_APP_ENV === 'development'
  ? process.env.NEXT_PUBLIC_API_LOCALHOST
  : process.env.NEXT_PUBLIC_HOST;

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'ngrok-skip-browser-warning': process.env.NEXT_PUBLIC_APP_ENV !== 'development',
  },
});

export default function EditService() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  // State for all form fields
  const [venueName, setVenueName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [about, setAbout] = useState('');
  const [perPlatePrice, setPerPlatePrice] = useState('');
  const [guestCapacity, setGuestCapacity] = useState('');
  const [eventSpaces, setEventSpaces] = useState('');
  const [totalAreaSqft, setTotalAreaSqft] = useState('');
  const [advanceBookingNotice, setAdvanceBookingNotice] = useState('');
  const [advancePaymentRequired, setAdvancePaymentRequired] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [location, setLocation] = useState('');
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState(new Set());
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const subcategory = session?.user?.vendor_profile?.subcategory.id;
  const venueId = session?.user?.vendor_profile?.service_id;

  // Effect to fetch initial venue details
  useEffect(() => {
    const fetchVenueDetails = async () => {
      if (!venueId || status !== 'authenticated') return;
      try {
        const config = { headers: { Authorization: `Bearer ${session.accessToken}` } };
        const response = await api.get(`/venues/${venueId}`, config);
        const venueData = response.data;
        
        // Using optional chaining and nullish coalescing for safety
        setVenueName(venueData?.name ?? '');
        setManagerName(venueData?.manager_name ?? '');
        setContactNumber(venueData?.contact_number ?? '');
        setEmailAddress(venueData?.email ?? '');
        setAbout(venueData?.about ?? '');
        setPerPlatePrice(venueData?.per_plate_price ?? '');
        setGuestCapacity(venueData?.guest_capacity ?? '');
        setEventSpaces(venueData?.event_spaces ?? '');
        setTotalAreaSqft(venueData?.total_area_sqft ?? '');
        setAdvanceBookingNotice(venueData?.advance_booking_notice ?? '');
        setAdvancePaymentRequired(venueData?.advance_payment_required ?? '');
        setCancellationPolicy(venueData?.cancellation_policy ?? '');
        setRestrictions(venueData?.restrictions ?? '');
        setLocation(venueData?.location ?? '');
        setSelectedServices(new Set(venueData?.services_offered_details?.map(s => s.id) || []));
        setSelectedEventTypes(new Set(venueData?.event_types_details?.map(et => et.id) || []));
        setWebsiteLink(venueData?.website_link ?? '');
        setInstagramLink(venueData?.instagram_link ?? '');
        setFacebookLink(venueData?.facebook_link ?? '');
        setTermsAndConditions(venueData?.terms_and_conditions ?? '');

      } catch (error) {
        console.error("Error fetching venue details:", error);
        setFormMessage({ type: 'error', text: 'Error: Could not fetch venue details.' });
      }
    };
    fetchVenueDetails();
  }, [venueId, status, session]);

  // Effect to fetch services and event types
  useEffect(() => {
    const fetchServicesAndEventTypes = async () => {
      try {
        const [servicesRes, eventTypesRes] = await Promise.all([
          api.get('/services/venue/'),
          api.get('/event-types/'),
        ]);
        setServices(servicesRes.data?.results || []);
        setEventTypes(eventTypesRes.data?.results || []);
      } catch (error) {
        console.error('Error fetching services or event types:', error);
      }
    };
    fetchServicesAndEventTypes();
  }, []);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      const newSet = new Set(prev);
      newSet.has(serviceId) ? newSet.delete(serviceId) : newSet.add(serviceId);
      return newSet;
    });
  };

  const handleEventTypeToggle = (eventTypeId) => {
    setSelectedEventTypes(prev => {
      const newSet = new Set(prev);
      newSet.has(eventTypeId) ? newSet.delete(eventTypeId) : newSet.add(eventTypeId);
      return newSet;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!venueId) {
      setFormMessage({ type: 'error', text: 'Error: Venue ID not found.' });
      return;
    }
    const formData = { /* ... your form data ... */ };
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessToken}` } };
      await api.put(`/venues/${venueId}/`, formData, config);
      setFormMessage({ type: 'success', text: 'Venue updated successfully!' });
    } catch (error) {
      console.error("Error updating venue:", error.response?.data || error.message);
      setFormMessage({ type: 'error', text: `Error: ${error.response?.data?.detail || 'Failed to update venue.'}` });
    }
  };

  return (
    <>
      <Head>
        <title>Edit Service</title>
      </Head>
      <div className="bg-stone-50 dark:bg-neutral-900">
        <header>{/* Your Header Component */}</header>
        <main id="content" className="pb-24">
          <form onSubmit={handleSubmit}>
            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="py-2 sm:pb-0 sm:pt-5 space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">

                  {/* Left Column */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex flex-col bg-white border border-stone-200 rounded-xl p-5 space-y-4 dark:bg-neutral-800 dark:border-neutral-700">
                      <h2 className="font-semibold text-stone-800 dark:text-neutral-200">Services Info</h2>
                      <ThumbnailUploader />
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormInput id="venueName" label="Name" placeholder="Royal Palace Banquet" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
                        <FormInput id="managerName" label="Manager Name" placeholder="John Doe" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
                        <FormInput id="contactNumber" label="Contact Number" placeholder="+919999999998" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                        <FormInput id="emailAddress" label="Email Address" type="email" placeholder="mahal@email.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                      </div>
                      <PrelineTiptapEditor label="Description (About)" content={about} onUpdate={setAbout} />
                    </div>

                    <div className="flex flex-col bg-white border border-stone-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5"><h2 className="font-semibold text-stone-800 dark:text-neutral-200">Services Offered</h2></div>
                      <div className="p-5 pt-0"><CheckboxGroup items={services} selectedItems={selectedServices} onToggle={handleServiceToggle} name="services" /></div>
                    </div>

                    {/* Restored FAQ Editor */}
                    <div className="bg-white border border-stone-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                        <FAQEditor />
                    </div>

                    <div className="flex flex-col bg-white border border-stone-200 rounded-xl p-5 space-y-4 dark:bg-neutral-800 dark:border-neutral-700">
                      <PrelineTiptapEditor label="Terms and Conditions" content={termsAndConditions} onUpdate={setTermsAndConditions} />
                    </div>
                    
                    <div className="flex flex-col bg-white border border-stone-200 rounded-xl p-5 space-y-4 dark:bg-neutral-800 dark:border-neutral-700">
                      <PrelineTiptapEditor label="Cancellation Policy" content={cancellationPolicy} onUpdate={setCancellationPolicy} />
                    </div>

                    <div className="flex flex-col bg-white border border-stone-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5"><h2 className="font-semibold text-stone-800 dark:text-neutral-200">Social Media Links</h2></div>
                      <div className="p-5 pt-0 grid sm:grid-cols-3 gap-5">
                        <FormInput id="websiteLink" label="Website Link" type="url" placeholder="https://example.com" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} />
                        <FormInput id="instagramLink" label="Instagram Link" type="url" placeholder="https://instagram.com/yourvenue" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} />
                        <FormInput id="facebookLink" label="Facebook Link" type="url" placeholder="https://facebook.com/yourvenue" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-2">
                    <div className="lg:sticky lg:top-5 space-y-4">
                      <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 dark:bg-neutral-800 dark:border-neutral-700">
                        <h2 className="font-semibold text-stone-800 dark:text-neutral-200">Pricing</h2>
                        <FormInput id="perPlatePrice" label="Per Plate Price (INR)" type="number" placeholder="800.00" value={perPlatePrice} onChange={(e) => setPerPlatePrice(e.target.value)} />
                      </div>

                      <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 dark:bg-neutral-800 dark:border-neutral-700">
                        <h2 className="font-semibold text-stone-800 dark:text-neutral-200">Venue Details</h2>
                        <FormInput id="guestCapacity" label="Guest Capacity" type="number" placeholder="450" value={guestCapacity} onChange={(e) => setGuestCapacity(e.target.value)} />
                        <FormInput id="eventSpaces" label="Event Spaces" placeholder="Halls, Lawns" value={eventSpaces} onChange={(e) => setEventSpaces(e.target.value)} />
                        <FormInput id="totalAreaSqft" label="Total Area (sq. ft.)" type="number" placeholder="5000" value={totalAreaSqft} onChange={(e) => setTotalAreaSqft(e.target.value)} />
                      </div>

                      <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 dark:bg-neutral-800 dark:border-neutral-700">
                        <h2 className="font-semibold text-stone-800 dark:text-neutral-200">Booking Details</h2>
                        <FormInput id="advanceBookingNotice" label="Advance Booking Notice (Days)" type="number" placeholder="30" value={advanceBookingNotice} onChange={(e) => setAdvanceBookingNotice(e.target.value)} />
                        <FormInput id="advancePaymentRequired" label="Advance Payment Required (%)" type="number" placeholder="50" value={advancePaymentRequired} onChange={(e) => setAdvancePaymentRequired(e.target.value)} />
                      </div>

                      <div className="bg-white border border-stone-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="p-5 space-y-4">
                            <h2 className="font-semibold text-stone-800 dark:text-neutral-200">Events Supported</h2>
                            <CheckboxGroup items={eventTypes} selectedItems={selectedEventTypes} onToggle={handleEventTypeToggle} name="eventTypes" />
                        </div>
                        <div className="p-5 pt-0">
                            <PrelineTiptapEditor label="Restrictions" content={restrictions} onUpdate={setRestrictions} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 start-0 end-0 p-3 bg-white/80 backdrop-blur-sm border-t border-stone-200 dark:bg-neutral-800/80 dark:border-neutral-700">
              <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center gap-x-3">
                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700">Cancel</button>
                <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700">Save changes</button>
              </div>
            </div>
          </form>
        </main>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/preline@2.3.0/dist/preline.min.js" strategy="afterInteractive" />
    </>
  );
}