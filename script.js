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

const firstReg = /\(([^)]+)\)/g
function compute(text){
    let parentheses = text.match(firstReg)
    parentheses.forEach(e => e.replace(/\(|\)/g, ""))
    console.log(parentheses)
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