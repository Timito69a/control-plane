export const Tabs = {
  container: null,
  tabs: [],

  init() {
    this.container = document.querySelector('#tabs');

    if (!this.container) {
      console.warn("Tabs container missing → Tabs disabled");
      return;
    }

    this.sync();
  },

  sync() {
    if (!this.container) return;
    this.render();
  },

  render() {
    if (!this.container) return;

    try {
      this.container.innerHTML = this.tabs.map(t => 
        `<div class="tab">${t.label}</div>`
      ).join('');
    } catch (e) {
      console.warn("Tabs render failed:", e.message);
    }
  }
};
