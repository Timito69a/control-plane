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

  window.Events.on("ui:workspace:open", (payload) => {
    if (!window.State) return;

    window.State.addWorkspace({
      name: payload?.name || "Unnamed",
      ts: Date.now()
    });

    inject();
  });

  window.Events.on("ui:user:create", (payload) => {
    console.log("[CONTROL ACTION] create user", payload);

    if (!window.State) return;

    window.State.addUser({
      name: payload?.name || "User",
      role: payload?.role || "unknown",
      ts: Date.now()
    });

    inject();
  });

  function inject() {
    // 🔥 HARTE ABSICHERUNG
    if (!window.State || !window.State.get) {
      return;
    }

    const state = window.State.get();

    const workspace = document.querySelector("#workspaces");
    if (!workspace) return;

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
  }

  function observe() {
    const observer = new MutationObserver(() => {
      inject();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 🔥 WICHTIG: WARTEN BIS ALLES GELADEN IST
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      observe();
      inject();
    }, 50);
  });

  console.log("[CONTROL] mutation observer stabilized (state-safe)");
})();
