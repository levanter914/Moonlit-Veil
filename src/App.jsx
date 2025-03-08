import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import CelestaraPeaks from "./pages/CelestaraPeaks";
import DuskridgePeaks from "./pages/DuskridgePeaks";
import EverbloomMeadow from "./pages/EverbloomMeadow";
import MirageHaven from "./pages/MirageHaven";
import ThemeSelection from "./pages/ThemeSelection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/theme-selection" element={<ThemeSelection />} />
      <Route path="/everbloom-meadow" element={<EverbloomMeadow />} />
      <Route path="/duskridge-peaks" element={<DuskridgePeaks />} />
      <Route path="/mirage-haven" element={<MirageHaven />} />
      <Route path="/celestara-peaks" element={<CelestaraPeaks />} />
    </Routes>
  );
}

export default App;
