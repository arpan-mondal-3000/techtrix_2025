import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "@/assets/background.jpg";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase";
import { CgPerformance } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardHome: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<any[]>([]);
  const performance = {
    skill: 80,
    communication: 75,
    total: 85,
  };

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
    <main
      className="p-6 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {role === "driver" ? (
        <>
          <div
            style={{
              backgroundImage: "url('techtrix_2025/src/assets/background.jpg')",
              backgroundSize: "cover",
              height: "100vh",
            }}
          >
            <motion.h1
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Welcome, {name}
            </motion.h1>
            <motion.h2
              className="text-xl font-semibold mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Drivers
            </motion.h2>
            <motion.div
              className="overflow-x-auto bg-white p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
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
                      <motion.tr
                        key={driver.id}
                        className="border-b hover:bg-gray-100 transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <td className="p-2">{driver.fullName}</td>
                        <td className="p-2">{driver.email}</td>
                        <td className="p-2 text-green-600 font-semibold">
                          Active
                        </td>
                      </motion.tr>
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
            </motion.div>
          </div>
        </>
      ) : (
        <>
          <motion.div
            className="flex flex-col items-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FaUser size={80} className="rounded-full bg-gray-300 p-3" />
            <h2 className="text-2xl font-semibold mt-2">{name}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Skill Card */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">Skill</h3>
              <CgPerformance size={40} className="text-blue-500" />
              <p className="text-2xl font-bold mt-2">{performance.skill}%</p>
            </motion.div>

            {/* Communication Card */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">Communication</h3>
              <CgPerformance size={40} className="text-green-500" />
              <p className="text-2xl font-bold mt-2">
                {performance.communication}%
              </p>
            </motion.div>

            {/* Total Performance Card */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h3 className="text-lg font-semibold mb-2">Total Performance</h3>
              <CgPerformance size={40} className="text-red-500" />
              <p className="text-2xl font-bold mt-2">{performance.total}%</p>
            </motion.div>
          </div>
        </>
      )}
    </main>
  );
};

export default DashboardHome;
