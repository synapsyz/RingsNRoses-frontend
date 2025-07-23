import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Import your modal component
import AccessDeniedModal from '@/components/AccessDeniedModal'; 

// --- Your standard page components ---
import CustomHead from '@/components/vendor/Head';
import Header from '@/components/vendor/Header';
import SecondaryNav from '@/components/vendor/SecondaryNav';
import DashboardStats from '@/components/vendor/DashboardStats';
import OrdersChart from '@/components/vendor/OrdersChart';
import SummaryCharts from '@/components/vendor/SummaryCharts';
import Footer from '@/components/vendor/Footer';
import VendorSetupForm from '@/components/VendorSetupForm';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showVendorForm, setShowVendorForm] = useState(false);



  // useEffect(() => {
  //   if (status === 'loading') {
  //     return;
  //   }

  //   if (!session) {
  //     signIn();
  //     return;
  //   }

  //   if (session && session.user_type !== 'vendor') {
  //     setShowAccessModal(true);
  //   }
  // }, [session, status]);


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
    setShowVendorForm(false);
  };

  
  // 2. Check if the vendor setup form needs to be displayed.
  useEffect(() => {
    // This effect runs whenever the `user` state changes.
    // We wait until the user object is loaded before checking its properties.
    if (user) {
      console.log(user.vendor_profile);
      // Based on your backend model, we check the vendor_profile.
      // If the profile itself or the subcategory on the profile is missing, we need to show the form.
      if (!user.vendor_profile || !user.vendor_profile.subcategory) {
        setShowVendorForm(true);
      }
    }
  }, [user]);




  

  // // If `showAccessModal` is true, render the access denied modal.
  // if (showAccessModal) {
  //   return (
  //     <AccessDeniedModal
  //       isOpen={false}
  //       userType={session?.user_type || 'unknown'}
  //       allowedUserType="vendor"
  //     />
  //   );
  // }
  
  // If all checks pass, render the vendor dashboard.

    return (
      <div>
      <VendorSetupForm 
        isOpen={showVendorForm}
        onSuccess={handleVendorFormSuccess}
      />
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
