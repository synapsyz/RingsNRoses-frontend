const EventTypes = ({ data }) => {
  return (
    <div className="mt-7">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Event Types Supported
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {data?.event_types_details?.map((event) => (
          <div key={event.id} className="flex gap-x-4 items-center">
            <svg
              className="shrink-0 w-6 h-6 text-gray-800 dark:text-neutral-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#A9A9A9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>

            <div className="grow">
              <p className="text-md text-gray-800 dark:text-neutral-200">
                {event.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EventTypes;
