// ELEMENTS
const numberEl = document.querySelectorAll('.num') // Numbers
const dotEl = document.querySelector('.dot')
const opEl = document.querySelectorAll('.op') // Operations
const deleteEl = document.querySelector('.delete')
const allClearEl = document.querySelector('.clear')
const equalEl = document.querySelector('.equal')
// Outputs
const prev = document.querySelector('.previous')
const curr = document.querySelector('.current')

// Calculator Class
class Calculator {
    constructor() {
        this.clearAll()
        // we need this variable because we use '÷' instead of '/'
        this.curr = curr.textContent
        this.dot = 0
    }

    clearAll() {
        prev.textContent = curr.textContent = this.curr = ''
    }

    delete() {
        curr.textContent = curr.textContent.slice(0, curr.textContent.length - 1)
        this.curr = this.curr.slice(0, this.curr.length - 1)
    }

    appendNum(numberStr) {
        curr.textContent += numberStr
        this.curr += numberStr
    }

    appendDot() {
        if (this.dot === 1) return
        this.dot++
        curr.textContent += '.'
        this.curr += '.'
    }

    appendOp(op) {
        // if no number has entered
        if (curr.textContent.length === 0) return
        // if a dot has pressed for previous operation, subtract 1
        if (this.dot === 1) this.dot--
        // last operation, it can be number, dot, operation
        const lastOp = curr.textContent.slice(-1)
        // if last operation is same as the current operation, return
        if (lastOp === op) return
        // ex: 66+ ``user clicks '-'`` res: 66- ---- this changes the last operation with current if it's necessary
        else if ((lastOp === '*' || lastOp === '÷' || lastOp === '+' || lastOp === '-') && (op === '÷' || op === '*' || op === '+')) {
            if (lastOp === '÷' || lastOp === '*' || lastOp === '-' || lastOp === '+' && op === '÷' || op === '*' || op === '-' || op === '+') return
            curr.textContent += op
            if (op === '÷') this.curr = curr.textContent.slice(0, curr.textContent.length - 1) + '/'
            else this.curr = curr.textContent
        } else {
            curr.textContent += op
            if (op === '÷') this.curr = curr.textContent.slice(0, curr.textContent.length - 1) + '/'
            else this.curr += op
        }
    }

    displayRes() {
        // string calculation to number
        function parse(str) {
            return Function(`'use strict'; return (${str})`)()
        }
        prev.textContent = curr.textContent
        curr.textContent = parse(this.curr)
        this.curr = curr.textContent
    }
}

// Calculator
const calculator = new Calculator()

// Event Handlers
// Append Number
numberEl.forEach(el => el.addEventListener('click', () => {
    calculator.appendNum(el.textContent)
}))

// Append Dot
dotEl.addEventListener('click', calculator.appendDot.bind(calculator))

// Operations
opEl.forEach(operation => operation.addEventListener('click', () => {
    calculator.appendOp(operation.textContent)
}))

// Equals
equalEl.addEventListener('click', calculator.displayRes.bind(calculator))

// All Clear 
allClearEl.addEventListener('click', calculator.clearAll.bind(calculator))

// Delete
deleteEl.addEventListener('click', calculator.delete.bind(calculator))
