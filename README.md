# n8n_builder

Сервис предварительной сборки проектов для n8n: ТЗ → уточнение → решения → конфиги → тесты → описание.

## Хранилище

| Папка | Назначение |
| --- | --- |
| [`projects/`](projects/) | Данные по проектам (изолированно) |
| [`description/`](description/) | Краткие описания и инструкции для пользователя |
| [`configs/`](configs/) | Файлы экспорта для импорта в n8n |
| [`RULES.md`](RULES.md) | Правила именования и изоляции |

В каждой папке — подпапки с именем проекта.

## Агент

Проект Agent SDK: [`n8n_builder/`](n8n_builder/).

```bash
cd n8n_builder
npx @grok/agent-sdk validate --dir .
npx @grok/agent-sdk info --dir . --json
npx @grok/agent-sdk dev
```

Skills: `tz-pipeline`, `project-folders`.  
Subagents: planner, специалисты (architect, programmer, analyst, n8n-specialist, sql-programmer), executor, tester, technical-writer.
