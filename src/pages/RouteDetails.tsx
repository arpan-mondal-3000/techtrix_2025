import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase";
import { Link } from "react-router-dom";

interface Route {
  id: string;
  name: string;
  startLocation: string;
  busStops: string[];
  endLocation: string;
}

const RouteDetails = () => {
  const { id } = useParams();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "routes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRoute({ id: docSnap.id, ...docSnap.data() } as Route);
        } else {
          console.error("No such route!");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!route)
    return <p className="text-center text-red-500">Route not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">{route.name}</h2>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Start:</strong> {route.startLocation}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>End:</strong> {route.endLocation}
      </p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">Bus Stops:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
          {route.busStops.map((stop, index) => (
            <li key={index} className="bg-gray-100 px-3 py-1 rounded-md">
              {stop}
            </li>
          ))}
        </ul>
      </div>

      {/* Google Map Embed (Optional) */}
      <div className="mt-6">
        <iframe
          title="route-map"
          className="w-full h-64 rounded-lg"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${route.startLocation}`}
          allowFullScreen
        ></iframe>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/routes"
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Back to Routes
        </Link>
        <Link
          to={`/routes/edit/${route.id}`}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Edit Route
        </Link>
      </div>
    </div>
  );
};

export default RouteDetails;
