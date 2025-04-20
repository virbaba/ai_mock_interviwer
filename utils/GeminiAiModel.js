import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function AIResponse(InputPrompt) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: InputPrompt,
  });
  return response.text || "Failed"
}

export default AIResponse;