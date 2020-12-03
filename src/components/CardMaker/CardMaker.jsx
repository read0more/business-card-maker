import React from "react";
import CardAddForm from "../CardAddForm/CardAddForm";
import CardEditForm from "../CardEditForm/CardEditForm";
import styles from "./CardMaker.module.css";

const CardMaker = ({ FileInput, cards, addCard, updateCard, deleteCard }) => (
  <section className={styles.maker}>
    <h1 className={styles.title}>Card Maker</h1>
    {Object.values(cards).map((card) => (
      <CardEditForm
        FileInput={FileInput}
        key={card.id}
        card={card}
        updateCard={updateCard}
        deleteCard={deleteCard}
      />
    ))}
    <CardAddForm FileInput={FileInput} key={"test"} onAdd={addCard} />
  </section>
);

export default CardMaker;
