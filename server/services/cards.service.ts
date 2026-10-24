import { Card } from "../types/card.ts";

let cards: Card[] = [
    {
      "id": "1",
      "title": "Спроектировать структуру доски",
      "isDone": true,
      "isUrgent": false
    },
    {
      "id": "2",
      "title": "Подключить доску к серверу",
      "isDone": false,
      "isUrgent": true
    },
    {
      "id": "3",
      "title": "Добавить фильтр выполненных карточек",
      "isDone": false,
      "isUrgent": false
    }
  ];
   export function getAllCards(){
    return cards;
  }
export function createCard (title:string){
    const newCard: Card ={
        id: "2",
        title: "title",
        isDone: false,
        isUrgent: false
    };

cards.push(newCard);
return newCard;
}

export function deleteCard(id:string){
    const newCards = cards.filter(
        card => card.id !== id
    );
cards = newCards;
    return newCards.length !== cards.length;
}