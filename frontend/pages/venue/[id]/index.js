import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// Components (adjust paths if different in your project)
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
import ChatApp from '@/components/ChatApp';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env.local file.");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;
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
  const [venueData, setVenueData] = useState(null);
  const [venueId, setVenueId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [content, setContent] = useState("");
  const [productContent, setProductContent] = useState("");
  const [relatedItems, setRelatedItems] = useState(null);
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const accessToken = session?.accessToken;
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    number: "",
    alternate_number: "",
  });
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState("");

  const [showChat, setShowChat] = useState(false);
  const [chatId, setChatId] = useState(null);

  // General debug logs (will run on every render)
  console.log("--- Component Render Debug ---");
  console.log("Current overall loading state (top of render):", loading);
  console.log("Next-Auth Session Status:", status);
  console.log("User object (from session):", user);
  console.log("User ID (user?.id):", user?.id, "Type:", typeof user?.id);
  console.log("Venue Data (venueData):", venueData);
  console.log("Venue Vendor ID (venueData?.id):", venueData?.id, "Type:", typeof venueData?.id);
  console.log("----------------------------");

  useEffect(() => {
    if (router.isReady && router.query.id) {
      console.log("Router query ID detected:", router.query.id);
      setVenueId(router.query.id);
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    const fetchRelatedVenuesData = async () => {
      let loc_id = selectedLocationId || venueData?.location_details?.id;
      try {
        if (loc_id !== undefined && loc_id !== null) {
          const config = {
            headers: {
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
              "ngrok-skip-browser-warning": "true",
            },
          };
          const sug = await api.get(`/venues/?location=${loc_id}`, config);
          var apiResponse = sug.data.results.slice(0, 5);
          setRelatedItems(apiResponse);
          console.log("Fetched related items.");
        }
      } catch (err) {
        console.error("Error fetching related venue data:", err);
      }
    };
    fetchRelatedVenuesData();
  }, [accessToken, venueData, selectedLocationId]);

  useEffect(() => {
    if (!venueId) {
        console.log("Venue ID not yet available, skipping main venue data fetch.");
        return;
    }

    const fetchVenueData = async () => {
      setLoading(true); // Start loading for main venue data
      setError(null); // Clear previous errors
      try {
        console.log(`Fetching venue data for ID: ${venueId}`);
        const config = {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            "ngrok-skip-browser-warning": "true",
          },
        };
        const response = await api.get(`/venues/${venueId}/`, config);
        setVenueData(response.data);
        console.log("Successfully fetched main Venue Data:", response.data); // Crucial check here
        setIsFavorite(response.data.is_favorite || false);
        setShowContent(true);
      } catch (err) {
        console.error("Error fetching main venue data:", err);
        setError("Failed to load venue data. Please ensure the venue ID is correct and you have network access.");
        setVenueData(null);
        setShowContent(false);
      } finally {
        setLoading(false); // End loading regardless of success or failure
      }
    };
    fetchVenueData();
  }, [venueId, accessToken]);

  useEffect(() => {
    if (venueData?.name) {
      setContent(
        `${venueData.name} is a delightful store offering a wide array of thoughtful presents for all your special occasions. The diverse selection of items available is mentioned below:`
      );
      setProductContent(
        `${venueData?.name} is perfect for your guests or event needs.`
      );
      setContactInfo({
        name: venueData?.manager_name || "N/A",
        number: venueData?.contact_number || "N/A",
        alternate_number: venueData?.alternative_number || "N/A",
      });
    }
  }, [venueData]);

  const handleShowContactModal = () => setShowContactModal(true);
  const handleCloseContactModal = () => setShowContactModal(false);
  const handleOpenLocationSelector = () => setIsLocationSelectorOpen(true);
  const handleCloseLocationSelector = () => setIsLocationSelectorOpen(false);

  const handleLocationSave = (selectedLocationData) => {
    console.log("Selected Location:", selectedLocationData);
    setSelectedLocationName(selectedLocationData.location || "Chennai");
    setSelectedLocationId(selectedLocationData.locationId);
    console.log("Selected Location ID (after save):", selectedLocationId);
    setIsLocationSelectorOpen(false);
  };
  const handleLocationChange = (currentSelection) => {
    console.log("Current Location Selection Change:", currentSelection);
  };

  const startChat = async () => {
    console.log("Attempting to start chat...");
    console.log("Auth Status:", status);
    console.log("Customer ID:", user?.id);
    console.log("Vendor ID from venueData:", venueData?.id);

    if (status !== "authenticated" || !user?.id) {
      alert("Please log in to start a chat.");
      console.warn("Chat not started: User not authenticated or user.id is missing.");
      return;
    }
    if (!venueData?.id) {
      alert("Vendor information not available. Cannot start chat.");
      console.error("Chat not started: venueData.id is missing or null.", venueData);
      return;
    }

    setLoading(true);
    try {
      // 1. Check if a chat already exists between this customer and vendor
      // Ensure user.id and venueData.id are correctly typed (should be text/string)
      const { data: existingChats, error: chatError } = await supabase
        .from("chats")
        .select("id")
        .eq("customer_id", user?.customer_profile?.supabase_customer_chat_id)
        .eq("vendor_id", venueData?.vendor_supabase_id)
        .limit(1);

      if (chatError) {
        console.error("Supabase Error checking existing chats:", chatError);
        throw chatError;
      }

      let currentChatId;
      if (existingChats && existingChats.length > 0) {
        currentChatId = existingChats[0].id;
        console.log("Existing chat found, ID:", currentChatId);
      } else {
        console.log("No existing chat, creating new chat...");
        const { data: newChat, error: newChatError } = await supabase
          .from("chats")
          .insert([
            { customer_id: user?.customer_profile?.supabase_customer_chat_id,  vendor_id: venueData?.vendor_supabase_id, id: venueData?.vendor_supabase_id },
          ])
          .select("id");

        if (newChatError) {
          console.error("Supabase Error creating new chat:", newChatError);
          throw newChatError;
        }
        if (!newChat || newChat.length === 0) {
          throw new Error("Failed to create new chat: Supabase returned no data.");
        }

        currentChatId = newChat[0].id;
        console.log("New chat created, ID:", currentChatId);
      }

      setChatId(currentChatId);
      setShowChat(true);
      console.log("Chat initiation successful. Showing ChatApp.");
    } catch (err) {
      console.error("Overall error during startChat:", err.message);
      setError("Failed to start chat. Please try again. Detailed Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Debugging the disabled condition
  const isButtonDisabled = loading || status !== "authenticated" || !user?.id || !venueData?.id;
  console.log("--- Button Disabled Conditions ---");
  console.log("loading:", loading);
  console.log("status !== 'authenticated':", status !== "authenticated", "(Current status:", status, ")");
  console.log("!user?.id:", !user?.id, "(user?.id:", user?.id, ")");
  console.log("!venueData?.id:", !venueData?.id, "(venueData?.id:", venueData?.id, ")");
  console.log("Final isButtonDisabled:", isButtonDisabled);
  console.log("--------------------------------");


  return (
    <>
      <Head>
        <title>
          {venueData?.name
            ? `${venueData.name} | venue`
            : "Loading Venue Details..."}
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
                <Breadcrumb data={venueData} />

                {/* Chat initiation button */}
                <div className="my-4 text-center">
                  <button
                    onClick={startChat}
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isButtonDisabled} // Use the pre-calculated variable
                  >
                    {loading ? "Starting Chat..." : `Start Chat with ${venueData?.name || "Vendor"}`}
                  </button>
                </div>
                {error && <p className="text-red-500 text-center my-2">{error}</p>}

                {/* Conditionally render ChatApp - fixed position for pop-up */}
                {showChat && chatId && user?.id && venueData?.id && (
                  <div className="fixed bottom-4 right-4 z-[9999]">
                    <ChatApp
                      chatId={chatId}
                      customerId= {user?.customer_profile?.supabase_customer_chat_id}
                      vendorId={venueData?.vendor_supabase_id}
                      onClose={() => setShowChat(false)}
                      customerName={user.name || "Customer"}
                      vendorName={venueData.name}
                    />
                  </div>
                )}

                {/* Original content follows */}
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
                          data={venueData?.services_offered_details}
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
      ) : (
        <LoadingSpinner />
      )}
      <SocialMediaLinks data={venueData} />
    </>
  );
}