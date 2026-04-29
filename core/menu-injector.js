document.addEventListener("DOMContentLoaded", () => {
  console.log("🧩 MENU INJECTOR");

  // 👉 Ziel: Executive Übersicht finden
  const items = document.querySelectorAll("li, .nav-item");

  let target = null;

  items.forEach(el => {
    if (el.textContent.includes("Executive Übersicht")) {
      target = el;
    }
  });

  if (!target) {
    console.warn("❌ Executive Übersicht nicht gefunden");
    return;
  }

  // 👉 existierenden Stil klonen (WICHTIG)
  const clone = target.cloneNode(true);

  clone.innerHTML = "💬 Chat Übersicht";
  clone.setAttribute("data-open-workspace", "admin-chat");

  // 👉 sauberes Einfügen
  target.parentNode.insertBefore(clone, target.nextSibling);

  console.log("✅ Chat Menü korrekt injiziert");
});
