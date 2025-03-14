import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";

const ThemeSelection = () => {
  const { changeTrack } = useContext(MusicContext);
    
  useEffect(() => {
    changeTrack("landing");
  }, []);
  const navigate = useNavigate();

  const realms = [
    {
      name: "Everbloom Meadow",
      description: "Endless flowers bloom in eternal spring.",
      emoji: "🌻",
      bg: "bg-green-100",
      descBg: "bg-green-200",
      route: "/everbloom-meadow",
    },
    {
      name: "Duskridge Peaks",
      description: "Snowy peaks under an eternal twilight.",
      emoji: "🏔️",
      bg: "bg-gray-200",
      descBg: "bg-gray-300",
      route: "/duskridge-peaks",
    },
    {
      name: "Mirage Haven",
      description: "A golden oasis filled with illusions.",
      emoji: "🌵",
      bg: "bg-yellow-100",
      descBg: "bg-yellow-200",
      route: "/mirage-haven",
    },
    {
      name: "Celestara Peaks",
      description: "Mystical peaks beneath cosmic auroras.",
      emoji: "🌌",
      bg: "bg-indigo-200",
      descBg: "bg-indigo-300",
      route: "/celestara-peaks",
    },
  ];

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/landing.png')] bg-contain bg-repeat bg-center"></div>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Title */}
      <div className="relative flex flex-col items-center text-white w-full px-4">
        <h1 className="text-5xl font-press-start text-white drop-shadow-[6px_6px_0px_black] mb-20 text-center">
          Choose Your Realm
        </h1>

        {/* 2x2 Grid for Realms */}
        <div className="grid grid-cols-2 gap-8 mt-6 place-items-center">
          {realms.map((realm, index) => (
            <button
              key={index}
              onClick={() => navigate(realm.route)}
              className={`nes-container drop-shadow-[2px_2px_0px_black] is-rounded p-4 text-center shadow-lg transform transition-transform duration-200 ${realm.bg} hover:scale-110`}
              style={{ width: "260px", minHeight: "260px" }} 
            >
              <div className="text-5xl mb-3 float">{realm.emoji}</div>
              <h2 className="text-lg font-bold text-black drop-shadow-[2px_2px_0px_white] leading-snug">
                {realm.name}
              </h2>
              <div className={`mt-2 p-2 rounded ${realm.descBg} max-w-full overflow-hidden`}>
                <p className="text-sm text-black drop-shadow-[2px_2px_0px_white] leading-snug">
                  {realm.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelection;
