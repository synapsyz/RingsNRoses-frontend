import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import LocationSelector from "@/components/LocationSelector";
import React, { useEffect, useState, useRef } from "react";
import FAQEditor from "@/components/FAQEditor";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ThumbnailUploader from "@/components/ThumbnailUploader";
import CustomHead from "@/components/vendor/Head";
import Header from "@/components/vendor/Header";
import SecondaryNav from "@/components/vendor/SecondaryNav";
import MediaManager from "@/components/MediaManager";
import SuccessPopup from "@/components/SuccessPopup";
import ConfirmationModal from "@/components/ConfirmationModal";
import ActionButtons from "@/components/ActionButtons";
import FullPageStatus from '@/components/FullPageStatus';
import FormInput from "@/components/FormInput";
import TiptapEditor from "@/components/TiptapEditor";
import CheckboxGroup from "@/components/CheckboxGroup";
import AddressInput from "@/components/AddressInput";
import FoodPackageCheckboxGroup from "@/components/FoodPackageCheckboxGroup.js";
import Pricing from "@/components/Pricing";

let api_url;
let isNgrok;

isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
api_url = getApiUrl();

const api = axios.create({
  baseURL: api_url + "/api/v1",
  headers: {
    ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
  },
});
export default function EditService() {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [thumbnailKey, setThumbnailKey] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [selectedFoodPackages, setSelectedFoodPackages] = useState(new Set());
  const [initialGalleryVeg, setInitialGalleryVeg] = useState([]);
  const [updatedExistingMediaVeg, setUpdatedExistingMediaVeg] = useState([]);
  const [newGalleryFilesVeg, setNewGalleryFilesVeg] = useState([]);

  const [initialGalleryNonVeg, setInitialGalleryNonVeg] = useState([]);
  const [updatedExistingMediaNonVeg, setUpdatedExistingMediaNonVeg] = useState(
    []
  );
  const [newGalleryFilesNonVeg, setNewGalleryFilesNonVeg] = useState([]);
  const [perPlatePriceVeg, setPerPlatePriceVeg] = useState("");
  const [perPlatePriceNonVeg, setPerPlatePriceNonVeg] = useState("");

  // Refs for each MediaManager
  const mediaManagerRefVeg = useRef(null);
  const mediaManagerRefNonVeg = useRef(null);

  const [initialGallery, setInitialGallery] = useState([]);
  const [updatedExistingMedia, setUpdatedExistingMedia] = useState([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);
  const mediaManagerRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isActionCardVisible, setIsActionCardVisible] = useState(true);
  const [isActionCardMinimized, setIsActionCardMinimized] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const thumbnailUploaderRef = useRef(null);
  const [faqs, setFaqs] = useState([]);

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

  async function uploadFile(file, accessToken) {
    console.log(`Uploading ${file.name}...`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, key: `media/uploads/${Date.now()}-${file.name}` };
  }

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

  const router = useRouter();
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const cancellationEditorRef = useRef(null);
  const cancellationEditorInstance = useRef(null);
  const restrictionsEditorRef = useRef(null);
  const restrictionsEditorInstance = useRef(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const termsEditorRef = useRef(null);
  const termsEditorInstance = useRef(null);
  const [websiteLink, setWebsiteLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");

  const { data: session, status } = useSession();
  let accessToken = session?.accessToken;
  let config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const [aboutContent, setAboutContent] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState(new Set());
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(new Set());

  const [venueName, setVenueName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [about, setAbout] = useState("");
  const [perPlatePrice, setPerPlatePrice] = useState("");
  const [guestCapacity, setGuestCapacity] = useState("");
  const [eventSpaces, setEventSpaces] = useState("");
  const [totalAreaSqft, setTotalAreaSqft] = useState("");
  const [advanceBookingNotice, setAdvanceBookingNotice] = useState("");
  const [advancePaymentRequired, setAdvancePaymentRequired] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [location, setLocation] = useState("");
  const [locationId, setLocationId] = useState("");
  const [venueId, setvenueId] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [alternativeNumber, setAlternativeNumber] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState("");
  const [address, setAddress] = useState("");

  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  const [errors, setErrors] = useState({});
  const [vendorId, setVendorId] = useState(null);
  const [serviceName, setServiceName] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const subcategory = session?.user?.vendor_profile?.subcategory?.id;
  useEffect(() => {
    // ... existing useEffect for cateringId

    if (session?.user?.vendor_profile) {
      setVendorId(session.user.vendor_profile.id);
      const formattedServiceName =
        session.user.vendor_profile.subcategory?.category?.name
          .replace(/ /g, "_")
          .toLowerCase();
      setServiceName(formattedServiceName);
      setServiceId(session.user.vendor_profile.service_id); // Assuming service_id is directly available here
    }
  }, [session]);
  console.log(vendorId);
  console.log(serviceName);
  console.log(serviceId);
  useEffect(() => {
    const serviceId = session?.user?.vendor_profile?.service_id;
    if (serviceId) {
      setvenueId(serviceId);
    }
  }, [session]);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      if (!venueId || status !== "authenticated") return;

      try {
        const response = await api.get(`/venues/${venueId}`, config);
        const venueData = response.data;
        console.log(venueData);

        setVenueName(venueData.name || "");
        setvenueId(venueData.id || "");
        setManagerName(venueData.manager_name || "");
        setContactNumber(venueData.contact_number || "");
        setEmailAddress(venueData.email || "");
        setAbout(venueData.about || "");
        setPerPlatePrice(venueData.per_plate_price || "");
        setGuestCapacity(venueData.guest_capacity || "");
        setEventSpaces(venueData.event_spaces || "");
        setTotalAreaSqft(venueData.total_area_sqft || "");
        setAdvanceBookingNotice(venueData.advance_booking_notice || "");
        setAdvancePaymentRequired(venueData.advance_payment_required || "");
        setCancellationPolicy(venueData.cancellation_policy || "");
        setRestrictions(venueData.restrictions || "");
        setLocation(venueData.location_details?.name || "");
        setSelectedLocationData(
          venueData.location_details
            ? {
                locationId: venueData.location_details.id,
                location: venueData.location_details.name,
              }
            : null
        );
        setGstNumber(venueData.gst_number || "");
        setAlternativeNumber(venueData.alternative_number || "");
        setYearsOfExperience(venueData.years_of_experience || "");
        setBusinessRegistrationNumber(
          venueData.business_registration_number || ""
        );
        setAddress(venueData.address || "");

        setLocation(
          [
            venueData.location_details.name,
            venueData.location_details.district_name,
          ]
            .filter(Boolean)
            .join(" , ")
        );
        setThumbnailUrl(venueData.thumbnail_url_detail || null);
        setThumbnailKey(venueData.thumbnail_url || null);

        if (venueData.services_offered_details) {
          setSelectedServices(
            new Set(
              venueData.services_offered_details.map((service) => service.id)
            )
          );
        }
        if (venueData.event_types_details) {
          setSelectedEventTypes(
            new Set(
              venueData.event_types_details.map((eventType) => eventType.id)
            )
          );
        }

        if (venueData.images && Array.isArray(venueData.images)) {
          const imageUrls = venueData.images.map(
            (imageObject) => imageObject.image_url
          );
          setInitialGallery(imageUrls);
        }

        if (venueData.faq_details && Array.isArray(venueData.faq_details)) {
          const loadedFaqs = venueData.faq_details.map((faq, index) => ({
            id: `faq-${index}-${Date.now()}`,
            question: faq.question || "",
            answer: faq.answer || "",
          }));
          setFaqs(loadedFaqs);
        }
        const foodPackagesSet = new Set();
        if (venueData.packages?.Vegetarian) {
          foodPackagesSet.add("veg");
          setPerPlatePriceVeg(
            venueData.packages.Vegetarian[0].starting_price || ""
          );
          if (venueData.packages.Vegetarian[0].menu_images) {
            setInitialGalleryVeg(
              venueData.packages.Vegetarian[0].menu_images.map(
                (img) => img.image_url
              )
            );
          }
        }
        if (venueData.packages?.Non_Vegetarian) {
          foodPackagesSet.add("non-veg");
          setPerPlatePriceNonVeg(
            venueData.packages.Non_Vegetarian[0].starting_price || ""
          );
          if (venueData.packages.Non_Vegetarian[0].menu_images) {
            setInitialGalleryNonVeg(
              venueData.packages.Non_Vegetarian[0].menu_images.map(
                (img) => img.image_url
              )
            );
          }
        }
        setSelectedFoodPackages(foodPackagesSet);

        setWebsiteLink(venueData.website_link || "");
        setInstagramLink(venueData.instagram_link || "");
        setFacebookLink(venueData.facebook_link || "");
        setTermsAndConditions(venueData.terms_and_conditions || "");
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setFormMessage({
          type: "error",
          text: "Error: Could not fetch venue details.",
        });
      }
    };

    fetchVenueDetails();
  }, [venueId, status, accessToken]);

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

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      const newSelected = new Set(prevSelectedServices);
      if (newSelected.has(serviceId)) {
        newSelected.delete(serviceId);
      } else {
        newSelected.add(serviceId);
      }
      return newSelected;
    });
  };

  const handleEventTypeToggle = (eventTypeId) => {
    setSelectedEventTypes((prevSelectedEventTypes) => {
      const newSelected = new Set(prevSelectedEventTypes);
      if (newSelected.has(eventTypeId)) {
        newSelected.delete(eventTypeId);
      } else {
        newSelected.add(eventTypeId);
      }
      return newSelected;
    });
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: "", text: "" }); // Clear previous messages
    setErrors({}); // Clear previous errors

    const newErrors = {};

    // Validate required fields
    if (!venueName.trim()) {
      newErrors.venueName = "Service Name is required.";
    }
    if (!managerName.trim()) {
      newErrors.managerName = "Contact Person Name is required.";
    }
    if (!contactNumber.trim()) {
      newErrors.contactNumber = "Contact Number is required.";
    }
    if (!emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.emailAddress = "Email Address is invalid.";
    }
    if (!yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of Experience is required.";
    }
    if (!about.trim()) {
      newErrors.aboutContent = "Description (About) is required.";
    }
    if (!location.trim() || !selectedLocationData) {
      newErrors.location = "Service Area Location is required.";
    }
    if (!address.trim()) {
      newErrors.address = "Business Address is required.";
    }
    // if (selectedFoodPackages.has('veg') && !perPlatePriceVeg) {
    //   newErrors.perPlatePriceVeg = 'Per Plate Price (Veg) is required.';
    // }
    // if (selectedFoodPackages.has('non-veg') && !perPlatePriceNonVeg) {
    //   newErrors.perPlatePriceNonVeg = 'Per Plate Price (Non-Veg) is required.';
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      // Scroll to the first error or top of the form
      const firstErrorField = document.getElementById(
        Object.keys(newErrors)[0]
      );
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return; // Stop the submission
    }
    setIsActionCardVisible(false);

    setFormMessage({ type: "info", text: "Updating venue, please wait..." });
    const foodPackagesData = [];
    let vegPrice = null;
    let nonVegPrice = null;

    if (selectedFoodPackages.has("veg") && perPlatePriceVeg) {
      vegPrice = parseFloat(perPlatePriceVeg);
      foodPackagesData.push({
        id: 1,
        package_type_display: "Vegetarian",
        package_type: 1,
        starting_price: vegPrice,
      });
    }
    if (selectedFoodPackages.has("non-veg") && perPlatePriceNonVeg) {
      nonVegPrice = parseFloat(perPlatePriceNonVeg);
      foodPackagesData.push({
        id: 2,
        package_type_display: "Non-Vegetarian",
        package_type: 2,
        starting_price: nonVegPrice,
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
        setFormMessage({
          type: "error",
          text: `Thumbnail upload failed: ${uploadResult.message}`,
        });
        setIsActionCardVisible(true);
        return;
      }
      finalThumbnailKey = uploadResult.key;
    }

    // Upload all galleries separately
    let galleryResult = await mediaManagerRef.current.upload();
    if (!galleryResult.success) {
      setFormMessage({
        type: "error",
        text: `Main gallery upload failed: ${galleryResult.message}`,
      });
      return;
    }

    let vegGalleryResult = { success: true, keys: [] };
    if (selectedFoodPackages.has("veg")) {
      vegGalleryResult = await mediaManagerRefVeg.current.upload();
      if (!vegGalleryResult.success) {
        setFormMessage({
          type: "error",
          text: `Veg gallery upload failed: ${vegGalleryResult.message}`,
        });
        return;
      }
    }

    let nonVegGalleryResult = { success: true, keys: [] };
    if (selectedFoodPackages.has("non-veg")) {
      nonVegGalleryResult = await mediaManagerRefNonVeg.current.upload();
      if (!nonVegGalleryResult.success) {
        setFormMessage({
          type: "error",
          text: `Non-veg gallery upload failed: ${nonVegGalleryResult.message}`,
        });
        return;
      }
    }
    const finalGalleryList = [...updatedExistingMedia, ...galleryResult.keys];
    const finalVegGalleryList = [
      ...updatedExistingMediaVeg,
      ...vegGalleryResult.keys,
    ];
    const finalNonVegGalleryList = [
      ...updatedExistingMediaNonVeg,
      ...nonVegGalleryResult.keys,
    ];

    const faqsForApi = faqs
      .filter((faq) => faq.question.trim() !== "" && faq.answer.trim() !== "")
      .map((faq, index) => ({
        question: faq.question,
        answer: faq.answer,
        order: index + 1,
      }));

    const formData = {
      name: venueName,
      vendor: session?.user?.vendor_profile.id,
      subcategory: subcategory,
      services_offered: Array.from(selectedServices),
      location: selectedLocationData?.locationId || locationId,
      about: about,
      starting_price: parseFloat(perPlatePrice),
      contact_number: contactNumber,
      cancellation_policy: cancellationPolicy,
      advance_payment_required: parseFloat(advancePaymentRequired),
      event_types: Array.from(selectedEventTypes),
      per_plate_price: parseFloat(perPlatePrice),
      guest_capacity: parseInt(guestCapacity),
      manager_name: managerName,
      email: emailAddress,
      total_area_sqft: parseFloat(totalAreaSqft),
      advance_booking_notice: parseInt(advanceBookingNotice),
      restrictions: restrictions,
      website_link: websiteLink,
      instagram_link: instagramLink,
      facebook_link: facebookLink,
      terms_and_conditions: termsAndConditions,
      thumbnail_url: finalThumbnailKey,
      gallery_images: finalGalleryList,
      faqs: faqsForApi,
      gst_number: gstNumber,
      alternative_number: alternativeNumber,
      years_of_experience: parseInt(yearsOfExperience),
      business_registration_number: businessRegistrationNumber,
      address: address,
      food_packages_data: foodPackagesData.map((pkg) => {
        if (pkg.package_type === 1) {
          // Vegetarian
          return {
            ...pkg,
            menu_images_upload: finalVegGalleryList,
          };
        } else if (pkg.package_type === 2) {
          // Non-Vegetarian
          return {
            ...pkg,
            menu_images_upload: finalNonVegGalleryList,
          };
        }
        return pkg;
      }),
    };
    Object.keys(formData).forEach((key) => {
      if (formData[key] === null || formData[key] === "") {
        delete formData[key];
      }
    });

    console.log("Submitting updated data:", formData);

    try {
      setIsLoading(true); // 🔵 Show loader
      const accessToken = session?.accessToken;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
    
      const action = venueId ? "update" : "create";
    
      if (action === "update") {
        const response = await api.put(`/venues/${venueId}/`, formData, config);
        console.log("Venue updated successfully:", response.data);
        setFormMessage({
          type: "success",
          text: "Venue updated successfully!",
        });
      } else {
        const response = await api.post("/venues/", formData, config);
        setvenueId(response.data.id);
        console.log("Venue created successfully:", response.data);
        setFormMessage({
          type: "success",
          text: "Venue created successfully!",
        });
      }
    
      // ✅ Show success state
      setIsLoading(false);
      setIsSuccess(true);
      await new Promise((res) => setTimeout(res, 2000)); // success animation delay
      setIsSuccess(false);
    } catch (error) {
      setIsLoading(false); // ❌ Hide loader on error
    
      const action = venueId ? "update" : "create";
      console.error(`Error trying to ${action} venue:`, error);
    
      if (error.response) {
        console.error("Error data:", error.response.data);
        setFormMessage({
          type: "error",
          text: `Error: ${
            error.response.data.detail || `Failed to ${action} venue.`
          }`,
        });
      } else if (error.request) {
        setFormMessage({
          type: "error",
          text: "Error: No response from server. Check network connection.",
        });
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

    if (!venueId) {
      setFormMessage({
        type: "error",
        text: "Cannot delete. Venue ID is missing.",
      });
      setIsActionCardVisible(true);
      return;
    }

    setFormMessage({ type: "info", text: "Deleting venue, please wait..." });

    try {
      const accessToken = session?.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await api.delete(`/venues/${venueId}/`, config);
      setFormMessage({ type: "success", text: "Venue deleted successfully!" });
      0;
      setTimeout(() => {
        router.push("/vendor/service/preview");
      }, 2000);
    } catch (error) {
      console.error("Error trying to delete venue:", error);
      if (error.response) {
        setFormMessage({
          type: "error",
          text: `Error: ${
            error.response.data.detail || "Failed to delete venue."
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
        <main id="content" className="pb-24 sm:pb-20">
          <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            <ol className="lg:hidden pt-5 flex items-center whitespace-nowrap">
              <li className="flex items-center text-sm text-stone-600 dark:text-neutral-500">
                Products
                <svg
                  className="shrink-0 overflow-visible size-4 ms-1.5 text-stone-400 dark:text-neutral-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 13L10 3"
                    stroke="currentColor"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </li>
              <li className="ps-1.5 flex items-center font-semibold text-stone-800 dark:text-neutral-200 text-sm">
                Add Product
              </li>
            </ol>
            <div className="py-2 sm:pb-0 sm:pt-5 space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
                <div className="lg:col-span-4 space-y-4">
                  {/* Products Card */}
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Header */}
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Services info
                      </h2>
                    </div>
                    {/* End Header */}

                    {/* Body */}
                    <div className="p-5 space-y-4">
                      <ThumbnailUploader
                        ref={thumbnailUploaderRef}
                        preview={thumbnailUrl}
                        onFileChange={handleFileChange}
                        onDelete={handleDeleteThumbnail}
                      />

                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                        {/* Name */}
                        <FormInput
                          id="venueName"
                          label="Name"
                          placeholder="Royal Palace Banquet"
                          value={venueName}
                          onChange={(e) => setVenueName(e.target.value)}
                          required
                          error={errors.venueName}
                        />

                        <FormInput
                          id="managerName"
                          label="Contact Person"
                          placeholder="John Doe"
                          value={managerName}
                          onChange={(e) => setManagerName(e.target.value)}
                          required
                          error={errors.managerName}
                        />

                        <FormInput
                          id="contactNumber"
                          label="Contact Number"
                          placeholder="+919999999998"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          required
                          error={errors.contactNumber}
                        />

                        <FormInput
                          id="emailAddress"
                          label="Email Address"
                          placeholder="mahal@email.com"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          required
                          error={errors.emailAddress}
                        />

                        {/* Alternative Number */}
                        <FormInput
                          id="alternativeNumber"
                          label="Alternative Number"
                          placeholder="Enter Alternative Number"
                          value={alternativeNumber}
                          onChange={(e) => setAlternativeNumber(e.target.value)}
                        />

                        {/* Business Registration Number */}
                        <FormInput
                          id="businessRegistrationNumber"
                          label="Business Registration Number"
                          placeholder="Enter Business Registration Number"
                          value={businessRegistrationNumber}
                          onChange={(e) =>
                            setBusinessRegistrationNumber(e.target.value)
                          }
                        />

                        {/* GST Number */}
                        <FormInput
                          id="gstNumber"
                          label="GST Number"
                          placeholder="Enter GST Number"
                          value={gstNumber}
                          onChange={(e) => setGstNumber(e.target.value)}
                        />

                        {/* Years of Experience */}
                        <FormInput
                          id="yearsOfExperience"
                          label="Years of Experience"
                          placeholder="Enter Years of Experience"
                          type="number"
                          value={yearsOfExperience}
                          onChange={(e) => setYearsOfExperience(e.target.value)}
                          error={errors.yearsOfExperience}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                          Description (About)
                        </label>
                        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                          <TiptapEditor
                            content={about}
                            onUpdate={setAbout}
                            placeholder="Tell us about your decoration & design service..."
                          />{" "}
                          {/* Changed placeholder */}
                        </div>
                        {errors.about && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.about}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <MediaManager
                    ref={mediaManagerRef}
                    initialMedia={initialGallery}
                    onUpdate={handleGalleryUpdate}
                    pathPrefix="vendors/gallery"
                  />
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Food Packages
                      </h2>
                    </div>
                    <FoodPackageCheckboxGroup
                      selectedFoodPackages={selectedFoodPackages}
                      onSelect={setSelectedFoodPackages}
                    />
                  </div>
                  {(selectedFoodPackages.has("veg") ||
                    selectedFoodPackages.has("non-veg")) && (
                    <div
                      className={`mt-6 grid gap-6 ${
                        selectedFoodPackages.size === 2
                          ? "md:grid-cols-2"
                          : "grid-cols-1"
                      }`}
                    >
                      {selectedFoodPackages.has("veg") && (
                        <div>
                          <h3 className="font-semibold text-stone-800 dark:text-neutral-200 mb-2">
                            Upload Veg Menu here
                          </h3>
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
                              required={selectedFoodPackages.has("veg")}
                              error={errors.perPlatePriceVeg}
                            />
                          </div>
                        </div>
                      )}

                      {selectedFoodPackages.has("non-veg") && (
                        <div>
                          <h3 className="font-semibold text-stone-800 dark:text-neutral-200 mb-2">
                            Upload Non-Veg Menu here
                          </h3>
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
                              required={selectedFoodPackages.has("non-veg")}
                              error={errors.perPlatePriceNonVeg}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Services Offered
                      </h2>{" "}
                      {/* Changed title */}
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
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Terms and Conditions
                      </h2>
                    </div>
                    <div
                      id="hs-add-product-Event-supported-card-body"
                      className="p-5 space-y-4"
                    >
                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                        <TiptapEditor
                          content={termsAndConditions}
                          onUpdate={setTermsAndConditions}
                          placeholder="Outline your terms and conditions for decoration & design services..."
                        />{" "}
                        {/* Changed placeholder */}
                      </div>
                    </div>
                  </div>
                  <FAQEditor faqs={faqs} setFaqs={setFaqs} />
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Cancellation/Refund Policy
                      </h2>
                    </div>
                    <div
                      id="hs-add-product-Event-supported-card-body"
                      className="p-5 space-y-4"
                    >
                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                        <TiptapEditor
                          content={cancellationPolicy}
                          onUpdate={setCancellationPolicy}
                          placeholder="Enter your decoration & design cancellation policy..."
                        />{" "}
                        {/* Changed placeholder */}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links Card */}
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Social Media Links
                      </h2>
                    </div>
                    <div className="ml-2 mt-2 mr-2 mb-2 grid sm:grid-cols-3 gap-3 sm:gap-5">
                      {/* Website Link */}
                      <div>
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#A9A9A9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-globe-lock"
                          >
                            <path d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13" />
                            <path d="M2 12h8.5" />
                            <path d="M20 6V4a2 2 0 1 0-4 0v2" />
                            <rect width="8" height="5" x="14" y="6" rx="1" />
                          </svg>
                          <input
                            id="websiteLink"
                            type="url"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="https://example.com"
                            value={websiteLink}
                            onChange={(e) => setWebsiteLink(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Instagram Link */}
                      <div>
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#A9A9A9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-instagram-icon"
                          >
                            <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                          <input
                            id="instagramLink"
                            type="url"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="https://instagram.com/yourvenue"
                            value={instagramLink}
                            onChange={(e) => setInstagramLink(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Facebook Link */}
                      <div>
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#A9A9A9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-facebook-icon"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                          <input
                            id="facebookLink"
                            type="url"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="https://facebook.com/yourvenue"
                            value={facebookLink}
                            onChange={(e) => setFacebookLink(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="lg:sticky lg:top-5 space-y-4">
                    {/* Pricing Card */}
                    {/* <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Pricing
                        </h2>
                      </div>
                      <div className="p-5 space-y-4">
                        <div>
                          <label htmlFor="perPlatePrice" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Per Plate Price
                          </label>
                          <div className="relative w-full">
                            <input
                              id="perPlatePrice"
                              type="number"
                              className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                              placeholder="800.00"
                              value={perPlatePrice}
                              onChange={(e) => setPerPlatePrice(e.target.value)}
                            />
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-stone-600 dark:text-neutral-400">
                              <span className="text-sm">INR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* Service Details Card */}
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Service Details
                        </h2>
                      </div>
                      <div className="p-5 space-y-4">
                        <FormInput
                          id="guestCapacity"
                          label="Guest Capacity"
                          placeholder="eg. 450"
                          type="number"
                          value={guestCapacity}
                          onChange={(e) => setGuestCapacity(e.target.value)}
                        />
                        <div>
                          <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Category
                          </label>
                          <div className="relative">
                            <div className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 sm:py-2 px-4 pe-9 flex text-nowrap w-full cursor-default bg-white border border-stone-200 rounded-lg text-start sm:text-sm text-stone-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                              <span className="truncate">
                                {
                                  session?.user?.vendor_profile?.subcategory
                                    ?.category?.name
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Subcategories
                          </label>
                          <div className="relative">
                            <div className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 sm:py-2 px-4 pe-9 flex text-nowrap w-full cursor-default bg-white border border-stone-200 rounded-lg text-start sm:text-sm text-stone-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                              <span className="truncate">
                                {
                                  session?.user?.vendor_profile?.subcategory
                                    ?.name
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="location"
                            className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200"
                          >
                            Location
                          </label>
                          <div className="relative">
                            <input
                              id="location"
                              type="text"
                              placeholder="Enter a location"
                              className="py-1.5 sm:py-2 pr-12 pl-4 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setIsLocationModalOpen(true)}
                              className="absolute inset-y-0 right-2 flex items-center justify-center"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="#E91E63"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 11.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.25-7.5 11.25-7.5 11.25S4.5 17.75 4.5 10.5a7.5 7.5 0 1115 0z"
                                />
                              </svg>
                            </button>
                          </div>
                          {errors.location && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.location}
                            </p>
                          )}
                        </div>
                        <LocationSelector
                          isOpen={isLocationModalOpen}
                          onClose={() => setIsLocationModalOpen(false)}
                          onChange={(locData) => {
                            if (locData?.location) {
                              setLocation(locData.location);
                              setSelectedLocationData(locData);
                            }
                          }}
                          onSave={(locData) => {
                            setLocation(locData.location);
                            setSelectedLocationData(locData);
                            setIsLocationModalOpen(false);
                          }}
                        />
                      </div>
                    </div>

                    <AddressInput
                      heading="Business Address"
                      placeholder="Enter the full business address."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      error={errors.address}
                    />

                    {/* Service Details Card */}
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Service Details
                        </h2>
                      </div>
                      <div className="p-5 space-y-4">
                        <FormInput
                          id="eventSpaces"
                          label="Event Spaces"
                          placeholder="e.g., halls, lawns"
                          value={eventSpaces}
                          onChange={(e) => setEventSpaces(e.target.value)}
                        />

                        <FormInput
                          id="totalAreaSqft"
                          label="Total Area"
                          placeholder="in sq. ft."
                          type="number"
                          value={totalAreaSqft}
                          onChange={(e) => setTotalAreaSqft(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Booking Details Card */}
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Booking Details
                        </h2>
                      </div>
                      <div className="p-5 space-y-4">
                        <FormInput
                          id="advanceBookingNotice"
                          label="Advance Booking Notice"
                          placeholder="Enter in Days"
                          type="number"
                          value={advanceBookingNotice}
                          onChange={(e) =>
                            setAdvanceBookingNotice(e.target.value)
                          }
                        />

                        <FormInput
                          id="advancePaymentRequired"
                          label="Advance Payment Required"
                          placeholder="Enter in %"
                          type="number"
                          value={advancePaymentRequired}
                          onChange={(e) =>
                            setAdvancePaymentRequired(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Events Supported Card */}
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Events Supported
                        </h2>
                      </div>
                      <div className="p-5 space-y-4">
                        <div>
                          <label
                            htmlFor="eventTypes"
                            className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200"
                          >
                            Types of Events Covered
                          </label>
                          <div className="p-2">
                            <CheckboxGroup
                              items={eventTypes}
                              selectedItems={selectedEventTypes}
                              onToggle={handleEventTypeToggle}
                              name="eventTypes"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="restrictions"
                            className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200"
                          >
                            Restrictions
                          </label>
                          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            <TiptapEditor
                              content={restrictions}
                              onUpdate={setRestrictions}
                              placeholder="Enter any restrictions or specific rules..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showSuccess && (
                <SuccessPopup
                  message={popupMessage}
                  onClose={() => setShowSuccess(false)}
                />
              )}

              {formMessage.text && (
                <div
                  className={`fixed bottom-24 start-1/2 -translate-x-1/2 p-4 rounded-lg shadow-md text-white ${
                    formMessage.type === "success"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {formMessage.text}
                </div>
              )}
      <FullPageStatus loading={isLoading} success={isSuccess} />
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

      <Script
        src="https://preline.co/assets/vendor/preline/dist/index.js?v=3.1.0"
        strategy="lazyOnload"
      />
      <Script
        src="https://preline.co/assets/vendor/clipboard/dist/clipboard.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://preline.co/assets/js/hs-copy-clipboard-helper.js"
        strategy="lazyOnload"
      />
    </>
  );
}
