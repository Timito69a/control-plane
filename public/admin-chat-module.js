(function () {

  function createUI(container) {
    container.innerHTML = `
      <div style="padding:16px;">
        <h2>🧠 Admin Brain</h2>

        <div id="adminBrainLog" style="height:300px;overflow:auto;border:1px solid #333;padding:8px;margin-bottom:10px;"></div>

        <input id="adminBrainInput" placeholder="Befehl..." style="width:70%;" />
        <button id="adminBrainSend">Senden</button>
      </div>
    `;

    document.getElementById("adminBrainSend").onclick = () => {
      const input = document.getElementById("adminBrainInput");
      const msg = input.value.trim();
      if (!msg) return;
      input.value = "";

      if (window.Events) {
        window.Events.emit("ui:chat:send", { message: msg });
      }
    };
  }

  function mount() {
    const views = document.querySelector(".workspace-views");
    if (!views) return;

    if (document.querySelector('[data-workspace="admin-brain"]')) return;

    const section = document.createElement("section");
    section.className = "workspace-view";
    section.setAttribute("data-workspace", "admin-brain");

    createUI(section);

    views.appendChild(section);
  }

  function addMenu() {
    const nav = document.querySelector("[data-workspace]");
    if (!nav) return;

    if (document.querySelector('[data-workspace="admin-brain"]')) return;

    const li = document.createElement("li");
    li.className = "nav-item";
    li.setAttribute("data-workspace", "admin-brain");

    li.innerHTML = `
      <div class="nav-item-label">
        <span>🧠 Admin Chat</span>
      </div>
    `;

    nav.parentNode.appendChild(li);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      addMenu();
      mount();
    }, 100);
  });

})();
