import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "@/firebase";

const EditRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const db = getFirestore(app);

  const [route, setRoute] = useState({
    name: "",
    startLocation: "",
    endLocation: "",
    busStops: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "routes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRoute({
            name: data.name,
            startLocation: data.startLocation,
            endLocation: data.endLocation,
            busStops: data.busStops.join(", "),
          });
        } else {
          console.error("Route not found!");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!id) return;
    try {
      const docRef = doc(db, "routes", id);
      await updateDoc(docRef, {
        name: route.name,
        startLocation: route.startLocation,
        endLocation: route.endLocation,
        busStops: route.busStops.split(",").map((stop) => stop.trim()),
      });
      navigate("/routes");
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500">
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          ✏️ Edit Route
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={route.name}
            onChange={handleChange}
            placeholder="Route Name"
            className="w-full p-3 rounded-md border-2 border-white/30 bg-white/10 text-white placeholder-gray-300"
          />
          <input
            type="text"
            name="startLocation"
            value={route.startLocation}
            onChange={handleChange}
            placeholder="Start Location"
            className="w-full p-3 rounded-md border-2 border-white/30 bg-white/10 text-white placeholder-gray-300"
          />
          <input
            type="text"
            name="endLocation"
            value={route.endLocation}
            onChange={handleChange}
            placeholder="End Location"
            className="w-full p-3 rounded-md border-2 border-white/30 bg-white/10 text-white placeholder-gray-300"
          />
          <textarea
            name="busStops"
            value={route.busStops}
            onChange={handleChange}
            placeholder="Bus Stops (comma-separated)"
            className="w-full p-3 rounded-md border-2 border-white/30 bg-white/10 text-white placeholder-gray-300"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/routes")}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md shadow-md hover:bg-gray-400 transition"
          >
            ❌ Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
          >
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoute;
