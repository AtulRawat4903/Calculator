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
    if (b === 0) {
        return "Bruhh, you can't divide by 0!!";
    }
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
const clearButton = document.querySelector(".clearbtn");
const decimalButton = document.querySelector('[data-number="."]');

let firstNumber = "";
let currentNumber = "";
let operator = "";
let shouldResetDisplay = false;


function updateDisplay() {
    currentOperand.textContent = currentNumber || "0";
    decimalButton.disabled = currentNumber.includes(".");
}

function appendNumber(number) {
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (shouldResetDisplay) {
        currentNumber = number;
        shouldResetDisplay = false;
    } else if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (firstNumber === "") {
        firstNumber = currentNumber;
    }

    if (shouldResetDisplay) {
        operator = selectedOperator;
        return;
    }

    if (operator !== "") {
        calculate();
        firstNumber = currentNumber;
    }

    operator = selectedOperator;
    shouldResetDisplay = true;
}

function calculate() {
    if (firstNumber === "" || operator === "") {
        return;
    }
    currentNumber = operate(Number(firstNumber), operator, Number(currentNumber));

    if (typeof currentNumber === "number") {
        currentNumber = Number(currentNumber.toFixed(6));
    }

    updateDisplay();

    firstNumber = "";
    operator = "";
    shouldResetDisplay = true;
}

function clearCalculator() {
    firstNumber = "";
    currentNumber = "0";
    operator = "";
    shouldResetDisplay = false;

    updateDisplay();
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

clearButton.addEventListener("click", () => {
    clearCalculator();
})