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
2. Telegram Bot в BotFather → credential **Telegram Bot** → Trigger и Send.
3. Credential **Query Auth**: parameter name `key`, value = API key AI Studio → **HTTP Gemini**.
4. В **Set Config** замените `CHANGE_ME_CHAT_ID` на свой chat id.
5. У n8n должен быть **публичный HTTPS** webhook URL (см. ниже) → Activate workflow.

## Обязательно: HTTPS для Telegram Trigger

Нода **Telegram Trigger** регистрирует webhook в Telegram. Telegram **не принимает** `http://` и `localhost`.

Ошибка:

`Bad Request: bad webhook: An HTTPS URL must be provided for webhook`

значит бот/токен могут быть в порядке, а **URL инстанса n8n для webhook — не HTTPS**.

### Что сделать

1. Выставить переменную окружения n8n (и перезапустить):

```bash
WEBHOOK_URL=https://n8n.ваш-домен.ru/
```

(со слэшем в конце, именно `https://`)

2. Либо поставить n8n за reverse proxy с TLS (Caddy / nginx / Traefik).
3. Либо временно туннель: Cloudflare Tunnel или ngrok → тот же `WEBHOOK_URL=https://….trycloudflare.com/` / `https://….ngrok-free.app/`.
4. После смены URL: **Deactivate → Activate** workflow (чтобы webhook перерегистрировался).

Проверка: Settings → в n8n должен отображаться webhook base с `https://`. Можно вызвать `getWebhookInfo` у Bot API и убедиться, что URL на https.

## Проблемы и ограничения

- Пока не подставлены token / key / chat id — workflow не заработает.
- Без HTTPS webhook Telegram Trigger не активируется (см. выше) — это не ошибка токена бота.
- Имя модели `gemini-3.1-flash` по ТЗ; при 404 смените id в AI Studio / Set Config.
- Голос, фото, стикеры игнорируются.
- История в static data этого workflow.
