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

    render();
  });

  // USER
  window.Events.on("ui:user:create", (payload) => {
    console.log("[CONTROL ACTION] create user", payload);

    window.State.addUser({
      name: payload?.name || "User",
      role: payload?.role || "unknown",
      ts: Date.now()
    });

    render();
  });

  function render() {
    renderWorkspaces();
  }

  function renderWorkspaces() {
    const container = document.querySelector("#workspaces");
    if (!container) return;

    const state = window.State.get();
    container.innerHTML = "";

    state.workspaces.forEach(ws => {
      const el = document.createElement("div");
      el.style.padding = "8px";
      el.style.borderBottom = "1px solid #333";
      el.innerHTML = "<b>Workspace:</b> " + ws.name;

      // 🔥 USERS IM WORKSPACE ANZEIGEN
      const users = state.users || [];
      if (users.length) {
        const userBox = document.createElement("div");
        userBox.style.fontSize = "12px";
        userBox.style.marginTop = "4px";

        users.forEach(u => {
          const uEl = document.createElement("div");
          uEl.textContent = "- " + u.name + " (" + u.role + ")";
          userBox.appendChild(uEl);
        });

        el.appendChild(userBox);
      }

      container.appendChild(el);
    });
  }

  console.log("[CONTROL] unified workspace + user render active");
})();
