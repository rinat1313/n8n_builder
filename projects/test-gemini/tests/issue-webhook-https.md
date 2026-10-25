# Известная проблема: HTTPS webhook

**Симптом:** `Bad Request: bad webhook: An HTTPS URL must be provided for webhook`  
**Когда:** Activate / Run с Telegram Trigger  
**Причина:** не токен бота, а URL webhook n8n без HTTPS (`http://`, localhost, внутренний IP).  
**Фикс:** `WEBHOOK_URL=https://…/` + TLS или туннель, затем переактивировать workflow.  
**Зафиксировано:** 2026-10-25 (по обратной связи пользователя)
