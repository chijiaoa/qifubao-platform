
import { GoogleGenAI } from "@google/genai";

export const getBusinessAdvice = async (query: string) => {
  try {
    // Correct initialization inside the function to ensure current key usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "你是一个专业的工商财税顾问，名叫'企服小宝'。用亲切、干练的语气回答。如果用户问公司注册、注销、报税，提供简要步骤。限制在80字内。若涉及法律建议，提醒以官方为准。",
      }
    });

    if (!response || !response.text) {
      throw new Error("Invalid response format");
    }

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Detailed Error:", error);
    
    // Friendly UI response for common network/API errors
    if (error.message?.includes('xhr') || error.message?.includes('Rpc')) {
      return "联网查询失败了，可能是信号不好。您可以问我：'注册公司需要什么材料？'";
    }
    
    if (error.message?.includes('403') || error.message?.includes('key')) {
      return "小宝还没领到钥匙（API Key），暂时无法思考，请稍后再试。";
    }

    return "哎呀，思路断了。请换个方式问我，或者直接拨打人工热线 400-888-1234。";
  }
};
