## Серверная часть

- [ ] **Шаг 1. Сервис.** В `server/services/cards.service.ts` добавить функцию `toggleDone(id: string, isDone: boolean): Promise<Card | null>`. Находит карточку по id, меняет поле `isDone`, возвращает обновлённую карточку. Если карточки нет — возвращает `null`.
  - **Проверка:** поиск по файлу `cards.service.ts` не находит слов `req`, `res`, `status`. Функция асинхронная.

- [ ] **Шаг 2. Middleware.** Создать `server/middleware/validateToggleDone.ts`. Проверяет, что `req.body.isDone` существует и имеет тип `boolean`. При ошибке → `res.status(400).json({ error: "..." })` и `return`. При успехе → `next()`.
  - **Проверка:** `curl -X PATCH http://localhost:3001/cards/1/done -H "Content-Type: application/json" -d '{"isDone":"yes"}'` возвращает 400. `curl ... -d '{"isDone":true}'` проходит дальше (пока 404, т.к. контроллера ещё нет).

- [ ] **Шаг 3. Контроллер.** В `server/controllers/cards.controller.ts` добавить функцию `toggleDone(req: Request, res: Response)`. Достаёт `id` из `req.params`, `isDone` из `req.body`, вызывает `await cardsService.toggleDone(id, isDone)`. Если результат `null` → `res.status(404).json({ error: "Карточка не найдена" })`. Иначе → `res.status(200).json(card)`.
  - **Проверка:** `curl -X PATCH http://localhost:3001/cards/nonexistent/done -H "Content-Type: application/json" -d '{"isDone":true}'` возвращает 404.

- [ ] **Шаг 4. Роутер.** В `server/routes/cards.routes.ts` импортировать `validateToggleDone` и добавить строку: `cardsRouter.patch("/:id/done", validateToggleDone, cardsController.toggleDone)`. Параметрический путь — в конце файла, после всех точных (если они есть).
  - **Проверка:** `curl -X PATCH http://localhost:3001/cards/<реальный_id>/done -H "Content-Type: application/json" -d '{"isDone":true}'` возвращает 200 и обновлённую карточку. Повторный запрос с `{"isDone":false}` снимает отметку.

## Клиентская часть

- [ ] **Шаг 5. Чекбокс на карточке.** В компоненте карточки (там, где рендерится `BoardCard`) добавить `<input type="checkbox" checked={card.isDone} onChange={...} />`. При изменении вызывать мутацию.
  - **Проверка:** клик по чекбоксу меняет вид карточки (приглушённая/зачёркнутая ↔ обычная).

- [ ] **Шаг 6. Мутация.** Создать мутацию через Tanstack Query: `mutationFn` отправляет `PATCH /cards/${id}/done` с телом `{"isDone": boolean}`. В `onSuccess` вызвать `queryClient.invalidateQueries({ queryKey: ["cards"] })`.
  - **Проверка:** после клика по чекбоксу список карточек перезапрашивается, состояние переживает обновление страницы (F5).

## Финализация

- [ ] **Шаг 7. Архивация.** Запустить навык `/openspec-archive`. Убедиться, что в `openspec/changes/archive/<дата>-mark-card-done/` лежат все пять файлов: `proposal.md`, `spec.md`, `design.md`, `tasks.md`, `report.md`.
  - **Проверка:** папка архива создана, все файлы на месте.

- [ ] **Шаг 8. Коммиты и MR.** История коммитов читается как постановка → решение → шаги реализации → архивация. Открыт merge request из `feature/mark-card-done` в `main` **своей копии** (не в репозиторий курса) с описанием: что сделано и как проверить.
  - **Проверка:** MR открыт, описание заполнено, чек-лист из тикета пройден.