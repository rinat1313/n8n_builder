# Данные (sql-programmer)

Отдельная СУБД не требуется для MVP.

| Store | Ключ | Содержимое |
| --- | --- | --- |
| workflow staticData.global.histories | telegram chat id (string) | Gemini `contents` turns |
| workflow staticData.global.logs | array | JSONL-подобные записи диалога |

Ротация: histories ≤ 40 turns на чат; logs ≤ 500 записей.

Если позже нужен диск/Postgres — вынести append лога отдельной нодой; контракт лог-записи уже задан.
