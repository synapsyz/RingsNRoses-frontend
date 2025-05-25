import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/locations/`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      // Check if the response is actually JSON
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        const text = await res.text(); // get the response body safely
        throw new Error(`Unexpected response: ${text}`);
      }

      const data = await res.json();
      setLocations(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch locations.");
    }
  };

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Unauthorized. Please login.</p>;
  }

  return (
    <div className="p-4">
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
