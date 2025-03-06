import { app } from "@/firebase";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const EditSchedule = () => {
  const { id } = useParams();
  const [busName, setBusName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [route, setRoute] = useState("");
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!id) {
        console.error("Invalid ID");
        return;
      }

      try {
        const docRef = doc(db, "schedules", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched data:", data); // Debugging log
          setBusName(data.busName || "");
          setDriverName(data.driverName || "");
          setStartTime(data.startTime || "");
          setEndTime(data.endTime || "");
          setRoute(data.route || "");
        } else {
          console.error("No such schedule found!");
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  const handleUpdate = async () => {
    if (!id) {
      console.error("Invalid ID for update");
      return;
    }

    try {
      const docRef = doc(db, "schedules", id);
      await updateDoc(docRef, {
        busName,
        driverName,
        startTime,
        endTime,
        route,
      });

      console.log("Update successful!");
      navigate("/dashboard/schedules");
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          ✏ Edit Schedule
        </h2>
        {loading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : (
          <>
            <input
              className="w-full p-2 border rounded mb-2"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              placeholder="Bus Name"
            />
            <input
              className="w-full p-2 border rounded mb-2"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="Driver Name"
            />
            <input
              className="w-full p-2 border rounded mb-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Start Time"
            />
            <input
              className="w-full p-2 border rounded mb-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="End Time"
            />
            <input
              className="w-full p-2 border rounded mb-4"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="Route"
            />

            <button
              onClick={handleUpdate}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditSchedule;
