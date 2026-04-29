(function () {
  const WORKSPACE_ID = "chat-control";

  function render(container) {
    container.innerHTML = `
      <div class="workspace chat-control-workspace">
        <div class="content-header">
          <div class="breadcrumb">
            <span>Global Control Plane</span>
            <span>Chat Übersicht</span>
          </div>
          <div class="content-title-row">
            <div>
              <div class="content-title">Chat Control – Global Cognitive Operations</div>
              <div class="sub-context">
                Konzernweite Steuerung von Chats, AI-Managern, Workern, Rollen, Mandanten, APIs und Addons.
              </div>
            </div>
          </div>
        </div>

        <div class="layout-main">
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Executive AI Hierarchie</div>
                <div class="card-subtitle">Masterbrain, Manager und operative Worker</div>
              </div>
            </div>

            <table class="simple-table">
              <thead>
                <tr>
                  <th>Ebene</th>
                  <th>Rolle</th>
                  <th>Verantwortung</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="chatControlHierarchy">
                <tr><td>CEO</td><td>Masterbrain</td><td>Zentrale Steuerung aller kognitiven Chat-Operationen</td><td>Framework</td></tr>
                <tr><td>COO</td><td>Operations Manager</td><td>Mandanten, Projekte, Services, Betrieb</td><td>Framework</td></tr>
                <tr><td>CFO</td><td>Finance Manager</td><td>Banking, Accountancy, Billing, Transaktionen</td><td>Framework</td></tr>
                <tr><td>CTO</td><td>Technology Manager</td><td>System, Server, Datenbanken, APIs, Infrastruktur</td><td>Framework</td></tr>
                <tr><td>CHRO</td><td>User & Role Manager</td><td>Benutzer, Rechte, Rollen, Organisation</td><td>Framework</td></tr>
                <tr><td>CSO</td><td>Sales Manager</td><td>Vertrieb, Kunden, Key Accounts, Service</td><td>Framework</td></tr>
                <tr><td>CCO</td><td>Compliance Manager</td><td>Audit, Risiko, Policies, Freigaben</td><td>Framework</td></tr>
              </tbody>
            </table>
          </div>

          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title">Masterbrain Command</div>
                <div class="card-subtitle">Zentrale Steuerung über Events, Manager und Worker</div>
              </div>
            </div>

            <div id="adminBrainLog" style="height:280px;overflow:auto;border:1px solid var(--border-subtle);border-radius:8px;padding:8px;margin-bottom:8px;background:#fff;"></div>

            <div style="display:flex;gap:6px;">
              <input id="adminBrainInput" placeholder="Befehl an das Zentralhirn..." style="flex:1;border:1px solid var(--border-subtle);border-radius:999px;padding:7px 10px;" />
              <button class="ghost-button primary" id="adminBrainSend">Senden</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const btn = document.getElementById("adminBrainSend");
    const input = document.getElementById("adminBrainInput");

    if (btn && input) {
      btn.onclick = () => {
        const message = input.value.trim();
        if (!message) return;
        input.value = "";
        window.Events && window.Events.emit("ui:chat:send", { message });
      };
    }
  }

  function mount() {
    const views = document.querySelector(".workspace-views");
    if (!views) return;

    let section = document.querySelector('.workspace-view[data-workspace="' + WORKSPACE_ID + '"]');

    if (!section) {
      section = document.createElement("section");
      section.className = "workspace-view";
      section.setAttribute("data-workspace", WORKSPACE_ID);
      views.appendChild(section);
    }

    render(section);
  }

  function addMenu() {
    const firstNav = document.querySelector(".nav-list");
    if (!firstNav) return;

    if (document.querySelector('.nav-item[data-workspace="' + WORKSPACE_ID + '"]')) return;

    const li = document.createElement("li");
    li.className = "nav-item";
    li.setAttribute("data-workspace", WORKSPACE_ID);
    li.setAttribute("data-label", "Chat Übersicht");

    li.innerHTML = `
      <div class="nav-item-label">
        <span class="nav-item-icon">🧠</span>
        <span>Chat Übersicht</span>
      </div>
      <span class="status-pill status-pill--live"><span class="status-pill-dot"></span>Control</span>
    `;

    firstNav.prepend(li);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      addMenu();
      mount();
    }, 150);
  });
})();
