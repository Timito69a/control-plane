(function () {
  if (!window.Events) {
    console.error("[CONTROL] Events not available");
    return;
  }

  let isRendering = false;

  window.Events.use((event) => {
    if (!event.startsWith("ui:")) {
      console.warn("[REJECT NON-UI EVENT]", event);
      return false;
    }
    return true;
  });

  window.Events.on("ui:workspace:open", (payload) => {
    if (!window.State) return;

    window.State.addWorkspace({
      name: payload?.name || "Unnamed",
      ts: Date.now()
    });

    inject();
  });

  window.Events.on("ui:user:create", (payload) => {
    if (!window.State) return;

    window.State.addUser({
      name: payload?.name || "User",
      role: payload?.role || "unknown",
      ts: Date.now()
    });

    inject();
  });

  function inject() {
    if (isRendering) return;

    if (!window.State || !window.State.get) return;

    const workspace = document.querySelector("#workspaces");
    if (!workspace) return;

    isRendering = true;

    let panel = document.querySelector("#cpanel");

    if (!panel) {
      panel = document.createElement("div");
      panel.id = "cpanel";
      panel.style.border = "1px solid #444";
      panel.style.marginTop = "10px";
      panel.style.padding = "8px";
      panel.style.background = "#111";
      workspace.prepend(panel);
    }

    const state = window.State.get();

    panel.innerHTML = "";

    state.workspaces.forEach(ws => {
      const el = document.createElement("div");
      el.innerHTML = "<b>WS:</b> " + ws.name;
      panel.appendChild(el);
    });

    state.users.forEach(u => {
      const el = document.createElement("div");
      el.style.fontSize = "12px";
      el.textContent = "- " + u.name + " (" + u.role + ")";
      panel.appendChild(el);
    });

    isRendering = false;
  }

  function observe() {
    const observer = new MutationObserver(() => {
      if (!isRendering) {
        inject();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      observe();
      inject();
    }, 50);
  });

  console.log("[CONTROL] observer stabilized (loop-safe)");
})();
