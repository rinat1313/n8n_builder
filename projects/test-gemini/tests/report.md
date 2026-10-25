# Отчёт тестировщика — test-gemini

Дата: 2026-10-25T12:00:00Z  
Артефакт: `configs/test-gemini/telegram-gemini-flash.json`  
Статус: **pass** (статический разбор; live n8n/Telegram/Gemini в этой среде недоступны)

## Проверено

| Проверка | Результат |
| --- | --- |
| JSON валиден, импортируемая структура nodes/connections | pass |
| Цепочка: Trigger → Config → IF text → IF owner → Prepare → HTTP → Postprocess → Send | pass |
| User text уходит в `contents` без обёрток | pass |
| В Send только `$json.text` чанка | pass |
| Не-текст / чужой chat — false-ветки пустые | pass |
| История и логи в staticData | pass |
| Дробление длинных ответов | pass |
| Секреты не захардкожены (плейсхолдеры credential / chat id) | pass |

## Замечания (не блокер)

1. Live-прогон на self-hosted после подстановки token / API key / chat id — на стороне пользователя.
2. Если Google вернёт 404 на `gemini-3.1-flash`, сменить model в Set Config.
3. Правки в конфиг тестировщик не вносил.
