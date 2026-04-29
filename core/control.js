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

  window.Events.on("ui:test", (payload) => {
    console.log("[CONTROL ACTION] ui:test handled", payload);
  });

  // 🔥 STATE FIRST (nicht mehr direkt DOM!)
  window.Events.on("ui:workspace:open", (payload) => {
    console.log("[CONTROL ACTION] open workspace", payload);

    if (!window.State) {
      console.warn("[STATE] not available");
      return;
    }

    window.State.addWorkspace({
      name: payload?.name || "Unnamed",
      ts: Date.now()
    });

    renderWorkspaces();
  });

  function renderWorkspaces() {
    const container = document.querySelector("#workspaces");
    if (!container) return;

    const state = window.State.get();
    container.innerHTML = "";

    state.workspaces.forEach(ws => {
      const el = document.createElement("div");
      el.style.padding = "8px";
      el.style.borderBottom = "1px solid #333";
      el.textContent = "Workspace: " + ws.name;
      container.appendChild(el);
    });
  }

  console.log("[CONTROL] middleware + state handlers active");
})();
