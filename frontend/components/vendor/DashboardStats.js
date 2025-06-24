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
    icon: <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M80-600v-160q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v160h-80v-160H160v160H80Zm80 360q-33 0-56.5-23.5T80-320v-200h80v200h640v-200h80v200q0 33-23.5 56.5T800-240H160ZM40-120v-80h880v80H40Zm440-420ZM80-520v-80h240q11 0 21 6t15 16l47 93 123-215q5-9 14-14.5t20-5.5q11 0 21 5.5t15 16.5l49 98h235v80H620q-11 0-21-5.5T584-542l-26-53-123 215q-5 10-15 15t-21 5q-11 0-20.5-6T364-382l-69-138H80Z"/></svg>
  },
  {
    id: 2,
    title: 'Total Quote Request',
    value: '500',
    subtext: '85',
    change: '12.5%',
    changeType: 'increase',
    icon: <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
  },
  {
    id: 3,
    title: 'Total Call Request',
    value: '5k',
    subtext: '250',
    change:'11.5%',
    changeType: null,
    icon: <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
  },
  {
    id: 4,
    title: 'Total Bookings',
    value: '150',
    subtext: '12',
    change: '4.4%',
    changeType: 'decrease',
    icon: <svg className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-stone-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M240-400h122l200-200q9-9 13.5-20.5T580-643q0-11-5-21.5T562-684l-36-38q-9-9-20-13.5t-23-4.5q-11 0-22.5 4.5T440-722L240-522v122Zm280-243-37-37 37 37ZM300-460v-38l101-101 20 18 18 20-101 101h-38Zm121-121 18 20-38-38 20 18Zm26 181h273v-80H527l-80 80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
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