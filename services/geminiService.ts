import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getSecurityAnalysis = async (): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI analysis is disabled. Please configure the API_KEY environment variable.");
  }
  
  try {
    const prompt = `
      As a cybersecurity expert for a small to medium-sized enterprise (MSME), 
      briefly explain 3 common network threats in simple terms. For each threat, 
      provide one clear, actionable tip on how to mitigate it.
      Format the response as a simple text, not markdown or JSON.
      Example:
      1. Phishing: This is when attackers trick you into giving away sensitive information...
         - Tip: Always verify the sender's email address...
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching security analysis from Gemini API:", error);
    return "Could not retrieve AI-powered analysis. The service may be temporarily unavailable.";
  }
};
