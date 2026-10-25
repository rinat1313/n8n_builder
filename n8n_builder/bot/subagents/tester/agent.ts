import { defineAgent } from "@grok/agent-sdk";

export default defineAgent({
  description:
    "Тестировщик: проверяет n8n-конфигурацию и черновики на корректность; замечания пишет в отчёт, код и конфиг сам не правит.",
});
