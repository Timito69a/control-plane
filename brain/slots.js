export const Slots = {
  createUserSlots(user) {
    console.log("📦 CREATE SLOTS FOR:", user.name);

    return {
      tenant: "default-mandant",
      roles: ["user"],
      permissions: ["read"],
      modules: ["crm", "erp"],
      context: {
        region: "EU",
        language: "de"
      }
    };
  }
};
