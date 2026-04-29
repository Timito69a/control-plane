export const Modules = {
  list: [],

  init() {
    console.log("MODULE SYSTEM READY");
  },

  register(mod) {
    this.list.push(mod);
    console.log("MODULE REGISTERED", mod);
  }
};
