/**
 * Revisions by: Angelynne Pawaan
 * Project: Memory Workout - Everyday Sounds
 *
 * Author: Maximo Mena
 * GitHub: mmenavas
 * Twitter: @menamaximo
 * Project: Memory Workout
 * Description: This is a memory game written in pure JavaScript.
 */

/**
 * @TODO
 * - Implement support for multiple players.
 */

/**
 * @namespace The main application object
 */
var MemoryGame = {

  settings: {
    rows: 2,
    columns: 3
  },

  // Properties that indicate state
  cards: [], // Array of MemoryGame.Card objects
  attempts: 0, // How many pairs of cards were flipped before completing game
  mistakes: 0, // How many pairs of cards were flipped before completing game
  isGameOver: false,

  /**
   * Modify default settings to start a new game.
   * Both parameters need integers greater than one, and
   * at least one them  needs to be an even number.
   *
   * @param {number} columns
   * @param {number} rows
   * @return {array} shuffled cards
   */
  initialize : function(rows, columns) {
    var validOptions = true;

    // Validate arguments
    if (!(typeof columns === 'number' && (columns % 1) === 0 && columns > 1) ||
        !(typeof rows === 'number' && (rows % 1) === 0) && rows > 1) {
      validOptions = false;
      throw {
        name: "invalidInteger",
        message: "Both rows and columns need to be integers greater than 1."
      };
    }

    if ((columns * rows) % 2 !== 0) {
      validOptions = false;
      throw {
        name: "oddNumber",
        message: "Either rows or columns needs to be an even number."
      };
    }

    if (validOptions) {
      this.settings.rows = rows;
      this.settings.columns = columns;
      this.attempts = 0;
      this.mistakes = 0;
      this.isGameOver = false;
      this.createCards().shuffleCards();
    }

    return this.cards;
  },

  /**
   * Create an array of sorted cards
   * @return Reference to self object
   */
  createCards: function() {
    var cards = [];
    var count = 0;
    var maxValue = (this.settings.columns * this.settings.rows) / 2;
    while (count < maxValue) {
      // Card A
      cards[2 * count] = new this.Card(count + 1);
      // Card B (matching card)
      cards[2 * count + 1] = new this.Card(count + 1, true);
      count++;
    }

    this.cards = cards;

    return this;
  },

  /**
   * Rearrange elements in cards array
   * @return Reference to self object */

  shuffleCards: function() {
    var cards = this.cards;
    var shuffledCards = [];
    var randomIndex = 0;

    // Shuffle cards
    while (shuffledCards.length < cards.length) {

      // Random value between 0 and cards.length - 1
      randomIndex  = Math.floor(Math.random() * cards.length);

      // If element isn't false, add element to shuffled deck
      if(cards[randomIndex]) {

        // Add new element to shuffle deck
        shuffledCards.push(cards[randomIndex]);

        // Set element to false to avoid being reused
        cards[randomIndex] = false;
      }

    }

    this.cards = shuffledCards;

    return this;
  },

  /**
   * A player gets to flip two cards. This function returns information
   * about what happens when a card is selected
   *
   * @param {number} Index of card selected by player
   * @return {object} {code: number, message: string, args: array or number}
   */
  play: (function() {
    var cardSelection = [];
    var chosenCards = 0;
    var chosenValues = [];

    return function(index) {
      var status = {};
      var value = this.cards[index].value;
      var audio;

                  //audio.play();

      // If selected card is flipped
      if (this.cards[index].isRevealed) {


        // if statements that play sound
        if (value == 1)
        {
          audio = new Audio('texttone.mp3');
          audio.play();
        }
        else if (value == 2)
        {
          audio = new Audio('honk.mp3');
          audio.play();
        }
        else if (value == 3)
        {
          audio = new Audio('keys.mp3');
          audio.play();
        }
        else if (value == 4)
        {
          audio = new Audio('meow.mp3');
          audio.play();
        }
        else if (value == 5)
        {
          audio = new Audio('clock.mp3');
          audio.play();
        }
        else if (value == 6)
        {
          audio = new Audio('cry.mp3');
          audio.play();
        }
        else if (value == 7)
        {
          audio = new Audio('cough.mp3');
          audio.play();
        }
        else
        {
            audio = new Audio('woo.mp3');
            audio.play();
        }

        // Add card to cardSelection array
        cardSelection.push(index);

        // if two cards have been chosen
        if (cardSelection.length == 2) {
          this.attempts++;

          // If the two cards selected are not a match
          if (this.cards[cardSelection[0]].value !=
              this.cards[cardSelection[1]].value) {

            status.code = 3,
            status.message = 'No Match.';
          }

          // if the cards do match, check if you got all of thems
          else {
            chosenCards += 2;

            if (chosenCards == this.cards.length) {
              // Game over
              this.isGameOver = true;
              chosenCards = 0;
              chosenValues = [];
              status.code = 4,
              status.message = 'GAME OVER! Attempts: ' + this.attempts +
                  ', Mistakes: ' + this.mistakes;
            }

            // if there are still cards left, dictate it as a match
            else {
              status.code = 2,
              status.message = 'Match.';
              status.args = cardSelection;
            }

          }
          cardSelection = [];
        }
        // if one card was selected
        else {
          status.code = 1,
          status.message = 'Waiting for second card';
        }
      }
      // if selected card isn't revealed/ has been chosen
      else {
        status.code = 0,
        status.message = 'Choose another card';
      }

      return status;

    };
  })()

};
