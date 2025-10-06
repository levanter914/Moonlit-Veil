import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModelsREST() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    console.error("ListModels REST error:", resp.status, await resp.text());
    return null;
  }
  const data = await resp.json();
  console.log("ListModels response:", data.models);
  return data.models;
}

const QUIZ_PROMPT = `Generate 5 pixel-style, scenario-based multiple-choice quiz questions related to the theme {THEME}, where the player's choices directly impact the game world. Each scenario should present a moral or ethical dilemma faced by a traveler exploring the realm. The situations should be engaging and present real-world ethical challenges **through a pixel RPG adventure lens**.  

### Output Format:  
Generate a valid JSON object with the following structure : 

{
  "theme": "{theme_name}",
  "questions": [
    {
      "id": "q1",
      "scenario": "string (50-100 characters, describing an ethical dilemma in a journey)",
      "choices": [
        "A) string (max 50 chars)",
        "B) string (max 50 chars)",
        "C) string (max 50 chars)",
        "D) string (max 50 chars)"
      ],
      "correct_answer": "string (matching exact choice text)",
      "explanation": "string (max 100 chars, explaining moral reasoning behind the right choice)",
      "impact_on_game": {
        "success": "string (positive game effect for right choice)",
        "failure": "string (consequence for wrong choice)"
      }
    }
  ]
}

### Requirements:  

#### 1. Scenario Style (Pixel RPG Ethics Adventure)
- Frame each ethical dilemma as part of a journey through the realm  
- Use pixel-game style language (casual, adventurous, immersive)  
- Start with a relevant emoji to add visual appeal  
- Keep descriptions vivid but concise (max 100 chars)  
- Focus on real-world moral dilemmas adapted to the fantasy setting 

#### 2. Answer Choices (Ethical Decision-Making)
- One correct, ethical response  
- Three plausible but morally/strategically incorrect alternatives  
- Label choices A) through D) 
- Keep all choices max 50 characters  
- Make each choice meaningfully different 

#### 3. Game Impact (Moral Consequences in Gameplay)  
- Success effects unlock abilities, allies, or advantages  
- Failure effects should have consequences but not be game-ending  
- Make effects thematically consistent with the realm  

#### 4. Content Guidelines  
- Real-world ethical dilemmas (e.g., environmental ethics, honesty, fairness, responsibility)  
- Language should remain family-friendly
- Ensure logical consistency in dilemmas and responses  
- Maintain consistent difficulty level 

### Example Question (Moral/Ethical Dilemma in a Fantasy Realm)  

{
  "id": "q1",
  "scenario": "🔥A starving villager begs for food. You only have enough rations for yourself. What do you do?",
  "choices": [
    "A) Give half your rations and find more later",
    "B) Ignore them and walk away",
    "C) Demand they trade something valuable",
    "D) Tell them to find their own food"
  ],
  "correct_answer": "A) Give half your rations and find more later",
  "explanation": "Sharing resources builds trust and opens future opportunities.",
  "impact_on_game": {
    "success": "Gain ally who helps you find hidden resources later",
    "failure": "Lose reputation in village, fewer trade opportunities"
  }
}
`;

export async function generateQuizQuestions(theme) {
  try {
    if (!theme) {
      throw new Error("Theme is required");
    }

    await listModelsREST();
    
    let model;
    try {
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch {
      model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    }


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
    console.log("Received raw response:");

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

    console.log("Cleaned response:");

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