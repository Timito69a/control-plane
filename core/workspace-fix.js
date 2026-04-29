document.addEventListener("DOMContentLoaded", () => {
  console.log("🛠 Workspace Fix aktiv");

  // 🔥 EIN globaler Click Handler (delegiert)
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-open-workspace]");
    if (!el) return;

    const key = el.getAttribute("data-open-workspace");

    console.log("👉 Workspace Klick:", key);

    // 👉 ALLE deaktivieren
    document.querySelectorAll(".workspace-view").forEach(w => {
      w.classList.remove("active");
    });

    // 👉 Ziel aktivieren
    const target = document.querySelector(
      `.workspace-view[data-workspace="${key}"]`
    );

    if (target) {
      target.classList.add("active");
    } else {
      console.warn("❌ Workspace fehlt:", key);
    }
  });

});
