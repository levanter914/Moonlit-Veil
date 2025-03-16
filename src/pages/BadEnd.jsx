import React, { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { useNavigate } from "react-router-dom";

const BadEnd = () => {
  const { changeTrack } = useContext(MusicContext);
  const navigate = useNavigate();
  const message = "The light fades, and the realm sinks into shadow. The stars turn away, and a cold silence falls. This journey ends… but perhaps, another fate awaits beyond the veil.....";

  useEffect(() => {
    changeTrack("bad-ending");
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/BadEnd.png')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Message */}
      <p className="relative text-white text-4xl md:text-xl lg:text-xl font-bold max-w-2xl animate-fade-in">
        {message}
      </p>

      {/* Buttons */}
      <div className="relative mt-6 flex gap-4">
        <button 
          onClick={() => navigate("/")} 
          className="nes-btn is-success hover:scale-110 transition-transform">Try Again</button>
        <button 
          onClick={() => navigate("/theme-selection")} 
          className="nes-btn is-warning hover:scale-110 transition-transform">Seek Another Path</button>
      </div>
    </div>
  );
};

export default BadEnd;