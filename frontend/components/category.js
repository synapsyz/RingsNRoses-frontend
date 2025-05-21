export default function category() {
  return (
  <>
   <div className="w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
      {/* <!-- Grid --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="./listing.html">
          <div className="relative shrink-0 w-20 sm:w-28 h-20">
            <img className="size-full absolute inset-0 object-cover object-center rounded-s-xl" src="https://cdn-blog.superprof.com/blog_in/wp-content/uploads/2020/01/in-photo-photo-1.jpg" alt="Product Image"/>
          </div>
          <div className="grow p-3">
            <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
              Photography
            </span>
          </div>
        </a>
        {/* <!-- End Category Card --> */}

        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="./listing.html">
          <div className="relative shrink-0 w-20 sm:w-28 h-20">
            <img className="size-full absolute inset-0 object-cover object-center rounded-s-xl" src="https://www.vivahcards.com/wp-content/uploads/2024/07/Indian-Wedding-Card-20272-Premium-Wedding-Invitation-Cards.jpg" alt="Product Image"/>
          </div>
          <div className="grow p-3">
            <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
              Invitations
            </span>
          </div>
        </a>
        {/* <!-- End Category Card --> */}

        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="./listing.html">
          <div className="relative shrink-0 w-20 sm:w-28 h-20">
            <img className="size-full absolute inset-0 object-cover object-center rounded-s-xl" src="https://lamansh.in/cdn/shop/files/125-rs-each-on-buying-in-bulk-call-at-8619550223-gift-hand-bag-lamansh-new-print-bridal-haldi-ceremony-design-hand-bags-for-haldi-mehendi-sangeet-wedding-return-gifts-pooja-or-festiva_7d67749e-998b-4b90-9fc6-93fd7556111a.jpg?v=1709128018&width=2400" alt="Product Image"/>
          </div>
          <div className="grow p-3">
            <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
              Return Favors
            </span>
          </div>
        </a>
        {/* <!-- End Category Card --> */}

        {/* <!-- Category Card --> */}
        <a className="block flex items-center bg-white border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-hidden focus:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="./listing.html">
          <div className="relative shrink-0 w-20 sm:w-28 h-20">
            <img className="size-full absolute inset-0 object-cover object-center rounded-s-xl" src="https://naomisheadmasters.com/wp-content/uploads/2025/04/How-to-Book-a-Reliable-Makeup-Artist-for-Your-Destination-Wedding.jpg" alt="Product Image"/>
          </div>
          <div className="grow p-3">
            <span className="block font-medium text-sm text-gray-800 dark:text-neutral-200">
              Makeup
            </span>
          </div>
        </a>
        {/* <!-- End Category Card --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  </>
    );
}
