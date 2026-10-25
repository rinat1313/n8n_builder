import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "list_projects and ensure_project create an isolated project triad.",
  async test(t) {
    await t.send(
      'Call list_projects, then ensure_project with name "smoke-demo" and title "Smoke Demo". Do not invent other tools.',
    );
    t.succeeded();
    t.calledTool("list_projects");
    t.calledTool("ensure_project");
  },
});
