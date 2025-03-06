import { app } from "@/firebase";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

interface Schedule {
  id: string;
  busName: string;
  driverName: string;
  startTime: string;
  endTime: string;
  route: string;
}

const ScheduleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!id) return;
      try {
        const scheduleDoc = await getDoc(doc(db, "schedules", id));
        if (scheduleDoc.exists()) {
          setSchedule({
            id: scheduleDoc.id,
            ...scheduleDoc.data(),
          } as Schedule);
        } else {
          console.error("Schedule not found");
        }
      } catch (error) {
        console.error("Error fetching schedule details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white px-3 py-1 rounded mb-4 hover:bg-gray-900 transition-all"
        >
          🔙 Back
        </button>

        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">
            Loading schedule details...
          </p>
        ) : schedule ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🚌 {schedule.busName}
            </h2>
            <p className="text-gray-700">
              <strong>Driver:</strong> {schedule.driverName}
            </p>
            <p className="text-gray-700">
              <strong>Route:</strong> {schedule.route}
            </p>
            <p className="text-gray-700">
              <strong>🕒 Start Time:</strong> {schedule.startTime}
            </p>
            <p className="text-gray-700">
              <strong>⏳ End Time:</strong> {schedule.endTime}
            </p>
          </>
        ) : (
          <p className="text-center text-gray-600">Schedule not found.</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleDetails;
