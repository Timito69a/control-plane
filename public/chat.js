document.addEventListener("DOMContentLoaded", () => {
  const log = document.getElementById("chat-log");
  const input = document.getElementById("chat-input");
  const btn = document.getElementById("chat-send");

  function addMessage(text, type="user") {
    const el = document.createElement("div");
    el.innerHTML = `<b>${type}:</b> ${text}`;
    el.style.marginBottom = "10px";
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  btn.onclick = () => {
    const text = input.value;
    if (!text) return;

    addMessage(text, "user");

    const result = window.ControlPlane.conversation.process(
      text,
      window.ControlPlane.brain.context
    );

    addMessage(result.response, "system");

    input.value = "";
  };
});
