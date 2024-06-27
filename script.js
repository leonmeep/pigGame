"use strict";

const docQS = function (selector) {
  return document.querySelector(selector);
};
const docElId = function (selector) {
  return document.getElementById(selector);
};
//Selecting elements
const score0El = docQS("#score--0");
const score1El = docElId("score--1");
const current0El = docElId("current--0");
const current1El = docElId("current--1");
const diceEl = docQS(".dice");
const btnNew = docQS(".btn--new");
const btnRoll = docQS(".btn--roll");
const btnHole = docQS(".btn--hold");

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore = 0;

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
    current0El.textContent = currentScore; //CHANGE LATER
  } else {
    // Switch to next player
  }
});
