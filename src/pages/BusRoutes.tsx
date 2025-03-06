import { app } from "@/firebase";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router";

interface Route {
  id: string;
  name: string;
  startLocation: string;
  busStops: string[];
  endLocation: string;
}

const BusRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "routes"));
      const routeData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Route[];
      setRoutes(routeData);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Route Function
  const deleteRoute = async (routeId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "routes", routeId));
      setRoutes((prevRoutes) =>
        prevRoutes.filter((route) => route.id !== routeId)
      ); // Update UI
      alert("Route deleted successfully!");
    } catch (error) {
      console.error("Error deleting route:", error);
      alert("Failed to delete route.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🚍 Bus Routes</h2>
        <div className="flex justify-end">
          <Link
            to="/routes/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            ➕ Add New Route
          </Link>
        </div>
        {loading ? (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <div
                key={route.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {route.name}
                </h3>
                <p className="text-gray-600">
                  <strong>Route:</strong> {route.startLocation} →{" "}
                  {route.endLocation}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Stops:</strong> {route.busStops.join(", ")}
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/routes/${route.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    🔍 View
                  </Link>
                  <Link
                    to={`/routes/edit/${route.id}`}
                    className="text-green-600 hover:underline"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => deleteRoute(route.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusRoutes;
