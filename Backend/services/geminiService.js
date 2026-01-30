const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function getGeminiInsights(prompt) {
    const response=await ai.models.generateContent({
        model:'gemini-3-flash-preview',
        contents:[
            {
                role: "user",
                parts: [{ text: prompt }]
            }
        ]
    })
    return response.text;

  
}

module.exports = { getGeminiInsights };
