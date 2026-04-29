import { Orchestrator } from './orchestrator.js';
import { Slots } from './slots.js';

export const Brain = {
  context: {},
  memory: [],

  init() {
    console.log("🧠 BRAIN ONLINE");

    window.ControlPlane.events.on("workspace:open", (data) => {
      this.handleWorkspace(data);
    });
  },

  handleWorkspace(data) {
    this.context.workspace = data.key;
    this.context.label = data.label;

    this.remember("workspace.open", data);

    if (data.key === "user-edit") {
      this.loadUserContext(data.label);
    }

    Orchestrator.run(this.context);
  },

  loadUserContext(label) {
    const name = label.replace("Bearbeiten –", "").trim();

    const user = {
      name,
      id: Date.now()
    };

    console.log("👤 USER:", user);

    // 🔥 SLOTS ERZEUGEN
    const slots = Slots.createUserSlots(user);

    this.context.user = user;
    this.context.slots = slots;

    console.log("📦 SLOTS:", slots);

    this.remember("user.context.loaded", { user, slots });
  },

  remember(type, payload) {
    const event = { ts: new Date().toISOString(), type, payload };
    this.memory.push(event);
  }
};
