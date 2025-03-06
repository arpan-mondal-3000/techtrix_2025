// Libraries
import { Routes, Route } from "react-router";

// Pages
import Home from "@/pages/Home";
import DriverManagement from "@/pages/DriverManagement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver-manager" element={<DriverManagement />} />
      </Routes>
    </>
  );
}

export default App;
