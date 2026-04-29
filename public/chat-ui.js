document.addEventListener("DOMContentLoaded", () => {
  const log = document.getElementById("chat-log");
  const input = document.getElementById("chat-input");
  const btn = document.getElementById("chat-send");
  const ctx = document.getElementById("chat-context");

  if (!btn) return;

  function renderMessage(text, type="user") {
    const el = document.createElement("div");
    el.className = "chat-msg " + type;
    el.innerHTML = `<b>${type}:</b> ${text}`;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  function updateContext() {
    ctx.innerText = JSON.stringify(
      window.ControlPlane.brain.context,
      null,
      2
    );
  }

  btn.onclick = () => {
    const text = input.value;
    if (!text) return;

    renderMessage(text, "user");

    const result = window.ControlPlane.conversation.process(
      text,
      window.ControlPlane.brain.context
    );

    renderMessage(result.response, "system");

    updateContext();
    input.value = "";
  };
});
