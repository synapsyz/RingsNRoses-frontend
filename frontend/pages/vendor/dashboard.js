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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [showAccessModal, setShowAccessModal] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      signIn();
      return;
    }

    if (session && session.user_type !== 'vendor') {
      setShowAccessModal(true);
    }
  }, [session, status]);

  // If `showAccessModal` is true, render the access denied modal.
  if (showAccessModal) {
    return (
      <AccessDeniedModal
        isOpen={showAccessModal}
        userType={session?.user_type || 'unknown'}
        allowedUserType="vendor"
      />
    );
  }
  
  // If all checks pass, render the vendor dashboard.
  if (session && session.user_type === 'vendor') {
    return (
      <div>
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

  // Fallback case
  return null;
}