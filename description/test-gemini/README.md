# Тест gemini

Telegram-бот как тонкий канал к **Gemini 3.1 Flash** (Google AI Studio). Пишете в бота — в ответ приходит только текст модели.

## Как работает

```text
вы (Telegram) → n8n → Gemini Flash (+ история) → только текст ответа → вы
```

1. Бот принимает **только текст**.
2. Отвечает **только вам** (ваш chat id в Set Config).
3. Каждое сообщение уходит в Gemini **как есть**, с историей этого чата.
4. Длинные ответы режутся на несколько сообщений (~4000 символов).
5. Переписка логируется в static data workflow.

## Импорт в n8n

Файл: `configs/test-gemini/telegram-gemini-flash.json`

1. Import from File в self-hosted n8n.
2. Создайте Telegram Bot в BotFather → credential **Telegram Bot** → привяжите к Trigger и Send.
3. Credential **Query Auth**: parameter name `key`, value = API key из AI Studio → привяжите к **HTTP Gemini**.
4. В ноде **Set Config** замените `CHANGE_ME_CHAT_ID` на свой chat id.
5. Activate workflow (нужен доступный webhook URL для Telegram).

## Проблемы и ограничения

- Пока не подставлены token / key / chat id — workflow не заработает.
- Имя модели `gemini-3.1-flash` задано по ТЗ; при 404 смените на актуальный id в AI Studio.
- Голос, фото, стикеры игнорируются.
- История живёт в static data этого workflow (сброс при удалении static data / копировании workflow на другой инстанс без данных).
