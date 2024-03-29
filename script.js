let displayText = ""
let disabled = true

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
            return b==0 ? "Cannot divide by 0" : divide(a,b)
        default:
            return "ERROR"
    }
}
const decimalNumbers = "\\d+\\.?\\d*"
const firstPart = "\\(([^)]+)\\)"
const secondPart = "(\\*|\\/)"
const lastPart = "(\\+|\\-)"

const firstReg = new RegExp (firstPart, "g")
const secondReg = new RegExp ("("+decimalNumbers+")"+secondPart+"("+decimalNumbers+")", "g")
const lastReg = new RegExp ("("+decimalNumbers+"|\-"+decimalNumbers+")"+lastPart+"("+decimalNumbers+")", "g")
function compute(text){
    const order = [firstReg, secondReg, lastReg]
    for (let priority of order){
        while (text.match(priority) !== null){
            let item = text.match(priority)
            for (let i of item){
                if (i.split(/\+|\d+\-|\*|\//).length <= 2){
                    let result = operateString(i)
                    if (isNaN(result))
                        return result
                    text = text.replace(i, result)
                }
                else
                    text = text.replace(i, compute(i.slice(0,-1).slice(1)))
                text = text.replaceAll("--", "+")
            }
        }
    }
    return text
}

function operateString(string){
    string = string.split("")
    if (string[0]=="(")
        string.splice(0, 1)
    if (string[string.length - 1]==")")
        string.splice(string.length - 1, 1)
    let cutString = string.slice(0)     //Copies value, not reference. One method to have them separate
    if (string[0]=="-")
        if (string.length >2)    
            cutString.splice(0, 1)
    
    string = string.join("")
    cutString = cutString.join("")
    let operator = String(cutString.match(/\+|\-|\*|\//))
    let splitPosition = string.lastIndexOf(operator)
    let [a, b] = [string.slice(0, splitPosition), string.slice(splitPosition+1)]
    return operate(operator, +a, +b)
}

function checkParentheses(string){
    let openingParentheses = 0
    let closingParentheses = 0

    for (let i of string){
        if (i=="(")
            openingParentheses++
        else if (i==")")
            closingParentheses++
        if (openingParentheses<closingParentheses)
            return false
    }
    return openingParentheses == closingParentheses ? true : false
}

const body = document.querySelector("body")
const display = body.querySelector("#display")
const container = body.querySelector('#container')
const buttonNodeList = container.querySelectorAll("button:not(#equal, #clear)")
const clearButton = container.querySelector("#clear")
const equalButton = container.querySelector("#equal")
const operatorButton = container.querySelectorAll(".operator")
const message = body.querySelector('#message')

buttonNodeList.forEach((button)=>{
    button.addEventListener("click", (e)=>{
        if (displayText.length < 13){
            displayText+=e.target.textContent
            display.textContent = displayText
            if (disabled)
                toggleOperator()
        }
    })})

clearButton.addEventListener("click", ()=>{
    displayText = ""
    display.textContent = "0"
})

equalButton.addEventListener("click", ()=>{
    if (checkParentheses(displayText)){
        display.textContent = compute(displayText).slice(0,13)
    }
    else{
        display.textContent = "ERROR"
        displayText = ""
    }
    displayText = ""
})

operatorButton.forEach((button)=>{
    button.addEventListener("click", toggleOperator)
})

function toggleOperator(){
    operatorButton.forEach((e) => e.disabled = !disabled)
    disabled = !disabled
}

let special = [0,1,4]
for (let i of special)
    operatorButton[i].disabled = true

document.addEventListener("keydown", (event)=>{
    switch (event.key){
        case "Enter":
            equalButton.click()
            break
        case "Delete":
            clearButton.click()
            break
        case "Backspace":
            displayText = displayText.slice(0, -1)
            display.textContent = displayText
            break
        default:
            for (let i of buttonNodeList){
                if (i.textContent == event.key){
                    i.click()
                }
            }
            break
        
    }
})

message.addEventListener("click", ()=>{
    body.removeChild(message)
})