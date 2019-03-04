export default {
    ShuffleCards (cards) {
        let counter = cards.length;

        while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
          counter--;
          let temp = cards[counter];
          cards[counter] = cards[index];
          cards[index] = temp;
        }
        return cards;
    }
}
