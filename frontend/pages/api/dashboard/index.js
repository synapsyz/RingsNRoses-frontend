import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Unauthorized. Please login.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">User Info</h2>
        <div className="p-4 bg-gray-100 rounded border">
          <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
