# Архитектура (architect)

```text
Telegram User (owner)
    │ message.text
    ▼
n8n (self-hosted)
    ├─ filter: text only
    ├─ filter: allowedChatId
    ├─ staticData: histories[chatId] + logs[]
    ├─ Google AI Studio API
    │     model: gemini-3.1-flash
    │     generateContent(contents)
    └─ reply: split ≤4000 → sendMessage × N
```

- Credentials снаружи workflow (Telegram + API key) — пользователь привяжет.
- История в `$getWorkflowStaticData('global')` — переживает execution на self-hosted.
- Конфиг (model, chatId, chunk size) — нода Set в начале цепочки.
