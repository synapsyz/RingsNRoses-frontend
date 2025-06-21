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

export default function EditService() { // Renamed component
  const router = useRouter(); // Initialize useRouter
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
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  const subcategory = 1; // Assuming Banquet Halls is subcategory 1 for venues
  const venueId = session?.user?.vendor_profile?.service_id; // Get venue ID from session as specified

  // Fetch venue details on component mount or venueId change
  useEffect(() => {
    const fetchVenueDetails = async () => {
      if (!venueId || status !== 'authenticated') return;

      try {
        const response = await api.get(`/venues/${venueId}`, config);
        const venueData = response.data;

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
        setLocation(venueData.location || ''); // Assuming location is a simple ID or string

        // Set selected services and event types
        if (venueData.services_offered) {
          setSelectedServices(new Set(venueData.services_offered.map(service => service.id)));
        }
        if (venueData.events_supported) {
          setSelectedEventTypes(new Set(venueData.events_supported.map(eventType => eventType.id)));
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
            class: 'relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 sm:[&>p]:text-lg text-stone-800 dark:text-white'
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
  if (editorInstance.current && about) {
    editorInstance.current.commands.setContent(about);
  }
}, [about]);
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

    // Prepare data for the PUT request
    const formData = {
      name: venueName,
      vendor: session?.user?.vendor_profile.id, // Keep vendor ID
      subcategory: subcategory,
      services_offered: Array.from(selectedServices),
      location: selectedLocationData?.locationId || location,
      about: about,
      starting_price: parseFloat(perPlatePrice),
      contact_number: contactNumber,
      cancellation_policy: cancellationPolicy,
      advance_payment_required: parseFloat(advancePaymentRequired),
      events_supported: Array.from(selectedEventTypes),
      per_plate_price: parseFloat(perPlatePrice),
      guest_capacity: parseInt(guestCapacity),
      manager_name: managerName,
      total_area_sqft: parseFloat(totalAreaSqft),
      advance_booking_notice: parseInt(advanceBookingNotice),
      restrictions: restrictions,
      website_link: websiteLink, // Include website link
      instagram_link: instagramLink, // Include Instagram link
      facebook_link: facebookLink, // Include Facebook link
      terms_and_conditions: termsAndConditions, // Include terms and conditions
    };

    console.log("Submitting updated data:", formData);

    try {
      const accessToken = session?.accessToken;
      const config = {
        headers: {
          'Content-Type': 'application/json', // Changed to application/json for PUT
          'Authorization': `Bearer ${accessToken}`
        },
      };

      const response = await api.put(`/venues/${venueId}/`, formData, config); // Changed to PUT request
      console.log("Venue updated successfully:", response.data);
      setFormMessage({ type: 'success', text: 'Venue updated successfully!' });
    } catch (error) {
      console.error("Error updating venue:", error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        setFormMessage({ type: 'error', text: `Error: ${error.response.data.detail || 'Failed to update venue.'}` });
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
      <Head>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://preline.co/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Powerful e-commerce admin pages with product &amp; order lists, referrals and more." />

        {/* Twitter Card */}
        <meta name="twitter:site" content="@preline" />
        <meta name="twitter:creator" content="@preline" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Add Product | Preline Pro | Preline UI, crafted with Tailwind CSS" />
        <meta name="twitter:description" content="Powerful e-commerce admin pages with product &amp; order lists, referrals and more." />
        <meta name="twitter:image" content="https://preline.co/assets/img/og-image.png" />

        {/* Open Graph */}
        <meta property="og:url" content="https://preline.co/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Preline" />
        <meta property="og:title" content="Add Product | Preline Pro | Preline UI, crafted with Tailwind CSS" />
        <meta property="og:description" content="Powerful e-commerce admin pages with product &amp; order lists, referrals and more." />
        <meta property="og:image" content="https://preline.co/assets/img/og-image.png" />

        <title>Add Product | Preline Pro | Preline UI, crafted with Tailwind CSS</title>

        <link rel="shortcut icon" href="../favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="../assets/css/main.min.css?v=3.1.0" />

        <style>{`
          .ProseMirror:focus {
            outline: none;
          }
          .tiptap ul p,
          .tiptap ol p {
            display: inline;
          }
          .tiptap p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
        `}</style>
      </Head>

      <div className="bg-stone-50 dark:bg-neutral-900">
        {/* HEADER */}
        <header className="flex flex-col z-50">
          <nav className="bg-white border-b border-stone-200 dark:bg-neutral-800 dark:border-neutral-700">
            {/* Nav main container */}
            <div className="max-w-[85rem] flex justify-between lg:grid lg:grid-cols-3 basis-full items-center w-full mx-auto py-2.5 px-4 sm:px-6 lg:px-8">
              {/* Logo and toggle */}
              <div className="flex items-center">
                <div className="hidden sm:block">
                  {/* Logo */}
                  <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80" href="../../pro/ecommerce/index.html" aria-label="Preline">
                    <svg className="w-28 h-auto" width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4413 63.3563 11.1335 64.7474 11.1335C65.683 11.1335 66.5539 11.2843 67.3603 11.5859C68.1728 11.8814 68.8806 12.3277 69.4839 12.9247C70.0932 13.5218 70.5672 14.2727 70.9057 15.1776C71.2443 16.0762 71.4135 17.1288 71.4135 18.3352V19.4155H59.4384V16.978H67.7111C67.7111 16.4117 67.588 15.91 67.3418 15.473C67.0956 15.036 66.754 14.6944 66.317 14.4482C65.8861 14.1958 65.3844 14.0696 64.812 14.0696C64.2149 14.0696 63.6856 14.2081 63.2239 14.4851C62.7684 14.7559 62.4114 15.1222 62.1529 15.5838C61.8944 16.0393 61.762 16.5471 61.7559 17.1072V19.4247C61.7559 20.1264 61.8851 20.7327 62.1437 21.2436C62.4083 21.7545 62.7807 22.1484 63.2608 22.4254C63.741 22.7024 64.3103 22.8409 64.9689 22.8409C65.406 22.8409 65.8061 22.7794 66.1692 22.6562C66.5324 22.5331 66.8432 22.3485 67.1018 22.1023C67.3603 21.8561 67.5572 21.5545 67.6927 21.1974L71.3304 21.4375C71.1458 22.3116 70.7672 23.0748 70.1948 23.7273C69.6285 24.3736 68.896 24.8783 67.9974 25.2415C67.1048 25.5985 66.0738 25.777 64.9043 25.777ZM77.1335 6.59091V25.5H73.2003V6.59091H77.1335ZM79.5043 25.5V11.3182H83.4375V25.5H79.5043ZM81.4801 9.49006C80.8954 9.49006 80.3937 9.29616 79.9752 8.90838C79.5628 8.51444 79.3566 8.04356 79.3566 7.49574C79.3566 6.95407 79.5628 6.48935 79.9752 6.10156C80.3937 5.70762 80.8954 5.51065 81.4801 5.51065C82.0649 5.51065 82.5635 5.70762 82.9759 6.10156C83.3944 6.48935 83.6037 6.95407 83.6037 7.49574C83.6037 8.04356 83.3944 8.51444 82.9759 8.90838C82.5635 9.29616 82.0649 9.49006 81.4801 9.49006ZM89.7415 17.3011V25.5H85.8083V11.3182H89.5569V13.8203H89.723C90.037 12.9955 90.5632 12.343 91.3019 11.8629C92.0405 11.3767 92.9361 11.1335 93.9887 11.1335C94.9735 11.1335 95.8322 11.349 96.5647 11.7798C97.2971 12.2107 97.8665 12.8262 98.2728 13.6264C98.679 14.4205 98.8821 15.3684 98.8821 16.4702V25.5H94.9489V17.1719C94.9551 16.304 94.7335 15.6269 94.2841 15.1406C93.8348 14.6482 93.2162 14.402 92.4283 14.402C91.8989 14.402 91.4311 14.5159 91.0249 14.7436C90.6248 14.9714 90.3109 15.3037 90.0831 15.7408C89.8615 16.1716 89.7477 16.6918 89.7415 17.3011ZM107.665 25.777C106.206 25.777 104.951 25.4815 103.898 24.8906C102.852 24.2936 102.045 23.4503 101.479 22.3608C100.913 21.2652 100.63 19.9695 100.63 18.4737C100.63 17.0149 100.913 15.7346 101.479 14.6328C102.045 13.531 102.842 12.6723 103.87 12.0568C104.905 11.4413 106.117 11.1335 107.508 11.1335C108.444 11.1335 109.315 11.2843 110.121 11.5859C110.934 11.8814 111.641 12.3277 112.245 12.9247C112.854 13.5218 113.328 14.2727 113.667 15.1776C114.005 16.0762 114.174 17.1288 114.174 18.3352V19.4155H102.199V16.978H110.472C110.472 16.4117 110.349 15.91 110.103 15.473C109.856 15.036 109.515 14.6944 109.078 14.4482C108.647 14.1958 108.145 14.0696 107.573 14.0696C106.976 14.0696 106.446 14.2081 105.985 14.4851C105.529 14.7559 105.172 15.1222 104.914 15.5838C104.655 16.0393 104.523 16.5471 104.517 17.1072V19.4247C104.517 20.1264 104.646 20.7327 104.905 21.2436C105.169 21.7545 105.542 22.1484 106.022 22.4254C106.502 22.7024 107.071 22.8409 107.73 22.8409C108.167 22.8409 108.567 22.7794 108.93 22.6562C109.293 22.5331 109.604 22.3485 109.863 22.1023C110.121 21.8561 110.318 21.5545 110.454 21.1974L114.091 21.4375C113.907 22.3116 113.528 23.0748 112.956 23.7273C112.389 24.3736 111.657 24.8783 110.758 25.2415C109.866 25.5985 108.835 25.777 107.665 25.777Z" className="fill-green-600 dark:fill-white" fill="currentColor" />
                      <path d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12" className="stroke-green-600 dark:stroke-white" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12" className="stroke-green-600 dark:stroke-white" stroke="currentColor" strokeWidth="2" />
                      <circle cx="13" cy="16.5214" r="5" className="fill-green-600 dark:fill-white" fill="currentColor" />
                    </svg>
                  </a>
                </div>
                <div className="sm:hidden">
                  {/* Mobile Logo */}
                  <a
                    className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
                    href="../../pro/ecommerce/index.html"
                    aria-label="Preline"
                  >
                    <svg className="w-28 h-auto" width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4413 63.3563 11.1335 64.7474 11.1335C65.683 11.1335 66.5539 11.2843 67.3603 11.5859C68.1728 11.8814 68.8806 12.3277 69.4839 12.9247C70.0932 13.5218 70.5672 14.2727 70.9057 15.1776C71.2443 16.0762 71.4135 17.1288 71.4135 18.3352V19.4155H59.4384V16.978H67.7111C67.7111 16.4117 67.588 15.91 67.3418 15.473C67.0956 15.036 66.754 14.6944 66.317 14.4482C65.8861 14.1958 65.3844 14.0696 64.812 14.0696C64.2149 14.0696 63.6856 14.2081 63.2239 14.4851C62.7684 14.7559 62.4114 15.1222 62.1529 15.5838C61.8944 16.0393 61.762 16.5471 61.7559 17.1072V19.4247C61.7559 20.1264 61.8851 20.7327 62.1437 21.2436C62.4083 21.7545 62.7807 22.1484 63.2608 22.4254C63.741 22.7024 64.3103 22.8409 64.9689 22.8409C65.406 22.8409 65.8061 22.7794 66.1692 22.6562C66.5324 22.5331 66.8432 22.3485 67.1018 22.1023C67.3603 21.8561 67.5572 21.5545 67.6927 21.1974L71.3304 21.4375C71.1458 22.3116 70.7672 23.0748 70.1948 23.7273C69.6285 24.3736 68.896 24.8783 67.9974 25.2415C67.1048 25.5985 66.0738 25.777 64.9043 25.777ZM77.1335 6.59091V25.5H73.2003V6.59091H77.1335ZM79.5043 25.5V11.3182H83.4375V25.5H79.5043ZM81.4801 9.49006C80.8954 9.49006 80.3937 9.29616 79.9752 8.90838C79.5628 8.51444 79.3566 8.04356 79.3566 7.49574C79.3566 6.95407 79.5628 6.48935 79.9752 6.10156C80.3937 5.70762 80.8954 5.51065 81.4801 5.51065C82.0649 5.51065 82.5635 5.70762 82.9759 6.10156C83.3944 6.48935 83.6037 6.95407 83.6037 7.49574C83.6037 8.04356 83.3944 8.51444 82.9759 8.90838C82.5635 9.29616 82.0649 9.49006 81.4801 9.49006ZM89.7415 17.3011V25.5H85.8083V11.3182H89.5569V13.8203H89.723C90.037 12.9955 90.5632 12.343 91.3019 11.8629C92.0405 11.3767 92.9361 11.1335 93.9887 11.1335C94.9735 11.1335 95.8322 11.349 96.5647 11.7798C97.2971 12.2107 97.8665 12.8262 98.2728 13.6264C98.679 14.4205 98.8821 15.3684 98.8821 16.4702V25.5H94.9489V17.1719C94.9551 16.304 94.7335 15.6269 94.2841 15.1406C93.8348 14.6482 93.2162 14.402 92.4283 14.402C91.8989 14.402 91.4311 14.5159 91.0249 14.7436C90.6248 14.9714 90.3109 15.3037 90.0831 15.7408C89.8615 16.1716 89.7477 16.6918 89.7415 17.3011ZM107.665 25.777C106.206 25.777 104.951 25.4815 103.898 24.8906C102.852 24.2936 102.045 23.4503 101.479 22.3608C100.913 21.2652 100.63 19.9695 100.63 18.4737C100.63 17.0149 100.913 15.7346 101.479 14.6328C102.045 13.531 102.842 12.6723 103.87 12.0568C104.905 11.4413 106.117 11.1335 107.508 11.1335C108.444 11.1335 109.315 11.2843 110.121 11.5859C110.934 11.8814 111.641 12.3277 112.245 12.9247C112.854 13.5218 113.328 14.2727 113.667 15.1776C114.005 16.0762 114.174 17.1288 114.174 18.3352V19.4155H102.199V16.978H110.472C110.472 16.4117 110.349 15.91 110.103 15.473C109.856 15.036 109.515 14.6944 109.078 14.4482C108.647 14.1958 108.145 14.0696 107.573 14.0696C106.976 14.0696 106.446 14.2081 105.985 14.4851C105.529 14.7559 105.172 15.1222 104.914 15.5838C104.655 16.0393 104.523 16.5471 104.517 17.1072V19.4247C104.517 20.1264 104.646 20.7327 104.905 21.2436C105.169 21.7545 105.542 22.1484 106.022 22.4254C106.502 22.7024 107.071 22.8409 107.73 22.8409C108.167 22.8409 108.567 22.7794 108.93 22.6562C109.293 22.5331 109.604 22.3485 109.863 22.1023C110.121 21.8561 110.318 21.5545 110.454 21.1974L114.091 21.4375C113.907 22.3116 113.528 23.0748 112.956 23.7273C112.389 24.3736 111.657 24.8783 110.758 25.2415C109.866 25.5985 108.835 25.777 107.665 25.777Z" className="fill-green-600 dark:fill-white" fill="currentColor" />
                      <path d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12" className="stroke-green-600 dark:stroke-white" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12" className="stroke-green-600 dark:stroke-white" stroke="currentColor" strokeWidth="2" />
                      <circle cx="13" cy="16.5214" r="5" className="fill-green-600 dark:fill-white" fill="currentColor" />
                    </svg>
                  </a>
                </div>

                <div className="lg:hidden ms-3">
                  {/* Collapse Button */}
                  <button
                    type="button"
                    className="hs-collapse-toggle w-7 h-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-2xs hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    id="hs-pro-emh-collapse"
                    aria-expanded="false"
                    aria-controls="hs-pro-emh"
                    aria-label="Toggle navigation"
                    data-hs-collapse="#hs-pro-emh"
                  >
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="hidden lg:block lg:w-full lg:mx-0">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                    <svg
                      className="shrink-0 size-4 text-stone-400 dark:text-white/60"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="py-1.5 sm:py-2 px-3 ps-10 pe-16 block w-full bg-stone-100 border-transparent rounded-lg sm:text-sm placeholder:text-stone-500 focus:outline-hidden focus:border-stone-100 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                    placeholder="Search or type a command"
                    data-hs-overlay="#hs-pro-dnsm"
                  />
                  <div className="hidden absolute inset-y-0 end-0 flex items-center z-20 pe-1">
                    <button
                      type="button"
                      className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                      aria-label="Close"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-stone-400">
                    <svg
                      className="shrink-0 size-3 text-stone-400 dark:text-white/60"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    <span className="mx-1">
                      <svg
                        className="shrink-0 size-3 text-stone-400 dark:text-white/60"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                    <span className="text-xs">/</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-x-2">
                <div className="flex items-center">
                  <div className="lg:hidden">
                    {/* Search Button Icon */}
                    <button
                      type="button"
                      className="inline-flex shrink-0 justify-center items-center gap-x-2 size-9.5 rounded-full text-stone-500 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dnsm"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </button>
                  </div>

                  {/* Notifications Button Icon */}
                  <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                    <button
                      id="hs-pro-dnnd"
                      type="button"
                      className="hs-tooltip-toggle relative size-9.5 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-stone-500 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      aria-label="Dropdown"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      <span className="flex absolute top-0 end-0 z-10 -mt-1.5 -me-1.5">
                        <span className="animate-ping absolute inline-flex size-full rounded-full bg-red-400 opacity-75 dark:bg-red-600"></span>
                        <span className="relative min-w-4.5 min-h-4.5 inline-flex justify-center items-center text-[10px] bg-red-500 text-white rounded-full px-1">
                          2
                        </span>
                      </span>
                    </button>

                    {/* Notifications Dropdown */}
                    {/* ... Notifications dropdown content omitted for brevity */}
                  </div>
                </div>

                <div className="hidden sm:block border-e border-stone-200 w-px h-5 dark:border-neutral-700"></div>

                <div className="h-9.5">
                  {/* Account */}
                  <div className="hs-dropdown [--placement:top-right] [--strategy:absolute] [--auto-close:inside] relative inline-flex">
                    <button
                      id="hs-pro-dnad"
                      type="button"
                      className="inline-flex shrink-0 items-center gap-x-1.5 text-start text-stone-800 rounded-full hover:text-stone-600 focus:outline-hidden focus:text-stone-600 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      aria-label="Dropdown"
                    >
                      <img
                        className="shrink-0 size-8 lg:size-8 rounded-full"
                        src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                        alt="Avatar"
                      />
                      <span className="grow hidden lg:block">
                        <span className="text-sm font-medium">James Collison</span>
                      </span>
                    </button>

                    {/* Account Dropdown */}
                    <div
                      className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-xl dark:bg-neutral-900"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="hs-pro-dnad"
                    >
                      <div className="p-1">
                        <a
                          className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
                        >
                          <svg
                            className="shrink-0 mt-0.5 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                          Billing
                        </a>
                        <a
                          className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
                        >
                          <svg
                            className="shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Settings
                        </a>
                        <a
                          className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
                        >
                          <svg
                            className="shrink-0 mt-0.5 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          My account
                        </a>
                      </div>
                      <div className="px-5 py-3.5 border-y border-stone-200 dark:border-neutral-800">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <label htmlFor="@@darkmodeID" className="flex-1 cursor-pointer text-sm text-stone-800 dark:text-neutral-300">
                            Dark mode
                          </label>
                          <label htmlFor="@@darkmodeID" className="relative inline-block w-11 h-6 cursor-pointer">
                            <input data-hs-theme-switch type="checkbox" id="@@darkmodeID" className="peer sr-only" />
                            <span className="absolute inset-0 bg-stone-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-green-600 dark:bg-neutral-700 dark:peer-checked:bg-green-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
                          </label>
                        </div>
                      </div>
                      <div className="p-1">
                        <a
                          className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
                        >
                          Customization
                          <div className="ms-auto">
                            <span className="ms-auto inline-flex items-center gap-1.5 py-px px-1.5 rounded-sm text-[10px] leading-4 font-medium bg-stone-100 text-stone-800 dark:bg-neutral-700 dark:text-neutral-300">
                              New
                            </span>
                          </div>
                        </a>
                        <a
                          className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
                        >
                          Manage team
                        </a>
                        <a
                          className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
                        >
                          Sign out
                        </a>
                      </div>
                      <div className="p-1 border-t border-stone-200 dark:border-neutral-800">
                        <button
                          type="button"
                          className="flex mt-0.5 gap-x-3 py-2 px-3 w-full rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          data-hs-overlay="#hs-pro-dasadam"
                        >
                          <svg
                            className="shrink-0 size-4 mt-0.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                          </svg>
                          Add team account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </nav>

          <nav className="relative bg-white border-b border-stone-200 dark:bg-neutral-800 dark:border-neutral-700">
            <div className="max-w-[85rem] flex flex-wrap justify-between gap-2 basis-full items-center w-full mx-auto lg:py-2.5 px-4 sm:px-6 lg:px-8">
              {/* Nav Links */}
              <div className="basis-full grow lg:basis-auto lg:grow-0">
                {/* Collapse */}
                <div id="hs-pro-emh" className="hs-collapse hidden overflow-hidden transition-all duration-300 lg:block" aria-labelledby="hs-pro-emh-collapse">
                  <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    <div className="lg:flex lg:items-center lg:gap-x-1 py-2 lg:py-0 space-y-1 lg:space-y-0">
                      {/* Link */}
                      <Link href="../../pro/ecommerce/index.html" className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                          <path d="M3 6h18" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        Overview
                      </Link>
                      {/* End Link */}

                      {/* Dropdown Link */}
                      <div className="hs-dropdown [--strategy:static] lg:[--strategy:fixed] [--adaptive:none] lg:[--adaptive:adaptive] lg:[--trigger:hover] lg:inline-block">
                        {/* Link */}
                        <button id="hs-pro-enlpd" type="button" className="hs-dropdown-toggle flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 bg-stone-100 focus:bg-stone-200 dark:bg-neutral-700 dark:focus:bg-neutral-600" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                            <path d="M12 3v6" />
                          </svg>
                          Products
                          <svg className="hs-dropdown-open:-rotate-180 lg:hs-dropdown-open:rotate-0 duration-300 ms-auto lg:ms-0 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        {/* End Link */}

                        {/* Dropdown Menu */}
                        <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] lg:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full lg:w-52 hidden z-10 top-full bg-white lg:rounded-lg lg:shadow-xl shadow-stone-200 ps-7 lg:ps-0 before:absolute before:-top-4 before:start-0 before:w-full before:h-5 lg:after:hidden after:absolute after:top-1 after:start-4.5 after:w-0.5 after:h-[calc(100%-4px)] after:bg-stone-100 dark:bg-neutral-800 dark:shadow-neutral-900 dark:after:bg-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-enlpd">
                          <div className="p-1 space-y-0.5">
                            {/* Link */}
                            <Link href="../../pro/ecommerce/products.html" className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                              Overview
                            </Link>
                            {/* End Link */}

                            {/* Link */}
                            <Link href="../../pro/ecommerce/product-details.html" className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                              Product Details
                            </Link>
                            {/* End Link */}

                            {/* Link */}
                            <Link href="../../pro/ecommerce/add-product.html" className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 bg-stone-100 dark:bg-neutral-700">
                              Add Product
                            </Link>
                            {/* End Link */}
                          </div>
                        </div>
                        {/* End Dropdown Menu */}
                      </div>
                      {/* End Dropdown Link */}

                      {/* Dropdown Link */}
                      <div className="hs-dropdown [--strategy:static] lg:[--strategy:fixed] [--adaptive:none] lg:[--adaptive:adaptive] lg:[--trigger:hover] lg:inline-block">
                        {/* Link */}
                        <button id="hs-pro-enlod" type="button" className="hs-dropdown-toggle flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.5 22H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                            <polyline points="14 2 14 8 20 8" />
                            <path d="M2.97 13.12c-.6.36-.97 1.02-.97 1.74v3.28c0 .72.37 1.38.97 1.74l3 1.83c.63.39 1.43.39 2.06 0l3-1.83c.6-.36.97-1.02.97-1.74v-3.28c0-.72-.37-1.38-.97-1.74l-3-1.83a1.97 1.97 0 0 0-2.06 0l-3 1.83Z" />
                            <path d="m7 17-4.74-2.85" />
                            <path d="m7 17 4.74-2.85" />
                            <path d="M7 17v5" />
                          </svg>
                          Orders <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">+1</span>
                          <svg className="hs-dropdown-open:-rotate-180 lg:hs-dropdown-open:rotate-0 duration-300 ms-auto lg:ms-0 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        {/* End Link */}

                        {/* Dropdown Menu */}
                        <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] lg:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full lg:w-52 hidden z-10 top-full bg-white lg:rounded-lg lg:shadow-xl shadow-stone-200 ps-7 lg:ps-0 before:absolute before:-top-4 before:start-0 before:w-full before:h-5 lg:after:hidden after:absolute after:top-1 after:start-4.5 after:w-0.5 after:h-[calc(100%-4px)] after:bg-stone-100 dark:bg-neutral-800 dark:shadow-neutral-900 dark:after:bg-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-enlod">
                          <div className="p-1 space-y-0.5">
                            {/* Link */}
                            <Link href="../../pro/ecommerce/orders.html" className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                              Overview
                            </Link>
                            {/* End Link */}

                            {/* Link */}
                            <Link href="../../pro/ecommerce/purchase-orders.html" className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                              Purchase Orders <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">New</span>
                            </Link>
                            {/* End Link */}

                            {/* Link */}
                            <Link href="../../pro/ecommerce/order-details.html" className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                              Order Details
                            </Link>
                            {/* End Link */}
                          </div>
                        </div>
                        {/* End Dropdown Menu */}
                      </div>
                      {/* End Dropdown Link */}

                      {/* Link */}
                      <Link href="../../pro/ecommerce/referrals.html" className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m16 3 4 4-4 4" />
                          <path d="M20 7H4" />
                          <path d="m8 21-4-4 4-4" />
                          <path d="M4 17h16" />
                        </svg>
                        Referrals
                      </Link>
                      {/* End Link */}

                      {/* Link */}
                      <Link href="../../pro/ecommerce/reviews.html" className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Reviews
                      </Link>
                      {/* End Link */}

                      {/* Link */}
                      <Link href="../../pro/ecommerce/discounts.html" className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                          <path d="m15 9-6 6" />
                          <path d="M9 9h.01" />
                          <path d="M15 15h.01" />
                        </svg>
                        Discounts
                      </Link>
                      {/* End Link */}

                      {/* Dropdown Link */}
                      <div className="hs-dropdown [--strategy:static] lg:[--strategy:fixed] [--adaptive:none] lg:[--adaptive:adaptive] lg:[--trigger:hover] lg:inline-block">
                        {/* Link */}
                        <button id="hs-pro-enlst" type="button" className="hs-dropdown-toggle flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                          <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                            <path d="M2 7h20" />
                            <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                          </svg>
                          Store
                          <svg className="hs-dropdown-open:-rotate-180 lg:hs-dropdown-open:rotate-0 duration-300 ms-auto lg:ms-0 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        {/* End Link */}

                        {/* Dropdown Menu */}
                        <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] lg:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full lg:w-52 hidden z-10 top-full bg-white lg:rounded-lg lg:shadow-xl shadow-stone-200 ps-7 lg:ps-0 before:absolute before:-top-4 before:start-0 before:w-full before:h-5 lg:after:hidden after:absolute after:top-1 after:start-4.5 after:w-0.5 after:h-[calc(100%-4px)] after:bg-stone-100 dark:bg-neutral-800 dark:shadow-neutral-900 dark:after:bg-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-enlst">
                          <div className="p-1 space-y-0.5">
                            {/* Link */}
                            <Link href="../../pro/ecommerce/store.html" className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                              Overview
                            </Link>
                            {/* End Link */}

                            {/* Link */}
                            <Link href="../../pro/ecommerce/payouts.html" className="group py-2 px-3 flex items-center gap-x-3 text-sm text-stone-800 hover:bg-stone-100 focus:outline-hidden focus:bg-stone-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                              Payouts
                            </Link>
                            {/* End Link */}
                          </div>
                        </div>
                        {/* End Dropdown Menu */}
                      </div>
                      {/* End Dropdown Link */}

                      {/* Link */}
                      <Link href="../../pro/ecommerce/search.html" className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 6H3" />
                          <path d="M10 12H3" />
                          <path d="M10 18H3" />
                          <circle cx="17" cy="15" r="3" />
                          <path d="m21 19-1.9-1.9" />
                        </svg>
                        Search <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">New</span>
                      </Link>
                      {/* End Link */}

                      {/* Link */}
                      <Link href="../../pro/ecommerce/empty-states.html" className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <svg className="lg:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        </svg>
                        Empty States
                      </Link>
                      {/* End Link */}

                    </div>
                  </div>
                </div>
                {/* End Collapse */}
              </div>
              {/* End Nav Links */}

              <div className="hidden lg:block">
                {/* Project Dropdown */}
                <div className="hs-dropdown [--auto-close:inside] [--placement:top-right] relative flex">
                  {/* Project Button */}
                  <button id="hs-pro-dnwpd" type="button" className="inline-flex items-center text-start text-sm font-medium text-stone-800 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-stone-500 dark:text-white dark:focus:text-neutral-200" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <svg className="shrink-0 size-5 me-1.5" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32.8875 15.3054C32.9242 16.2093 32.8209 17.1099 32.5811 17.9792C32.3447 18.8486 31.9716 19.6695 31.4787 20.4141C30.989 21.1593 30.3861 21.8167 29.6935 22.3607L29.6769 22.3745L23.019 27.563L19.7451 30.1433L17.7501 31.7089C17.6335 31.8024 17.5036 31.8716 17.3671 31.9201C17.2305 31.9686 17.084 31.9929 16.9374 31.9929C16.7942 31.9929 16.6477 31.9686 16.5111 31.9201C16.3745 31.8716 16.2447 31.8024 16.1281 31.7089L14.1331 30.1433L10.8591 27.563L4.24125 22.4057L4.20129 22.378L4.18796 22.3641C3.49187 21.8203 2.88904 21.1623 2.39611 20.4176C1.90319 19.6729 1.53016 18.8486 1.29036 17.9792C1.05056 17.1099 0.947313 16.2059 0.98395 15.3019C1.02392 14.3979 1.20044 13.5078 1.51018 12.6626L1.55348 12.5414L5.90654 0.747936C5.92875 0.69021 5.95539 0.634792 5.98648 0.581684C6.01534 0.528576 6.04976 0.478931 6.08972 0.43275C6.12747 0.38426 6.16855 0.339234 6.21295 0.297671C6.25736 0.258417 6.30399 0.221472 6.35284 0.186836C6.45609 0.121028 6.56267 0.0725381 6.67924 0.0448295C6.79248 0.0136573 6.91238 -0.000196993 7.02895 0.00673016C7.14885 0.0136573 7.26542 0.0379024 7.37533 0.0829289C7.48524 0.124492 7.59181 0.186836 7.68507 0.263035C7.72948 0.302289 7.77278 0.343852 7.81496 0.387724C7.85493 0.433905 7.89046 0.483549 7.92154 0.536658C7.95485 0.587457 7.98371 0.641719 8.00814 0.699446C8.03256 0.754863 8.05254 0.812589 8.06809 0.872625L11.0023 10.2139H22.8792L25.8134 0.872625C25.8289 0.812589 25.85 0.754863 25.8767 0.699446C25.9011 0.644029 25.93 0.589766 25.9633 0.536658C25.9944 0.485858 26.0299 0.437368 26.0699 0.391187C26.1098 0.345006 26.1531 0.302289 26.1997 0.263035C26.293 0.186836 26.3962 0.127955 26.5062 0.0829289C26.6194 0.0413659 26.736 0.0171209 26.8525 0.0101937C26.9724 0.00326659 27.089 0.0136573 27.2056 0.0448295C27.3188 0.0760017 27.4287 0.124492 27.5286 0.1903C27.5797 0.222627 27.6275 0.259571 27.6719 0.301134C27.7163 0.340388 27.7573 0.38426 27.7951 0.43275C27.8328 0.48124 27.8673 0.532039 27.8983 0.585148C27.9272 0.638256 27.9527 0.693673 27.9749 0.751399L32.3213 12.5483L32.3646 12.6696C32.6744 13.5112 32.8509 14.4014 32.8875 15.3054Z" fill="#E24329" />
                      <path d="M32.8909 15.309C32.9275 16.2095 32.8243 17.1135 32.5845 17.9829C32.3447 18.8523 31.9717 19.6766 31.4787 20.4213C30.9858 21.1659 30.383 21.824 29.6902 22.3678L29.6736 22.3816L23.0157 27.5701C23.0157 27.5701 20.1881 25.3499 16.9374 22.7903L26.4795 15.2813C26.9092 14.9453 27.3588 14.6371 27.8218 14.3531C28.2847 14.0656 28.7643 13.8093 29.2539 13.5807C29.7468 13.3521 30.2498 13.1477 30.7593 12.978C31.2722 12.8049 31.7918 12.6628 32.3214 12.5485L32.3647 12.6698C32.6744 13.5149 32.8509 14.405 32.8909 15.309Z" fill="#FC6D26" />
                      <path d="M16.9374 22.7903C20.1881 25.343 23.0191 27.5701 23.0191 27.5701L19.7451 30.1504L17.7501 31.716C17.6335 31.8095 17.5036 31.8788 17.3671 31.9273C17.2305 31.9758 17.084 32 16.9374 32C16.7942 32 16.6477 31.9758 16.5111 31.9273C16.3746 31.8788 16.2447 31.8095 16.1281 31.716L14.1331 30.1504L10.8591 27.5701C10.8591 27.5701 13.6868 25.343 16.9374 22.7903Z" fill="#FCA326" />
                      <path d="M16.9374 22.7834C13.6834 25.343 10.8591 27.5632 10.8591 27.5632L4.24125 22.4059L4.20129 22.3782L4.18796 22.3643C3.49187 21.8205 2.88904 21.1625 2.39611 20.4178C1.90319 19.6731 1.53016 18.8488 1.29036 17.9794C1.05056 17.1101 0.947313 16.2061 0.98395 15.3021C1.02392 14.3981 1.20044 13.508 1.51018 12.6628L1.55348 12.5416C2.08304 12.6559 2.60261 12.7979 3.11552 12.9711C3.6251 13.1443 4.12801 13.3452 4.62094 13.5772C5.11053 13.8058 5.59014 14.0656 6.05309 14.3496C6.51604 14.6336 6.96233 14.9453 7.39531 15.2813L16.9374 22.7834Z" fill="#FC6D26" />
                    </svg>
                    Gitlab_Store
                    <svg className="shrink-0 size-4 ms-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {/* End Project Button */}

                  {/* Dropdown */}
                  <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-xl dark:bg-neutral-900" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-dnwpd">
                    <div className="p-1 space-y-0.5">
                      {/* Item */}
                      <a className="py-2 px-3 block w-full text-start bg-stone-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-100 dark:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                        <div className="flex items-center gap-x-2">
                          <svg className="shrink-0 size-5 text-stone-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                          </svg>
                          <svg className="shrink-0 size-7" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.8875 15.3054C32.9242 16.2093 32.8209 17.1099 32.5811 17.9792C32.3447 18.8486 31.9716 19.6695 31.4787 20.4141C30.989 21.1593 30.3861 21.8167 29.6935 22.3607L29.6769 22.3745L23.019 27.563L19.7451 30.1433L17.7501 31.7089C17.6335 31.8024 17.5036 31.8716 17.3671 31.9201C17.2305 31.9686 17.084 31.9929 16.9374 31.9929C16.7942 31.9929 16.6477 31.9686 16.5111 31.9201C16.3745 31.8716 16.2447 31.8024 16.1281 31.7089L14.1331 30.1433L10.8591 27.563L4.24125 22.4057L4.20129 22.378L4.18796 22.3641C3.49187 21.8203 2.88904 21.1623 2.39611 20.4176C1.90319 19.6729 1.53016 18.8486 1.29036 17.9792C1.05056 17.1099 0.947313 16.2059 0.98395 15.3019C1.02392 14.3979 1.20044 13.5078 1.51018 12.6626L1.55348 12.5414L5.90654 0.747936C5.92875 0.69021 5.95539 0.634792 5.98648 0.581684C6.01534 0.528576 6.04976 0.478931 6.08972 0.43275C6.12747 0.38426 6.16855 0.339234 6.21295 0.297671C6.25736 0.258417 6.30399 0.221472 6.35284 0.186836C6.45609 0.121028 6.56267 0.0725381 6.67924 0.0448295C6.79248 0.0136573 6.91238 -0.000196993 7.02895 0.00673016C7.14885 0.0136573 7.26542 0.0379024 7.37533 0.0829289C7.48524 0.124492 7.59181 0.186836 7.68507 0.263035C7.72948 0.302289 7.77278 0.343852 7.81496 0.387724C7.85493 0.433905 7.89046 0.483549 7.92154 0.536658C7.95485 0.587457 7.98371 0.641719 8.00814 0.699446C8.03256 0.754863 8.05254 0.812589 8.06809 0.872625L11.0023 10.2139H22.8792L25.8134 0.872625C25.8289 0.812589 25.85 0.754863 25.8767 0.699446C25.9011 0.644029 25.93 0.589766 25.9633 0.536658C25.9944 0.485858 26.0299 0.437368 26.0699 0.391187C26.1098 0.345006 26.1531 0.302289 26.1997 0.263035C26.293 0.186836 26.3962 0.127955 26.5062 0.0829289C26.6194 0.0413659 26.736 0.0171209 26.8525 0.0101937C26.9724 0.00326659 27.089 0.0136573 27.2056 0.0448295C27.3188 0.0760017 27.4287 0.124492 27.5286 0.1903C27.5797 0.222627 27.6275 0.259571 27.6719 0.301134C27.7163 0.340388 27.7573 0.38426 27.7951 0.43275C27.8328 0.48124 27.8673 0.532039 27.8983 0.585148C27.9272 0.638256 27.9527 0.693673 27.9749 0.751399L32.3213 12.5483L32.3646 12.6696C32.6744 13.5112 32.8509 14.4014 32.8875 15.3054Z" fill="#E24329" />
                            <path d="M32.8909 15.309C32.9275 16.2095 32.8243 17.1135 32.5845 17.9829C32.3447 18.8523 31.9717 19.6766 31.4787 20.4213C30.9858 21.1659 30.383 21.824 29.6902 22.3678L29.6736 22.3816L23.0157 27.5701C23.0157 27.5701 20.1881 25.3499 16.9374 22.7903L26.4795 15.2813C26.9092 14.9453 27.3588 14.6371 27.8218 14.3531C28.2847 14.0656 28.7643 13.8093 29.2539 13.5807C29.7468 13.3521 30.2498 13.1477 30.7593 12.978C31.2722 12.8049 31.7918 12.6628 32.3214 12.5485L32.3647 12.6698C32.6744 13.5149 32.8509 14.405 32.8909 15.309Z" fill="#FC6D26" />
                            <path d="M16.9374 22.7903C20.1881 25.343 23.0191 27.5701 23.0191 27.5701L19.7451 30.1504L17.7501 31.716C17.6335 31.8095 17.5036 31.8788 17.3671 31.9273C17.2305 31.9758 17.084 32 16.9374 32C16.7942 32 16.6477 31.9758 16.5111 31.9273C16.3746 31.8788 16.2447 31.8095 16.1281 31.716L14.1331 30.1504L10.8591 27.5701C10.8591 27.5701 13.6868 25.343 16.9374 22.7903Z" fill="#FCA326" />
                            <path d="M16.9374 22.7834C13.6834 25.343 10.8591 27.5632 10.8591 27.5632L4.24125 22.4059L4.20129 22.3782L4.18796 22.3643C3.49187 21.8205 2.88904 21.1625 2.39611 20.4178C1.90319 19.6731 1.53016 18.8488 1.29036 17.9794C1.05056 17.1101 0.947313 16.2061 0.98395 15.3021C1.02392 14.3981 1.20044 13.508 1.51018 12.6628L1.55348 12.5416C2.08304 12.6559 2.60261 12.7979 3.11552 12.9711C3.6251 13.1443 4.12801 13.3452 4.62094 13.5772C5.11053 13.8058 5.59014 14.0656 6.05309 14.3496C6.51604 14.6336 6.96233 14.9453 7.39531 15.2813L16.9374 22.7834Z" fill="#FC6D26" />
                          </svg>
                          <div className="grow">
                            <p className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                              Gitlab_Store
                            </p>
                            <p className="text-xs text-stone-500 dark:text-neutral-500">
                              gitlab.com
                            </p>
                          </div>
                          <div className="ms-auto self-center">
                            <svg className="shrink-0 size-4 text-stone-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      {/* End Item */}

                      {/* Other dropdown items would follow the same pattern */}
                      {/* ... */}
                    </div>
                  </div>
                  {/* End Dropdown */}
                </div>
                {/* End Project Dropdown */}
              </div>
            </div>
          </nav>
        </header>

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
                      <div>
                        <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                          Thumbnail
                        </label>

                        {/* Logo Upload Group */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                          <span className="flex justify-center items-center size-20 border-2 border-dotted border-stone-300 text-stone-400 rounded-full dark:border-neutral-700 dark:text-neutral-600">
                            <svg className="shrink-0 size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                              <circle cx="9" cy="9" r="2" />
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                          </span>

                          <div className="grow">
                            <div className="flex items-center gap-x-2">
                              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-green-500">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                  <polyline points="17 8 12 3 7 8" />
                                  <line x1="12" x2="12" y1="3" y2="15" />
                                </svg>
                                Upload photo
                              </button>
                              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-red-500 shadow-2xs hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" disabled>
                                Delete
                              </button>
                            </div>
                            <p className="mt-2 text-xs text-stone-500 dark:text-neutral-500">
                              Your image should be square, at least 100x100px, and JPG or PNG.
                            </p>
                          </div>
                        </div>
                        {/* End Logo Upload Group */}
                      </div>

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
        <div className="h-40 overflow-auto" ref={editorRef}></div>
      </div>
                        {/* End Tiptap */}
                      </div>
                      {/* End Textarea Input */}
                    </div>
                    {/* End Body */}
                  </div>
                  {/* End Products Card */}

                  {/* Media Card */}
                  <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Header */}
                    <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                      <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                        Media
                      </h2>

                      <div className="flex justify-end items-center gap-x-2">
                        <button type="button" className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-2xs hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                            <path d="M12 12v9" />
                            <path d="m16 16-4-4-4 4" />
                          </svg>
                          Upload from URL
                        </button>
                      </div>
                    </div>
                    {/* End Header */}

                    {/* Body */}
                    <div className="p-5 space-y-4">
                      {/* Drag 'n Drop */}
                      <div className="space-y-2">
                        <label className="hidden mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
                          Upload images
                        </label>
                        <div className="p-12 h-56 flex justify-center bg-white border border-dashed border-stone-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">
                          <div className="text-center">
                            <svg className="w-16 text-stone-400 mx-auto dark:text-neutral-400" width="70" height="46" viewBox="0 0 70 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.05172 9.36853L17.2131 7.5083V41.3608L12.3018 42.3947C9.01306 43.0871 5.79705 40.9434 5.17081 37.6414L1.14319 16.4049C0.515988 13.0978 2.73148 9.92191 6.05172 9.36853Z" fill="currentColor" stroke="currentColor" strokeWidth="2" className="fill-white stroke-stone-400 dark:fill-neutral-800 dark:stroke-neutral-500" />
                              <path d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z" fill="currentColor" stroke="currentColor" strokeWidth="2" className="fill-white stroke-stone-400 dark:fill-neutral-800 dark:stroke-neutral-500" />
                              <rect x="17.0656" y="1.62305" width="35.8689" height="42.7541" rx="5" fill="currentColor" stroke="currentColor" strokeWidth="2" className="fill-white stroke-stone-400 dark:fill-neutral-800 dark:stroke-neutral-500" />
                              <path d="M47.9344 44.3772H22.0655C19.3041 44.3772 17.0656 42.1386 17.0656 39.3772L17.0656 35.9161L29.4724 22.7682L38.9825 33.7121C39.7832 34.6335 41.2154 34.629 42.0102 33.7025L47.2456 27.5996L52.9344 33.7209V39.3772C52.9344 42.1386 50.6958 44.3772 47.9344 44.3772Z" stroke="currentColor" strokeWidth="2" className="stroke-stone-400 dark:stroke-neutral-500" />
                              <circle cx="39.5902" cy="14.9672" r="4.16393" stroke="currentColor" strokeWidth="2" className="stroke-stone-400 dark:stroke-neutral-500" />
                            </svg>

                            <div className="mt-4 flex flex-wrap justify-center text-sm/6 text-stone-600">
                              <span className="pe-1 font-medium text-stone-800 dark:text-neutral-200">
                                Drop your files here or
                              </span>
                              <label htmlFor="hs-pro-epdupb" className="relative cursor-pointer bg-white font-semibold text-green-600 hover:text-green-700 rounded-lg decoration-2 hover:underline focus-within:outline-hidden focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-green-500 dark:hover:text-green-600">
                                <span>browse</span>
                                <input id="hs-pro-epdupb" type="file" className="sr-only" name="hs-pro-deuuf" />
                              </label>
                            </div>

                            <p className="mt-1 text-xs text-stone-400 dark:text-neutral-400">
                              CSV, XLS, DOCX
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* End Drag 'n Drop */}

                      <p className="text-sm text-stone-500 dark:text-neutral-500">
                        Add up to 10 images to your product.
                      </p>
                    </div>
                    {/* End Body */}
                  </div>
                  {/* End Media Card */}

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
  <div className="h-40 overflow-auto" ref={termsEditorRef}></div>
</div>
                      {/* End Input */}
                    </div>
                    {/* End Body */}
                  </div>

                  {/* End Variants Card */}
                  <FAQEditor />
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
        <div className="h-40 overflow-auto" ref={cancellationEditorRef}></div>
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
        <div className="h-40 overflow-auto" ref={restrictionsEditorRef}></div>
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
