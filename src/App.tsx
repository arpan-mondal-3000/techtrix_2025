// Libraries
import { Routes, Route } from "react-router";
import BusRoutes from "./pages/BusRoutes.tsx";
// Pages
import Home from "@/pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import DriverManagement from "./pages/DriverManagement";
import AddRoute from "./pages/AddRoute.tsx";
import RouteDetails from "./pages/RouteDetails.tsx";
import EditRoute from "./pages/EditRoute.tsx";

RouteDetails;
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard/" element={<Dashboard />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="driver-manager" element={<DriverManagement />} />
          <Route path="routes" element={<BusRoutes />} />
          <Route path="routes/new" element={<AddRoute />} />
          <Route path="routes/:id" element={<RouteDetails />} />
          <Route path="routes/edit/:id" element={<EditRoute />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
