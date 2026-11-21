import express from "express";
import { createCard, deleteCard, getAllCards } from "./services/cards.service.ts";
import { del, get, post } from "./controllers/cards.controller.ts";
import { cardsRouter } from "./routes/cards.router.ts";
export const app = express();
app.use (express.json());
app.use(cardsRouter);