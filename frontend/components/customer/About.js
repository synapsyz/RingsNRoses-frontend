const About = ({ data }) => {
  return (
    <>
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">About</h2>
      <div className="flex items-center text-sm text-gray-400 mb-4 space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 3a.75.75 0 00-.75.75v.75H8a2 2 0 00-2 2v1.5a2 2 0 002 2h8a2 2 0 002-2V7.5a2 2 0 00-2-2h-1V3.75a.75.75 0 00-.75-.75h-5.5zM6 11.25v6.5A3.25 3.25 0 009.25 21h5.5A3.25 3.25 0 0018 17.75v-6.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75z"
          />
        </svg>
        <span>Last update: May 2025</span>
      </div>
      <div>
        <div
          className="space-y-4 text-sm text-gray-800 dark:text-neutral-200 text-justify" 
          dangerouslySetInnerHTML={{
            __html: data.about,
          }}
        />
      </div>
      </div>
    </>
  );
};
export default About;
