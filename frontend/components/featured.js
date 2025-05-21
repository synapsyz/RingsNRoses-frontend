export default function category() {
  return (
  <>
   <div className="py-6 sm:py-12 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      {/* <!-- Header --> */}
      <div className="mb-4 flex flex-wrap justify-between items-center gap-3">
        <h1 className="font-medium text-xl text-gray-800 dark:text-neutral-200">
          Couples’ Favorites
        </h1>

        <button type="button" className="py-2 px-3 flex items-center text-sm text-start bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600">
          View all
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      {/* <!-- End Header --> */}

      {/* <!-- Grid --> */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://images.squarespace-cdn.com/content/v1/5f152ec422af2a37ad8d4da4/1595231592681-7PDPA2AX1EQHG56NQNV3/Outdoor+Wedding+Venue+Chennai" alt="Product Image"/>
              </a>

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      💖 Most Loved
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Outdoor Lawns & Gardens
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                  From ₹2L <span className="text-sm"></span>
                </span>
                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹3L</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  50× last month
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (67)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://img.staticmb.com/mbcontent/images/uploads/2023/8/Heaven_4.jpg" alt="Product Image"/>
              </a>
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Theme Decor
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                  From ₹1L <span className="text-sm"></span>
                </span>
                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹1.5k</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  44× last month
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://t4.ftcdn.net/jpg/08/01/08/11/360_F_801081156_a7Rpu5kGuHBCPLkN9JhWe0qWpmWhwjNx.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      🔥 Trending now
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Drone Shoots
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                  From ₹80k <span className="text-sm"></span>
                </span>
                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹1L</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  38× last month
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (29)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://www.hamaraevent.com/uploads/blog/0076248001475654338.jpg" alt="Product Image"/>
              </a>
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Mehendi Artists
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                  From ₹4k <span className="text-sm"></span>
                </span>
                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹6k</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  35× last month
                </span>
              </div>

              {/* <!-- Review --> */}
              <div className="mt-2 flex items-center gap-x-0.5">
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>
                <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                <span className="ms-1 text-xs text-gray-800 dark:text-neutral-200">
                  (3)
                </span>
              </div>
              {/* <!-- End Review --> */}
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <div className="h-full flex flex-col">
          <div className="group relative">
            <div className="relative">
              <a className="block shrink-0 relative w-full h-48 md:h-64 overflow-hidden rounded-xl focus:outline-hidden" href="./product-detail.html">
                <img className="size-full absolute inset-0 object-cover object-center group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://imgmediagumlet.lbb.in/media/2023/10/6520072fd766a50bd12a61b5_1696597807795.jpg" alt="Product Image"/>
              </a>

              {/* <!-- Badge Group --> */}
              <div className="absolute top-0 start-0 pt-2 ps-2 pointer-events-none">
                <div className="flex flex-col gap-y-1">
                  <p>
                    <span className="py-0.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-600 dark:text-white">
                      Popular this season
                    </span>
                  </p>
                </div>
              </div>
              {/* <!-- End Badge Group --> */}
            </div>

            <a className="after:z-1 after:absolute after:inset-0" href="./product-detail.html"></a>

            <div className="pt-3">
              <h4 className="font-medium text-sm text-gray-800 dark:text-neutral-200">
                Multi-Cuisine Caterers
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                  From ₹500/plate <span className="text-sm"></span>
                </span>
                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  <s>₹700</s>
                </span>
                <span className="ms-auto text-sm text-gray-500 dark:text-neutral-500">
                  33× last month
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  </>
    );
}
