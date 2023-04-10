"use strict";
// --- GLOBAL ---
// DOM References
const numbers_DOM = document.querySelectorAll("#number");
const operators_DOM = document.querySelectorAll("#operator");
const equals_DOM = document.querySelector("#equals");
const allClear_DOM = document.querySelector("#clear");
const decimal_DOM = document.querySelector("#decimal");
const screenTop_DOM = document.querySelector(".screen-top");
const screenBottom_DOM = document.querySelector(".screen-bottom");

// Global Variables
let num1 = "";
let num2 = "";
let currOperator = null;
let nextOperator = null;
let screenHasToBeReset = false; // Signifies if it is time for the user to choose the 2nd operand

// --- MAIN CODE ---
fullReset();
numbers_DOM.forEach(n => n.addEventListener("click", runOnNumberKey));
operators_DOM.forEach(n => n.addEventListener("click", runOnOperatorKey));
equals_DOM.addEventListener("click", runOnEqualsKey);
allClear_DOM.addEventListener("click", fullReset);

// --- FUNCTION DECLARATIONS ---
function runOnNumberKey(e) {
  // Resets screen for new operation, after the result of previous one had ended through equals key (=)
  if (screenTop_DOM.textContent !== "\xa0" && currOperator === null) {
    screenTop_DOM.textContent = "\xa0";
    screenBottom_DOM.textContent = "\xa0";
  }
  // Resets bottom screen only if the value is true
  if (screenHasToBeReset) {
    screenBottom_DOM.textContent = "\xa0";
    screenHasToBeReset = false;
  }
  // Appends the number to the bottom screen
  if (screenBottom_DOM.textContent.length <= 5) {
    screenBottom_DOM.textContent += e.target.textContent;
  }
}

function runOnOperatorKey(e) {
  // If the first thing user clicks is an operator, this makes sure it does nothing
  if (screenBottom_DOM.textContent === "\xa0") {
    return;
  }
  else if (!screenHasToBeReset) {
    // When chaining operators, stores selected operator in nextOperator
    if (num1 !== "" && currOperator !== null) {
      num2 = screenBottom_DOM.textContent;
      nextOperator = e.target.value;
      num1 = operate(+num1, +num2, currOperator);
      screenBottom_DOM.textContent = num1;
      screenTop_DOM.textContent = `${num1} ${currOperator}`;
      screenHasToBeReset = true;
    }
    // Run only for the first time after clear all & equals
    else {
      num1 = screenBottom_DOM.textContent;
      currOperator = e.target.value;
      screenTop_DOM.textContent = `${num1} ${currOperator}`;
      screenHasToBeReset = true;
    }
  }
  // Changes to the newest selected operator, if user clicks operator keys consecutively
  else {
    currOperator = e.target.value;
    screenTop_DOM.textContent = `${num1} ${currOperator}`;
  }

}

function runOnEqualsKey() {
  // If user doesn't choose num2 & presses equals
  if (currOperator === null || screenHasToBeReset) {
    screenTop_DOM.textContent = "\xa0";
  }
  // Takes num2 & operates & reset values for next operation
  else {
    num2 = screenBottom_DOM.textContent;
    screenTop_DOM.textContent = `${+num1} ${currOperator} ${+num2}`;
    num1 = operate(+num1, +num2, currOperator);
    screenBottom_DOM.textContent = num1;
    num2 = "";
    currOperator = null;
    nextOperator = null;
  }
}

function dispResultOnScreen() {
  screenBottom_DOM.textContent = num1;
}

function fullReset() {
  num1 = "";
  num2 = "";
  currOperator = null;
  nextOperator = null;
  screenTop_DOM.textContent = "\xa0";
  screenBottom_DOM.textContent = "\xa0";
}

function operate(num1, num2, op) {
  switch (op) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      console.log("Invalid Operator");
      return;
  }
}

function add(num1, num2) {
  const result = num1 += num2;
  updateVariables();
  return result;
}

function subtract(num1, num2) {
  const result = num1 -= num2;
  updateVariables();
  return result;
}

function multiply(num1, num2) {
  const result = num1 *= num2;
  updateVariables();
  return result;
}

function divide(num1, num2) {
  // if (num2 === 0) 
  const result = num1 /= num2;
  updateVariables();
  return result;
}

function updateVariables() {
  num2 = "";
  currOperator = nextOperator;
}