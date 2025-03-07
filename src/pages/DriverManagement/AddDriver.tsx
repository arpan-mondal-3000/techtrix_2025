import { useState, useEffect, useRef } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { MdOutlineAdd } from "react-icons/md";
import { Input } from "@/components/ui/input";

const AddDriver = () => {
  const [busName, setBusName] = useState("");
  const [driverId, setDriverId] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverMobileNumber, setDriverMobileNumber] = useState("");
  const [route, setRoute] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const db = getFirestore(app);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert to Base64

    reader.onload = () => {
      const base64String = reader.result as string;
      setProfilePicture(base64String);
    };

    reader.onerror = (error) =>
      console.error("Base64 conversion error:", error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !busName ||
      !driverEmail ||
      !driverMobileNumber ||
      !driverName ||
      !route ||
      !profilePicture
    ) {
      alert("Please fill all fields and upload a profile picture.");
      return;
    }
    try {
      const docRef = doc(db, "drivers", driverId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "drivers", driverId), {
          id: driverId,
          name: driverName,
          email: driverEmail,
          mob: driverMobileNumber,
          busName,
          route,
          profilePicture,
        });
        console.log("User added successfully!");
        navigate("/dashboard/driver-manager");
      } else {
        console.log("User already exists!");
        alert("Driver with this id already exist!");
      }
    } catch (error) {
      console.error("Error adding driver:", error);
    }
  };

  // if (!user)
  //   return (
  //     <>
  //       <div className="text-red-500 text-3xl text-center p-5">
  //         Please log in as admin to add drivers!
  //       </div>
  //     </>
  //   );

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex items-center justify-center">
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border-l-4 border-blue-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-6 hover:bg-gray-900 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <span>←</span> Back
        </button>
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          👲 Add a new Driver
        </motion.h2>

        <div className="grid gap-4">
          {[
            {
              placeholder: "Driver ID",
              value: driverId,
              setter: setDriverId,
            },
            {
              placeholder: "Driver Name",
              value: driverName,
              setter: setDriverName,
            },
            {
              placeholder: "Driver Email",
              value: driverEmail,
              setter: setDriverEmail,
            },
            {
              placeholder: "Driver Mobile number",
              value: driverMobileNumber,
              setter: setDriverMobileNumber,
            },
            { placeholder: "Bus Name", value: busName, setter: setBusName },
            {
              placeholder: "Route (e.g., Dharmatala to Durgapur)",
              value: route,
              setter: setRoute,
            },
          ].map((field, index) => (
            <motion.input
              key={index}
              className="input-field"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              whileFocus={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          ))}
          <div className="mt-4">Upload Driver profile photo</div>
          {profilePicture !== "" ? (
            <div className="w-40 h-40 object-cover">
              <img src={profilePicture} alt="Profile Picture" />
            </div>
          ) : (
            ""
          )}
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-6 w-full hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex justify-center gap-3 items-center">
            {<MdOutlineAdd size={24} />} Add Driver
          </div>
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddDriver;
