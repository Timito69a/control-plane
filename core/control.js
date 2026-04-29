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
    renderUsers();
  }

  function renderWorkspaces() {
    const container = document.querySelector("#workspaces");
    if (!container) return;

    const state = window.State.get();
    container.innerHTML = "";

    state.workspaces.forEach(ws => {
      const el = document.createElement("div");
      el.style.padding = "6px";
      el.textContent = "WS: " + ws.name;
      container.appendChild(el);
    });
  }

  function renderUsers() {
    let container = document.querySelector("#users");

    if (!container) {
      container = document.createElement("div");
      container.id = "users";
      container.style.marginTop = "10px";
      document.body.appendChild(container);
    }

    const state = window.State.get();
    container.innerHTML = "";

    state.users.forEach(u => {
      const el = document.createElement("div");
      el.style.padding = "4px";
      el.textContent = "User: " + u.name + " (" + u.role + ")";
      container.appendChild(el);
    });
  }

  console.log("[CONTROL] workspace + user control active");
})();
