import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import musicIcon from "../assets/music-icon.png";
const MusicPlayer = () => {
  const { isMuted, setIsMuted } = useContext(MusicContext);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className={`fixed top-4 left-4 p-3 rounded-full drop-shadow-[4px_4px_0px_black] transition-all duration-300 
        ${isMuted ? "opacity-70" : "float"}`}
    >
      <img src={musicIcon} alt="Music Toggle" className="w-10 h-10" />
    </button>
  );
};

export default MusicPlayer;
