import React, { createContext, useState, useEffect } from "react";

export const MusicContext = createContext();

const musicTracks = {
  landing: new URL("../assets/Starting.mp3", import.meta.url).href,
  everbloom: new URL("../assets/EverbloomMeadow.mp3", import.meta.url).href,
  duskridge: new URL("../assets/DuskridgePeaks.mp3", import.meta.url).href,
  mirage: new URL("../assets/MirageHaven.mp3", import.meta.url).href,
  celestara: new URL("../assets/CelestaraPeaks.mp3", import.meta.url).href,
  "good-ending": new URL("../assets/GoodEnd.ogg", import.meta.url).href,
  "bad-ending": new URL("../assets/BadEnd.ogg", import.meta.url).href,
};

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState("landing");
  const [isMuted, setIsMuted] = useState(true);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (audio) {
      audio.pause(); // Stop previous audio
    }

    const newAudio = new Audio(musicTracks[currentTrack]);
    newAudio.loop = true;
    newAudio.volume = 0.5;

    if (!isMuted) {
      newAudio.play().catch((err) => console.error("Audio play error:", err));
    }

    setAudio(newAudio);

    return () => {
      newAudio.pause();
    };
  }, [currentTrack, isMuted]);

  const changeTrack = (trackKey) => {
    if (musicTracks[trackKey]) {
      setCurrentTrack(trackKey);
    }
  };

  return (
    <MusicContext.Provider value={{ isMuted, setIsMuted, changeTrack }}>
      {children}
    </MusicContext.Provider>
  );
};
