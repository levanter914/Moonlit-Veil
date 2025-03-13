import { useState, useEffect } from 'react';
import { generateQuizQuestions } from '../services/geminiServices.js';

export function useQuiz(theme) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadQuestions() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching questions for theme:", theme);
        const data = await generateQuizQuestions(theme);
        
        if (!mounted) return;
        
        if (!data || !data.questions) {
          throw new Error("Invalid data format received");
        }

        setQuestions(data.questions);
      } catch (err) {
        console.error("Error in useQuiz:", err);
        if (mounted) {
          setError(err.message || "Failed to load questions");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
    };
  }, [theme]);

  return { questions, loading, error };
}