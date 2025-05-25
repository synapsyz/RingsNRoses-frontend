import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [locations, setLocations] = useState([]);
  const [pageUrl, setPageUrl] = useState(`${process.env.NEXT_PUBLIC_HOST}/api/v1/locations/countries/`);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      const token = session?.accessToken;

      fetch(pageUrl, {
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then((data) => {
          setLocations(data.results);
          setNextPage(data.next);
          setPrevPage(data.previous);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [status, session, pageUrl]);

  if (status === 'loading') return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>

      <ul className="space-y-2">
        {locations.map((loc) => (
          <li key={loc.name} className="border p-4 rounded shadow">
            <p>Lat: {loc.code}, Lng: {loc.longitude}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPageUrl(prevPage)}
          disabled={!prevPage}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPageUrl(nextPage)}
          disabled={!nextPage}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
