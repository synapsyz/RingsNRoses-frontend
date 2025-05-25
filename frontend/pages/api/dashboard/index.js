import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
let api_url;
const getApiUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
api_url = getApiUrl()
export default function Dashboard() {
  const { data: session, status } = useSession();
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchLocations();
    }
  }, [status]);

  const fetchLocations = async () => {
    try {
      const res = await fetch(api_url+"/api/v1/location/", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setLocations(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Unauthorized. Please login.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-2">
        {locations.length > 0 ? (
          locations.map((location, idx) => (
            <div key={idx} className="p-2 border rounded bg-gray-50">
              <pre>{JSON.stringify(location, null, 2)}</pre>
            </div>
          ))
        ) : (
          <p>No locations found.</p>
        )}
      </div>
    </div>
  );
}
