const CustomerReviews =({})=>{
    return(
        <div className="pb-6 mb-6 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
            <div className="mb-3">
              <span className="font-medium text-sm text-gray-800 dark:text-neutral-200">Customer reviews</span>
            </div>

            {/* Customer Reviews List */}
            <div className="space-y-0.5">
              {/* Checkbox: 4 Stars & Up */}
              <div className="flex items-center">
                <label htmlFor="hs-pro-shmfloc-4-and-up" className="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                  <input type="checkbox" className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-4-and-up"/>
                  <span className="ms-2 flex items-center gap-x-0.5">
                    {/* Star Icons for 4 stars */}
                    {[...Array(4)].map((_, i) => (
                      <svg key={`star-4-${i}`} className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    ))}
                    {/* Half Star Icon for 4.x */}
                    <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                  </span>
                  <span className="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                </label>
              </div>
              {/* End Checkbox */}

              {/* Checkbox: 3 Stars & Up */}
              <div className="flex items-center">
                <label htmlFor="hs-pro-shmfloc-3-and-up" className="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                  <input type="checkbox" className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-3-and-up" />
                  <span className="ms-2 flex items-center gap-x-0.5">
                    {/* Star Icons for 3 stars */}
                    {[...Array(3)].map((_, i) => (
                      <svg key={`star-3-${i}`} className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                      </svg>
                    ))}
                    {/* Half Star Icons for 3.x */}
                    {[...Array(2)].map((_, i) => (
                      <svg key={`half-star-3-${i}`} className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    ))}
                  </span>
                  <span className="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                </label>
              </div>
              {/* End Checkbox */}

              {/* Checkbox: 1 Star & Up */}
              <div className="flex items-center">
                <label htmlFor="hs-pro-shmfloc-1-and-up" className="p-2 group w-full inline-flex items-center cursor-pointer text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                  <input type="checkbox" className="shrink-0 size-4.5 border-gray-300 rounded-sm text-emerald-600 checked:border-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-500 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800" id="hs-pro-shmfloc-1-and-up" />
                  <span className="ms-2 flex items-center gap-x-0.5">
                    {/* Star Icon for 1 star */}
                    <svg className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    {/* Half Star Icons for 1.x */}
                    {[...Array(4)].map((_, i) => (
                      <svg key={`half-star-1-${i}`} className="shrink-0 size-3 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    ))}
                  </span>
                  <span className="ms-2 text-gray-800 dark:text-neutral-200">&amp; up</span>
                </label>
              </div>
              {/* End Checkbox */}
            </div>
            {/* End Customer Reviews List */}
          </div>
    )
}
export default CustomerReviews;