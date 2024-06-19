const calculatorDisplay = document.querySelector('h1');
const inputBtns =  document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


function sendNumberValue(number) {
    // replace current display value if first value is entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // if current display value is 0 , replace it , if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number ;
    }
}




function addDecimal() {
    // if operator pressed don't add decimal
    if(awaitingNextValue) return;
    // if no decimal add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// calculate first and second operator depend on operator
const calculate = {
    '/' : (firstNumber , secondNmber) => firstNumber / secondNmber, 
    '*' : (firstNumber , secondNmber) => firstNumber * secondNmber, 
    '+' : (firstNumber , secondNmber) => firstNumber + secondNmber, 
    '-' : (firstNumber , secondNmber) => firstNumber - secondNmber, 
    '=' : (firstNumber , secondNmber) =>  secondNmber, 
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if(!firstValue) {
        firstValue = currentValue;
    } else { 
        const calculations = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculations;
        firstValue = calculations; 
    }
    awaitingNextValue = true;
    operatorValue = operator;

}

inputBtns.forEach((input) => {
    if(input.classList.length === 0) {
        input.addEventListener('click' , () => sendNumberValue(input.value));
    } else if (input.classList.contains('operator')){
        input.addEventListener('click' , () => useOperator(input.value));
    } else if (input.classList.contains('decimal')){
        input.addEventListener('click' , () => addDecimal());
    }
})


// reset display & all value
function resetAll() {
     firstValue = 0;
     operatorValue = '';
     awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// event listner
clearBtn.addEventListener('click' , resetAll);