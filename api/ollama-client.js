export const OllamaClient = {
  async ask(prompt) {
    console.log("OLLAMA REQUEST:", prompt);
    return { ok: true, answer: "Ollama placeholder response" };
  }
};
