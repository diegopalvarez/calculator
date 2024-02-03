let fistNumber, lastNumber, operator
let displayText = ""

function add(a, b){
    return a+b
}

function subtract(a, b){
    return a-b
}

function multiply(a,b){
    return a*b
}

function divide(a, b){
    return a/b
}

function operate(operator, a,b){
    switch(operator){
        case "+":
            return add(a,b)
        case "-":
            return subtract(a,b)
        case "*":
            return multiply(a,b)
        case "/":
            return divide(a,b)
        default:
            return "ERROR"
    }
}

//EXPONENTIATION IS MISSING!!!

const firstReg = /\(([^)]+)\)/g
const secondReg = /\d+(\*|\/)\d+/g
const lastReg = /\d+(\+|\-)\d+/g
function compute(text){
    const order = [firstReg, secondReg, lastReg]
    for (let priority of order){
        while (text.match(priority) !== null){  //Doesn't respect order inside parentheses
            let item = text.match(priority)
            for (let i of item){
                text = text.replace(i, operateString(i))
            }
        }
    }
    return text
}

function operateString(string){
    string = string.split("")
    string[0]=="(" ? string.splice(0, 1) : string
    string[string.length - 1]==")" ? string.splice(string.length - 1, 1) : string
    string = string.join("")
    let operator = String(string.match(/[^\d]/))
    let numbers = string.split(/\+|\-|\*|\//)
    let [a, b] = numbers
    return operate(operator, +a, +b)
}

const body = document.querySelector("body")
const display = body.querySelector("#display")
const buttonsDiv = body.querySelector("#buttons")
const buttonNodeList = buttonsDiv.querySelectorAll("button:not(.special)")
const clearButton = buttonsDiv.querySelector("#clear")
const equalButton = buttonsDiv.querySelector("#equal")

buttonNodeList.forEach((button)=>{
    button.addEventListener("click", (e)=>{
        displayText+=e.target.textContent
        display.textContent = displayText
    })})

clearButton.addEventListener("click", ()=>{
    displayText = 0
    display.textContent = displayText
})

equalButton.addEventListener("click", ()=>{
    display.textContent = compute(displayText)
})