import React, { useContext, useEffect, useState } from "react";
import { MusicContext } from "../context/MusicContext";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const Leaderboard = () => {
  const { changeTrack } = useContext(MusicContext);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    changeTrack("landing");

    const fetchLeaderboardData = async () => {
      const q = query(collection(db, "users"), orderBy("score", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        playerName: doc.data().username,
        score: doc.data().score,
      }));
      setLeaderboardData(data);
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center px-6">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/landing.png')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Leaderboard Container */}
      <div className="relative w-full max-w-md bg-[#1E1B2E] border-4 border-[#CDA1FF] rounded-lg p-4 shadow-lg z-10">
        <h2 className="text-center text-xl font-bold text-[#CDA1FF] mb-3">
          🏆 Moonlit Veil Leaderboard
        </h2>

        <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-[#CDA1FF] scrollbar-track-[#332A44]">
          {leaderboardData.map((player, index) => (
            <LeaderboardItem
              key={player.id}
              rank={index + 1}
              playerName={player.playerName}
              score={player.score}
              isTopThree={index < 3}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaderboardItem = ({ rank, playerName, score, isTopThree }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 mb-2 rounded-lg font-mono 
        ${isTopThree ? 'bg-[#3E2F5B] text-[#FFD700]' : 'bg-[#2A203D] text-[#E6E6FA]'}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full font-bold
          ${rank === 1 ? 'bg-[#FFD700] text-black' : 
            rank === 2 ? 'bg-[#C0C0C0] text-black' :
            rank === 3 ? 'bg-[#CD7F32] text-white' :
            'bg-[#4C3B63] text-white'}
        `}
        >
          {rank}
        </span>
        <span className="text-lg">{playerName}</span>
      </div>
      <div className="font-bold text-lg">{score.toLocaleString()} pts</div>
    </div>
  );
};

export default Leaderboard;
