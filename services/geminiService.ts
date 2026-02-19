
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIDiagnosis = async (symptoms: string, metrics: any) => {
  const prompt = `
    As an AI Laptop Doctor, analyze the following system state and symptoms:
    
    SYSTEM METRICS:
    ${JSON.stringify(metrics, null, 2)}
    
    USER REPORTED SYMPTOMS:
    ${symptoms}
    
    Provide a concise diagnosis including:
    1. Probable cause
    2. Recommended actions
    3. Urgency level
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    // Use .text property directly
    return response.text;
  } catch (error) {
    console.error("Gemini Diagnosis Error:", error);
    return "I'm having trouble analyzing your system right now. Please check your connection and try again.";
  }
};

export const getSecurityAdvice = async (threatContext: string) => {
  const prompt = `
    As a Safety Guardian expert, analyze this potential security threat:
    "${threatContext}"
    
    Provide a protective strategy to mitigate this risk. Be technical but clear.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });
    // Use .text property directly
    return response.text;
  } catch (error) {
    console.error("Gemini Security Error:", error);
    return "Security analysis failed. Ensure your firewall is active.";
  }
};
