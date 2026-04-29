(function () {
  const handlers = {};
  const middleware = [];

  function log(event, payload) {
    try {
      console.log("[EVENT]", event, JSON.stringify(payload));
    } catch {
      console.log("[EVENT]", event);
    }
  }

  const Events = {
    emit(event, payload) {
      log(event, payload);

      for (const mw of middleware) {
        try {
          const result = mw(event, payload);
          if (result === false) {
            console.warn("[BLOCKED]", event);
            return;
          }
        } catch (e) {
          console.error("[MIDDLEWARE ERROR]", e);
          return;
        }
      }

      if (handlers[event]) {
        handlers[event].forEach(fn => {
          try {
            fn(payload);
          } catch (e) {
            console.error("[HANDLER ERROR]", event, e);
          }
        });
      }
    },

    on(event, fn) {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(fn);
    },

    use(fn) {
      middleware.push(fn);
    }
  };

  window.Events = Events;
})();
