import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getGeminiResponse(prompt: string, imageData?: string) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || (typeof window !== 'undefined' ? localStorage.getItem("gemini_api_key") : null);
    if (!apiKey) throw new Error("Missing Gemini API Key. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local or use UI settings.");

    const genAI = new GoogleGenerativeAI(apiKey);

    if (imageData) {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageData.split(',')[1],
                    mimeType: "image/png"
                }
            }
        ]);
        return result.response.text();
    } else {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    }
}
