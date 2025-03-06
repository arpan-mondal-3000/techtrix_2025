import { Button } from "@/components/ui/button";
import BusRoutes from "./pages/BusRoutes";

function App() {
  return (
    <>
      <div className="text-blue-500 text-3xl">Driver management system</div>
      <Button>Signup/Login</Button>
      <BusRoutes />
    </>
  );
}

export default App;
