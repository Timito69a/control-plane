(function () {
  if (!window.Events) {
    console.error("[CONTROL] Events not available");
    return;
  }

  window.Events.use((event, payload) => {
    if (!event.startsWith("ui:")) {
      console.warn("[REJECT NON-UI EVENT]", event);
      return false;
    }
    return true;
  });

  // 🔥 Erste echte Steuerung
  window.Events.on("ui:test", (payload) => {
    console.log("[CONTROL ACTION] ui:test handled", payload);
  });

  console.log("[CONTROL] middleware + handlers active");
})();
