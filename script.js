"use strict";

const docQS = function (selector) {
  return document.querySelector(selector);
};
const docElId = function (selector) {
  return document.getElementById(selector);
};

const switchPlayer = function () {
  docElId(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
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

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0]; //big scores
let currentScore = 0;
let activePlayer = 0;

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
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
});

btnHold.addEventListener("click", function () {
  //1. Add current score to score to active player
  scores[activePlayer] += currentScore;

  //scores[1] = scores[1] + currentScore
  docElId(`score--${activePlayer}`).textContent = scores[activePlayer];

  //2. Check if player's score is >=100
  // Finish the game

  //Switch to the next player
  switchPlayer();
});
