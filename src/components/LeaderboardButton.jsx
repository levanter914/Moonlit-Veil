import React from "react";
import { useNavigate } from "react-router-dom";

const LeaderboardButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate("/leaderboard")} 
      className="custom-nes-btn fixed top-[10px] right-[0px] w-75 h-auto z-10 nes-btn is-primary"
    >
      Leaderboard
    </button>
  );
};

export default LeaderboardButton;
