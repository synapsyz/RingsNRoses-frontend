import CustomHead from '@/components/vendor/Head';
import Header from '@/components/vendor/Header';
import SecondaryNav from '@/components/vendor/SecondaryNav'; // 1. Import SecondaryNav
import DashboardStats from '@/components/vendor/DashboardStats'; // 1. Import the new component
import OrdersChart from '@/components/vendor/OrdersChart'; // 1. Import the new component
import SummaryCharts from '@/components/vendor/SummaryCharts'; // 1. Import the new component<Footer />
import Footer from '@/components/vendor/Footer'; // 1. Import the new component<Footer />




export default function DashboardPage() {
  return (
    <div>
      <CustomHead />
      <Header />
      <SecondaryNav />
      <DashboardStats />
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        {/* We can use a grid for layout */}
        <div className="grid lg:grid-cols-4 gap-5">
          {/* Orders Chart takes up 4 of 6 columns */}
          <OrdersChart />
          
          {/* Other components like 'Recent Activity' could go here, taking up 2 columns */}
        </div>
        <SummaryCharts />
      </div>
      <Footer />

      {/* The rest of your dashboard content goes here */}
      
    </div>
  );
}