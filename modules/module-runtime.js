export const Workers = {
  run(workerId, context) {
    console.log("🤖 WORKER:", workerId, context.slots);

    if (workerId === "user-profile-worker") {
      console.log("👤 Profil laden für", context.user.name);
    }

    if (workerId === "role-check-worker") {
      console.log("🔐 Rollen:", context.slots.roles);
    }

    if (workerId === "recommendation-worker") {
      console.log("💡 Empfehlung für Module:", context.slots.modules);
    }
  }
};
