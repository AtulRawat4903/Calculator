function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstNumber, operator, currentNumber) {
    if (operator === "+") {
        return add(firstNumber, currentNumber);
    } else if (operator === "-") {
        return subtract(firstNumber, currentNumber);
    } else if (operator === "*") {
        return multiply(firstNumber, currentNumber);
    } else if (operator === "/") {
        return divide(firstNumber, currentNumber);
    } else {
        alert("Enter a valid operation!");
    }
}


const currentOperand = document.querySelector("#current-operand");
const numberButtons = document.querySelectorAll(".btn[data-number]");
const operatorButtons = document.querySelectorAll(".btn[data-operator]");
const equalsButton = document.querySelector(".equalsbtn");

let firstNumber = "";
let currentNumber = "0";
let operator = "";


function updateDisplay() {
    currentOperand.textContent = currentNumber;
}

function appendNumber(number) {
    if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    firstNumber = currentNumber;
    operator = selectedOperator;
    currentNumber = "0";

    updateDisplay();
}

function calculate() {
    currentNumber = operate(Number(firstNumber), operator, Number(currentNumber));

    updateDisplay();

    firstNumber = "";
    operator = "";
}


numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        appendNumber(event.target.dataset.number);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        chooseOperator(event.target.dataset.operator);
    });
});

equalsButton.addEventListener("click", () => {
    calculate();
});