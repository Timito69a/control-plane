export const State = {
  openTabs: [],
  activeTab: null,
  activeWorkspace: null,
  activeTenant: null,
  activeProject: null,
  activeUser: null,
  activeModule: null,
  eventLog: [],
  brainMemory: [],
  installedModules: [],
  persist() {
    try {
      localStorage.setItem('cp_openTabs', JSON.stringify(this.openTabs));
      localStorage.setItem('cp_activeTab', this.activeTab);
      localStorage.setItem('cp_activeWorkspace', this.activeWorkspace);
      localStorage.setItem('cp_brainMemory', JSON.stringify(this.brainMemory));
    } catch {}
  },
  load() {
    try {
      this.openTabs = JSON.parse(localStorage.getItem('cp_openTabs')) || [];
      this.activeTab = localStorage.getItem('cp_activeTab') || null;
      this.activeWorkspace = localStorage.getItem('cp_activeWorkspace') || null;
      this.brainMemory = JSON.parse(localStorage.getItem('cp_brainMemory')) || [];
    } catch {}
  }
};
State.load();