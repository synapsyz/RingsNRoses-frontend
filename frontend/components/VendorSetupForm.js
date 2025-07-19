// components/VendorSetupForm.js

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

// Helper to determine if the app is running in a development environment with ngrok
const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;

// Function to get the correct API URL based on the environment
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};

// Create an Axios instance with the dynamic base URL and necessary headers
const api = axios.create({
  baseURL: `${getApiUrl()}/api/v1`,
  headers: {
    // Add ngrok-skip-browser-warning header if not in development
    ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
  },
});

const VendorSetupForm = ({ isOpen, onSuccess }) => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({ businessName: '', whatsappNumber: '' });
    const [isWhatsapp, setIsWhatsapp] = useState(true);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Effect to fetch categories when the form/modal is opened
    useEffect(() => {
        if (isOpen) {
            api.get('/categories/')
                .then(res => setCategories(res.data.results || []))
                .catch(err => console.error("Failed to fetch categories", err));
        }
    }, [isOpen]);

    // Effect to fetch subcategories when a category is selected
    useEffect(() => {
        if (selectedCategory) {
            // Reset subcategories before fetching new ones
            setSubcategories([]);
            setSelectedSubcategory('');
            api.get(`/categories/${selectedCategory}/subcategories/`)
                .then(res => setSubcategories(res.data.results || []))
                .catch(err => console.error("Failed to fetch subcategories", err));
        }
    }, [selectedCategory]);

    // Handler for form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // --- UPDATED TOKEN LOGIC ---
        // Start with the token from next-auth session as a fallback.
        let accessToken = session?.accessToken;

        // Try to get the session data from sessionStorage.
        const storedDataString = sessionStorage.getItem('session');
        if (storedDataString) {
            try {
                const storedData = JSON.parse(storedDataString);
                // If the token exists in sessionStorage, prioritize it.
                if (storedData && storedData.tokens && storedData.tokens.access) {
                    accessToken = storedData.tokens.access;
                }
            } catch (error) {
                console.error("Failed to parse session data from sessionStorage:", error);
            }
        }

        // If no access token is found, show an error and stop the submission.
        if (!accessToken) {
            alert('Authentication error. Your session may have expired. Please log in again.');
            setIsLoading(false);
            return;
        }
        // --- END OF UPDATED TOKEN LOGIC ---

        const dataToSend = {
            business_name: formData.businessName,
            whatsapp_number: formData.whatsappNumber,
            is_on_whatsapp: isWhatsapp,
            category: selectedCategory,
            subcategory: selectedSubcategory,
        };

        try {
            // Send a PUT request to update the vendor profile with the correct token.
            const response = await api.put('/vendor-profile/update/', dataToSend, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            alert('Profile setup complete!'); // Replace with a better notification component if available
            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (err) {
            console.error("Failed to save profile:", err);
            alert('Failed to save profile. Please try again.'); // Replace with a better notification component
        } finally {
            setIsLoading(false);
        }
    };

    // Do not render the component if it's not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Complete Your Business Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} required className="w-full p-3 border rounded-md dark:bg-neutral-700 dark:border-neutral-600"/>
                    <input type="tel" name="whatsappNumber" placeholder="WhatsApp Number" value={formData.whatsappNumber} onChange={handleChange} required className="w-full p-3 border rounded-md dark:bg-neutral-700 dark:border-neutral-600"/>
                    <div className="flex items-center">
                        <input type="checkbox" checked={isWhatsapp} onChange={(e) => setIsWhatsapp(e.target.checked)} id="isWhatsappCheck" className="mr-2 h-4 w-4 rounded border-gray-300 text-[#E91E63] focus:ring-[#C2185B]"/>
                        <label htmlFor="isWhatsappCheck" className="text-sm text-gray-700 dark:text-neutral-300">This number is on WhatsApp</label>
                    </div>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required className="w-full p-3 border rounded-md dark:bg-neutral-700 dark:border-neutral-600">
                        <option value="">Select a Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                    <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} required disabled={!selectedCategory || subcategories.length === 0} className="w-full p-3 border rounded-md disabled:bg-gray-200 dark:bg-neutral-700 dark:border-neutral-600 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-500">
                        <option value="">Select a Subcategory</option>
                        {subcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                    </select>
                    <button type="submit" disabled={isLoading} className="w-full bg-[#E91E63] text-white py-3 rounded-md font-semibold hover:bg-[#C2185B] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                        {isLoading ? 'Saving...' : 'Save and Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VendorSetupForm;
