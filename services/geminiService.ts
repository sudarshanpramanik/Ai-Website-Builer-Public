import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey: apiKey });
};

export const generateCodeFromPrompt = async (prompt: string, type: 'website' | 'app'): Promise<string> => {
  const ai = getClient();
  
  const systemInstruction = `
    You are an elite full-stack developer and UI/UX designer known for creating luxurious, high-performance digital products.
    Your task is to generate a single-file HTML document containing a complete, working prototype based on the user's prompt.
    
    Requirements:
    1. Use HTML5 boilerplate.
    2. Use Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>) for styling.
    3. The design must be modern, responsive, and aesthetically stunning. Use gradients, shadows, and spacing like a premium product.
    4. If interaction is needed, include vanilla JavaScript within <script> tags.
    5. For 'app' type requests:
       - Style the main container to look like a mobile view (max-width: 375px, margin: 0 auto, min-height: 812px).
       - Ensure it looks like a native app (bottom navigation, top bar, touch-friendly buttons).
    6. Do NOT use markdown code blocks (like \`\`\`html). Just return the raw code string.
    7. Do NOT include explanations. Just the code.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a ${type} for: ${prompt}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const text = response.text || '';
    // Clean up if the model accidentally adds markdown code blocks
    return text.replace(/```html/g, '').replace(/```/g, '');
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate code. Please try again.");
  }
};