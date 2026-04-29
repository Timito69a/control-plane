document.addEventListener("DOMContentLoaded", () => {
  console.log("UI BRIDGE ACTIVE");

  function hook() {
    if (!window.NeuroOpenWorkspaceTab) {
      console.log("⏳ waiting for NeuroOpenWorkspaceTab...");
      return setTimeout(hook, 300);
    }

    console.log("✅ Hooking NeuroOpenWorkspaceTab");

    const original = window.NeuroOpenWorkspaceTab;

    window.NeuroOpenWorkspaceTab = function(key, label) {
      console.log("WORKSPACE OPEN:", key, label);

      // 👉 Original UI bleibt
      const result = original.apply(this, arguments);

      // 👉 Event ins System
      if (window.ControlPlane?.events) {
        window.ControlPlane.events.emit("workspace:open", { key, label });
      }

      return result;
    };
  }

  hook();
});
