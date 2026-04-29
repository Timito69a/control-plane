(function () {
  if (!window.Events) {
    console.error("[CONTROL] Events not available");
    return;
  }

  function runWhenReady(fn) {
    const tryRun = () => {
      if (
        window.ControlplaneBrain &&
        document.getElementById("adminBrainLog")
      ) {
        fn();
      } else {
        setTimeout(tryRun, 50);
      }
    };
    tryRun();
  }

  window.Events.use((event) => {
    if (!event.startsWith("ui:")) {
      console.warn("[REJECT NON-UI EVENT]", event);
      return false;
    }
    return true;
  });

  window.Events.on("ui:workspace:open", (payload) => {
    runWhenReady(() => {
      window.ControlplaneBrain.log(
        "SYSTEM",
        "Workspace geöffnet: " + (payload?.name || "Unnamed")
      );
    });
  });

  window.Events.on("ui:user:create", (payload) => {
    runWhenReady(() => {
      window.ControlplaneBrain.log(
        "SYSTEM",
        "User erstellt: " +
          (payload?.name || "User") +
          " (" + (payload?.role || "unknown") + ")"
      );
    });
  });

  window.Events.on("ui:chat:send", (payload) => {
    runWhenReady(async () => {
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

  console.log("[CONTROL] brain fully synced (UI + logic)");
})();
