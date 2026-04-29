document.addEventListener("DOMContentLoaded", () => {
  console.log("📦 Workspace Loader START");

  let container = document.querySelector("#workspaces");

  // 🔥 Container erzwingen (falls dein UI keinen hat)
  if (!container) {
    console.warn("⚠️ #workspaces nicht gefunden → wird erstellt");

    container = document.createElement("div");
    container.id = "workspaces";

    // 👉 in den Hauptbereich einfügen (rechts)
    const main = document.querySelector("main") || document.body;
    main.appendChild(container);
  }

  fetch("/admin-chat-workspace.html")
    .then(res => res.text())
    .then(html => {
      container.insertAdjacentHTML("beforeend", html);

      console.log("✅ Chat Workspace injected");

      // 🔥 Debug sichtbar machen
      const ws = document.querySelector('[data-workspace="admin-chat"]');
      if (ws) {
        ws.style.display = "block";
        ws.classList.add("active");
        console.log("🚀 Chat Workspace aktiv");
      } else {
        console.error("❌ Workspace nicht gefunden nach Insert");
      }
    })
    .catch(err => {
      console.error("❌ Workspace Load Fehler:", err);
    });
});
