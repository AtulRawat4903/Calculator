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
const deleteButton = document.querySelector(".deletebtn");

let firstNumber = "";
let currentNumber = "";
let operator = "";
let shouldResetDisplay = false;


function updateDisplay() {
    currentOperand.textContent = currentNumber || "0";
    decimalButton.disabled = currentNumber.toString().includes(".");
}

function appendNumber(number) {
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (shouldResetDisplay) {
        currentNumber = number;
        shouldResetDisplay = false;
    } else if (currentNumber === "") {
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
    currentNumber = String(operate(Number(firstNumber), operator, Number(currentNumber)));

    if (!isNaN(currentNumber)) {
        currentNumber = String(Number(Number(currentNumber).toFixed(6)));
    }

    updateDisplay();

    firstNumber = "";
    operator = "";
    shouldResetDisplay = true;
}

function clearCalculator() {
    firstNumber = "";
    currentNumber = "";
    operator = "";
    shouldResetDisplay = false;

    updateDisplay();
}

function deleteNumber() {
    if (shouldResetDisplay) {
        return;
    }

    currentNumber = currentNumber.slice(0, -1);

    if (currentNumber === "") {
        currentNumber = "";
    }

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

deleteButton.addEventListener("click", deleteNumber);