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
import Auth from "./pages/Auth.tsx";
import BusSchedules from "./pages/BusSchedules.tsx";
import AddSchedule from "./pages/AddSchedule.tsx";
import EditSchedule from "./pages/EditSchedule.tsx";
import ScheduleDetails from "./pages/ScheduleDetails.tsx";

RouteDetails;
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="dashboard/" element={<Dashboard />}>
          <Route path="" element={<DashboardHome />} />

          <Route path="driver-manager" element={<DriverManagement />} />

          <Route path="routes" element={<BusRoutes />} />
          <Route path="routes/new" element={<AddRoute />} />
          <Route path="routes/:id" element={<RouteDetails />} />
          <Route path="routes/edit/:id" element={<EditRoute />} />

          <Route path="schedules" element={<BusSchedules />} />
          <Route path="schedules/add-schedules" element={<AddSchedule />} />
          <Route path="schedules/edit/:id" element={<EditSchedule />} />
          <Route path="schedules/:id" element={<ScheduleDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
