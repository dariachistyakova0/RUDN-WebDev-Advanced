import { useState } from "react";
import styles from "./NewCardForm.module.css";
import { createCard } from "../../api/cards";

export function NewCardForm() {
  const[inputText,setInputText] = useState('');

  const mutation = useMutation ({mutationFn: createCard})

  return (
    <div className={styles.form}>
      <input
       className={styles.input} 
       placeholder="Название карточки" />
      <button className={styles.button} type="button">
        Добавить
      </button>
    </div>
  );
}
