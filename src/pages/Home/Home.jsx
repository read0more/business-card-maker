import React, { useRef, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";
import CardMaker from "../../components/CardMaker/CardMaker";
import CardPreview from "../../components/CardPreview/CardPreview";

const Home = ({ firebase, handleLogout }) => {
  const [cards, setCards] = useState([]);
  const previousChildrenCount = useRef(0);

  useEffect(() => {
    const firebaseCardsRef = firebase.getUserDatabaseRef();
    const emptyCard = {
      id: Date.now(),
      name: "",
      company: "",
      theme: "light",
      position: "",
      email: "",
      introduce: "",
      filename: "",
    };

    firebaseCardsRef.on("value", (snapshot) => {
      const newCards = [];
      const snapshotValue = snapshot.val();
      const childrenCount = snapshot.numChildren();

      for (let key in snapshotValue) {
        newCards.push({ id: key, ...snapshotValue[key] });
      }

      if (previousChildrenCount.current < childrenCount) {
        emptyCard.id = Date.now();
      }
      previousChildrenCount.current = childrenCount;

      newCards.push(emptyCard);
      setCards(newCards);
    });
  }, [firebase]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles["card-maker"]}>
          <h2 className={styles.title}>Card Maker</h2>
          {cards.map((card, index) => {
            return (
              <CardMaker
                key={card.id}
                firebase={firebase}
                card={card}
                isNewCard={index === cards.length - 1}
              />
            );
          })}
        </section>
        <section className={styles["card-preview"]}>
          <h2 className={styles.title}>Card Preview</h2>
          {cards.map((card) => (
            <CardPreview key={card.id} card={card} />
          ))}
        </section>
      </main>
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
      <Footer />
    </>
  );
};

export default Home;
