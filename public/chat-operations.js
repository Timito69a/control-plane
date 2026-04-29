document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#ops-table tbody");

  function randomRisk() {
    return ["🟢 Niedrig","🟡 Mittel","🔴 Hoch"][Math.floor(Math.random()*3)];
  }

  function generateRow() {
    return {
      name: "User " + Math.floor(Math.random()*1000),
      tenant: ["DE","US","EU"][Math.floor(Math.random()*3)],
      topic: ["CRM","ERP","Support","Legal"][Math.floor(Math.random()*4)],
      risk: randomRisk(),
      status: ["Offen","Aktiv","AI"][Math.floor(Math.random()*3)],
      ai: Math.random() > 0.5 ? "✔" : "—",
      activity: Math.floor(Math.random()*60)+"s"
    };
  }

  function render() {
    const row = generateRow();

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.tenant}</td>
      <td>${row.topic}</td>
      <td>${row.risk}</td>
      <td>${row.status}</td>
      <td>${row.ai}</td>
      <td>${row.activity}</td>
    `;

    table.prepend(tr);

    if (table.children.length > 20) {
      table.removeChild(table.lastChild);
    }
  }

  setInterval(render, 2000);
});
