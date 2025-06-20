import React from 'react';

// --- Data for the Stat Cards ---
// We define the data here. Later, this can come from an API.
const statsData = [
  {
    id: 1,
    title: 'Total Views',
    value: '10k',
    subtext: '0.5k views',
    change: '4.3%',
    changeType: 'increase',
    icon: <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>
  },
  {
    id: 2,
    title: 'Total Quote Request',
    value: '500',
    subtext: '85',
    change: '12.5%',
    changeType: 'increase',
    icon: <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  },
  {
    id: 3,
    title: 'Call Request',
    value: '5k',
    subtext: '250',
    change:'11.5%',
    changeType: null,
    icon: <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m15 9-6 6" /><path d="M9 9h.01" /><path d="M15 15h.01" /></svg>
  },
  {
    id: 4,
    title: 'Reviews',
    value: '150',
    subtext: '12 reviews',
    change: '4.4%',
    changeType: 'decrease',
    icon: <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" /><path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" /><rect width="8" height="8" x="14" y="14" rx="2" /></svg>
  }
];

// --- Sub-Component for a single Stat Card ---
const StatCard = ({ stat }) => (
  <div className="p-4 sm:p-5 bg-white border border-stone-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
    <div className="sm:flex sm:gap-x-3">
      {stat.icon}
      <div className="sm:order-1 grow space-y-1">
        <h2 className="sm:mb-3 text-sm text-stone-500 dark:text-neutral-400">
          {stat.title}
        </h2>
        <p className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
          {stat.value}
        </p>
      </div>
    </div>
    <div className="mt-1 flex items-center gap-x-2">
      <span className="text-sm leading-5 text-stone-500 dark:text-neutral-400">
        {stat.subtext}
      </span>
      {stat.change && (
        <span className={`inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
          {stat.changeType === 'increase' ? (
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          ) : (
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline></svg>
          )}
          {stat.change}
        </span>
      )}
    </div>
  </div>
);

// --- Main Component ---
const DashboardStats = () => {
    // Function to get a dynamic greeting
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return "Good morning";
        } else if (currentHour < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };

    return (
        <main id="content" className="pb-14 sm:pb-16">
          <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            {/* Breadcrumb (hidden on large screens) */}
            <ol className="lg:hidden pt-5 flex items-center whitespace-nowrap">
              <li className="flex items-center text-sm text-stone-600 dark:text-neutral-500">
                E-commerce
                <svg className="shrink-0 overflow-visible size-4 ms-1.5 text-stone-400 dark:text-neutral-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path></svg>
              </li>
              <li className="ps-1.5 flex items-center font-semibold text-stone-800 dark:text-neutral-200 text-sm">
                Overview
              </li>
            </ol>
            
            <div className="py-2 sm:pb-0 sm:pt-5 space-y-5">
              {/* Header with dynamic greeting */}
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                  <h1 className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
                    {getGreeting()}, James.
                  </h1>
                  <p className="text-sm text-stone-500 dark:text-neutral-400">
                    Here's what's happening with your venue today.
                  </p>
                </div>
              </div>

              {/* Stats Grid - Mapped from data */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
                {statsData.map(stat => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
              </div>
            </div>
          </div>
        </main>
    );
};

export default DashboardStats;