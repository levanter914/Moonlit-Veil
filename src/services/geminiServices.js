import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const QUIZ_PROMPT = `Generate 10 pixel-style, scenario-based multiple-choice quiz questions related to the theme {THEME}, where the player's choices directly influence the game world. Each scenario should be short, with pixel art-style language, and include four options (one correct, three incorrect). Keep the choices brief and impactful. All questions need to be real world problems.

## Output Format:
Generate a JSON object with the following structure, do not use backticks or markdown inside  only brackets are allowed, provide in VALID JSON FORMAT and stricly follow the given json structure bellow:

{
  "theme": "{theme_name}",
  "questions": [
    {
      "id": "q1",
      "scenario": "string (50-100 characters)",
      "choices": [
        "A) string (max 50 chars)",
        "B) string (max 50 chars)",
        "C) string (max 50 chars)",
        "D) string (max 50 chars)"
      ],
      "correct_answer": "string (matching exact choice text)",
      "explanation": "string (max 100 chars)",
      "impact_on_game": {
        "success": "string (effect if correct)",
        "failure": "string (effect if wrong)"
      }
    }
  ]
}

## Requirements:
1. Scenario Style:
   - Use pixel-game style language (casual, fun, adventurous)
   - Include relevant emoji at start of each scenario
   - Keep descriptions concise but vivid
   - Focus on action and immediate decisions

2. Answer Choices:
   - One clearly correct answer
   - Three plausible but incorrect alternatives
   - All choices should be brief (max 50 characters)
   - Label choices A) through D)
   - Make each choice meaningfully different

3. Game Impact:
   - Success effects should unlock new abilities, areas, or resources
   - Failure effects should create meaningful but not game-ending consequences
   - Effects should be thematically consistent

4. Content Guidelines:
   - Keep language family-friendly
   - Focus on problem-solving and positive actions
   - Maintain consistent difficulty level
   - Ensure scenarios are logically connected to the theme

## Example Question:

{
  "id": "q1",
  "scenario": "🔥 *Crack!* A spark ignites the ancient forest. Magical creatures flee in panic. Quick, what's your move?",
  "choices": [
    "A) Cast a rain spell and rescue the creatures",
    "B) Ignore the flames",
    "C) Catch the creatures",
    "D) Run away"
  ],
  "correct_answer": "A) Cast a rain spell and rescue the creatures",
  "explanation": "Quick thinking with magic saves both forest and creatures!",
  "impact_on_game": {
    "success": "Unlock water magic abilities and gain forest creatures' trust",
    "failure": "Forest area becomes temporarily inaccessible, lose creature allies"
  }
}
`;

export async function generateQuizQuestions(theme) {
  try {
    if (!theme) {
      throw new Error("Theme is required");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    if (!model) {
      throw new Error("Failed to initialize Gemini model");
    }

    // Replace the placeholder with the actual theme
    const prompt = QUIZ_PROMPT.replace(/{THEME}/g, theme);

    console.log("Sending request to Gemini API with prompt:", prompt);
    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      throw new Error("No response from Gemini API");
    }

    // Get the raw text response
    const text = await result.response.text();
    console.log("Received raw response:", text);

    // Clean up the response by:
    // - Removing markdown artifacts
    // - Removing JavaScript-style comments
    // - Ensuring no trailing commas
    let cleanedText = text
      .replace(/```json|```/g, '')                // Remove markdown artifacts
      .replace(/\/\/.*$/gm, '')                   // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')           // Remove multi-line comments
      .replace(/,\s*}/g, '}')                     // Remove trailing commas
      .replace(/,\s*]/g, ']');                    // Remove trailing commas in arrays

    console.log("Cleaned response:", cleanedText);

    // Parse the cleaned JSON response
    const parsedData = JSON.parse(cleanedText);

    if (!parsedData || !parsedData.questions) {
      throw new Error("Invalid response format from API");
    }

    return parsedData;
  } catch (error) {
    console.error("Error in generateQuizQuestions:", error);
    throw new Error(`Failed to generate quiz questions: ${error.message}`);
  }
}