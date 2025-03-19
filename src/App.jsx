import { Routes, Route } from "react-router-dom";
import usePreventZoom from "./components/PreventZoom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CelestaraPeaks from "./pages/CelestaraPeaks";
import DuskridgePeaks from "./pages/DuskridgePeaks";
import EverbloomMeadow from "./pages/EverbloomMeadow";
import MirageHaven from "./pages/MirageHaven";
import ThemeSelection from "./pages/ThemeSelection";
import BadEnd from "./pages/BadEnd";
import GoodEnd from "./pages/GoodEnd";
import Leaderboard from "./pages/Leaderboard";
import MusicPlayer from "./components/MusicPlayer"; 
import { MusicProvider } from "./context/MusicContext"; 
import avatar from "./assets/avatar.png";

function App() {
  usePreventZoom();
  return (
    <MusicProvider> 
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/theme-selection" element={<ThemeSelection />} />
          <Route path="/bad-end" element={<BadEnd />} />
          <Route path="/good-end" element={<GoodEnd />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/everbloom-meadow" element={<EverbloomMeadow />} />
          <Route path="/duskridge-peaks" element={<DuskridgePeaks />} />
          <Route path="/mirage-haven" element={<MirageHaven />} />
          <Route path="/celestara-peaks" element={<CelestaraPeaks />} />
        </Routes>

        {/* Avatar in the bottom-right */}
        <img
          src={avatar}
          alt="avatar"
          className="fixed bottom-[-20px] right-[-20px] w-75 h-auto pointer-events-none z-10 float drop-shadow-[0_0_10px_rgba(0,0,0,7)]"
        />

        {/* Music Mute/Unmute Button in the top-left */}
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}

export default App;
