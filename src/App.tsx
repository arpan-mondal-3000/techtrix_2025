// Libraries
import { Routes, Route } from "react-router";

// Pages
import Home from "@/pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import DriverManagement from "./pages/DriverManagement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard/" element={<Dashboard />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="driver-manager" element={<DriverManagement />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
