import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Students from "./components/Students/Students";
import Serve from "./components/Serve/Serve";
import Served from "./components/Served/Served";
import EditFood from "./components/Shared/EditFood";
import EditStudent from "./components/Students/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food/:id" element={<EditFood />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student/:id" element={<EditStudent />} />
        <Route path="/serve-foods" element={<Serve />} />
        <Route path="/served" element={<Served />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
