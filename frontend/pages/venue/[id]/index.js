import Head from "next/head";
import React, { useEffect, useState } from "react";
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
import FoodPackages from "@/components/customer/FoodPackages";

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

export default function Home() {
  // == STATE MANAGEMENT ==
  const [venueData, setVenueData] = useState(null);
  const [relatedItems, setRelatedItems] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null); // Central state for the token
  const [isFavorite, setIsFavorite] = useState(false);

  // Content states
  const [content, setContent] = useState("");
  const [productContent, setProductContent] = useState("");

  // Modal and Location states
  const [showContactModal, setShowContactModal] = useState(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    number: "",
    alternate_number: "",
  });

  // Hooks
  const { data: session } = useSession();
  const router = useRouter();
  const { id: venueId } = router.query;

  // == EFFECT TO SET AUTH TOKEN (CLIENT-SIDE ONLY) ==
  useEffect(() => {
    // This effect runs only on the client
    if (session?.accessToken) {
      setAuthToken(session.accessToken);
    } else {
      try {
        const storedDataString = sessionStorage.getItem("session");
        if (storedDataString) {
          const storedData = JSON.parse(storedDataString);
          if (storedData?.tokens?.access) {
            setAuthToken(storedData.tokens.access);
          }
        }
      } catch (e) {
        console.error("Could not get token from sessionStorage", e);
      }
    }
  }, [session]); // Runs when session object changes

  // == EFFECT TO FETCH ALL VENUE DATA (CLIENT-SIDE ONLY) ==
  useEffect(() => {
    // Exit if we don't have the required data yet
    if (!venueId || !authToken) {
      // If not loading, but we can't fetch, set loading to false.
      if (loading) setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "ngrok-skip-browser-warning": "true",
        },
      };

      try {
        // 1. Fetch main venue data
        const venueResponse = await api.get(`/venues/${venueId}/`, config);
        const fetchedVenue = venueResponse.data;
        setVenueData(fetchedVenue);
        setIsFavorite(fetchedVenue.is_favorite || false);

        // 2. Fetch related items using data from the first API call
        const locationId = selectedLocationId || fetchedVenue?.location_details?.id;
        if (locationId) {
          const suggestionsResponse = await api.get(
            `/venues/?location=${locationId}`,
            config
          );
          setRelatedItems(suggestionsResponse.data.results.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching venue data:", err);
        setError("Failed to load venue data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [venueId, authToken, selectedLocationId]); // Re-runs if venueId, token, or selected location changes

  // == EFFECT TO SET DERIVED CONTENT FROM VENUE DATA ==
  useEffect(() => {
    if (venueData?.name) {
      setContent(
        `${venueData.name} is a delightful store offering a wide array of thoughtful presents for all your special occasions. The diverse selection of items available is mentioned below:`
      );
      setProductContent(
        `${venueData.name} is perfect for your guests or event needs.`
      );
      setContactInfo({
        name: venueData.manager_name || "N/A",
        number: venueData.contact_number || "N/A",
        alternate_number: venueData.alternative_number || "N/A",
      });
    }
  }, [venueData]);

  // == EVENT HANDLERS ==
  const handleShowContactModal = () => setShowContactModal(true);
  const handleCloseContactModal = () => setShowContactModal(false);
  const handleOpenLocationSelector = () => setIsLocationSelectorOpen(true);
  const handleCloseLocationSelector = () => setIsLocationSelectorOpen(false);
  
  const handleLocationSave = (selectedLocationData) => {
    setSelectedLocationName(selectedLocationData.location || "Chennai");
    setSelectedLocationId(selectedLocationData.locationId);
    setIsLocationSelectorOpen(false);
  };
  
  const handleLocationChange = (currentSelection) => {
    // Logic for what happens while the selection is changing, if needed
  };

  // == RENDER LOGIC ==
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    // You can create a dedicated error component for a better UI
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!venueData) {
    // This handles the case where loading is false but there's no data (e.g., initial state)
    return <LoadingSpinner />;
  }
  
  return (
    <>
      <Head>
        <title>{`${venueData.name} | Venue`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header
          onOpenLocationSelector={handleOpenLocationSelector}
          selectedLocationName={selectedLocationName}
        />
        <div id="content">
          <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="pt-6">
              <Breadcrumb data={venueData} />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-10">
                <div className="lg:col-span-3">
                  <ImageSlider data={venueData} />
                  <div className="mt-5">
                    <FoodPackages data={venueData} />
                  </div>
                  <div id="hs-sticky-sidebar-mobile-wrapper"></div>
                  <Reviews />
                  <div className="pt-14 pb-10">
                    <div className="mt-10">
                      <ServicesOffered
                        heading="Services Offered"
                        content={content}
                        data={venueData.services_offered_details}
                      />
                      <div className="max-w-4xl mx-auto text-gray-800 dark:text-neutral-200">
                        <About data={venueData} />
                        <EventTypes data={venueData} />
                        <FAQ data={venueData} />
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
                      data={venueData}
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
      <SocialMediaLinks data={venueData} />
    </>
  );
}