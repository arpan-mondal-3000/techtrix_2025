// Libraries
import { Routes, Route } from "react-router";

// Pages
import Home from "@/pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
