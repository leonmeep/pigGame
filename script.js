"use strict";

const docQS = function (selector) {
  return document.querySelector(selector);
};
const docElId = function (selector) {
  return document.getElementById(selector);
};

//Selecting elements
const player0El = docQS(".player--0");
const player1El = docQS(".player--1");
const score0El = docQS("#score--0");
const score1El = docElId("score--1");
const current0El = docElId("current--0");
const current1El = docElId("current--1");
const diceEl = docQS(".dice");
const btnNew = docQS(".btn--new");
const btnRoll = docQS(".btn--roll");
const btnHold = docQS(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
  scores = [0, 0]; //big scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  docElId(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. Check for a rolled 1:
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      docElId(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to score to active player
    scores[activePlayer] += currentScore;

    //scores[1] = scores[1] + currentScore
    docElId(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      docQS(`.player--${activePlayer}`).classList.add("player--winner");
      docQS(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
