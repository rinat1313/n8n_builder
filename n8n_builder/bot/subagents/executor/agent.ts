import { defineAgent } from "@grok/agent-sdk";

export default defineAgent({
  description:
    "Исполнитель: по задачам planner собирает готовые конфигурации (экспорт) для загрузки в n8n; черновики в projects, финал в configs после тестов.",
});
