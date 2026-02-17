
import { GoogleGenAI } from "@google/genai";
import { MOCK_SERVICES } from "../constants";

// FIX: Always use direct reference to process.env.API_KEY and correct initialization object structure.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBookingAdvice = async (userMessage: string) => {
  try {
    // FIX: Use ai.models.generateContent directly with model and contents.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `Você é o assistente virtual da AgendAI, um sistema de agendamento premium. 
        Seu objetivo é ajudar o cliente a escolher o serviço ideal e esclarecer dúvidas sobre agendamentos.
        Aqui estão os serviços disponíveis: ${JSON.stringify(MOCK_SERVICES)}.
        Seja educado, prestativo e emita respostas curtas em Português do Brasil.
        Se o usuário quiser agendar, oriente-o a usar o formulário lateral, mas sugira qual serviço combina mais com o que ele descreveu.`,
        temperature: 0.7,
      },
    });

    // FIX: Accessing .text as a property of GenerateContentResponse.
    return response.text;
  } catch (error) {
    console.error("Erro na IA:", error);
    return "Desculpe, estou com dificuldades técnicas agora. Mas você pode prosseguir com o agendamento manual abaixo!";
  }
};
