import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import "nes.css/css/nes.min.css";
import ScoreDisplay from "./ScoreDisplay";
import { db } from "../firebase"; 
import { doc, getDoc, setDoc , updateDoc} from "firebase/firestore";


const QuizComponent = ({ theme, background, titleColor, containerColor, borderColor, username }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);

  const { questions, loading, error } = useQuiz(theme);

  // Fetch score from Firebase
  useEffect(() => {
    const fetchScore = async () => {
      if (!username) return;

      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setScore(userData.score || 0);
      } else {
        // Initialize score in Firestore
        await setDoc(userRef, { username, score: 0 });
      }
    };

    fetchScore();
  }, [username]);

  // Update score in Firestore
  const updateScoreInDB = async (newScore) => {
    if (!username) return;
  
    try {
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {      
        await updateDoc(userRef, { score: newScore });
        console.log(`Score updated for ${username}: ${newScore}`);
      } else {
        await setDoc(userRef, { username, score: newScore });
        console.log(`New user score initialized for ${username}: ${newScore}`);
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handleAnswer = (selectedChoice) => {
  if (answered) return;
  setAnswered(true);

  const correct = selectedChoice === questions[currentQuestion].correct_answer;
  setIsCorrect(correct);
  setShowFeedback(true);

  if (correct) {
    const newScore = score + 3;
    setScore(newScore);
    updateScoreInDB(newScore);
  } else {
    setHearts((prevHearts) => {
      const newHearts = prevHearts - 1;
      
      if (newHearts <= 0) {
        navigate("/bad-end"); // Redirect to Bad Ending
        return newHearts;
      }
      
      return newHearts;
    });

    //return;  // 🚨 Stops execution so the question doesn't advance
  }

  setTimeout(() => handleNext(), 2000);
};


  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowFeedback(false);
      setAnswered(false);
    } else {
      navigate("/good-end"); 
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="nes-text text-white drop-shadow-[4px_4px_0px_black] text-lg">Loading...</p>
        <progress className="nes-progress w-60 md:w-72 lg:w-80" value="50" max="100"></progress>
      </div>
    );

  if (error) return <p>Error: {error}</p>;
  if (!questions || questions.length === 0) return <p>No questions available</p>;

  const currentQ = questions[currentQuestion];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <img src={background} alt="Theme Background" className="fixed top-0 left-0 w-full h-screen object-cover -z-10" />

      <ScoreDisplay score={score} hearts={hearts} />

      <div
        className="nes-container is-rounded with-title animate-fade-in animate-duration-1000 p-6"
        style={{
          backgroundColor: containerColor,
          border: `4px solid ${borderColor}`,
          maxWidth: "800px",
        }}
      >
        <span
          className="title"
          style={{ backgroundColor: titleColor, padding: "0 10px", borderRadius: "15px" }}
        >
          <i className="nes-icon heart is-small"></i> {theme} Q{currentQuestion + 1}/{questions.length}{" "}
          <i className="nes-icon heart is-small"></i>
        </span>

        <div className="nes-container is-rounded my-6 p-5" style={{ backgroundColor: "#ffffff" }}>
          <p className="nes-text text-black drop-shadow-[2px_0px_0px_gray]">{currentQ.scenario}</p>
        </div>

        {!showFeedback && (
          <div className="choices flex flex-col gap-2 mt-6">
            {currentQ.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(choice)}
                disabled={answered}
                className="nes-btn transition-transform duration-500 hover:scale-105"
              >
                {choice}
              </button>
            ))}
          </div>
        )}

        {showFeedback && (
          <div className={`nes-container is-rounded my-6 mt-8 p-4 ${isCorrect ? "is-success" : "is-error"}`}>
            <p className="nes-text">{isCorrect ? "Correct!" : "Incorrect!"}</p>
            <p>{currentQ.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
