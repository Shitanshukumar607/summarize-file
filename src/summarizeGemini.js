import { GoogleGenAI } from "@google/genai";

export async function summarizeGemini(content, apiKey) {
  if (!content || typeof content !== "string" || content.trim().length === 0) {
    console.error("\nFile is empty or invalid.");
    process.exit(1);
  }

  try {
    const genAI = new GoogleGenAI(apiKey);
    const prompt = `As an expert writer with more than a decade of experience please summarize the following in under 150 words words. Note the output will be displayed in terminal. You are allowed to rephrase given the summary means the same as the original text:\n\n${content}`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text =
      response?.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      null;

    if (!text) {
      console.error(
        "No summary generated. The API might have returned an unexpected response."
      );
      process.exit(1);
    }

    console.log("Summary:\n");
    console.log(text.trim());
  } catch (error) {
    const e = JSON.parse(error?.message);

    if (e?.error?.message?.includes("quota")) {
      console.error(
        "\nQuota exceeded. Please check your Google usage and limits."
      );

    } else if (e?.error?.message === "API key not valid. Please pass a valid API key.") {
      console.error("\nAPI key is not valid. Use `npx summarize --setup` to setup API key.");

    } else {
      console.error("An error occurred while summarizing:");
      console.error(e?.error?.message || error);
    }

    process.exit(1);
  }
}
