const numberOneBtn = document.querySelector("#number-one")
const numberOneDiv = document.querySelector("#one-facts")
const numberInput = document.querySelector("#pick-a-number")
const mathFactDiv = document.querySelector("#random-math-fact")
const thisYearFactDiv = document.querySelector("#year-history")
const allTheNumBtn = document.querySelector("#all-numbers-button")
const allTheNumDiv = document.querySelector("#all-the-numbers")
const ul = document.createElement("ul")
allTheNumDiv.appendChild(ul)


// Number One
numberOneBtn.addEventListener("click", () => {
    return fetch('http://numbersapi.com/1/trivia')
    .then(res => res.text())
    .then(text => numberOneDiv.innerText = text)
})

// Pick a Number
numberInput.addEventListener("change", (e) => {
    let num = e.target.value
    if (isNaN(num)) {
        mathFactDiv.innerText = "please enter a valid number"
    } else {
        return fetch(`http://numbersapi.com/${num}/trivia`)
        .then(res => res.text())
        .then(text => mathFactDiv.innerText = text)
    }
})

// Those who fail to study history
document.addEventListener("DOMContentLoaded", (e) => {
    let d = new Date;
    let currentYear = d.getFullYear();
    function getYearFact() {
        fetch(`http://numbersapi.com/${currentYear}/year`)
        .then(res => res.text())
        .then(text => {thisYearFactDiv.innerText = text;})
        currentYear-- 
    }
    getYearFact();
    setInterval(getYearFact, 5000)
})


// All the Numbers
allTheNumBtn.addEventListener("click", () => {
    function createNumLis(json) {
        ul.innerHTML = ""
        for (let i = 0; i < Object.keys(json).length; i++){        
            const li = document.createElement("li")
            li.innerHTML = json[Object.keys(json)[i]]
            ul.appendChild(li)
        }
    }
    return fetch(`http://numbersapi.com/1..100`)
    .then(res => res.json())
    .then (json => createNumLis(json))
})
