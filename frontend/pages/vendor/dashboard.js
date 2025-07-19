// pages/vendor/dashboard.js or a similar file path

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Import your page components
import CustomHead from '@/components/vendor/Head';
import Header from '@/components/vendor/Header';
import SecondaryNav from '@/components/vendor/SecondaryNav';
import DashboardStats from '@/components/vendor/DashboardStats';
import OrdersChart from '@/components/vendor/OrdersChart';
import SummaryCharts from '@/components/vendor/SummaryCharts';
import Footer from '@/components/vendor/Footer';
import VendorSetupForm from '@/components/VendorSetupForm';
import AccessDeniedModal from '@/components/AccessDeniedModal'; // Assuming this component exists

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [showAccessModal, setShowAccessModal] = useState(false);
  // State to control the visibility of the vendor setup form, initialized to false.
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [user, setUser] = useState(null);

  // 1. Load user data from sessionStorage on initial component mount.
  useEffect(() => {
    const storedDataString = sessionStorage.getItem('session');
    if (storedDataString) {
      try {
        const storedData = JSON.parse(storedDataString);
        // Set the 'user' object from the session into our component's state.
        setUser(storedData.user);
      } catch (error) {
        console.error("Error parsing user session data:", error);
      }
    }
  }, []); // The empty dependency array `[]` ensures this effect runs only once.

  // 2. Check if the vendor setup form needs to be displayed.
  useEffect(() => {
    // This effect runs whenever the `user` state changes.
    // We wait until the user object is loaded before checking its properties.
    if (user) {
      // Based on your backend model, we check the vendor_profile.
      // If the profile itself or the subcategory on the profile is missing, we need to show the form.
      if (!user.vendor_profile || !user.vendor_profile.subcategory) {
        setShowVendorForm(true);
      }
    }
  }, [user]);

  // 3. Create a handler for when the vendor form is successfully submitted.
  const handleVendorFormSuccess = (updatedProfileData) => {
    // When the form submission is successful, the `onSuccess` callback provides the updated data.
    // We should update our local user state to reflect this change immediately without a page reload.
    const updatedUser = {
      ...user,
      vendor_profile: {
        ...user.vendor_profile,
        ...updatedProfileData,
      }
    };
    setUser(updatedUser);

    // It's also good practice to update the data in sessionStorage so it persists on page refresh.
    const storedDataString = sessionStorage.getItem('session');
    if (storedDataString) {
        try {
            const storedData = JSON.parse(storedDataString);
            storedData.user = updatedUser;
            sessionStorage.setItem('session', JSON.stringify(storedData));
        } catch(e) {
            console.error("Could not update session storage", e);
        }
    }
    
    // Finally, close the setup form modal.
    setShowVendorForm(false);
  };

  // Your existing logic for access control can be re-enabled here.
  // if (showAccessModal) { ... }

  // Render the vendor dashboard.
  return (
    <div>
      {/* The VendorSetupForm is now controlled by the `showVendorForm` state.
        We also pass the `handleVendorFormSuccess` function to the `onSuccess` prop.
        This allows the form to notify the dashboard page when setup is complete,
        so we can close the form and update the UI.
      */}
      <VendorSetupForm 
        isOpen={showVendorForm}
        onSuccess={handleVendorFormSuccess}
      />
      
      {/* The rest of your dashboard components */}
      <CustomHead />
      <Header />
      <SecondaryNav />
      <DashboardStats />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-4 gap-5">
          <OrdersChart />
        </div>
        <SummaryCharts />
      </div>
      <Footer />
    </div>
  );
}
