import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";
import CardMaker from "../../components/CardMaker/CardMaker";
import CardPreview from "../../components/CardPreview/CardPreview";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Home = ({ FileInput, authService, cardRepository }) => {
  const historyState = useHistory().state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [cards, setCards] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
      setLoading(false);
    });

    return () => stopSync();
  }, [userId, cardRepository]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [authService, userId, history]);

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });

    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });

    cardRepository.removeCard(userId, card);
  };
  return (
    <section className={styles.home}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <CardMaker
              FileInput={FileInput}
              cards={cards}
              addCard={createOrUpdateCard}
              updateCard={createOrUpdateCard}
              deleteCard={deleteCard}
            />
            <CardPreview cards={cards} />
          </>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Home;
