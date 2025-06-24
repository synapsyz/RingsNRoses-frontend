import Head from 'next/head'
import Script from 'next/script'
import Link from "next/link";
import LocationSelector from '@/components/LocationSelector';
import React, { useEffect, useState, useRef } from 'react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import FAQEditor from '@/components/FAQEditor'; // Assuming this component exists
import { Link as TiptapLink } from '@tiptap/extension-link';
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router'; // Import useRouter
import ThumbnailUploader from '@/components/ThumbnailUploader'; // Adjust the path as needed
import CustomHead from '@/components/vendor/Head';
import Header from '@/components/vendor/Header';
import SecondaryNav from '@/components/vendor/SecondaryNav'; // 1. Import SecondaryNav
import MediaManager from '@/components/MediaManager'; // Adjust path as needed

let api_url;
let isNgrok;

isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development' ? false : true;

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
api_url = getApiUrl();

// Axios instance for backend communication
const api = axios.create({
  baseURL: api_url + "/api/v1",
  headers: {
    ...(isNgrok && { 'ngrok-skip-browser-warning': 'true' })
  }
});

const EditorToolbar = ({ editor, editorId }) => {
  if (!editor) return null;

  return (
    <div className="sticky top-0 bg-white flex align-middle gap-x-0.5 border-b border-stone-200 p-2 dark:bg-neutral-800 dark:border-neutral-700">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${editor.isActive('bold') ? 'bg-stone-100 dark:bg-neutral-700' : ''}`}
        data-editor-id={editorId}
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 12a4 4 0 0 0 0-8H6v8" />
          <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${editor.isActive('italic') ? 'bg-stone-100 dark:bg-neutral-700' : ''}`}
        data-editor-id={editorId}
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" x2="10" y1="4" y2="4" />
          <line x1="14" x2="5" y1="20" y2="20" />
          <line x1="15" x2="9" y1="4" y2="20" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${editor.isActive('underline') ? 'bg-stone-100 dark:bg-neutral-700' : ''}`}
        data-editor-id={editorId}
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4v6a6 6 0 0 0 12 0V4" />
          <line x1="4" x2="20" y1="20" y2="20" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter the URL');
          editor.chain().focus().setLink({ href: url }).run();
        }}
        className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${editor.isActive('link') ? 'bg-stone-100 dark:bg-neutral-700' : ''}`}
        data-editor-id={editorId}
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${editor.isActive('orderedList') ? 'bg-stone-100 dark:bg-neutral-700' : ''}`}
        data-editor-id={editorId}
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="10" x2="21" y1="6" y2="6" />
          <line x1="10" x2="21" y1="12" y2="12" />
          <line x1="10" x2="21" y1="18" y2="18" />
          <path d="M4 6h1v4" />
          <path d="M4 10h2" />
          <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${editor.isActive('bulletList') ? 'bg-stone-100 dark:bg-neutral-700' : ''}`}
        data-editor-id={editorId}
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${editor.isActive('blockquote') ? 'bg-stone-100 dark:bg-neutral-700' : ''}`}
        data-editor-id={editorId}
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 6H3" />
          <path d="M21 12H8" />
          <path d="M21 18H8" />
          <path d="M3 12v6" />
        </svg>
      </button>
    </div>
  );
};

export default function EditService() {

  // ... other states
  const [thumbnailUrl, setThumbnailUrl] = useState(null); // Holds the URL for display
  // --- FIX START: Add state for the permanent thumbnail key ---
  const [thumbnailKey, setThumbnailKey] = useState(null); // Holds the permanent key from DB
  // --- FIX END ---
  const [thumbnailFile, setThumbnailFile] = useState(null); // Holds the new file for upload
  const [initialGallery, setInitialGallery] = useState([]); // Holds initial media from API
  const [updatedExistingMedia, setUpdatedExistingMedia] = useState([]); // Holds the list of existing media after user deletes some
  const [newGalleryFiles, setNewGalleryFiles] = useState([]); // Holds new File objects to upload
  const mediaManagerRef = useRef(null); // Ref for the new component


  const thumbnailUploaderRef = useRef(null);
  const [faqs, setFaqs] = useState([]); // 1. Add state for FAQs



  const handleGalleryUpdate = (existingMedia, newFiles) => {
    setUpdatedExistingMedia(existingMedia);
    setNewGalleryFiles(newFiles);
  };

  // Placeholder for your actual upload logic
  async function uploadFile(file, accessToken) {
    console.log(`Uploading ${file.name}...`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate upload
    return { success: true, key: `media/uploads/${Date.now()}-${file.name}` };
  }


  const handleFileChange = (file) => {
    if (file) {
      setThumbnailFile(file); // Store the file object for upload
      setThumbnailUrl(URL.createObjectURL(file)); // Set the local preview URL
    }
  };

  const handleDeleteThumbnail = () => {
    setThumbnailUrl(null);
    setThumbnailFile(null);
    // --- FIX START: Also clear the permanent key when deleting ---
    setThumbnailKey(null);
    // --- FIX END ---
    // If you have a ref to the file input, you might want to clear it too
    if (thumbnailUploaderRef.current) {
      thumbnailUploaderRef.current.clearFile(); // Assuming your uploader has such a method
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
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const termsEditorRef = useRef(null);
  const termsEditorInstance = useRef(null);
  const [websiteLink, setWebsiteLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');

  const { data: session, status } = useSession();
  let accessToken = session?.accessToken;
  let config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState(new Set());
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(new Set());

  // Form state for venue details
  const [venueName, setVenueName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [about, setAbout] = useState(''); // This will come from Tiptap editor
  const [perPlatePrice, setPerPlatePrice] = useState('');
  const [guestCapacity, setGuestCapacity] = useState('');
  const [eventSpaces, setEventSpaces] = useState('');
  const [totalAreaSqft, setTotalAreaSqft] = useState('');
  const [advanceBookingNotice, setAdvanceBookingNotice] = useState('');
  const [advancePaymentRequired, setAdvancePaymentRequired] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [location, setLocation] = useState('');
  const [locationId, setLocationId] = useState('');



  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  const subcategory = session?.user?.vendor_profile?.subcategory.id; // Assuming Banquet Halls is subcategory 1 for venues
  const venueId = session?.user?.vendor_profile?.service_id; // Get venue ID from session as specified

  // Fetch venue details on component mount or venueId change
  useEffect(() => {
    const fetchVenueDetails = async () => {
      if (!venueId || status !== 'authenticated') return;

      try {
        const response = await api.get(`/venues/${venueId}`, config);
        const venueData = response.data;
        console.log(venueData);

        // Populate form fields with fetched data
        setVenueName(venueData.name || '');
        setManagerName(venueData.manager_name || '');
        setContactNumber(venueData.contact_number || '');
        setEmailAddress(venueData.email || ''); // Assuming email field exists in API response
        setAbout(venueData.about || '');
        setPerPlatePrice(venueData.per_plate_price || '');
        setGuestCapacity(venueData.guest_capacity || '');
        setEventSpaces(venueData.event_spaces || ''); // Assuming event_spaces field exists
        setTotalAreaSqft(venueData.total_area_sqft || '');
        setAdvanceBookingNotice(venueData.advance_booking_notice || '');
        setAdvancePaymentRequired(venueData.advance_payment_required || '');
        setCancellationPolicy(venueData.cancellation_policy || '');
        setRestrictions(venueData.restrictions || '');
        setLocationId(venueData.location_details.id || '');

        setLocation([venueData.location_details.name, venueData.location_details.district_name]
    .filter(Boolean)
    .join(' , ')
);
        // --- FIX START: Store both the display URL and the permanent key ---
        setThumbnailUrl(venueData.thumbnail_url_detail || null); // Use presigned URL for display
        setThumbnailKey(venueData.thumbnail_url || null);       // Store the permanent key
        // --- FIX END ---

        // Set selected services and event types
        if (venueData.services_offered_details) {
          setSelectedServices(new Set(venueData.services_offered_details.map(service => service.id)));
        }
        if (venueData.event_types_details) {
          setSelectedEventTypes(new Set(venueData.event_types_details.map(eventType => eventType.id)));
        }

        if (venueData.images && Array.isArray(venueData.images)) {
          // Use .map() to create an array of just the image URLs
          const imageUrls = venueData.images.map(imageObject => imageObject.image_url);

          // Pass this clean array of URL strings to the state
          setInitialGallery(imageUrls);
        }




        if (venueData.faq_details && Array.isArray(venueData.faq_details)) {
                    const loadedFaqs = venueData.faq_details.map((faq, index) => ({
                        // Create a unique ID for React's key prop during this editing session
                        id: `faq-${index}-${Date.now()}`, 
                        question: faq.question || '',
                        answer: faq.answer || ''
                    }));
                    setFaqs(loadedFaqs);
                }

        setWebsiteLink(venueData.website_link || ''); // Assuming these fields exist
        setInstagramLink(venueData.instagram_link || '');
        setFacebookLink(venueData.facebook_link || '');
        setTermsAndConditions(venueData.terms_and_conditions || ''); // Assuming this field exists

      } catch (error) {
        console.error("Error fetching venue details:", error);
        setFormMessage({ type: 'error', text: 'Error: Could not fetch venue details.' });
      }
    };

    fetchVenueDetails();
  }, [venueId, status, accessToken]); // Re-fetch when venueId or session status changes



  useEffect(() => {
    // Fetch services from the backend
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

    // Fetch event types from the backend
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

  // Initialize and update Tiptap editors
  useEffect(() => {
    if (!editorRef.current) return;

    const editor = new Editor({
      element: editorRef.current,
      extensions: [
        StarterKit.configure({
          history: false
        }),
        Placeholder.configure({
          placeholder: 'Add a message, if you\'d like.',
          emptyNodeClass: 'before:text-stone-400'
        }),
        Paragraph.configure({
          HTMLAttributes: {
            class: 'text-sm text-stone-800 dark:text-stone-200'
          }
        }),
        Bold.configure({
          HTMLAttributes: {
            class: 'font-bold'
          }
        }),
        Underline,
        TiptapLink.configure({
          HTMLAttributes: {
            class: 'inline-flex items-center gap-x-1 text-green-600 decoration-2 hover:underline font-medium dark:text-white'
          }
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc list-inside text-stone-800 dark:text-white'
          }
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal list-inside text-stone-800 dark:text-white'
          }
        }),
        ListItem.configure({
          HTMLAttributes: {
            class: 'marker:text-sm'
          }
        }),
        Blockquote.configure({
  HTMLAttributes: {
    class: 'border-l-4 pl-4 italic text-stone-800 dark:text-white'
  }
})

      ],
      onUpdate: ({ editor }) => {
        setAbout(editor.getHTML());
      },
      content: about || '',
    });

    editorInstance.current = editor;

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, []); // Re-initialize when 'about' content changes 
  
  useEffect(() => {
    if (!cancellationEditorRef.current) return;

    const editor = new Editor({
      element: cancellationEditorRef.current,
      extensions: [
        StarterKit.configure({
          history: false
        }),
        Placeholder.configure({
          placeholder: 'Enter cancellation policy...',
          emptyNodeClass: 'before:text-stone-400'
        }),
        Paragraph.configure({
          HTMLAttributes: {
            class: 'text-sm text-stone-800 dark:text-stone-200'
          }
        }),
        Bold.configure({
          HTMLAttributes: {
            class: 'font-bold'
          }
        }),
        Underline,
        TiptapLink.configure({
          HTMLAttributes: {
            class: 'inline-flex items-center gap-x-1 text-green-600 decoration-2 hover:underline font-medium dark:text-white'
          }
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc list-inside text-stone-800 dark:text-white'
          }
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal list-inside text-stone-800 dark:text-white'
          }
        }),
        ListItem.configure({
          HTMLAttributes: {
            class: 'marker:text-sm'
          }
        }),
        Blockquote.configure({
          HTMLAttributes: {
            class: 'relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 sm:[&>p]:text-lg text-stone-800 dark:text-white'
          }
        })
      ],
      onUpdate: ({ editor }) => {
        setCancellationPolicy(editor.getHTML());
      },
      content: cancellationPolicy || '',
    });

    cancellationEditorInstance.current = editor;

    return () => {
      if (cancellationEditorInstance.current) {
        cancellationEditorInstance.current.destroy();
      }
    };
  }, []);
  useEffect(() => {
    if (cancellationEditorInstance.current && cancellationPolicy) {
      cancellationEditorInstance.current.commands.setContent(cancellationPolicy);
    }
  }, [cancellationPolicy]);
  useEffect(() => {
    if (!restrictionsEditorRef.current) return;

    const editor = new Editor({
      element: restrictionsEditorRef.current,
      extensions: [
        StarterKit.configure({
          history: false
        }),
        Placeholder.configure({
          placeholder: 'Enter restrictions here...',
          emptyNodeClass: 'before:text-stone-400'
        }),
        Paragraph.configure({
          HTMLAttributes: {
            class: 'text-sm text-stone-800 dark:text-stone-200'
          }
        }),
        Bold.configure({
          HTMLAttributes: {
            class: 'font-bold'
          }
        }),
        Underline,
        TiptapLink.configure({
          HTMLAttributes: {
            class: 'inline-flex items-center gap-x-1 text-green-600 decoration-2 hover:underline font-medium dark:text-white'
          }
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc list-inside text-stone-800 dark:text-white'
          }
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal list-inside text-stone-800 dark:text-white'
          }
        }),
        ListItem.configure({
          HTMLAttributes: {
            class: 'marker:text-sm'
          }
        }),
        Blockquote.configure({
          HTMLAttributes: {
            class: 'relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 sm:[&>p]:text-lg text-stone-800 dark:text-white'
          }
        })
      ],
      onUpdate: ({ editor }) => {
        setRestrictions(editor.getHTML());
      },
      content: restrictions || '',
    });

    restrictionsEditorInstance.current = editor;

    return () => {
      if (restrictionsEditorInstance.current) {
        restrictionsEditorInstance.current.destroy();
      }
    };
  }, []);
  useEffect(() => {
    if (restrictionsEditorInstance.current && restrictions) {
      restrictionsEditorInstance.current.commands.setContent(restrictions);
    }
  }, [restrictions]);
  useEffect(() => {
    if (!termsEditorRef.current) return;

    const editor = new Editor({
      element: termsEditorRef.current,
      extensions: [
        StarterKit.configure({
          history: false
        }),
        Placeholder.configure({
          placeholder: 'Enter terms and conditions...',
          emptyNodeClass: 'before:text-stone-400'
        }),
        Paragraph.configure({
          HTMLAttributes: {
            class: 'text-sm text-stone-800 dark:text-stone-200'
          }
        }),
        Bold.configure({
          HTMLAttributes: {
            class: 'font-bold'
          }
        }),
        Underline,
        TiptapLink.configure({
          HTMLAttributes: {
            class: 'inline-flex items-center gap-x-1 text-green-600 decoration-2 hover:underline font-medium dark:text-white'
          }
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'list-disc list-inside text-stone-800 dark:text-white'
          }
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'list-decimal list-inside text-stone-800 dark:text-white'
          }
        }),
        ListItem.configure({
          HTMLAttributes: {
            class: 'marker:text-sm'
          }
        }),
        Blockquote.configure({
          HTMLAttributes: {
            class: 'relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 sm:[&>p]:text-lg text-stone-800 dark:text-white'
          }
        })
      ],
      onUpdate: ({ editor }) => {
        setTermsAndConditions(editor.getHTML());
      },
      content: termsAndConditions || ''
    });

    termsEditorInstance.current = editor;

    return () => {
      if (termsEditorInstance.current) {
        termsEditorInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (termsEditorInstance.current && termsAndConditions) {
      termsEditorInstance.current.commands.setContent(termsAndConditions);
    }
  }, [termsAndConditions]);
  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prevSelectedServices => {
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
    setSelectedEventTypes(prevSelectedEventTypes => {
      const newSelected = new Set(prevSelectedEventTypes);
      if (newSelected.has(eventTypeId)) {
        newSelected.delete(eventTypeId);
      } else {
        newSelected.add(eventTypeId);
      }
      return newSelected;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!venueId) {
      setFormMessage({ type: 'error', text: 'Error: Venue ID not found for update.' });
      return;
    }

    setFormMessage({ type: 'info', text: 'Updating venue, please wait...' });


    // --- FIX START: Corrected logic for handling thumbnail key ---
    // 1. Determine the final thumbnail key
    let finalThumbnailKey = thumbnailKey; // Default to the existing key (or null if deleted)

    // If a new file has been selected, upload it and get its key
    if (thumbnailFile) {
      const uploadResult = await thumbnailUploaderRef.current.upload();
      if (!uploadResult.success) {
        setFormMessage({ type: 'error', text: `Thumbnail upload failed: ${uploadResult.message}` });
        return;
      }
      finalThumbnailKey = uploadResult.key; // Use the new key from the successful upload
    }
    // --- FIX END ---

    // 2. Upload Gallery Media
    const galleryResult = await mediaManagerRef.current.upload();
    if (!galleryResult.success) {
      setFormMessage({ type: 'error', text: `Gallery upload failed: ${galleryResult.message}` });
      return;
    }
    const finalGalleryList = [...updatedExistingMedia, ...galleryResult.keys];


    // 3. Prepare the FAQ data for the API
        const faqsForApi = faqs
            .filter(faq => faq.question.trim() !== '' && faq.answer.trim() !== '') // Ensure FAQ is not empty
            .map((faq, index) => ({
                question: faq.question,
                answer: faq.answer,
                order: index + 1, // Add the order field as expected by the backend
            }));


    // 3. Prepare data for the PUT request
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
      email:emailAddress,
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
    };


 

    console.log("Submitting updated data:", formData);

    try {
      const accessToken = session?.accessToken;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      };

      const response = await api.put(`/venues/${venueId}/`, formData, config);
      console.log("Venue updated successfully:", response.data);
      setFormMessage({ type: 'success', text: 'Venue updated successfully!' });
    } catch (error) {
      console.error("Error updating venue:", error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        setFormMessage({ type: 'error', text: `Error: ${error.response.data.detail || 'Failed to update venue.'}` });
      } else if (error.request) {
        setFormMessage({ type: 'error', text: 'Error: No response from server. Check network connection.' });
      } else {
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
        {/* HEADER */}


        {/* MAIN CONTENT */}

        <main id="content" className="pb-14 sm:pb-16">
          <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            {/* Breadcrumb */}
            <ol className="lg:hidden pt-5 flex items-center whitespace-nowrap">
              <li className="flex items-center text-sm text-stone-600 dark:text-neutral-500">
                Products
                <svg className="shrink-0 overflow-visible size-4 ms-1.5 text-stone-400 dark:text-neutral-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
                </svg>
              </li>
              <li className="ps-1.5 flex items-center font-semibold text-stone-800 dark:text-neutral-200 text-sm">
                Add Product
              </li>
            </ol>
            {/* End Breadcrumb */}

            <div className="py-2 sm:pb-0 sm:pt-5 space-y-5">
              {/* Products Grid */}
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

                      {/* Input */}
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                        <div>
                          <label htmlFor="venueName" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Name
                            <span className="hs-tooltip inline-block align-middle">
                              <svg className="shrink-0 size-4 text-stone-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                              </svg>
                              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity hidden invisible z-60 max-w-60 py-1 px-2 bg-stone-900 text-xs font-normal text-white rounded-lg shadow-2xs dark:bg-neutral-700" role="tooltip">
                                Give your product a short and clear name.
                              </span>
                            </span>
                          </label>
                          <input
                            id="venueName"
                            type="text"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="Royal Palace Banquet"
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="managerName" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Manager Name
                          </label>
                          <input
                            id="managerName"
                            type="text"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="John Doe"
                            value={managerName}
                            onChange={(e) => setManagerName(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* End Input */}

                      {/* Input Grid */}
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                        {/* Input */}
                        <div>
                          <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Contact Number
                          </label>
                          <input
                            id="contactNumber"
                            type="text"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="+919999999998"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                          />
                        </div>
                        {/* End Input */}

                        {/* Input */}
                        <div>
                          <label htmlFor="emailAddress" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Email Address
                          </label>
                          <div className="relative w-full">
                            <input
                              id="emailAddress"
                              type="text"
                              className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                              placeholder="mahal@email.com"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* End Input */}
                      </div>
                      {/* End Input Grid */}

                      {/* Textarea Input */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                          Description (About)
                        </label>

                        {/* Tiptap */}
                        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                          <EditorToolbar editor={editorInstance.current} editorId="main-editor" />
<div
  ref={editorRef}
  className="h-40 overflow-auto px-3 py-2 text-sm text-stone-800 dark:text-stone-200"
  contentEditable
/>

                        </div>
                        {/* End Tiptap */}
                      </div>
                      {/* End Textarea Input */}
                    </div>
                    {/* End Body */}
                  </div>
                  {/* End Products Card */}

                  <MediaManager
                    ref={mediaManagerRef} // Attach the ref here
                    initialMedia={initialGallery}
                    onUpdate={handleGalleryUpdate}
                  />


                  {/* Variants Card */}
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Services Offered
                      </h2>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-4">
                        {services.map(service => (
                          <label
                            key={service.id}
                            htmlFor={`service-checkbox-${service.id}`}
                            className={`
                              py-2 px-2.5 relative flex justify-center items-center text-center text-[13px]
                              bg-white border border-gray-200 ring-1 ring-transparent text-gray-800
                              cursor-pointer rounded-xl hover:border-green-600 hover:ring-green-600
                              dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700
                              dark:hover:ring-neutral-600 dark:hover:ring-neutral-600
                              peer-checked:bg-green-100 peer-checked:border-green-200 peer-checked:ring-green-200 peer-checked:text-green-800
                              dark:peer-checked:bg-green-800/30 dark:peer-checked:border-green-800/50
                              dark:peer-checked:ring-green-800/50 dark:peer-checked:text-green-500
                              has-disabled:pointer-events-none has-disabled:text-gray-200 dark:has-disabled:text-neutral-700
                            `}
                          >
                            <input
                              type="checkbox"
                              id={`service-checkbox-${service.id}`}
                              className="hidden peer"
                              name="services"
                              checked={selectedServices.has(service.id)}
                              onChange={() => handleServiceToggle(service.id)}
                            />
                            <span className="flex shrink-0 justify-center items-center size-0 bg-green-500 text-transparent rounded-full transition-all duration-200 peer-checked:size-4 peer-checked:me-1.5 peer-checked:text-white">
                              <svg className="shrink-0 size-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </span>
                            <span className="block">
                              {service.name}
                            </span>
                          </label>
                        ))}
                      </div>


                    </div>
                  </div>
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Header */}
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Terms and Conditions
                      </h2>
                    </div>
                    {/* End Header */}

                    {/* Body */}
                    <div id="hs-add-product-Event-supported-card-body" className="p-5 space-y-4">
                      {/* Input */}
                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                        <EditorToolbar editor={termsEditorInstance.current} editorId="terms-editor" />
                        <div className="h-40 overflow-auto px-3 py-2 text-sm text-stone-800 dark:text-stone-200" ref={termsEditorRef} contentEditable></div>
                      </div>
                      {/* End Input */}
                    </div>
                    {/* End Body */}
                  </div>

                  {/* End Variants Card */}
                  <FAQEditor faqs={faqs} setFaqs={setFaqs} />
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Header */}
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Cancellation Policy
                      </h2>
                    </div>
                    {/* End Header */}

                    {/* Body */}
                    <div id="hs-add-product-Event-supported-card-body" className="p-5 space-y-4">
                      {/* Input */}


                      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                        <EditorToolbar editor={cancellationEditorInstance.current} editorId="cancellation-editor" />
                        <div className="h-40 overflow-auto px-3 py-2 text-sm text-stone-800 dark:text-stone-200" ref={cancellationEditorRef} contentEditable></div>
                      </div>


                      {/* End Input */}
                    </div>
                    {/* End Body */}
                  </div>
                  {/* Social Media Links Section */}
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Header */}
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Social Media Links
                      </h2>
                    </div>
                    {/* End Header */}

                    {/* Body */}
                    <div className="ml-2 mt-2 mr-2 mb-2 grid sm:grid-cols-3 gap-3 sm:gap-5">
                      {/* Website Link */}
                      <div>
                        <label htmlFor="websiteLink" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                          Website Link
                        </label>
                        <input
                          id="websiteLink"
                          type="url"
                          className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                          placeholder="https://example.com"
                          value={websiteLink}
                          onChange={(e) => setWebsiteLink(e.target.value)}
                        />
                      </div>

                      {/* Instagram Link */}
                      <div>
                        <label htmlFor="instagramLink" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                          Instagram Link
                        </label>
                        <input
                          id="instagramLink"
                          type="url"
                          className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                          placeholder="https://instagram.com/yourvenue"
                          value={instagramLink}
                          onChange={(e) => setInstagramLink(e.target.value)}
                        />
                      </div>

                      {/* Facebook Link */}
                      <div>
                        <label htmlFor="facebookLink" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                          Facebook Link
                        </label>
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
                    {/* End Body */}
                  </div>
                </div>
                {/* End Col */}

                <div className="lg:col-span-2">
                  <div className="lg:sticky lg:top-5 space-y-4">
                    {/* Product Pricing Card */}
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      {/* Header */}
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Pricing
                        </h2>
                      </div>
                      {/* End Header */}

                      {/* Body */}
                      <div id="hs-product-details-pricing-card-body" className="p-5 space-y-4">
                        {/* Input */}
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
                        {/* End Input */}

                        {/* Switch/Toggle */}

                        {/* End Switch/Toggle */}
                      </div>
                      {/* End Body */}
                    </div>
                    {/* End Product Pricing Card */}

                    {/* Organization Card */}
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      {/* Header */}
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Service Details
                        </h2>
                      </div>
                      {/* End Header */}

                      {/* Body */}
                      <div id="hs-add-product-organization-card-body" className="p-5 space-y-4">
                        {/* Input */}
                        <div>
                          <label htmlFor="guestCapacity" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Guest Capacity
                          </label>
                          <input
                            id="guestCapacity"
                            type="number"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="eg. 450"
                            value={guestCapacity}
                            onChange={(e) => setGuestCapacity(e.target.value)}
                          />
                        </div>
                        {/* End Input */}

                        {/* Input */}
                        <div>
                          <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Category
                          </label>

                          {/* Select */}
                          <div className="relative">
                            {/* Fixed Category Display with Same Styling */}
                            <div className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 sm:py-2 px-4 pe-9 flex text-nowrap w-full cursor-default bg-white border border-stone-200 rounded-lg text-start sm:text-sm text-stone-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                              <span className="truncate">{session?.user?.vendor_profile?.subcategory?.category?.name}</span>
                            </div>
                          </div>
                          {/* End Select */}
                        </div>
                        {/* End Input */}

                        {/* Input */}
                        <div>
                          <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Subcategories
                          </label>

                          {/* Select */}
                          <div className="relative">
                            {/* Fixed Category Display with Same Styling */}
                            <div className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 sm:py-2 px-4 pe-9 flex text-nowrap w-full cursor-default bg-white border border-stone-200 rounded-lg text-start sm:text-sm text-stone-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                              <span className="truncate">{session?.user?.vendor_profile?.subcategory?.name}</span>
                            </div>
                          </div>
                          {/* End Select */}
                        </div>
                        {/* End Input */}

                        {/* Input */}
                        {/* Location Section */}
                        <div className="mt-4">
                          <label htmlFor="location" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
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

                            {/* Clickable Location Button with custom color */}
                            <button
                              type="button"
                              onClick={() => setIsLocationModalOpen(true)}
                              className="absolute inset-y-0 right-2 flex items-center justify-center"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="#E91E63" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.25-7.5 11.25-7.5 11.25S4.5 17.75 4.5 10.5a7.5 7.5 0 1115 0z" />
                              </svg>
                            </button>

                          </div>
                        </div>
                        <LocationSelector
                          isOpen={isLocationModalOpen}
                          onClose={() => setIsLocationModalOpen(false)}
                          onChange={(locData) => {
                            if (locData?.location) {
                              setLocation(locData.location); // for display
                              setSelectedLocationData(locData); // save full object for submission if needed
                            }
                          }}
                          onSave={(locData) => {
                            setLocation(locData.location); // display selected location
                            setSelectedLocationData(locData); // optional: use locationId later
                            setIsLocationModalOpen(false);
                          }}
                        />

                        {/* End Input */}
                      </div>
                      {/* End Body */}
                    </div>

                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      {/* Header */}
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Service Details
                        </h2>
                      </div>
                      {/* End Header */}

                      {/* Body */}
                      <div id="hs-add-product-Event-spaces-card-body" className="p-5 space-y-4">
                        {/* Input */}
                        <div>
                          <label htmlFor="eventSpaces" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Event Spaces
                          </label>
                          <input
                            id="eventSpaces"
                            type="text"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="e.g., halls, lawns"
                            value={eventSpaces}
                            onChange={(e) => setEventSpaces(e.target.value)}
                          />
                        </div>
                        {/* End Input */}
                        <div>
                          <label htmlFor="totalAreaSqft" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Total Area
                          </label>
                          <input
                            id="totalAreaSqft"
                            type="number"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="in sq. ft."
                            value={totalAreaSqft}
                            onChange={(e) => setTotalAreaSqft(e.target.value)}
                          />
                        </div>

                      </div>
                      {/* End Body */}
                    </div>
                    {/* End Organization Card */}
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      {/* Header */}
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Booking Details
                        </h2>
                      </div>
                      {/* End Header */}

                      {/* Body */}
                      <div id="hs-add-product-Event-spaces-card-body" className="p-5 space-y-4">
                        {/* Input */}
                        <div>
                          <label htmlFor="advanceBookingNotice" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Advance Booking Notice
                          </label>
                          <input
                            id="advanceBookingNotice"
                            type="number"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="Enter in Days"
                            value={advanceBookingNotice}
                            onChange={(e) => setAdvanceBookingNotice(e.target.value)}
                          />
                        </div>
                        {/* End Input */}
                        <div>
                          <label htmlFor="advancePaymentRequired" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Advance Payment Required
                          </label>
                          <input
                            id="advancePaymentRequired"
                            type="number"
                            className="py-1.5 sm:py-2 px-3 block w-full border border-stone-200 rounded-lg sm:text-sm text-stone-800 placeholder:text-stone-500 focus:z-10 focus:border-green-600 focus:ring-green-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600"
                            placeholder="Enter in %"
                            value={advancePaymentRequired}
                            onChange={(e) => setAdvancePaymentRequired(e.target.value)}
                          />
                        </div>

                      </div>
                      {/* End Body */}
                    </div>
                    <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                      {/* Header */}
                      <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                        <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                          Events Supported
                        </h2>
                      </div>
                      {/* End Header */}

                      {/* Body */}
                      <div id="hs-add-product-Event-supported-card-body" className="p-5 space-y-4">
                        {/* Input */}
                        <div>
                          <label htmlFor="eventTypes" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Event Types
                          </label>
                          <div>
                            <div className="p-2">
                              <div className="flex flex-wrap gap-2">
                                {eventTypes.map(eventType => (
                                  <label
                                    key={eventType.id}
                                    htmlFor={`eventType-checkbox-${eventType.id}`}
                                    className={`
                                      py-2 px-2.5 relative flex justify-center items-center text-center text-[11px]
                                      bg-white border border-gray-200 ring-1 ring-transparent text-gray-800
                                      cursor-pointer rounded-xl hover:border-green-600 hover:ring-green-600
                                      dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700
                                      dark:hover:ring-neutral-600 dark:hover:ring-neutral-600
                                      peer-checked:bg-green-100 peer-checked:border-green-200 peer-checked:ring-green-200 peer-checked:text-green-800
                                      dark:peer-checked:bg-green-800/30 dark:peer-checked:border-green-800/50
                                      dark:peer-checked:ring-green-800/50 dark:peer-checked:text-green-500
                                      has-disabled:pointer-events-none has-disabled:text-gray-200 dark:has-disabled:text-neutral-700
                                    `}
                                  >
                                    <input
                                      type="checkbox"
                                      id={`eventType-checkbox-${eventType.id}`}
                                      className="hidden peer"
                                      name="eventTypes"
                                      checked={selectedEventTypes.has(eventType.id)}
                                      onChange={() => handleEventTypeToggle(eventType.id)}
                                    />
                                    <span className="flex shrink-0 justify-center items-center size-0 bg-green-500 text-transparent rounded-full transition-all duration-200 peer-checked:size-4 peer-checked:me-1.5 peer-checked:text-white">
                                      <svg className="shrink-0 size-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6 9 17l-5-5" />
                                      </svg>
                                    </span>
                                    <span className="block">
                                      {eventType.name}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Input */}
                        <div>
                          <label htmlFor="restrictions" className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                            Restrictions
                          </label>
                          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            <EditorToolbar editor={restrictionsEditorInstance.current} editorId="restrictions-editor" />
                            <div className="h-40 overflow-auto px-3 py-2 text-sm text-stone-800 dark:text-stone-200" ref={restrictionsEditorRef} contentEditable></div>
                          </div>

                        </div>

                      </div>
                      {/* End Body */}
                    </div>

                  </div>
                </div>
                {/* End Col */}

                {/* Form message display */}
                {formMessage.text && (
                  <div className={`fixed bottom-24 start-1/2 -translate-x-1/2 p-4 rounded-lg shadow-md text-white ${formMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {formMessage.text}
                  </div>
                )}

                {/* Save/Discard/Delete Floating Card */}
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
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="text-green-400 decoration-2 font-medium text-sm hover:underline focus:outline-hidden focus:underline dark:text-green-500"
                        >
                          Save changes
                        </button>

                        {/* Close Button */}
                        <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full text-stone-400 hover:bg-stone-700 focus:outline-hidden focus:bg-stone-700 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" aria-label="Close">
                          <span className="sr-only">Close</span>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                        {/* End Close Button */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Save/Discard/Detel Floating Card */}
              </div>
              {/* End Products Grid */}
            </div>
          </div>
        </main>

      </div>

      {/* Scripts */}
      <Script src="https://preline.co/assets/vendor/preline/dist/index.js?v=3.1.0" strategy="lazyOnload" />
      <Script src="https://preline.co/assets/vendor/clipboard/dist/clipboard.min.js" strategy="lazyOnload" />
      <Script src="https://preline.co/assets/js/hs-copy-clipboard-helper.js" strategy="lazyOnload" />

      <Script>
        {`
          (function () {
            window.addEventListener('load', () => {
              // Ensure HSSelect is initialized if you plan to use it for dynamic selects
              // For now, the select is fixed, so this might not be strictly necessary for your current setup
              // but it's good practice if you introduce dynamic options later.
              if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
                window.HSStaticMethods.autoInit();
              }

              const copyMarkupEl = document.getElementById('copy-markup');
              if (copyMarkupEl) {
                // Assuming HSCopyMarkup is part of Preline.js and initialized elsewhere
                // If not, this part might need to be adjusted or removed if not directly used.
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
        `}
      </Script>
    </>
  );
}