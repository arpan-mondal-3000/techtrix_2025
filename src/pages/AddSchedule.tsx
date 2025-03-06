import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/firebase";
import { useNavigate } from "react-router-dom";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddSchedule = () => {
  const [busName, setBusName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [route, setRoute] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const db = getFirestore(app);
  const navigate = useNavigate();

  const toggleDaySelection = (day: string) => {
    setDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !busName ||
      !driverName ||
      !route ||
      !startTime ||
      !endTime ||
      days.length === 0
    ) {
      alert("Please fill all fields and select at least one operating day.");
      return;
    }

    try {
      await addDoc(collection(db, "schedules"), {
        busName,
        driverName,
        route,
        startTime,
        endTime,
        days,
      });
      navigate("/schedules");
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border-l-4 border-blue-500"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🚌 Add Bus Schedule
        </h2>

        <div className="grid gap-4">
          <input
            className="input-field"
            placeholder="Bus Name"
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Driver Name"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Route (e.g., Dharmatala to Durgapur)"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
          <input
            type="time"
            className="input-field"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="input-field"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          {/* Days of Operation */}
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <label
                key={day}
                className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium ${
                  days.includes(day)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => toggleDaySelection(day)}
              >
                {day}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-6 w-full hover:bg-blue-700 transition-all"
        >
          ➕ Add Schedule
        </button>
      </form>
    </div>
  );
};

export default AddSchedule;
