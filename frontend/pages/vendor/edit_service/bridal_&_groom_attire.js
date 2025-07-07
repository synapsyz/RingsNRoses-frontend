import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import LocationSelector from '@/components/LocationSelector';
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import CustomHead from '@/components/vendor/Head';
import Header from '@/components/vendor/Header';
import SecondaryNav from '@/components/vendor/SecondaryNav';
import ThumbnailUploader from '@/components/ThumbnailUploader';
import FormInput from '@/components/FormInput';
import TiptapEditor from '@/components/TiptapEditor';
import MediaManager from '@/components/MediaManager';
import CheckboxGroup from '@/components/CheckboxGroup';
import Pricing from '@/components/Pricing'; // Keep Pricing if applicable, adjust props
import AddressInput from '@/components/AddressInput'; // Adjust the path if necessary
import FAQEditor from '@/components/FAQEditor.js';
let api_url;
const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;
const getApiUrl = () => process.env.NEXT_PUBLIC_APP_ENV === 'development' ? process.env.NEXT_PUBLIC_API_LOCALHOST : process.env.NEXT_PUBLIC_HOST;
api_url = getApiUrl();

const api = axios.create({
  baseURL: api_url + "/api/v1",
  headers: {
    ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' })
  }
});

export default function AddBridalGroomAttire() {
  const [aboutContent, setAboutContent] = useState('');
  const [cancellationPolicyContent, setCancellationPolicyContent] = useState('');
  const [restrictionsContent, setRestrictionsContent] = useState('');
  const [termsAndConditionsContent, setTermsAndConditionsContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [thumbnailKey, setThumbnailKey] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [initialGallery, setInitialGallery] = useState([]);
  const [updatedExistingMedia, setUpdatedExistingMedia] = useState([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);
  const mediaManagerRef = useRef(null);
  const thumbnailUploaderRef = useRef(null);
  const [faqs, setFaqs] = useState([]);
  const router = useRouter();
  const [bridalgroomattireId, setBridalGroomAttireId] = useState(null); // Changed
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const cancellationEditorRef = useRef(null);
  const cancellationEditorInstance = useRef(null);
  const restrictionsEditorRef = useRef(null);
  const restrictionsEditorInstance = useRef(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const { data: session, status } = useSession();
  const [attireTypes, setAttireTypes] = useState([]); // Changed
  const [selectedAttireTypes, setSelectedAttireTypes] = useState(new Set()); // Changed
  const [styles, setStyles] = useState([]); // Changed
  const [selectedStyles, setSelectedStyles] = useState(new Set()); // Changed
  const [Name, setName] = useState('');
  const [contactName, setcontactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [about, setAbout] = useState('');
  const [startingPrice, setStartingPrice] = useState(''); // Changed
  const [advancePayment, setAdvancePayment] = useState('');
  const [bookingNotice, setBookingNotice] = useState(''); // Changed
  const [advancePaymentRequired, setAdvancePaymentRequired] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [location, setLocation] = useState('');
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const termsEditorRef = useRef(null);
  const termsEditorInstance = useRef(null);
  const [returnDeliveryPolicy, setReturnDeliveryPolicy] = useState('');
  const returnDeliveryEditorRef = useRef(null);
  const returnDeliveryEditorInstance = useRef(null);
  const [websiteLink, setWebsiteLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [address, setAddress] = useState('');
  const [alternativeNumber, setAlternativeNumber] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [sizeRanges, setSizeRanges] = useState([]); // Declare sizeRanges state
  const [selectedSizeRanges, setSelectedSizeRanges] = useState(new Set()); // Declare selectedSizeRanges state
  const [errors, setErrors] = useState({});
 const [vendorId, setVendorId] = useState(null);
   const [serviceName, setServiceName] = useState(null);
   const [serviceId, setServiceId] = useState(null);
   const subcategory = session?.user?.vendor_profile?.subcategory?.id;

    useEffect(() => {
     // ... existing useEffect for cateringId
 
     if (session?.user?.vendor_profile) {
       setVendorId(session.user.vendor_profile.id);
       const formattedServiceName = session.user.vendor_profile.subcategory?.category?.name
         .replace(/ /g, '_')
         .toLowerCase();
       setServiceName(formattedServiceName);
       setServiceId(session.user.vendor_profile.service_id); // Assuming service_id is directly available here
     }
   }, [session]);
 console.log(vendorId);
 console.log(serviceName);
 console.log(serviceId);
  const handleGalleryUpdate = (existingMedia, newFiles) => {
    setUpdatedExistingMedia(existingMedia);
    setNewGalleryFiles(newFiles);
  };

  const handleFileChange = (file) => {
    if (file) {
      setThumbnailFile(file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const handleDeleteThumbnail = () => {
    setThumbnailUrl(null);
    setThumbnailFile(null);
    setThumbnailKey(null);
    if (thumbnailUploaderRef.current) {
      thumbnailUploaderRef.current.clearFile();
    }
  };

  useEffect(() => {
    const serviceId = session?.user?.vendor_profile?.service_id;
    if (serviceId) {
      setBridalGroomAttireId(serviceId); // Changed
    }
  }, [session]);

  useEffect(() => {
    const fetchBridalGroomAttireData = async () => { // Changed function name
      if (bridalgroomattireId) { // Changed
        try {
          const config = {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          };
          const response = await api.get(`/bridalgroomattire/${bridalgroomattireId}/`, config); // Changed API endpoint
          const data = response.data;
          setName(data.name || '');
          setcontactName(data.manager_name || '');
          setContactNumber(data.contact_number || '');
          setEmailAddress(data.email || '');
          setAboutContent(data.about || '');
          setStartingPrice(data.starting_price || ''); // Changed
          setAdvancePayment(data.advance_payment_required || '');
          setBookingNotice(data.booking_notice || ''); // Changed
          // setAdvancePaymentRequired(data.advance_payment_required || '');
          setCancellationPolicy(data.cancellation_policy || '');
          setRestrictions(data.restrictions || '');
          setLocation(data.location_details?.name || '');
          setSelectedLocationData(data.location_details ? { locationId: data.location_details.id, location: data.location_details.name } : null);
          setTermsAndConditions(data.terms_and_conditions || '');
          setReturnDeliveryPolicy(data.return_delivery_policy || '');
          setWebsiteLink(data.website_link || '');
          setInstagramLink(data.instagram_link || '');
          setFacebookLink(data.facebook_link || '');
          setAddress(data.address || '');
          setYearsOfExperience(data.years_of_experience || '');
          setAlternativeNumber(data.alternative_number || '');
          setBusinessRegistrationNumber(data.business_registration_number || '');
          setGstNumber(data.gst_number || '');
          setThumbnailUrl(data.thumbnail_url_detail || null);
          setThumbnailKey(data.thumbnail_url || null);  
          if (data.faq_details && Array.isArray(data.faq_details)) {
            const loadedFaqs = data.faq_details.map((faq, index) => ({
              id: `faq-${index}-${Date.now()}`,
              question: faq.question || '',
              answer: faq.answer || ''
            }));
            setFaqs(loadedFaqs);
          }

          
          

          if (editorInstance.current) editorInstance.current.commands.setContent(data.about || '');
          if (cancellationEditorInstance.current) cancellationEditorInstance.current.commands.setContent(data.cancellation_policy || '');
          if (termsEditorInstance.current) termsEditorInstance.current.commands.setContent(data.terms_and_conditions || '');
          if (returnDeliveryEditorInstance.current) returnDeliveryEditorInstance.current.commands.setContent(data.return_delivery_policy || '');

          if(data.event_types_details){
            setSelectedSizeRanges(new Set(data.event_types_details.map(eventType => eventType.id)));
          }
           if (data.services_offered_details) {
          setSelectedAttireTypes(new Set(data.services_offered_details.map(service => service.id))); // Changed
           }
           if (data.images && Array.isArray(data.images)) {
            const imageUrls = data.images.map(imageObject => imageObject.image_url);
            setInitialGallery(imageUrls);
          }
        } catch (error) {
          console.error("Error fetching bridal/groom attire data:", error); // Changed message
          setFormMessage({ type: 'error', text: 'Failed to load bridal/groom attire data.' }); // Changed message
        }
      }
    };
    fetchBridalGroomAttireData(); // Changed function call
  }, [bridalgroomattireId, session]); // Changed dependency

  useEffect(() => {
    const fetchAttireTypes = async () => {
      try {
        const response = await api.get("/services/venue/");
        if (response.data && Array.isArray(response.data.results)) {
          setAttireTypes(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching attire types:", error);
      }
    };

    const fetchSizeRanges = async () => { // NEW: Function to fetch size ranges
      try {
        const response = await api.get("/event-types/"); // **IMPORTANT:** Adjust this API endpoint if your backend uses a different path for size ranges
        if (response.data && Array.isArray(response.data.results)) {
          setSizeRanges(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching size ranges:", error);
      }
    };

    fetchAttireTypes();
    fetchSizeRanges(); // Call the new function to fetch size ranges
  }, []);

  const handleStyleToggle = (styleId) => { // Changed function name
    setSelectedStyles(prevSelectedStyles => { // Changed
      const newSelected = new Set(prevSelectedStyles);
      if (newSelected.has(styleId)) newSelected.delete(styleId);
      else newSelected.add(styleId);
      return newSelected;
    });
  };
const handleSizeRangeToggle = (sizeRangeId) => {
    setSelectedSizeRanges(prevSelectedSizeRanges => {
      const newSelected = new Set(prevSelectedSizeRanges);
      if (newSelected.has(sizeRangeId)) newSelected.delete(sizeRangeId);
      else newSelected.add(sizeRangeId);
      return newSelected;
    });
  };
  const handleAttireTypeToggle = (attireTypeId) => { // Changed function name
    setSelectedAttireTypes(prevSelectedAttireTypes => { // Changed
      const newSelected = new Set(prevSelectedAttireTypes);
      if (newSelected.has(attireTypeId)) newSelected.delete(attireTypeId);
      else newSelected.add(attireTypeId);
      return newSelected;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: '', text: '' }); // Clear previous messages
    setErrors({}); // Clear previous errors

    const newErrors = {};

    // Validate required fields
    if (!Name.trim()) {
      newErrors.Name = 'Service Name is required.';
    }
    if (!contactName.trim()) {
      newErrors.contactName = 'Contact Person Name is required.';
    }
    if (!contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number is required.';
    }
    if (!emailAddress.trim()) {
      newErrors.emailAddress = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.emailAddress = 'Email Address is invalid.';
    }
    if (!yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of Experience is required.';
    }
    if (!aboutContent.trim()) {
      newErrors.aboutContent = 'Description (About) is required.';
    }
    if (!location.trim() || !selectedLocationData) {
      newErrors.location = 'Service Area Location is required.';
    }
    if (!address.trim()) {
      newErrors.address = 'Business Address is required.';
    }
    if (!startingPrice.trim()) {
      newErrors.startingPrice = 'Starting Price is required.';
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormMessage({ type: 'error', text: 'Please fill in all required fields.' });
      // Scroll to the first error or top of the form
      const firstErrorField = document.getElementById(Object.keys(newErrors)[0]);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return; // Stop the submission
    }
    let finalThumbnailKey = thumbnailKey;

    if (thumbnailFile) {
      const uploadResult = await thumbnailUploaderRef.current.upload();
      if (!uploadResult.success) {
        setFormMessage({ type: 'error', text: `Thumbnail upload failed: ${uploadResult.message}` });
        return;
      }
      finalThumbnailKey = uploadResult.key;
    }
    let galleryResult = await mediaManagerRef.current.upload();
    if (!galleryResult.success) {
      setFormMessage({ type: 'error', text: `Main gallery upload failed: ${galleryResult.message}` });
      return;
    }
    const finalGalleryList = [...updatedExistingMedia, ...galleryResult.keys];
    const faqsForApi = faqs
      .filter(faq => faq.question.trim() !== '' && faq.answer.trim() !== '')
      .map((faq, index) => ({
        question: faq.question,
        answer: faq.answer,
        order: index + 1,
      }));
    const formData = {
      name: Name,
      vendor: vendorId,
      subcategory: subcategory,
      event_types: Array.from(selectedSizeRanges), 
      location: selectedLocationData?.locationId || null,
      about: aboutContent,
      starting_price: parseFloat(startingPrice), // Changed
      contact_number: contactNumber,
      cancellation_policy: cancellationPolicy,
      services_offered: Array.from(selectedAttireTypes), // Changed
      manager_name: contactName,
      email: emailAddress,
      advance_payment_required: parseFloat(advancePayment),
      booking_notice: bookingNotice, // Changed
      // advance_payment_required: parseFloat(advancePaymentRequired),
      restrictions: restrictions,
      terms_and_conditions: termsAndConditions,
      return_delivery_policy: returnDeliveryPolicy,
      website_link: websiteLink,
      instagram_link: instagramLink,
      facebook_link: facebookLink,
      address: address,
      alternative_number: alternativeNumber,
      business_registration_number: businessRegistrationNumber,
      gst_number: gstNumber,
      years_of_experience: yearsOfExperience,
      thumbnail_url: finalThumbnailKey,
      gallery_images: finalGalleryList,
      faqs: faqsForApi
    };
    Object.keys(formData).forEach(key => {
      if (formData[key] === null || formData[key] === '') {
        delete formData[key];
      }
    });
   

    console.log("Submitting data:", formData);

    try {
      const accessToken = session?.accessToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      };

      let response;
      if (bridalgroomattireId) { // Changed
        response = await api.put(`/bridalgroomattire/${bridalgroomattireId}/`, formData, config); // Changed API endpoint
        setFormMessage({ type: 'success', text: 'Bridal & Groom Attire updated successfully!' }); // Changed message
      } else {
        response = await api.post("/bridalgroomattire/", formData, config); // Changed API endpoint
        setFormMessage({ type: 'success', text: 'Bridal & Groom Attire added successfully!' }); // Changed message
      }
      console.log("Operation successful:", response.data);
    } catch (error) {
      console.error("Error adding/updating Bridal & Groom Attire:", error); // Changed message
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        setFormMessage({ type: 'error', text: `Error: ${error.response.data.detail || 'Failed to process Bridal & Groom Attire.'}` }); // Changed message
      } else if (error.request) {
        console.error("Error request:", error.request);
        setFormMessage({ type: 'error', text: 'Error: No response from server. Check network connection.' });
      } else {
        console.error("Error message:", error.message);
        setFormMessage({ type: 'error', text: `Error: ${error.message}` });
      }
    }
  };

  return (
    <>
      <CustomHead />
      <Header />
      <SecondaryNav />

      <div className="bg-stone-50 dark:bg-neutral-900">
        <main id="content" className="pb-14 sm:pb-16">
          <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="py-2 sm:pb-0 sm:pt-5 space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Attire info</h2> {/* Changed */}
                    </div>
                    <div className="p-5 space-y-4">
                      <ThumbnailUploader ref={thumbnailUploaderRef} preview={thumbnailUrl} onFileChange={handleFileChange} onDelete={handleDeleteThumbnail} />
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                        <FormInput id="AttireName" label="Attire Service Name" placeholder="Your Attire Shop" value={Name} onChange={(e) => setName(e.target.value)} required error={errors.Name}/> {/* Changed */}
                        <FormInput id="contactName" label="Contact Name" placeholder="John Doe" value={contactName} onChange={(e) => setcontactName(e.target.value)} required error={errors.contactName} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                        <FormInput id="contactNumber" label="Contact Number" placeholder="+919999999998" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required error={errors.contactNumber} />
                        <FormInput id="emailAddress" label="Email Address" type="email" placeholder="attires@email.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required error={errors.emailAddress} /> {/* Changed */}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                      <FormInput
                        id="alternativeNumber"
                        label="Alternative Number"
                        type="text"
                        placeholder="Enter Alternative Number"
                        value={alternativeNumber}
                        onChange={(e) => setAlternativeNumber(e.target.value)}
                      />
                      <FormInput
                        id="businessRegistrationNumber"
                        label="Business Registration Number"
                        type="text"
                        placeholder="Enter Business Registration Number"
                        value={businessRegistrationNumber}
                        onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
                      />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                      <FormInput
                        id="gstNumber"
                        label="GST Number"
                        type="text"
                        placeholder="Enter GST Number"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                      />
                      <FormInput
                        id="yearsOfExperience"
                        label="Years of Experience"
                        type="number"
                        placeholder="Enter Years of Experience"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        required
                        error={errors.yearsOfExperience}
                      />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Description (About)</label>
                        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                          <TiptapEditor content={aboutContent} onUpdate={setAboutContent} placeholder="Tell us about your bridal and groom attire service..." /> {/* Changed */}
                        </div>
                        {errors.aboutContent && <p className="text-red-500 text-sm mt-1">{errors.aboutContent}</p>}
                      </div>
                    </div>
                  </div>

                    <MediaManager
                      ref={mediaManagerRef}
                      initialMedia={initialGallery}
                      onUpdate={handleGalleryUpdate}
                      pathPrefix={`vendors/${vendorId}/${serviceName}/${serviceId}/gallery`}
                    />
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Attire Types Offered</h2> {/* Changed */}
                    </div>
                    <div className="p-4">
                      <CheckboxGroup
                        items={attireTypes} // Changed
                        selectedItems={selectedAttireTypes} // Changed
                        onToggle={handleAttireTypeToggle} // Changed
                        name="attireTypes" // Changed
                      />
                    </div>
                  </div>
                  <FAQEditor faqs={faqs} setFaqs={setFaqs} />
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Terms and Conditions</h2>
                    </div>
                    <div id="hs-add-product-Event-supported-card-body" className="p-5 space-y-4">
                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                        <TiptapEditor content={termsAndConditions} onUpdate={setTermsAndConditions} placeholder="Outline your terms and conditions..." />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Cancellation/Refund Policy</h2>
                    </div>
                    <div id="hs-add-product-Event-supported-card-body" className="p-5 space-y-4">
                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                        <TiptapEditor content={cancellationPolicy} onUpdate={setCancellationPolicy} placeholder="Enter your cancellation policy..." />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Social Media Links</h2>
                    </div>
                    <div className="ml-4 mt-2 mr-4 mb-2 grid sm:grid-cols-3 gap-3 sm:gap-5">
                      <FormInput id="websiteLink" label="Website Link" type="url" placeholder="https://example.com" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} />
                      <FormInput id="instagramLink" label="Instagram Link" type="url" placeholder="https://instagram.com/yourattirestore" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} /> {/* Changed placeholder */}
                      <FormInput id="facebookLink" label="Facebook Link" type="url" placeholder="https://facebook.com/yourattirestore" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} /> {/* Changed placeholder */}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="lg:sticky lg:top-5 space-y-4">
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Pricing</h2>
                      </div>
                      <div className="p-5 space-y-4">
                        <FormInput id="startingPrice" label="Starting Price" type="number" placeholder="Enter starting price" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} required error={errors.startingPrice}/> {/* Changed */}
                        <FormInput id="Advancepayment" label="Advance/Deposit Payment" type="number" placeholder="Enter in %" value={advancePayment} onChange={(e) => setAdvancePayment(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Service Details</h2>
                      </div>
                      <div id="hs-add-product-organization-card-body" className="p-5 space-y-4">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Category</label>
                          <div className="relative">
                            <div className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 sm:py-2 px-4 pe-9 flex text-nowrap w-full cursor-default bg-white border border-stone-200 rounded-lg text-start sm:text-sm text-stone-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                              <span className="truncate">{session?.user?.vendor_profile?.subcategory?.category?.name}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Subcategories</label>
                          <div className="relative">
                            <div className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 sm:py-2 px-4 pe-9 flex text-nowrap w-full cursor-default bg-white border border-stone-200 rounded-lg text-start sm:text-sm text-stone-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                              <span className="truncate">{session?.user?.vendor_profile?.subcategory?.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label htmlFor="location" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Location</label>
                          <div className="relative">
                            <input id="location" type="text" placeholder="Enter a location" className="py-1.5 sm:py-2 pr-12 pl-4 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1" value={location} onChange={(e) => setLocation(e.target.value)} />
                            <button type="button" onClick={() => setIsLocationModalOpen(true)} className="absolute inset-y-0 right-2 flex items-center justify-center">
                              <svg className="w-5 h-5" fill="none" stroke="#E91E63" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.25-7.5 11.25-7.5 11.25S4.5 17.75 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                            </button>
                          </div>
                          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>
                        <LocationSelector isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} onChange={(locData) => { if (locData?.location) { setLocation(locData.location); setSelectedLocationData(locData); } }} onSave={(locData) => { setLocation(locData.location); setSelectedLocationData(locData); setIsLocationModalOpen(false); }} />
                      </div>
                    </div>
                    <AddressInput
                       heading="Address"
                       placeholder="Enter the full address of your store." // Changed placeholder
                       value={address}
                       onChange={(e) => setAddress(e.target.value)}
                       error={errors.address}
                     />
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Customization Options</h2>
                      </div>
                      <div id="hs-add-product-Event-supported-card-body" className="p-5 space-y-4">
                        <div>
                            <label htmlFor="sizeRange" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Size Range</label> {/* Changed */}
                            <div className="p-2">
                            <CheckboxGroup
                                items={sizeRanges} // Changed from attireTypes
                                selectedItems={selectedSizeRanges} // Changed from selectedAttireTypes
                                onToggle={handleSizeRangeToggle} // Changed from handleAttireTypeToggle
                                name="sizeRange" // Changed from attireTypes
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Delivery/Return Policy</h2>
                    </div>
                    <div id="hs-add-product-return-delivery-policy-card-body" className="p-5 space-y-4">
                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                        <TiptapEditor content={returnDeliveryPolicy} onUpdate={setReturnDeliveryPolicy} placeholder="Enter your delivery and return policy..." />
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
                {formMessage.text && (
                  <div className={`fixed bottom-24 start-1/2 -translate-x-1/2 p-4 rounded-lg shadow-md text-white ${formMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {formMessage.text}
                  </div>
                )}
                <div className="fixed bottom-0 start-1/2 -translate-x-1/2 p-6 z-50 w-full max-w-md mx-auto hs-removing:translate-y-5 hs-removing:opacity-0 transition duration-300">
                  <div className="py-2 ps-5 pe-2 bg-stone-800 rounded-full shadow-md dark:bg-neutral-950">
                    <div className="flex justify-between items-center gap-x-3">
                      <button type="button" className="text-red-400 decoration-2 font-medium text-sm hover:underline focus:outline-hidden focus:underline dark:text-red-500">
                        Delete
                      </button>
                      <div className="inline-flex items-center gap-x-2">
                        <button type="button" className="text-stone-300 decoration-2 font-medium text-sm hover:underline focus:outline-hidden focus:underline dark:text-neutral-400">
                          Cancel
                        </button>
                        <div className="w-px h-4 bg-stone-700 dark:bg-neutral-700"></div>
                        <button type="submit" onClick={handleSubmit} className="text-green-400 decoration-2 font-medium text-sm hover:underline focus:outline-hidden focus:underline dark:text-green-500">
                          Save changes
                        </button>
                        <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full text-stone-400 hover:bg-stone-700 focus:outline-hidden focus:bg-stone-700 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Close">
                          <span className="sr-only">Close</span>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                </div>
          </main>
        </div>
        <Script src="https://preline.co/assets/vendor/preline/dist/index.js?v=3.1.0" strategy="lazyOnload" />
        <Script src="https://preline.co/assets/vendor/clipboard/dist/clipboard.min.js" strategy="lazyOnload" />
        <Script src="https://preline.co/assets/js/hs-copy-clipboard-helper.js" strategy="lazyOnload" />

        <Script>{`
        (function () {
          window.addEventListener('load', () => {
            if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
              window.HSStaticMethods.autoInit();
            }

            const copyMarkupEl = document.getElementById('copy-markup');
            if (copyMarkupEl) {
              const instance = HSCopyMarkup.getInstance(copyMarkupEl);

              instance.on('copy', (el) => {
                const currentQty = instance.items.length;
                const labels = el.querySelectorAll('label');
                const inputs = el.querySelectorAll('input');
                const disabledDeleteBtn = instance.wrapper.querySelector('[data-hs-copy-markup-delete-item].disabled');

                new HSInputNumber(el.querySelector('[data-hs-input-number]'));

                el.classList.remove('hidden', '[--ignore-for-count]');

                labels.forEach((label) => {
                  const forAttr = label.getAttribute('for');
                  const input = Array.from(inputs).find((input) => input.getAttribute('id') === forAttr);
                  const newIdentifier = \`\${forAttr}-\${currentQty}\`;

                  label.setAttribute('for', newIdentifier);
                  if (input) input.setAttribute('id', newIdentifier);
                });

                if (disabledDeleteBtn) {
                  if (
                    disabledDeleteBtn.tagName === 'BUTTON' ||
                    disabledDeleteBtn.tagName === 'INPUT'
                  ) disabledDeleteBtn.removeAttribute('disabled');

                  disabledDeleteBtn.classList.remove('disabled');
                }
              });

              instance.on('delete', (el) => {
                const currentQty = instance.items.length;

                if (currentQty === 1) {
                  const deleteBtn = instance.items[0].querySelector('[data-hs-copy-markup-delete-item]');

                  if (deleteBtn) {
                    if (
                      deleteBtn.tagName === 'BUTTON' ||
                      deleteBtn.tagName === 'INPUT'
                    ) deleteBtn.setAttribute('disabled', 'disabled');

                    deleteBtn.classList.add('disabled');
                  }
                }
              });
            }
          });
        })();
      `}</Script>
    </>
  );
}