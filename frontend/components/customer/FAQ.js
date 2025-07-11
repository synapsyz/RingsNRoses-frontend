import { useEffect } from "react";
const FAQ = ({ data }) => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {data?.faq_details && data.faq_details.length > 0 &&
      <div className="max-w-2xl mx-auto text-center mb-6 lg:mb-6">
        <h2 className="text-xl font-semibold md:text-xl md:leading-tight text-gray-800 dark:text-neutral-200">
          Frequently Asked Questions
        </h2>
      </div>
}
      <div className="max-w-5xl mx-auto">
        <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-800">
          {data?.faq_details &&
            data.faq_details.map((faq, index) => (
              <div
                className="hs-accordion pb-3"
                id={`hs-basic-with-title-and-arrow-stretched-heading-${
                  faq.id || index
                }`}
                key={faq.id || index}
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400"
                  aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${
                    faq.id || index
                  }`}
                >
                  {faq.question}
                  <svg
                    className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400 dark:group-hover:text-neutral-400"
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
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400 dark:group-hover:text-neutral-400"
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
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <div
                  id={`hs-basic-with-title-and-arrow-stretched-collapse-${
                    faq.id || index
                  }`}
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${
                    faq.id || index
                  }`}
                >
                  <p
                    className="text-gray-800 dark:text-neutral-200"
                    dangerouslySetInnerHTML={{
                      __html: faq.answer,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default FAQ;
