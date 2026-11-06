import { createCard, deleteCard, getAllCards, toggleDone as toggleDoneService } from "../services/cards.service.ts";
import type { Request, Response } from "express";

export function get(req: Request, res: Response) {
  const ourCards = getAllCards();

  res.json(ourCards);
}

export function post(req: Request, res: Response) {
  const title = req.body.title;
  const newCard = createCard(title);

  res.status(201).json(newCard);
}

export function del(req: Request, res: Response) {
  const id = req.query.id?.toString();

  if (!id) {
    res.sendStatus(400);
    return;
  }
  const isDeleted = deleteCard(id);

  if (!isDeleted) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
}

export async function toggleDone(req: Request, res: Response) {
  const { id } = req.params;
  const { isDone } = req.body;

  
  if (typeof id !== "string") {
    res.status(400).json({ error: "id обязателен" });
    return;
  }

  const card = await toggleDoneService(id, isDone);

  if (!card) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }

  res.status(200).json(card);
}