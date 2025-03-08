import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import CelestaraPeaks from "./pages/CelestaraPeaks";
import DuskridgePeaks from "./pages/DuskridgePeaks";
import EverbloomMeadow from "./pages/EverbloomMeadow";
import MirageHaven from "./pages/MirageHaven";
import ThemeSelection from "./pages/ThemeSelection";
import avatar from "./assets/avatar.png"; 

function App() {
  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/theme-selection" element={<ThemeSelection />} />
        <Route path="/everbloom-meadow" element={<EverbloomMeadow />} />
        <Route path="/duskridge-peaks" element={<DuskridgePeaks />} />
        <Route path="/mirage-haven" element={<MirageHaven />} />
        <Route path="/celestara-peaks" element={<CelestaraPeaks />} />
      </Routes>

      <img
        src={avatar}
        alt="avatar"
        className="fixed bottom-[-20px] right-[-20px] w-75 h-auto pointer-events-none z-10 float drop-shadow-[0_0_10px_rgba(0,0,0,7)]"
      />

    </div>
    
  );
}

export default App;
