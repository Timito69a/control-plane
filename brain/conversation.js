export const Conversation = {
  history: [],

  process(input, context) {
    console.log("💬 INPUT:", input);

    const intent = this.detectIntent(input);

    const message = {
      text: input,
      intent,
      ts: Date.now()
    };

    this.history.push(message);

    return this.route(intent, input, context);
  },

  detectIntent(input) {
    if (input.includes("projekt")) return "project";
    if (input.includes("user")) return "user";
    if (input.includes("hilfe")) return "help";
    return "general";
  },

  route(intent, input, context) {
    return {
      intent,
      response: "Verstanden: " + input
    };
  }
};
