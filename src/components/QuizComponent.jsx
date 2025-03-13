import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import "nes.css/css/nes.min.css";

const QuizComponent = ({ theme, background, titleColor, containerColor, borderColor }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(() => Number(localStorage.getItem("score")) || 0);
  const [hearts, setHearts] = useState(() => Number(localStorage.getItem("hearts")) || 3);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false); // Prevent multiple clicks

  const { questions, loading, error } = useQuiz(theme);

  useEffect(() => {
    localStorage.setItem("hearts", hearts.toString());
    localStorage.setItem("score", score.toString());
  }, [hearts, score]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="nes-text text-white drop-shadow-[4px_4px_0px_black] text-lg">Loading...</p>
        <progress className="nes-progress is-primary w-60 md:w-72 lg:w-80" value="50" max="100"></progress>
      </div>
    );

  if (error) return <p>Error: {error}</p>;
  if (!questions || questions.length === 0) return <p>No questions available</p>;

  const handleAnswer = (selectedChoice) => {
    if (answered) return;
    setAnswered(true);

    const correct = selectedChoice === questions[currentQuestion].correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 3);
    } else {
      setHearts((prevHearts) => {
        const newHearts = prevHearts - 1;
        if (newHearts <= 0) {
          navigate("/end");
        }
        return newHearts;
      });
    }

    setTimeout(() => handleNext(), 2000);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowFeedback(false);
      setAnswered(false);
    } else {
      navigate("/end");
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div
      className="nes-container is-rounded with-title animate-fade-in animate-duration-1000 p-6" // Added padding
      style={{ backgroundColor: containerColor, border: `4px solid ${borderColor}`, maxWidth: "800px" }}
    >
      {/* Title Bar with Hearts */}
      <span className="title" style={{ backgroundColor: titleColor, padding: "0 10px", borderRadius: "15px" }}>
        <i className="nes-icon heart is-small"></i> {theme} Q{currentQuestion + 1}/{questions.length}{" "}
        <i className="nes-icon heart is-small"></i>
      </span>

      {/* Question Box */}
      <div className="nes-container is-rounded my-6 p-5" style={{ backgroundColor: "#ffffff" }}> {/* Increased margin & padding */}
        <p className="nes-text text-black drop-shadow-[2px_0px_0px_gray]">{currentQ.scenario}</p>
      </div>

      {/* Hide Choices When Feedback is Visible */}
      {!showFeedback && (
        <div className="choices flex flex-col gap-2 mt-6"> {/* Added gap */}
          {currentQ.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(choice)}
              disabled={answered}
              className="nes-btn transition-transform duration-500 hover:scale-105" // Added hover effect
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {/* Feedback Message */}
      {showFeedback && (
        <div className={`nes-container is-rounded my-6 mt-8 p-4 ${isCorrect ? "is-success" : "is-error"}`}> {/* More spacing */}
          <p className="nes-text">{isCorrect ? "Correct!" : "Incorrect!"}</p>
          <p>{currentQ.explanation}</p>
        </div>
      )}
    </div>

  );
};

export default QuizComponent;
