const Reviews = ({ data }) => {
    return(
<div className="pt-10">
                      {/* <!-- Reviews --> */}
                      <div
                        id="reviews"
                        className="flex flex-wrap justify-between items-center gap-3"
                      >
                        <div className="font-medium text-gray-800 dark:text-neutral-200">
                          <ul className="flex flex-wrap items-center gap-2">
                            <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                              {/* <!-- Rating --> */}
                              <div className="flex flex-wrap items-center">
                                <span className="me-1">4.8</span>

                                {/* <!-- Stars --> */}
                                <div className="inline-flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"></path>
                                  </svg>
                                </div>
                                {/* <!-- End Stars --> */}
                              </div>
                              {/* <!-- End Rating --> */}
                            </li>
                            <li className="inline-flex items-center relative pe-2.5 last:pe-0 last:after:hidden after:absolute after:top-1/2 after:end-0 after:inline-block after:size-[3px] after:bg-gray-400 after:rounded-full after:-translate-y-1/2 dark:after:bg-neutral-600">
                              112 reviews
                            </li>
                          </ul>
                        </div>

                        <div className="inline-flex items-center gap-x-1">
                          <svg
                            className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
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
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                          <p className="text-xs text-gray-500 dark:text-neutral-400">
                            All reviews are from verified profiles
                          </p>
                        </div>
                      </div>
                      {/* <!-- End Reviews --> */}

                      <div
                        id="hs-pro-reviews-tabs-scroll"
                        className="relative py-3 overflow-hidden"
                        data-hs-scroll-nav
                      >
                        {/* <!-- Nav Tab --> */}
                        <div className="mt-4">
                          <div
                            id="hs-pro-tabs-shpm-five-star"
                            role="tabpanel"
                            className="block"
                          >
                            {/* Content for 5 star reviews */}
                            <p className="text-gray-700 dark:text-neutral-200">
                              Showing all 5-star reviews...
                            </p>
                          </div>

                          <div
                            id="hs-pro-tabs-shpm-four-star"
                            role="tabpanel"
                            className="hidden"
                          >
                            {/* Content for 4 star reviews */}
                            <p className="text-gray-700 dark:text-neutral-200">
                              Showing all 4-star reviews...
                            </p>
                          </div>

                          <div
                            id="hs-pro-tabs-shpm-three-star"
                            role="tabpanel"
                            className="hidden"
                          >
                            {/* Content for 3 star reviews */}
                            <p className="text-gray-700 dark:text-neutral-200">
                              Showing all 3-star reviews...
                            </p>
                          </div>

                          <div
                            id="hs-pro-tabs-shpm-two-and-below"
                            role="tabpanel"
                            className="hidden"
                          >
                            {/* Content for 2-star and below reviews */}
                            <p className="text-gray-700 dark:text-neutral-200">
                              No low-rated reviews yet.
                            </p>
                          </div>
                        </div>

                        <nav
                          id="hs-pro-reviews-tabs"
                          className="hs-scroll-nav-body flex gap-1 snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:h-0 p-0.5 bg-white border border-gray-200 rounded-full dark:bg-neutral-900 dark:border-neutral-700"
                          aria-label="Tabs"
                          role="tablist"
                          aria-orientation="horizontal"
                        >
                          <button
                            type="button"
                            className="hs-tab-active:bg-gray-200 snap-start hs-tab-active:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:focus:text-gray-800 w-full inline-flex justify-center items-center gap-x-2 text-gray-800 py-2 px-3 text-sm whitespace-nowrap rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-500 dark:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:text-neutral-200 dark:text-neutral-200 dark:focus:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden active"
                            id="hs-pro-tabs-shpm-item-five-star"
                            aria-selected="true"
                            data-hs-tab="#hs-pro-tabs-shpm-five-star"
                            aria-controls="hs-pro-tabs-shpm-five-star"
                            role="tab"
                          >
                            5 star (100)
                          </button>
                          <button
                            type="button"
                            className="hs-tab-active:bg-gray-200 snap-start hs-tab-active:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:focus:text-gray-800 w-full inline-flex justify-center items-center gap-x-2 text-gray-800 py-2 px-3 text-sm whitespace-nowrap rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-500 dark:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:text-neutral-200 dark:text-neutral-200 dark:focus:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden "
                            id="hs-pro-tabs-shpm-item-four-star"
                            aria-selected="false"
                            data-hs-tab="#hs-pro-tabs-shpm-four-star"
                            aria-controls="hs-pro-tabs-shpm-four-star"
                            role="tab"
                          >
                            4 star (10)
                          </button>
                          <button
                            type="button"
                            className="hs-tab-active:bg-gray-200 snap-start hs-tab-active:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:focus:text-gray-800 w-full inline-flex justify-center items-center gap-x-2 text-gray-800 py-2 px-3 text-sm whitespace-nowrap rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-500 dark:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:text-neutral-200 dark:text-neutral-200 dark:focus:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden "
                            id="hs-pro-tabs-shpm-item-three-star"
                            aria-selected="false"
                            data-hs-tab="#hs-pro-tabs-shpm-three-star"
                            aria-controls="hs-pro-tabs-shpm-three-star"
                            role="tab"
                          >
                            3 star (2)
                          </button>
                          <button
                            type="button"
                            className="hs-tab-active:bg-gray-200 snap-start hs-tab-active:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:focus:text-gray-800 w-full inline-flex justify-center items-center gap-x-2 text-gray-800 py-2 px-3 text-sm whitespace-nowrap rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:text-gray-500 dark:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:bg-neutral-800 dark:focus:hs-tab-active:text-neutral-200 dark:text-neutral-200 dark:focus:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden "
                            id="hs-pro-tabs-shpm-item-two-and-below"
                            aria-selected="false"
                            data-hs-tab="#hs-pro-tabs-shpm-two-and-below"
                            aria-controls="hs-pro-tabs-shpm-two-and-below"
                            role="tab"
                          >
                            2 and below (0)
                          </button>
                        </nav>
                        {/* <!-- End Nav Tab --> */}
                      </div>

                      {/* <!-- Tab Content --> */}
                      <div
                        id="hs-pro-tabs-shpm-five-star"
                        role="tabpanel"
                        aria-labelledby="hs-pro-tabs-shpm-item-five-star"
                      >
                        {/* <!-- Product Details --> */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Ramaswami
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-400">
                                  13 hours ago
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <div className="mt-3 flex gap-2">
                                <img
                                  className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800"
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBcOgnYwsopYJJQ7TFYWA_TmI-JtY84q12sg&s"
                                  alt="Review Image"
                                />
                                <img
                                  className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800"
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0WrbOeeES3K05eDi2aS_gtnjgSamCCx7leA&s"
                                  alt="Review Image"
                                />
                                <img
                                  className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800"
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1tsb2kodof5S_jy2VXzcMdt7VRcdJ7ffaQ&s"
                                  alt="Review Image"
                                />
                              </div>

                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                We recently rented VM Grand Mahal for a family
                                function, and I must say, it exceeded all our
                                expectations. The hall is spacious,
                                well-maintained, and beautifully designed,
                                making it ideal for large gatherings. The air
                                conditioning was perfect, and the lighting setup
                                added a great ambiance to the event.
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Sam
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-400">
                                  5 days ago
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <div className="mt-3 flex gap-2">
                                <img
                                  className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800"
                                  src="https://image.wedmegood.com/resized/720X/uploads/member/3905993/1686526219_WhatsApp_Image_2023_06_09_at_12.11.12_AM.jpeg"
                                  alt="Review Image"
                                />
                                <img
                                  className="shrink-0 size-20 bg-gray-100 rounded-lg dark:bg-neutral-800"
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYnn9YqVuB4atmKPqDqvkG3BHkXFoTkbo9LA&s"
                                  alt="Review Image"
                                />
                              </div>

                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                The management was extremely cooperative and
                                professional throughout the booking process and
                                on the event day. They provided all the
                                necessary support – from stage setup to
                                cleanliness and parking arrangements. Our guests
                                were very impressed with the overall atmosphere
                                and convenience.
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}
                        </div>
                        {/* <!-- End Product Details --> */}
                      </div>
                      {/* <!-- End Tab Content --> */}

                      {/* <!-- Tab Content --> */}
                      <div
                        id="hs-pro-tabs-shpm-four-star"
                        className="hidden"
                        role="tabpanel"
                        aria-labelledby="hs-pro-tabs-shpm-item-four-star"
                      >
                        {/* <!-- Product Details --> */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Jaya Kumar
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  December 27, 2024
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                The booking process was smooth, and the staff
                                was helpful throughout. They handled the
                                arrangements well and were available when we
                                needed support. The parking area was also
                                sufficient, which made things easier for our
                                attendees.{" "}
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Narayana
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  December 14, 2024
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                We booked VM Grand Mahal for a recent family
                                function, and the overall experience was very
                                satisfying. The hall is truly grand — spacious,
                                well-lit, and beautifully maintained. It created
                                the perfect atmosphere for our event, and our
                                guests were quite impressed.{" "}
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}
                        </div>
                        {/* <!-- End Product Details --> */}
                      </div>
                      {/* <!-- End Tab Content --> */}

                      {/* <!-- Tab Content --> */}
                      <div
                        id="hs-pro-tabs-shpm-three-star"
                        className="hidden"
                        role="tabpanel"
                        aria-labelledby="hs-pro-tabs-shpm-item-three-star"
                      >
                        {/* <!-- Product Details --> */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  K. Sampath
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  November 26, 2024
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                The venue has potential — it’s large, with
                                decent interiors, and can accommodate a good
                                number of guests. However, we faced a few issues
                                during our event. The cleanliness wasn’t up to
                                the mark when we arrived, and we had to follow
                                up multiple times with the staff to get things
                                sorted. The sound system also gave us some
                                trouble, and the response from the management
                                was slower than expected.{" "}
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Rajagopalachari
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  November 8, 2024
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                VM Grand Mahal is a decent venue for hosting
                                events, with a spacious hall and good seating
                                capacity. The ambiance is elegant, especially
                                with the lighting and decor, which adds charm to
                                any celebration. However, there are a few areas
                                that could be improved. The air conditioning
                                wasn't consistent throughout the event, and the
                                parking space felt a bit limited for a larger
                                gathering. The staff was polite, but service
                                could have been more prompt and organized.
                                Overall, it's a satisfactory choice if you're
                                looking for a mid-range venue with a pleasant
                                atmosphere.{" "}
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}
                        </div>
                        {/* <!-- End Product Details --> */}
                      </div>
                      {/* <!-- End Tab Content --> */}

                      {/* <!-- Tab Content --> */}
                      <div
                        id="hs-pro-tabs-shpm-two-and-below"
                        className="hidden"
                        role="tabpanel"
                        aria-labelledby="hs-pro-tabs-shpm-item-two-and-below"
                      >
                        {/* <!-- Product Details --> */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  RamaGopal
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  13 hours ago
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                VM Grand Mahal has potential, but my experience
                                was below expectations. While the hall itself is
                                spacious, the cleanliness and maintenance were
                                not up to the mark. The washrooms needed better
                                upkeep, and the air conditioning wasn’t
                                effective throughout the event. Parking was
                                chaotic, and there was little assistance from
                                the staff. The management could be more
                                responsive and better organized. With some
                                improvements, it could be a much better venue.{" "}
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}

                          {/* <!-- Review --> */}
                          <div className="p-4 h-full flex flex-col bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="flex flex-wrap justify-between gap-3">
                              <div>
                                <h6 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                                  Kumari Ananthan
                                </h6>

                                <p className="text-[13px] text-gray-500 dark:text-neutral-500">
                                  5 days ago
                                </p>
                              </div>

                              <div className="mt-1">
                                {/* <!-- Review --> */}
                                <div className="flex items-center gap-x-0.5">
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                  <svg
                                    className="shrink-0 size-3.5 text-emerald-600 dark:text-emerald-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                  </svg>
                                </div>
                                {/* <!-- End Review --> */}
                              </div>
                            </div>

                            <div>
                              <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                                Attended an event recently at VM Grand Mahal and
                                was left a bit disappointed. Though the hall
                                looks grand at first glance, the facilities
                                don't quite match the appearance. The sound
                                system had issues during the program, and there
                                were frequent power fluctuations. The catering
                                area was congested and poorly managed. Staff
                                seemed overwhelmed and not very attentive.
                                Overall, it didn’t live up to the expectations
                                set by its name.{" "}
                              </p>
                            </div>
                          </div>
                          {/* <!-- End Review --> */}
                        </div>
                        {/* <!-- End Product Details --> */}
                      </div>
                      {/* <!-- End Tab Content --> */}

                      <div className="mt-6 w-full max-w-56 mx-auto">
                        <a
                          className="py-3 px-4 w-full flex justify-center items-center font-medium text-sm text-start bg-white border border-gray-200 text-gray-800 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
                        >
                          See all reviews
                        </a>
                      </div>
                    </div>
                    )
}
export default Reviews;