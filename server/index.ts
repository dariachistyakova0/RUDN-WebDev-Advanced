import express  from "express";
import cors from "cors";

const app = express();

app.use(express.json());

const cards = [
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
  app.get ("/cards",(req,res) =>{
    res.json(cards);
  })

  app.post("/cards",(req,res)=>{
    const title = req.body.title;

    const id = Math.ceil(Math.random()* 100);

    cards.push({id: String(id),
        title: title,
        isDone : false,
        isUrgent: false

    });
  })

  app.listen(3001,() =>{
    console.log('Сервер запущен')
  });

