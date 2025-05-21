import { XCircleIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export default function ErrorAlert({ errors }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (errors && errors.length > 0) {
      setVisible(true); // Show again on new errors
    }
  }, [errors]);

  if (!errors || errors.length === 0 || !visible) return null;

  return (
    <div className="fixed top left-1/2 z-50 -translate-x-1/2">
      <div className="relative w-full max-w-sm rounded-md bg-red-50 p-4 shadow-lg border border-red-200">
        {/* <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition"
        >
          <XCircleIcon className="w-5 h-5" aria-hidden="true" />
        </button> */}
        <div className="flex items-start space-x-2">
        <button
          onClick={() => setVisible(false)}
          className="text-red-400 hover:text-red-600 transition"
        >
          <XCircleIcon aria-hidden="true" className="w-5 h-5 text-red-400" />
          </button>
          <div>

            <ul className="text-sm text-red-700">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
