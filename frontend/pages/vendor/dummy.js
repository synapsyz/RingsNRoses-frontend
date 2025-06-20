import Header from "@/components/Header";
import Stats from "@/components/Stats"; // Add this line
import OrdersChart from "@/components/OrdersChart";
import TopProducts from "@/components/TopProducts";
import ChartsGrid from "@/components/ChartsGrid";
import Footer from "@/components/Footer";
import Chart from "@/components/Chart";


export default function DashboardPage() {


 const chartOptions = {
    chart: { id: 'basic-bar' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  };

  const chartSeries = [
    {
      name: 'Orders',
      data: [30, 40, 45, 50, 49],
    },
    
  ];

  return (
    // Add the `relative` and `min-h-full` classes to the root element
    <div className="relative min-h-full bg-stone-50 dark:bg-neutral-900">
      <Header />
      <main id="content" className="pb-14 sm:pb-16">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Breadcrumb for mobile */}
          <ol className="lg:hidden pt-5 flex items-center whitespace-nowrap">
            <li className="flex items-center text-sm text-stone-600 dark:text-neutral-500">
              E-commerce
              <svg className="shrink-0 overflow-visible size-4 ms-1.5 text-stone-400 dark:text-neutral-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
              </svg>
            </li>
            <li className="ps-1.5 flex items-center font-semibold text-stone-800 dark:text-neutral-200 text-sm">
              Overview
            </li>
          </ol>

          <div className="py-2 sm:pb-0 sm:pt-5 space-y-5">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
                  Good morning, James.
                </h1>
                <p className="text-sm text-stone-500 dark:text-neutral-400">
                  Here's what's happening with your store today.
                </p>
              </div>
            </div>
            <Stats />
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={300}
            />
            <OrdersChart />
            <TopProducts />
            <ChartsGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}