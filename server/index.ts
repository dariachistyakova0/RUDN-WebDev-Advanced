import express from "express";
import { createCard, deleteCard, getAllCards } from "./services/cards.service.ts";

const app = express();

app.get("/cards", (req, res) => {

  const ourCards = getAllCards();

  res.json(ourCards);
})
app.post('/cards', (req, res) => {
  const title = req.body.title;
  const newCard = createCard(title);

  res.status(201).json(newCard);

});
app.delete('/cards', (req, res) => {
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
})
app.listen(3001, () => {
  console.log('Сервер запущен')
});

