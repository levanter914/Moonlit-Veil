import React, { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { useNavigate } from "react-router-dom";

const GoodEnd = () => {
  const { changeTrack } = useContext(MusicContext);
  const navigate = useNavigate();
  const message = "The stars shimmer in approval, and the realm bathes in light. Harmony is restored, and the echoes of your journey linger in eternity. This chapter closes, but the adventure never truly ends.";

  useEffect(() => {
    changeTrack("good-ending");
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/GoodEnd.png')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Message */}
      <p className="relative text-white text-xl md:text-xl lg:text-xl font-bold max-w-xl animate-fade-in">
        {message}
      </p>

      {/* Buttons */}
      <div className="relative mt-6 flex gap-4">
        <button 
          onClick={() => navigate("/")} 
          className="nes-btn is-success hover:scale-110 transition-transform">Begin Again</button>
        <button 
          onClick={() => navigate("/mystic-path")} 
          className="nes-btn is-warning hover:scale-110 transition-transform">Venture Further</button>
      </div>
    </div>
  );
};

export default GoodEnd;