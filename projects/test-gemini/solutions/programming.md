# Логика (programmer)

## Prepare

- `histories[chatId]` — массив `{role:'user'|'model', parts:[{text}]}`.
- Новый user turn: `text` из Telegram **без** trim-нормализации смысла (только String()).
- В API уходит полный `contents` = history + новый user.

## Postprocess

- Склеить `candidates[0].content.parts[].text`.
- Если пусто — не слать в Telegram (опционально лог error).
- Добавить model turn в history; кап истории 40 turns (20 пар).
- Лог: `{ts, chatId, user, assistant}` → `logs[]`, кап 500.
- Chunks: резать по `chunkSize` (4000), по границам `\n` если возможно.

## Send

- Каждый chunk — отдельный `sendMessage`, поле `text` только содержимое chunk.
