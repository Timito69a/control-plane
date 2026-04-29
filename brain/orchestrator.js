import { Workers } from '../modules/module-runtime.js';

export const Orchestrator = {
  run(context) {
    console.log("🧭 ORCHESTRATOR RUN:", context);

    if (context.workspace === "user-edit") {
      Workers.run("user-profile-worker", context);
      Workers.run("role-check-worker", context);
      Workers.run("recommendation-worker", context);
    }
  }
};
