import { defineAgent } from "@grok/agent-sdk";
import { repoRoot } from "./lib/repo-root";

export default defineAgent({
  description:
    "Сборка проектов для n8n по ТЗ: планирование, специалисты, исполнение, тесты и документация.",
  model: {
    id: "grok-4.5",
    params: [
      { id: "effort", value: "high" },
      { id: "fast", value: "true" },
    ],
  },
  // Shared checkout so projects/, description/, configs/ persist across turns.
  local: {
    workspaceDir: repoRoot,
  },
});
