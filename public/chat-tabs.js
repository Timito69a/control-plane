document.addEventListener("click", function (e) {
  const tab = e.target.closest("[data-chat-tab]");
  if (!tab) return;

  const key = tab.getAttribute("data-chat-tab");
  const root = tab.closest('[data-workspace="admin-chat"]') || document;

  root.querySelectorAll("[data-chat-tab]").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");

  root.querySelectorAll("[data-chat-panel]").forEach(panel => {
    panel.classList.toggle("active", panel.getAttribute("data-chat-panel") === key);
  });

  console.log("💬 Chat Verwaltung Tab:", key);
});
