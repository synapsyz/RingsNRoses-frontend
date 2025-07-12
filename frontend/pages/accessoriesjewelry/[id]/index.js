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
export default function AccessoriesJewelry() {
  const [accessoriesJewelryData, setAccessoriesJewelryData] = useState(null);
  const [accessoriesJewelryId, setAccessoriesJewelryId] = useState(null);
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

  useEffect(() => {
    if (router.isReady && router.query.id) {
      console.log(router.query.id);
      setAccessoriesJewelryId(router.query.id);
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    const fetchAccessoriesJewelryData = async () => {
      setLoading(true);
      let loc_id = selectedLocationId || accessoriesJewelryData?.location_details?.id;
      try {
        if (loc_id !== undefined && loc_id !== null) {
          const config = {
            headers: {
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
              "ngrok-skip-browser-warning": "true",
            },
          };
          const sug = await api.get(`/accessoriesjewelry/?location=${loc_id}`, config);

          var apiResponse = sug.data.results.slice(0, 5);

          setRelatedItems(apiResponse);
        }
      } catch (err) {
        console.error("Error fetching accessories & jewelry data:", err);
        setError("Failed to load accessories & jewelry data.");
      } finally {
        //setLoading(false);
      }
    };
    fetchAccessoriesJewelryData();
  }, [accessToken, accessoriesJewelryData, selectedLocationId]);

  useEffect(() => {
    if (!accessoriesJewelryId) return;
    const fetchAccessoriesJewelryData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            "ngrok-skip-browser-warning": "true",
          },
        };
        const response = await api.get(`/accessoriesjewelry/${accessoriesJewelryId}/`, config);
        setAccessoriesJewelryData(response.data);
        setIsFavorite(response.data.is_favorite || false);
        setShowContent(true);
        setError(null);
      } catch (err) {
        setError("Failed to load Accessories & Jewelry data.");
        setAccessoriesJewelryData(null);
        setShowContent(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAccessoriesJewelryData();
  }, [accessoriesJewelryId, accessToken]);

  useEffect(() => {
    if (accessoriesJewelryData?.name) {
      setContent(
        `${accessoriesJewelryData.name} offers a stunning collection of accessories and jewelry to complement any style. Explore the diverse range of products available below:`
      );
      setProductContent(
        `${accessoriesJewelryData?.name} has the perfect pieces for your special moments.`
      );
      setContactInfo({
        name: accessoriesJewelryData?.manager_name || "N/A",
        number: accessoriesJewelryData?.contact_number || "N/A",
        alternate_number: accessoriesJewelryData?.alternative_number || "N/A",
      });
    }
  }, [accessoriesJewelryData]);

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
          {accessoriesJewelryData?.name
            ? `${accessoriesJewelryData.name} | Accessories & Jewelry`
            : "Loading Accessories & Jewelry Details..."}
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
                <Breadcrumb data={accessoriesJewelryData} />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-10">
                  <div className="lg:col-span-3">
                    <ImageSlider data={accessoriesJewelryData} />
                    <div id="hs-sticky-sidebar-mobile-wrapper"></div>
                    <Reviews />
                    <div className="pt-14 pb-10">
                      <div className="mt-10">
                        <ServicesOffered
                          heading="Products Offered"
                          content={content}
                          data={accessoriesJewelryData?.services_offered_details}
                        />
                        <div className="max-w-4xl mx-auto text-gray-800 dark:text-neutral-200">
                          <About data={accessoriesJewelryData} />
                          <EventTypes data={accessoriesJewelryData} />
                          <Packages data={accessoriesJewelryData} />
                          <FAQ data={accessoriesJewelryData} />
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
                        data={accessoriesJewelryData}
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
      <SocialMediaLinks data={accessoriesJewelryData} />
    </>
  );
}