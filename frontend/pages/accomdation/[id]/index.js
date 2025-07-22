import Head from "next/head";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import Header from "@/components/customer/Header";
import Breadcrumb from "@/components/customer/Breadcrumb";
import ImageSlider from "@/components/customer/ImageSlider";
import Reviews from "@/components/customer/Reviews";
import ServicesOffered from "@/components/customer/ServicesOffered";
import About from "@/components/customer/About";
import EventTypes from "@/components/customer/EventTypes";
import FAQ from "@/components/customer/FAQ";
import ProductDetails from "@/components/customer/ProductDetails";
import SocialMediaLinks from "@/components/customer/SocialMediaLinks";
import ContactModal from "@/components/customer/ContactModal";
import Suggestions from "@/components/customer/Suggestions";
import LocationSelector from "@/components/LocationSelector";
import Packages from "@/components/customer/Packages";

const isNgrok =
  process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
const api_url = getApiUrl();
const api = axios.create(
  {
    baseURL: api_url + "/api/v1",
  },
  {
    headers: {
      ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
    },
  }
);
export default function Accommodation() { 
  const [accommodationData, setAccommodationData] = useState(null);
  const [accommodationId, setAccommodationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [content, setContent] = useState("");
  const [productContent, setProductContent] = useState("");
  const [relatedItems, setrelatedItems] = useState(null);
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    number: "",
    alternate_number: "",
  });
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState("");

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


  useEffect(() => {
    if (router.isReady && router.query.id) {
      console.log(router.query.id);
      setAccommodationId(router.query.id); 
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    const fetchAccommodationData = async () => { 
      setLoading(true);
      let loc_id = selectedLocationId || accommodationData?.location_details?.id;
      try {
        if (loc_id !== undefined && loc_id !== null) {
          const config = {
            headers: {
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
              "ngrok-skip-browser-warning": "true",
            },
          };
          const sug = await api.get(`/accommodationtravel/?location=${loc_id}`, config); 

          var apiResponse = sug.data.results.slice(0, 5);

          setrelatedItems(apiResponse);
        }
      } catch (err) {
        console.error("Error fetching accommodation data:", err); 
        setError("Failed to load accommodation data."); 
      } finally {
        //setLoading(false);
      }
    };
    fetchAccommodationData(); 
  }, [accessToken, accommodationData, selectedLocationId]); 

  useEffect(() => {
    if (!accommodationId) return; 
    const fetchAccommodationData = async () => { 
      setLoading(true);
      try {
        const config = {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            "ngrok-skip-browser-warning": "true",
          },
        };
        const response = await api.get(`/accommodationtravel/${accommodationId}/`, config); 
        setAccommodationData(response.data); 
        setIsFavorite(response.data.is_favorite || false);
        setShowContent(true);
        setError(null);
      } catch (err) {
        setError("Failed to load Accommodation data."); 
        setAccommodationData(null);
        setShowContent(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAccommodationData(); 
  }, [accommodationId, accessToken]); 

  useEffect(() => {
    if (accommodationData?.name) { 
      setContent(
        `${accommodationData.name} offers comfortable and convenient lodging options for your stay. Explore the various accommodation types and amenities mentioned below:` // Updated content
      );
      setProductContent(
        `${accommodationData?.name} is perfect for your guests or event needs.` 
      );
      setContactInfo({
        name: accommodationData?.manager_name || "N/A", 
        number: accommodationData?.contact_number || "N/A", 
        alternate_number: accommodationData?.alternative_number || "N/A", 
      });
    }
  }, [accommodationData]); 
  const handleShowContactModal = () => {
    setShowContactModal(true);
  };
  const handleCloseContactModal = () => {
    setShowContactModal(false);
  };
  const handleOpenLocationSelector = () => {
    setIsLocationSelectorOpen(true);
  };

  const handleCloseLocationSelector = () => {
    setIsLocationSelectorOpen(false);
  };
  const handleLocationSave = (selectedLocationData) => {
    console.log("Selected Location:", selectedLocationData);
    setSelectedLocationName(selectedLocationData.location || "Chennai");
    setSelectedLocationId(selectedLocationData.locationId);
    console.log(selectedLocationId);
    setIsLocationSelectorOpen(false);
  };
  const handleLocationChange = (currentSelection) => {
    console.log("Current Selection:", currentSelection);
  };

  return (
    <>
      <Head>
        <title>
          {accommodationData?.name 
            ? `${accommodationData.name} | Accommodation Service` 
            : "Loading Accommodation Details..."}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showContent ? (
        <main>
          <Header
            onOpenLocationSelector={handleOpenLocationSelector}
            selectedLocationName={selectedLocationName}
          />
          <div id="content">
            <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="pt-6">
                <Breadcrumb data={accommodationData} />   
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-10">
                  <div className="lg:col-span-3">
                    <ImageSlider data={accommodationData} />   
                    <div id="hs-sticky-sidebar-mobile-wrapper"></div>
                    <Reviews />
                    <div className="pt-14 pb-10">
                      <div className="mt-10">
                        <ServicesOffered
                          heading="Amenities Offered" 
                          content={content}
                          data={accommodationData?.services_offered_details} 
                        />
                        <div className="max-w-4xl mx-auto text-gray-800 dark:text-neutral-200">
                          <About data={accommodationData} />   
                          <EventTypes data={accommodationData} />
                          <Packages data={accommodationData} />   
                          <FAQ data={accommodationData} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="hs-sticky-sidebar-desktop-wrapper"
                    className="lg:col-span-2"
                  >
                    <div
                      className="ml-4 pt-8 lg:pt-0 h-full"
                      data-hs-switch-place='{
              "xs": "#hs-sticky-sidebar-mobile-wrapper",
              "lg": "#hs-sticky-sidebar-desktop-wrapper"
            }'
                    >
                      <ProductDetails
                        content={productContent}
                        data={accommodationData} 
                        onShowContactModal={handleShowContactModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6 sm:py-12 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
              <Suggestions relatedItems={relatedItems} />
            </div>
          </div>
          <ContactModal
            show={showContactModal}
            onClose={handleCloseContactModal}
            contactName={contactInfo.name}
            contactNumber={contactInfo.number}
            alternateNumber={contactInfo.alternate_number}
          />
          <LocationSelector
            isOpen={isLocationSelectorOpen}
            onClose={handleCloseLocationSelector}
            onSave={handleLocationSave}
            onChange={handleLocationChange}
          />
        </main>
      ) : (
        <LoadingSpinner />
      )}
      <SocialMediaLinks data={accommodationData} />
    </>
  );
}