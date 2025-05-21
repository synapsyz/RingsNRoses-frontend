export default function slider() {
     const handlePrelineLoad = () => {
    const el = document.querySelector('[data-hs-carousel]');
    if (el && window.HSCarousel) {
      window.HSCarousel.autoInit(el);
    }
  };
  return (

   <div class="py-4 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div
          data-hs-carousel='{"isInfiniteLoop": true}'
          className="relative hs-carousel overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800 h-96" style={{ height: '40rem'}}
        >
          <div className="hs-carousel-body absolute top-0 bottom-0 left-0 flex flex-nowrap transition-transform duration-700 opacity-0">
            <div className="hs-carousel-slide">
              <a className="relative block h-96 rounded-xl" style={{ height: '40rem'}} href="#">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  src="https://cdn0.weddingwire.in/article/4793/3_2/1280/jpg/113974-studiokellyphotography-337445578-533103172337964-9035533201119956191-n.jpeg"
                  alt="Hero Image"
                />
                <div className="relative z-10 text-center w-full h-full max-w-lg mx-auto px-12 flex flex-col justify-center items-center">
                  <div class="bg-black/40 rounded-xl p-6">
                    <p class="text-sm md:text-base uppercase text-white">
                      Up to 30% Off on Dream Venues!
                    </p>
                
                    <h2 class="mt-2 font-semibold text-2xl sm:text-2xl lg:text-4xl text-white">
                      Book the vibe, not just the venue.
                    </h2>
                
                    <div class="mt-7">
                      <span class="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full">
                        Book now
                      </span>
                    </div>
                  </div>                
                </div>
              </a>
            </div>
             <div className="hs-carousel-slide">
              <a className="relative block h-96 rounded-xl" style={{ height: '40rem'}} href="#">
                <img className="absolute inset-0 size-full object-cover rounded-xl" src="https://t4.ftcdn.net/jpg/02/71/43/75/360_F_271437574_doTjDM96i4VpYYU68nFLpjLA2rOlSh5v.jpg" alt="Hero Image"/>

                <div className="relative z-10 size-full max-w-lg p-8 sm:p-16 flex flex-col">
                  <h2 className="mt-2 font-semibold text-3xl sm:text-4xl lg:text-5xl text-white">
                    Luxury Catering That Melts in Your Mouth
                  </h2>

                  <p className="text-sm md:text-base uppercase text-white">
                    Now at 20% Off!
                  </p>

                  <div className="mt-7">
                    <span className="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full">
                      Book now
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div className="hs-carousel-slide">
              <a className="h-120 lg:h-160 relative block overflow-hidden bg-linear-to-br from-emerald-500 to-emerald-900 rounded-xl focus:outline-hidden dark:bg-neutral-800" style={{ height: '40rem'}} href="../../pro/shop/listing.html">
                 <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5" style={{ background: '#064e3b',height: '40rem'}}>
                  <div className="p-12 sm:p-16 md:ps-20 md:pe-0 max-w-xl">
                    <span className="block font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-white">
                      Starting at 
                    </span>
                    <span className="block font-bold uppercase text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white">
                      ₹9,999!
                    </span>
                    <span className="block md:text-end font-bold uppercase text-xl sm:text-2xl lg:text-3xl text-yellow-400">
                      DJ & Entertainment Packages 
                    </span>

                    <div className="mt-10 md:mt-20">
                      <h2 className="font-semibold text-2xl md:text-3xl text-white">
                      </h2>

                      <p className="mt-1 text-white">
                      </p>

                      <div className="mt-3 md:mt-5">
                        <span className="py-2 px-3 font-semibold text-sm bg-white text-gray-800 rounded-full">
                          Have a Look!
                        </span>
                      </div>
                    </div>
                  </div>


                  <div className="h-120 lg:h-160 grid grid-cols-2 gap-3 sm:gap-5 -rotate-12">
                    <div className="flex flex-col gap-3 sm:gap-5">
                      <div className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900">
                        <img className="size-full object-cover rounded-xl lg:rounded-2xl" src="https://akm-img-a-in.tosshub.com/lingo/brt/images/story/202404/662f71d9be800-10-wedding-djs-to-book-for-your-wedding-290928589-16x9.png" alt="Product Image"/>
                      </div>
                      <div className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900">
                        <img className="size-full object-cover rounded-xl lg:rounded-2xl" src="https://i.ytimg.com/vi/R0FDzIs48PM/maxresdefault.jpg" alt="Product Image"/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:gap-5 -mt-6">
                      <div className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900">
                        <img className="size-full object-cover rounded-xl lg:rounded-2xl" src="https://cdn0.weddingwire.in/vendor/3754/3_2/960/jpg/wedding-entertainment-anchor-deepak-bajaj-stage-performance-8_15_413754-165622337886221.jpeg" alt="Product Image"/>
                      </div>
                      <div className="p-1.5 bg-white rounded-2xl lg:rounded-3xl shadow-2xl dark:bg-neutral-900">
                        <img className="size-full object-cover rounded-xl lg:rounded-2xl" src="https://blog.g3fashion.com/wp-content/uploads/2021/04/choreographers-for-wedding-dance-1024x652.jpg" alt="Product Image"/>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            type="button"
            className="hs-carousel-prev absolute top-1/2 left-2 transform -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            type="button"
            className="hs-carousel-next absolute top-1/2 right-2 transform -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-200 text-gray-800 rounded-full shadow hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

    );
}
