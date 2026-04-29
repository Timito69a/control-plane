import { Events } from './events.js';

Events.use((event, payload) => {
  // nur UI Events erlaubt (harte Regel)
  if (!event.startsWith("ui:")) {
    console.warn("[REJECT NON-UI EVENT]", event);
    return false;
  }

  return true;
});

console.log("[CONTROL] middleware active");
