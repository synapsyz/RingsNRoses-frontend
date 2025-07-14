const ServicesOffered = ({heading,content, data }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-sm text-gray-800 dark:text-neutral-200 mb-4">
        {heading}
      </h2>
      <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
        {content}
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-10 lg:gap-y-6 lg:gap-x-16">
        {data
          ?.filter((feature) => feature?.svg_icon_url)
          .map((feature, index) => (
            <div
              key={index}
              className="flex gap-3 text-gray-800 dark:text-neutral-200"
            >
              <img
                src={feature.svg_icon_url}
                alt={feature?.name}
                className="w-5 h-5 filter dark:invert"
              />
              <span>{feature?.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ServicesOffered;