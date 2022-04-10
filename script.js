
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        //automatically clear when class is initiated
        this.clear();
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(num) {
        //make sure period can be inputted only once
        if (num === '.' && this.currentOperand.includes('.')) {
            return
        }
        else {
            this.currentOperand = this.currentOperand.toString() + num.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return
        }
        else if (this.previousOperand !== '') {
            this.compute();
        }
        else {
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
        

    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // check if there is no prev value.
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case 'X':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            default:
                return 
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
        if (this.operation != null) {
            this.previousOperandText.innerText =
            `${this.previousOperand} ${this.operation} ${this.currentOperand}`
        }
    }

}

const numBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calc = new Calculator(previousOperandText, currentOperandText);
// loop through number buttons if clicked
numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calc.appendNumber(btn.innerText);
        calc.updateDisplay();
    });
});

// loop through operation buttons if clicked
operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calc.chooseOperation(btn.innerText);
        calc.updateDisplay();
    });
});

// clear option
allClearBtn.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
})

// delete option
deleteBtn.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
})

// compute 

equalsBtn.addEventListener('click', () => {
    calc.compute();
    calc.updateDisplay();
});