# Схема n8n (n8n-specialist)

| # | Node | Назначение |
| --- | --- | --- |
| 1 | Telegram Trigger | Входящие message updates |
| 2 | Set Config | `allowedChatId`, `model`, `chunkSize` |
| 3 | IF Has Text | есть `message.text` |
| 4 | IF Owner | `message.chat.id` == allowedChatId |
| 5 | Code Prepare | история + user turn as-is → body для API |
| 6 | HTTP Request | `generateContent` AI Studio |
| 7 | Code Postprocess | текст ответа, save history/log, chunks[] |
| 8 | Split Out | по chunks |
| 9 | Telegram Send | `text` = chunk, без подписей |

False-ветки IF никуда не подключены (тихий drop).

Credential slots: `telegramApi` ×2 (trigger + send), HTTP query auth / header для `key` AI Studio.
