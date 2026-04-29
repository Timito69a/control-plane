(function () {
  const state = {
    workspaces: []
  };

  window.State = {
    get() {
      return state;
    },

    addWorkspace(ws) {
      state.workspaces.unshift(ws);
      console.log("[STATE] workspace added", ws);
    }
  };
})();
