import React from "react";

const ScoreDisplay = ({ score, hearts }) => {
  const renderHearts = () => {
    const heartIcons = [];
    for (let i = 0; i < 3; i++) {
      if (i < hearts) {
        heartIcons.push(<i key={i} className="nes-icon is-large heart"></i>);
      } else {
        heartIcons.push(<i key={i} className="nes-icon is-large heart is-empty"></i>);
      }
    }
    return heartIcons;
  };

  return (
    <div className="fixed top-4 right-6 flex flex-col items-center bg-transparent">
      {/* Hearts */}
      <div className="flex space-x-2">{renderHearts()}</div>

      {/* Score Below Hearts */}
      <p className="nes-text text-white drop-shadow-[4px_0px_0px_black] text-lg font-bold mt-2">Score: {score}</p>
    </div>
  );
};

export default ScoreDisplay;
