import React from "react";
import Card from "../Card/Card";
import styles from "./CardPreview.module.css";

const CardPreview = ({ cards }) => (
  <section className={styles.preview}>
    <h1 className={styles.title}>Card Preview</h1>
    <ul className={styles.cards}>
      {Object.values(cards).map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </ul>
  </section>
);

export default CardPreview;
