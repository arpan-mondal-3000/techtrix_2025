import { app } from "@/firebase";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Schedule {
  id: string;
  busName: string;
  driverName: string;
  startTime: string;
  endTime: string;
  route: string;
}

const BusSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "schedules"));
        const scheduleData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Schedule[];
        setSchedules(scheduleData);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const deleteSchedule = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "schedules", id));
      setSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule.id !== id)
      );
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-white">🚌 Bus Schedules</h2>
          <button
            onClick={() => navigate("/schedules/add-schedules")}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
          >
            ➕ Add Schedule
          </button>
        </div>

        {loading ? (
          <p className="text-center text-white text-lg animate-pulse">
            Loading schedules...
          </p>
        ) : schedules.length === 0 ? (
          <p className="text-center text-white text-lg">No schedules found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-all border-l-8 border-blue-500 relative pt-10"
              >
                {/* Buttons (Edit, Delete, and View Details) */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/schedules/edit/${schedule.id}`)}
                    className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-700 transition-all"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
                    className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-700 transition-all"
                  >
                    🗑 Delete
                  </button>
                </div>

                {/* Schedule Details */}
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  🚌 {schedule.busName}
                </h3>
                <p className="text-gray-600">
                  <strong>Driver:</strong> {schedule.driverName}
                </p>
                <p className="text-gray-600">
                  <strong>Route:</strong> {schedule.route}
                </p>
                <p className="text-gray-600">
                  <strong>🕒 Start:</strong> {schedule.startTime}
                </p>
                <p className="text-gray-600">
                  <strong>⏳ End:</strong> {schedule.endTime}
                </p>

                {/* View Details Button */}
                <button
                  onClick={() => navigate(`/schedules/${schedule.id}`)}
                  className="mt-3 bg-gray-800 text-white px-3 py-1 text-sm rounded hover:bg-gray-900 transition-all"
                >
                  🔍 View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusSchedules;
