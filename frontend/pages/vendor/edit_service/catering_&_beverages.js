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
import ActionButtons from "@/components/ActionButtons";
import ConfirmationModal from "@/components/ConfirmationModal";
import FormInput from '@/components/FormInput';
import TiptapEditor from '@/components/TiptapEditor';
import MediaManager from '@/components/MediaManager';
import CheckboxGroup from '@/components/CheckboxGroup';
import Pricing from '@/components/Pricing';
import FAQEditor from '@/components/FAQEditor.js';
import FoodPackageCheckboxGroup from '@/components/FoodPackageCheckboxGroup.js';
import AddressInput from '@/components/AddressInput';

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

export default function AddProduct() {
  const [aboutContent, setAboutContent] = useState('');
  const [cancellationPolicyContent, setCancellationPolicyContent] = useState('');
  const [restrictionsContent, setRestrictionsContent] = useState('');
  const [termsAndConditionsContent, setTermsAndConditionsContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [thumbnailKey, setThumbnailKey] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  
  // Media Manager States - One set for each instance
  const [initialGallery, setInitialGallery] = useState([]);
  const [updatedExistingMedia, setUpdatedExistingMedia] = useState([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);
  
  const [initialGalleryVeg, setInitialGalleryVeg] = useState([]);
  const [updatedExistingMediaVeg, setUpdatedExistingMediaVeg] = useState([]);
  const [newGalleryFilesVeg, setNewGalleryFilesVeg] = useState([]);
  
  const [initialGalleryNonVeg, setInitialGalleryNonVeg] = useState([]);
  const [updatedExistingMediaNonVeg, setUpdatedExistingMediaNonVeg] = useState([]);
  const [newGalleryFilesNonVeg, setNewGalleryFilesNonVeg] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isActionCardVisible, setIsActionCardVisible] = useState(true);
  const [isActionCardMinimized, setIsActionCardMinimized] = useState(false);

  // Refs for each MediaManager
  const mediaManagerRef = useRef(null);
  const mediaManagerRefVeg = useRef(null);
  const mediaManagerRefNonVeg = useRef(null);
  const thumbnailUploaderRef = useRef(null);

  const [faqs, setFaqs] = useState([]);
  const router = useRouter();
  const [cateringId, setCateringId] = useState(null);
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const cancellationEditorRef = useRef(null);
  const cancellationEditorInstance = useRef(null);
  const restrictionsEditorRef = useRef(null);
  const restrictionsEditorInstance = useRef(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const { data: session, status } = useSession();
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState(new Set());
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [Name, setName] = useState('');
  const [contactName, setcontactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [about, setAbout] = useState('');
  const [advancePayment, setAdvancePayment] = useState('');
  const [guestCapacity, setGuestCapacity] = useState('');
  const [eventSpaces, setEventSpaces] = useState('');
  const [totalAreaSqft, setTotalAreaSqft] = useState('');
  const [advanceBookingNotice, setAdvanceBookingNotice] = useState('');
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
  const [selectedFoodPackages, setSelectedFoodPackages] = useState(new Set());
  const [address, setAddress] = useState('');
  const [perPlatePriceVeg, setPerPlatePriceVeg] = useState('');
  const [perPlatePriceNonVeg, setPerPlatePriceNonVeg] = useState('');
  const [alternativeNumber, setAlternativeNumber] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [errors, setErrors] =useState({});
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

  // Separate handlers for each MediaManager
  const handleGalleryUpdate = (existingMedia, newFiles) => {
    setUpdatedExistingMedia(existingMedia);
    setNewGalleryFiles(newFiles);
  };

  const handleVegGalleryUpdate = (existingMedia, newFiles) => {
    setUpdatedExistingMediaVeg(existingMedia);
    setNewGalleryFilesVeg(newFiles);
  };

  const handleNonVegGalleryUpdate = (existingMedia, newFiles) => {
    setUpdatedExistingMediaNonVeg(existingMedia);
    setNewGalleryFilesNonVeg(newFiles);
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
      setCateringId(serviceId);
    }
  }, [session]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services/venue/");
        if (response.data && Array.isArray(response.data.results)) {
          setServices(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchEventTypes = async () => {
      try {
        const response = await api.get("/event-types/");
        if (response.data && Array.isArray(response.data.results)) {
          setEventTypes(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching event types:", error);
      }
    };

    fetchServices();
    fetchEventTypes();
  }, []);

  useEffect(() => {
    const fetchCateringData = async () => {
      if (cateringId && services.length > 0 && eventTypes.length > 0) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${session?.accessToken}` },
          };
          const response = await api.get(`/catering/${cateringId}/`, config);
          const data = response.data;
          console.log(data);
          
          setName(data.name || '');
          setcontactName(data.manager_name || '');
          setContactNumber(data.contact_number || '');
          setEmailAddress(data.email || '');
          setAboutContent(data.about || '');
          setGuestCapacity(data.guest_capacity || '');
          setEventSpaces(data.event_spaces || '');
          setTotalAreaSqft(data.total_area_sqft || '');
          setAdvanceBookingNotice(data.advance_booking_notice || '');
          setAdvancePayment(data.advance_payment_required || false);
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
          setAlternativeNumber(data.alternative_number || '');
          setBusinessRegistrationNumber(data.business_registration_number || '');
          setGstNumber(data.gst_number || '');
          setYearsOfExperience(data.years_of_experience || '');
          setThumbnailUrl(data.thumbnail_url_detail || null);
          setThumbnailKey(data.thumbnail_url || null);    

          if (editorInstance.current) editorInstance.current.commands.setContent(data.about || '');
          if (cancellationEditorInstance.current) cancellationEditorInstance.current.commands.setContent(data.cancellation_policy || '');
          if (termsEditorInstance.current) termsEditorInstance.current.commands.setContent(data.terms_and_conditions || '');
          if (returnDeliveryEditorInstance.current) returnDeliveryEditorInstance.current.commands.setContent(data.return_delivery_policy || '');

          if (data.services_offered_details) {
            setSelectedServices(new Set(data.services_offered_details.map(service => service.id)));
          }
          if (data.event_types_details) {
            setSelectedEventTypes(new Set(data.event_types_details.map(eventType => eventType.id)));
          }
         
          if (data.faq_details && Array.isArray(data.faq_details)) {
            const loadedFaqs = data.faq_details.map((faq, index) => ({
              id: `faq-${index}-${Date.now()}`,
              question: faq.question || '',
              answer: faq.answer || ''
            }));
            setFaqs(loadedFaqs);
          }

          const foodPackagesSet = new Set();
          if (data.packages?.Vegetarian) {
            
            foodPackagesSet.add('veg');
            setPerPlatePriceVeg(data.packages.Vegetarian[0].starting_price || '');
            if (data.packages.Vegetarian[0].menu_images) {
              setInitialGalleryVeg(data.packages.Vegetarian[0].menu_images.map(img => img.image_url));
            }
          }
          if (data.packages?.Non_Vegetarian) {
            foodPackagesSet.add('non-veg');
            setPerPlatePriceNonVeg(data.packages.Non_Vegetarian[0].starting_price || '');
            if (data.packages.Non_Vegetarian[0].menu_images) {
              setInitialGalleryNonVeg(data.packages.Non_Vegetarian[0].menu_images.map(img => img.image_url));
            }
          }
          setSelectedFoodPackages(foodPackagesSet);

          if (data.images && Array.isArray(data.images)) {
            const imageUrls = data.images.map(imageObject => imageObject.image_url);
            setInitialGallery(imageUrls);
          }

        } catch (error) {
          console.error("Error fetching catering data:", error);
          setFormMessage({ type: 'error', text: 'Failed to load catering data.' });
        }
      }
    };
    fetchCateringData();
  }, [cateringId, session, services, eventTypes]);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prevSelectedServices => {
      const newSelected = new Set(prevSelectedServices);
      if (newSelected.has(serviceId)) newSelected.delete(serviceId);
      else newSelected.add(serviceId);
      return newSelected;
    });
  };

  const handleEventTypeToggle = (eventTypeId) => {
    setSelectedEventTypes(prevSelectedEventTypes => {
      const newSelected = new Set(prevSelectedEventTypes);
      if (newSelected.has(eventTypeId)) newSelected.delete(eventTypeId);
      else newSelected.add(eventTypeId);
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
    if (selectedFoodPackages.has('veg') && !perPlatePriceVeg) {
      newErrors.perPlatePriceVeg = 'Per Plate Price (Veg) is required.';
    }
    if (selectedFoodPackages.has('non-veg') && !perPlatePriceNonVeg) {
      newErrors.perPlatePriceNonVeg = 'Per Plate Price (Non-Veg) is required.';
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
    setIsActionCardVisible(false);


    const foodPackagesData = [];
    let vegPrice = null;
    let nonVegPrice = null;

    if (selectedFoodPackages.has('veg') && perPlatePriceVeg) {
      vegPrice = parseFloat(perPlatePriceVeg);
      foodPackagesData.push({
        id: 1,
        package_type_display: "Vegetarian",
        package_type: 1,
        starting_price: vegPrice
      });
    }
    if (selectedFoodPackages.has('non-veg') && perPlatePriceNonVeg) {
      nonVegPrice = parseFloat(perPlatePriceNonVeg);
      foodPackagesData.push({
        id: 2,
        package_type_display: "Non-Vegetarian",
        package_type: 2,
        starting_price: nonVegPrice
      });
    }

    let calculatedStartingPrice = null;
    if (vegPrice !== null && nonVegPrice !== null) {
        calculatedStartingPrice = Math.min(vegPrice, nonVegPrice);
    } else if (vegPrice !== null) {
        calculatedStartingPrice = vegPrice;
    } else if (nonVegPrice !== null) {
        calculatedStartingPrice = nonVegPrice;
    }

    let finalThumbnailKey = thumbnailKey;

    if (thumbnailFile) {
      const uploadResult = await thumbnailUploaderRef.current.upload();
      if (!uploadResult.success) {
        setFormMessage({ type: 'error', text: `Thumbnail upload failed: ${uploadResult.message}` });
        setIsActionCardVisible(true);
        return;
      }
      finalThumbnailKey = uploadResult.key;
    }

    // Upload all galleries separately
    let galleryResult = await mediaManagerRef.current.upload();
    if (!galleryResult.success) {
      setFormMessage({ type: 'error', text: `Main gallery upload failed: ${galleryResult.message}` });
      return;
    }

    let vegGalleryResult = { success: true, keys: [] };
    if (selectedFoodPackages.has('veg')) {
      vegGalleryResult = await mediaManagerRefVeg.current.upload();
      if (!vegGalleryResult.success) {
        setFormMessage({ type: 'error', text: `Veg gallery upload failed: ${vegGalleryResult.message}` });
        return;
      }
    }

    let nonVegGalleryResult = { success: true, keys: [] };
    if (selectedFoodPackages.has('non-veg')) {
      nonVegGalleryResult = await mediaManagerRefNonVeg.current.upload();
      if (!nonVegGalleryResult.success) {
        setFormMessage({ type: 'error', text: `Non-veg gallery upload failed: ${nonVegGalleryResult.message}` });
        return;
      }
    }

    // Combine all gallery results
    const finalGalleryList = [...updatedExistingMedia, ...galleryResult.keys];
    const finalVegGalleryList = [...updatedExistingMediaVeg, ...vegGalleryResult.keys];
    const finalNonVegGalleryList = [...updatedExistingMediaNonVeg, ...nonVegGalleryResult.keys];

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
      services_offered: Array.from(selectedServices),
      location: selectedLocationData?.locationId || null,
      about: aboutContent,
      starting_price: calculatedStartingPrice,
      contact_number: contactNumber,
      cancellation_policy: cancellationPolicy,
      event_types: Array.from(selectedEventTypes),
      manager_name: contactName,
      email: emailAddress || null,
      advance_payment: advancePayment ? parseFloat(advancePayment) : null,
      guest_capacity: guestCapacity ? parseInt(guestCapacity) : null,
      event_spaces: eventSpaces || null,
      total_area_sqft: totalAreaSqft ? parseFloat(totalAreaSqft) : null,
      advance_booking_notice: advanceBookingNotice || null,
      advance_payment_required: advancePayment,
      restrictions: restrictions || null,
      terms_and_conditions: termsAndConditions || null,
      return_delivery_policy: returnDeliveryPolicy || null,
      website_link: websiteLink || null,
      instagram_link: instagramLink || null,
      facebook_link: facebookLink || null,
      address: address || null,
      alternative_number: alternativeNumber || null,
      business_registration_number: businessRegistrationNumber || null,
      gst_number: gstNumber || null,
      years_of_experience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
      food_packages_data: foodPackagesData.map(pkg => {
        if (pkg.package_type === 1) { // Vegetarian
          return {
            ...pkg,
            menu_images_upload: finalVegGalleryList
          };
        } else if (pkg.package_type === 2) { // Non-Vegetarian
          return {
            ...pkg,
            menu_images_upload: finalNonVegGalleryList
          };
        }
        return pkg;
      }),
      faqs: faqsForApi,
      gallery_images: finalGalleryList,
      thumbnail_url: finalThumbnailKey,
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
      if (cateringId) {
        response = await api.put(`/catering/${cateringId}/`, formData, config);
        setFormMessage({ type: 'success', text: 'Catering updated successfully!' });
      } else {
        response = await api.post("/catering/", formData, config);
        setFormMessage({ type: 'success', text: 'Catering added successfully!' });
        if (response.data && response.data.id) {
          setCateringId(response.data.id);
        }
      }
      console.log("Operation successful:", response.data);
    } catch (error) {
      console.error("Error adding/updating Catering:", error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        setFormMessage({ type: 'error', text: `Error: ${error.response.data.detail || JSON.stringify(error.response.data) || 'Failed to process Catering.'}` });
      } else if (error.request) {
        console.error("Error request:", error.request);
        setFormMessage({ type: 'error', text: 'Error: No response from server. Check network connection.' });
      } else {
        console.error("Error message:", error.message);
        setFormMessage({ type: 'error', text: `Error: ${error.message}` });
      }
      setIsActionCardVisible(true);
    }  
  };
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    setIsActionCardVisible(false);

    if (!cateringId) {
      setFormMessage({
        type: "error",
        text: "Cannot delete. catering ID is missing.",
      });
      setIsActionCardVisible(true);
      return;
    }

    setFormMessage({ type: "info", text: "Deleting catering, please wait..." });

    try {
      const accessToken = session?.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await api.delete(`/catering/${cateringId}/`, config);
      setFormMessage({ type: "success", text: "catering deleted successfully!" });
      0;
      setTimeout(() => {
        router.push("/vendor/service/preview");
      }, 2000);
    } catch (error) {
      console.error("Error trying to delete catering:", error);
      if (error.response) {
        setFormMessage({
          type: "error",
          text: `Error: ${
            error.response.data.detail || "Failed to delete catering."
          }`,
        });
      } else {
        setFormMessage({
          type: "error",
          text: "Error: No response from server.",
        });
      }
      setIsActionCardVisible(true);
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
                    <div className="p-5 space-y-4">
                      <ThumbnailUploader ref={thumbnailUploaderRef} preview={thumbnailUrl} onFileChange={handleFileChange} onDelete={handleDeleteThumbnail} />
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                        <FormInput id="CateringName" label="Name" placeholder="ABC Catering" value={Name} onChange={(e) => setName(e.target.value)} required error={errors.Name} />
                        <FormInput id="contactName" label="Contact Name" placeholder="John Doe" value={contactName} onChange={(e) => setcontactName(e.target.value)} required error={errors.contactName} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                        <FormInput id="contactNumber" label="Contact Number" placeholder="+919999999998" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required error={errors.contactNumber} />
                        <FormInput id="emailAddress" label="Email Address" type="email" placeholder="abccaters@email.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required error={errors.emailAddress} />
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
                          <TiptapEditor content={aboutContent} onUpdate={setAboutContent} placeholder="Tell us about your catering service..." />
                        </div>
                         {errors.aboutContent && <p className="text-red-500 text-sm mt-1">{errors.aboutContent}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <MediaManager
                    ref={mediaManagerRef}
                    initialMedia={initialGallery}
                    onUpdate={handleGalleryUpdate}
                    pathPrefix={`vendors/${vendorId}/${serviceName}/gallery`}
                  />
                  
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Food Packages</h2>
                    </div>
                    <FoodPackageCheckboxGroup
                      selectedFoodPackages={selectedFoodPackages}
                      onSelect={setSelectedFoodPackages}
                    />
                  </div>

                  {(selectedFoodPackages.has('veg') || selectedFoodPackages.has('non-veg')) && (
                    <div className={`mt-6 grid gap-6 ${selectedFoodPackages.size === 2 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                      {selectedFoodPackages.has('veg') && (
                        <div>
                          <h3 className="font-semibold text-stone-800 dark:text-neutral-200 mb-2">Upload Veg Menu here</h3>
                          <MediaManager
                            ref={mediaManagerRefVeg}
                            initialMedia={initialGalleryVeg}
                            onUpdate={handleVegGalleryUpdate}
                            pathPrefix={`vendors/${vendorId}/${serviceName}/gallery/menu/veg`}
                          />
                          <div className="mt-2">
                            <Pricing
                                perPlatePrice={perPlatePriceVeg}
                                setPerPlatePrice={setPerPlatePriceVeg}
                                required={selectedFoodPackages.has('veg')}
                                error={errors.perPlatePriceVeg}
                            />
                          </div>
                        </div>
                      )}

                      {selectedFoodPackages.has('non-veg') && (
                        <div>
                          <h3 className="font-semibold text-stone-800 dark:text-neutral-200 mb-2">Upload Non-Veg Menu here</h3>
                          <MediaManager
                            ref={mediaManagerRefNonVeg}
                            initialMedia={initialGalleryNonVeg}
                            onUpdate={handleNonVegGalleryUpdate}
                            pathPrefix={`vendors/${vendorId}/${serviceName}/gallery/menu/non_veg`}
                          />
                          <div className="mt-2">
                            <Pricing
                                perPlatePrice={perPlatePriceNonVeg}
                                setPerPlatePrice={setPerPlatePriceNonVeg}
                                required={selectedFoodPackages.has('non-veg')}
                                error={errors.perPlatePriceNonVeg}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">Cuisine Types Offered</h2>
                    </div>
                    <div className="p-4">
                      <CheckboxGroup
                        items={services}
                        selectedItems={selectedServices}
                        onToggle={handleServiceToggle}
                        name="services"
                      />
                    </div>
                  </div>

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
                  
                  <FAQEditor faqs={faqs} setFaqs={setFaqs} />
                  
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
                      <FormInput id="instagramLink" label="Instagram Link" type="url" placeholder="https://instagram.com/yourvenue" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} />
                      <FormInput id="facebookLink" label="Facebook Link" type="url" placeholder="https://facebook.com/yourvenue" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} />
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
                      placeholder="Enter the full address of the venue."
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
                          <label htmlFor="eventTypes" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">Type of Events Catered</label>
                          <div className="p-2">
                            <CheckboxGroup
                              items={eventTypes}
                              selectedItems={selectedEventTypes}
                              onToggle={handleEventTypeToggle}
                              name="eventTypes"
                            />
                          </div>
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
                </div>
                {isActionCardVisible && (
                <ActionButtons
                  isMinimized={isActionCardMinimized}
                  onDeleteClick={handleDeleteClick}
                  onSaveClick={handleSubmit}
                  onMinimizeClick={() => setIsActionCardMinimized(true)}
                  onRestoreClick={() => setIsActionCardMinimized(false)}
                  onCancelClick={() => {
                    setIsActionCardVisible(false);
                    router.back();
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
      >
        Are you sure you want to delete this service? This action is
        irreversible.
      </ConfirmationModal>
      
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