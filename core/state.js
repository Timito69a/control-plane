(function () {
  const state = {
    workspaces: [],
    users: []
  };

  window.State = {
    get() {
      return state;
    },

    addWorkspace(ws) {
      state.workspaces.unshift(ws);
      console.log("[STATE] workspace added", ws);
    },

    addUser(user) {
      state.users.unshift(user);
      console.log("[STATE] user added", user);
    }
  };
})();
