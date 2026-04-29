
window.ControlplaneBrain = {
  async api(path, payload){
    const res = await fetch(path, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload || {})
    });
    return await res.json();
  },

  log(role, text){
    const box = document.getElementById("adminBrainLog");
    if (!box) return;
    const row = document.createElement("div");
    row.style.marginBottom = "8px";
    row.innerHTML = "<strong>" + role + ":</strong><br>" + String(text || "").replace(/[&<>]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[s]));
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  },

  async refreshState(){
    const target = document.getElementById("adminBrainState");
    if (!target) return;
    const res = await fetch("/api/state");
    const data = await res.json();
    target.textContent = JSON.stringify(data, null, 2);
  },

  async send(){
    const input = document.getElementById("adminBrainInput");
    if (!input) return;
    const message = input.value.trim();
    if (!message) return;
    input.value = "";
    this.log("Du", message);
    const data = await this.api("/api/chat", {message});
    this.log("Zentralhirn", data.reply || data.error || "Keine Antwort");
    await this.refreshState();
  }
};

document.addEventListener("click", async (ev) => {
  const btn = ev.target.closest("[data-admin-action]");
  if (!btn) return;
  const action = btn.getAttribute("data-admin-action");
  if (action === "show-state") await window.ControlplaneBrain.refreshState();
  if (action === "new-task") {
    const input = document.getElementById("adminBrainInput");
    if (input) input.value = "erstelle task ";
    input && input.focus();
  }
  if (action === "save-state") await window.ControlplaneBrain.api("/api/state/save", {});
});

// === SAFE UI INTEGRATION ===
document.addEventListener("DOMContentLoaded", () => {

  // Sidebar Eintrag korrekt innerhalb bestehender Struktur hinzufügen
  const execItem = document.querySelector('[data-workspace="executive"]');
  if (execItem && !document.querySelector('[data-workspace="admin-brain"]')) {

    const li = document.createElement("li");
    li.className = "nav-item";
    li.setAttribute("data-workspace", "admin-brain");
    li.setAttribute("data-label", "Admin Chat");

    li.innerHTML = `
      <div class="nav-item-label">
        <span class="nav-item-icon">🧠</span>
        <span>Admin Chat</span>
      </div>
    `;

    execItem.parentNode.appendChild(li);
  }

  // Workspace korrekt registrieren (kein Overlay!)
  if (!document.querySelector('.workspace-view[data-workspace="admin-brain"]')) {

    const container = document.querySelector(".workspace-views");

    const section = document.createElement("section");
    section.className = "workspace-view";
    section.setAttribute("data-workspace", "admin-brain");

    section.innerHTML = `
      <header class="content-header">
        <h2>Zentralhirn</h2>
      </header>

      <div id="adminBrainLog" style="height:300px;overflow:auto;"></div>

      <input id="adminBrainInput" placeholder="Befehl..." />
      <button onclick="window.ControlplaneBrain.send()">Senden</button>
    `;

    container.appendChild(section);
  }

});
