(function () {
  if (!window.Events) {
    console.error("[CONTROL] Events not available");
    return;
  }

  function waitForBrain(cb) {
    if (window.ControlplaneBrain) return cb();

    const interval = setInterval(() => {
      if (window.ControlplaneBrain) {
        clearInterval(interval);
        cb();
      }
    }, 10);
  }

  window.Events.use((event) => {
    if (!event.startsWith("ui:")) {
      console.warn("[REJECT NON-UI EVENT]", event);
      return false;
    }
    return true;
  });

  // 🔥 WORKSPACE
  window.Events.on("ui:workspace:open", (payload) => {
    waitForBrain(() => {
      window.ControlplaneBrain.log(
        "SYSTEM",
        "Workspace geöffnet: " + (payload?.name || "Unnamed")
      );
    });
  });

  // 🔥 USER
  window.Events.on("ui:user:create", (payload) => {
    waitForBrain(() => {
      window.ControlplaneBrain.log(
        "SYSTEM",
        "User erstellt: " +
          (payload?.name || "User") +
          " (" + (payload?.role || "unknown") + ")"
      );
    });
  });

  // 🔥 CHAT
  window.Events.on("ui:chat:send", (payload) => {
    waitForBrain(async () => {
      const message = payload?.message;
      if (!message) return;

      window.ControlplaneBrain.log("Du", message);

      const data = await window.ControlplaneBrain.api("/api/chat", {
        message
      });

      window.ControlplaneBrain.log(
        "Zentralhirn",
        data.reply || data.error || "Keine Antwort"
      );

      await window.ControlplaneBrain.refreshState();
    });
  });

  console.log("[CONTROL] brain-sync active");
})();
