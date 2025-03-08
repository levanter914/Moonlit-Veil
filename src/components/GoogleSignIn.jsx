import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase.js";

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/home");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      type="button"
      className="nes-btn custom-nes-btn"
    >
      Begin Your Journey
    </button>
  );
};

export default GoogleSignIn;
