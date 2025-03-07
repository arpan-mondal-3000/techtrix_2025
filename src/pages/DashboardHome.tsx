import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "../firebase";
import { CgPerformance } from "react-icons/cg";
import { FaUser } from "react-icons/fa";

const DashboardHome: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [performance, setPerformance] = useState({
    skill: 80,
    communication: 75,
    total: 85,
  });

  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setRole(user.role);
      setName(user.fullName);

      if (user.role === "admin") {
        fetchDrivers(user.uid);
      }
    } else {
      navigate("/");
    }
  }, []);

  const fetchDrivers = async (adminId: string) => {
    const q = query(collection(db, "drivers"), where("adminId", "==", adminId));
    const snapshot = await getDocs(q);
    setDrivers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('src/assets/background.jpg')"}}>
      {role === "admin" ? (
        // Admin Dashboard
        <>
          <h1 className="text-3xl font-bold mb-4">Welcome, {name}</h1>
          <h2 className="text-xl font-semibold mb-4">Your Drivers</h2>
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {drivers.length > 0 ? (
                  drivers.map((driver) => (
                    <tr key={driver.id} className="border-b">
                      <td className="p-2">{driver.fullName}</td>
                      <td className="p-2">{driver.email}</td>
                      <td className="p-2 text-green-600 font-semibold">Active</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      No drivers assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Driver Dashboard
        <>
          <div className="flex flex-col items-center mb-6">
            <FaUser size={80} className="rounded-full bg-gray-300 p-3" />
            <h2 className="text-2xl font-semibold mt-2">{name}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Skill Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">Skill</h3>
              <CgPerformance size={40} className="text-blue-500" />
              <p className="text-2xl font-bold mt-2">{performance.skill}%</p>
            </div>

            {/* Communication Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">Communication</h3>
              <CgPerformance size={40} className="text-green-500" />
              <p className="text-2xl font-bold mt-2">{performance.communication}%</p>
            </div>

            {/* Total Performance Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">Total Performance</h3>
              <CgPerformance size={40} className="text-red-500" />
              <p className="text-2xl font-bold mt-2">{performance.total}%</p>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default DashboardHome;
