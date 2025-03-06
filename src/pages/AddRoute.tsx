import { useState } from "react";
import { app } from "@/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddRoute = () => {
  const [name, setName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [busStops, setBusStops] = useState<string[]>([]);
  const db = getFirestore(app);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "routes"), {
        name,
        startLocation,
        endLocation,
        busStops,
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding route:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Route</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Route Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Bus Stops (comma separated)"
          onChange={(e) => setBusStops(e.target.value.split(","))}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddRoute;
