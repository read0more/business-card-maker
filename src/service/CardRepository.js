import { firebaseDatabase } from "./firebase";

class CardRepository {
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`users/${userId}`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });

    return () => ref.off();
  }
  saveCard(userId, card) {
    firebaseDatabase.ref(`users/${userId}/${card.id}`).set(card);
  }

  removeCard(userId, card) {
    firebaseDatabase.ref(`users/${userId}/${card.id}`).remove();
  }
}

export default CardRepository;
