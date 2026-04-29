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

  // WORKSPACE
  window.Events.on("ui:workspace:open", (payload) => {
    window.State.addWorkspace({
      name: payload?.name || "Unnamed",
      ts: Date.now()
    });

    inject();
  });

  // USER
  window.Events.on("ui:user:create", (payload) => {
    console.log("[CONTROL ACTION] create user", payload);

    window.State.addUser({
      name: payload?.name || "User",
      role: payload?.role || "unknown",
      ts: Date.now()
    });

    inject();
  });

  // 🔥 WICHTIG: KEIN FULL RENDER → nur INJECTION
  function inject() {
    const state = window.State.get();

    const workspace = document.querySelector("#workspaces");
    if (!workspace) {
      console.warn("[INJECT] #workspaces fehlt");
      return;
    }

    // bestehenden Bereich NICHT löschen!
    let panel = document.querySelector("#cpanel");

    if (!panel) {
      panel = document.createElement("div");
      panel.id = "cpanel";
      panel.style.border = "1px solid #444";
      panel.style.marginTop = "10px";
      panel.style.padding = "8px";
      workspace.prepend(panel);
    }

    panel.innerHTML = "";

    // Workspaces anzeigen
    state.workspaces.forEach(ws => {
      const el = document.createElement("div");
      el.innerHTML = "<b>WS:</b> " + ws.name;
      panel.appendChild(el);
    });

    // Users anzeigen
    state.users.forEach(u => {
      const el = document.createElement("div");
      el.style.fontSize = "12px";
      el.textContent = "- " + u.name + " (" + u.role + ")";
      panel.appendChild(el);
    });
  }

  console.log("[CONTROL] injection mode active");
})();
