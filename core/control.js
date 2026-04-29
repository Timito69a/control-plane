(function () {
  if (!window.Events) {
    console.error("[CONTROL] Events not available");
    return;
  }

  // 🔒 nur UI Events erlauben
  window.Events.use((event, payload) => {
    if (!event.startsWith("ui:")) {
      console.warn("[REJECT NON-UI EVENT]", event);
      return false;
    }
    return true;
  });

  // 🔥 TEST HANDLER
  window.Events.on("ui:test", (payload) => {
    console.log("[CONTROL ACTION] ui:test handled", payload);
  });

  // 🔥 WORKSPACE OPEN
  window.Events.on("ui:workspace:open", (payload) => {
    console.log("[CONTROL ACTION] open workspace", payload);

    const container = document.querySelector("#workspaces");
    if (!container) {
      console.warn("[WORKSPACE] container missing");
      return;
    }

    const el = document.createElement("div");
    el.style.padding = "8px";
    el.style.borderBottom = "1px solid #333";
    el.textContent = "Workspace: " + (payload?.name || "Unnamed");

    container.prepend(el);
  });

  console.log("[CONTROL] middleware + handlers active");
})();
