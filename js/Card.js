/**
 * Revisions by: Angelynne Pawaan
 * Project: Memory Workout - Everyday Sounds
 *
 * Author: Maximo Mena
 * GitHub: mmenavas
 * Twitter: @menamaximo
 * Project: Memory Workout
 * Description: A JS, HTML and CSS based memory game.
 * The goal is to match each spectrogram with the sound associated with such.
 */

/**
 * @namespace Card object
 */
MemoryGame.Card = function(value, isMatchingCard) {
  this.value = value;
  this.isRevealed = true;

  if (isMatchingCard) {
    this.isMatchingCard = true;
  }

 this.reveal = function() {
    this.isRevealed = true;
  }

  this.conceal = function() {
    this.isRevealed = false;
  }
};
