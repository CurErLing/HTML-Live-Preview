import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    // In a real app we might throw or handle this gracefully in UI
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

/**
 * Generates HTML/CSS/JS code based on a user prompt.
 */
export const generateCodeFromPrompt = async (prompt: string, currentCode: string): Promise<string> => {
  const ai = getAiClient();
  
  const systemInstruction = `You are '凌同学' (Student Ling), an expert Frontend Developer and UI Designer. 
  Your task is to generate valid, modern, and beautiful HTML, CSS (using Tailwind CSS via CDN or internal styles), and JavaScript code based on the user's request.
  
  Rules:
  1. Output the result as a single, complete HTML file string.
  2. If the user asks to modify existing code, the full updated code must be returned.
  3. Include <script src="https://cdn.tailwindcss.com"></script> if styling is needed, unless the user specifies otherwise.
  4. Ensure the design is responsive and accessible.
  5. Do NOT use markdown code blocks (like \`\`\`html). Return ONLY the raw code.
  6. If the user asks a question, provide the answer within HTML comments or a visible HTML structure (like a help modal).
  
  Current Code Context:
  ${currentCode ? currentCode : "No existing code."}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Lower temperature for more deterministic code
      }
    });

    let text = response.text || '';
    
    // Cleanup in case the model ignores the "no markdown" rule
    text = text.replace(/```html/g, '').replace(/```/g, '').trim();
    
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate code via Gemini.");
  }
};