export const OpenAIClient = {
  async ask(prompt) {
    console.log("OPENAI REQUEST:", prompt);
    return { ok: true, answer: "OpenAI placeholder response" };
  }
};
