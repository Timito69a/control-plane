(function () {
  function normalizeMenuState(activeItem) {
    var sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    sidebar.querySelectorAll(".nav-item").forEach(function (item) {
      item.classList.remove("active", "is-active", "selected", "current", "nav-active");
      item.removeAttribute("aria-selected");
      item.removeAttribute("data-active");
    });

    if (activeItem) {
      activeItem.classList.add("active");
      activeItem.setAttribute("aria-selected", "true");
    }
  }

  function findItem(evt) {
    return evt.target.closest(".sidebar .nav-item");
  }

  document.addEventListener("DOMContentLoaded", function () {
    console.log("🎯 Menu State Fix FINAL v4");

    var chatItem = Array.from(document.querySelectorAll(".sidebar .nav-item"))
      .find(function (item) {
        return (item.textContent || "").includes("Chat Übersicht");
      });

    if (chatItem) {
      chatItem.classList.remove("active", "is-active", "selected", "current", "nav-active");
      chatItem.setAttribute("data-workspace", "admin-chat");
      chatItem.setAttribute("data-label", "Chat Übersicht");
    }

    var activeItems = document.querySelectorAll(".sidebar .nav-item.active");
    if (activeItems.length > 1) {
      normalizeMenuState(activeItems[0]);
    }
  });

  document.addEventListener("click", function (evt) {
    var item = findItem(evt);
    if (!item) return;

    setTimeout(function () {
      normalizeMenuState(item);
      console.log("✅ Nur ein Menüpunkt aktiv:", (item.textContent || "").trim());
    }, 0);
  }, true);
})();
