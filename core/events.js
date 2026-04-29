export const Events = (() => {
  const handlers = {};
  return {
    emit(event, payload) {
      if (handlers[event]) {
        handlers[event].forEach(fn => {
          try { fn(payload); } catch (e) { /* swallow errors for safety */ }
        });
      }
    },
    on(event, fn) {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(fn);
    }
  };
})();