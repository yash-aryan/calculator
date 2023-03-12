"use strict";
// --- GLOBAL ---
// DOM References
const numbers_DOM = document.querySelectorAll("#number");
const operators_DOM = document.querySelectorAll("#operator");
const equals_DOM = document.querySelector("#equals");
const clear_DOM = document.querySelector("#clear");
const decimal_DOM = document.querySelector("#decimal");
const screenTop_DOM = document.querySelector(".screen-top");
const screenBtm_DOM = document.querySelector(".screen-bottom");

// Global Variables
let index;
let tempNumber = "";
let tempOperator = "";
let numbersArr = [];
let operatorsArr = [];

// --- MAIN CODE ---
numbers_DOM.forEach(n => n.addEventListener('click', storeOperatorInArr));
operators_DOM.forEach(n => n.addEventListener('click', storeNumberInArr));
equals_DOM.addEventListener('click', dispResultOnScreen);
clear_DOM.addEventListener('click', resetValues);


// --- FUNCTION DECLARATIONS ---
function storeOperatorInArr(e) {
  tempNumber += e.target.textContent;
  screenTop_DOM.textContent += e.target.textContent;
  if (tempOperator) {
    operatorsArr.push(tempOperator);
    tempOperator = "";
  }
}

function storeNumberInArr(e) {
  tempOperator = e.target.value;
  screenTop_DOM.textContent += e.target.textContent;
  if (tempNumber) {
    numbersArr.push(+tempNumber);
    tempNumber = "";
  }
}

function dispResultOnScreen() {
  if (tempNumber) {
    numbersArr.push(+tempNumber);
    tempNumber = "";
  }
  screenBtm_DOM.textContent = `${operate()}`;
}

function resetValues() {
  tempNumber = "";
  tempOperator = "";
  numbersArr = [];
  operatorsArr = [];
  screenTop_DOM.textContent = '\xa0';
  screenBtm_DOM.textContent = '\xa0';
}

function operate() {
  index = 0;
  let result = numbersArr.reduce((a, b) => {
    switch (operatorsArr[index]) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "*":
        return multiply(a, b);
      case "/":
        return divide(a, b);
      default:
        console.log("Invalid Operator");
        return;
    }
  });
  return result;
}

function add(a, b) {
  index++;
  return a += b;
}

function subtract(a, b) {
  index++;
  return a -= b;
}

function multiply(a, b) {
  index++;
  return a *= b;
}

function divide(a, b) {
  index++;
  return a /= b;
}
