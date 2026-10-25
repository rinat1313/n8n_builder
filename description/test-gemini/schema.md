# Схема

```mermaid
sequenceDiagram
  participant U as Вы (Telegram)
  participant N as n8n
  participant G as Gemini 3.1 Flash

  U->>N: text
  N->>N: filter text + owner
  N->>N: load history
  N->>G: contents (as-is + history)
  G->>N: text
  N->>N: save history + log, chunk
  N->>U: text only (1..N messages)
```
