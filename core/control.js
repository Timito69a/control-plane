(function () {
  if (!window.Events) {
    console.error("[CONTROL] Events not available");
    return;
  }

  window.Events.use((event) => {
    if (!event.startsWith("ui:")) {
      console.warn("[REJECT NON-UI EVENT]", event);
      return false;
    }
    return true;
  });

  // 🔥 WORKSPACE → Brain Log
  window.Events.on("ui:workspace:open", (payload) => {
    if (window.ControlplaneBrain) {
      window.ControlplaneBrain.log("SYSTEM", "Workspace geöffnet: " + (payload?.name || "Unnamed"));
    }
  });

  // 🔥 USER → Brain Log
  window.Events.on("ui:user:create", (payload) => {
    if (window.ControlplaneBrain) {
      window.ControlplaneBrain.log("SYSTEM",
        "User erstellt: " + (payload?.name || "User") +
        " (" + (payload?.role || "unknown") + ")"
      );
    }
  });

  // 🔥 CHAT → direkt ins Gehirn
  window.Events.on("ui:chat:send", async (payload) => {
    if (!window.ControlplaneBrain) return;

    const message = payload?.message;
    if (!message) return;

    window.ControlplaneBrain.log("Du", message);

    const data = await window.ControlplaneBrain.api("/api/chat", { message });

    window.ControlplaneBrain.log("Zentralhirn",
      data.reply || data.error || "Keine Antwort"
    );

    await window.ControlplaneBrain.refreshState();
  });

  console.log("[CONTROL] brain integration active");
})();
