import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Rules from "../components/Rules";
import { MusicContext } from "../context/MusicContext";

const Home = () => {
  const { changeTrack } = useContext(MusicContext);
  
  useEffect(() => {
    changeTrack("landing");
  }, []);
  
  const [username, setUsername] = useState("Traveler");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center px-6">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/landing.png')] bg-contain bg-center bg-repeat"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center font-bold text-white w-full">
        <div className="text-5xl font-press-start drop-shadow-[4px_4px_0px_black] text-center mb-4">
          Welcome, {username}!
        </div>

        <p className="font-press-start drop-shadow-[4px_4px_0px_black] text-center max-w-2xl mx-auto leading-relaxed">
          As the moon casts its glow upon the mystical realms, your journey begins. Will you uncover the secrets hidden in the night?
        </p>

        <Rules />

        {/* Start Button */}
        <button
          onClick={() => navigate("/theme-selection")}
          className="nes-btn custom-nes-btn px-6 py-3 mt-16"
        >
          Choose Your Realm
        </button>

      </div>
    </div>
  );
};

export default Home;
