// Write your numbers code in this file!

// number one fact
let getFactsBtn = document.querySelector('button#number-one')
let displayFactsEl = document.querySelector('div#one-facts')

function fetchdata(number){
  return fetch(`http://numbersapi.com/${number}/trivia`)
    .then(res => res.text())
}

function writeFactOne(text){
  displayFactsEl.innerText = text;
}

getFactsBtn.addEventListener('click',()=>{
  fetchdata(1)
    .then(writeFactOne);
})



/// pick a number
let numberInputEl = document.querySelector('input#pick-a-number')
let numberFactsEl = document.querySelector('div#random-math-fact')

function writeFactRandom(text){
  numberFactsEl.innerText = text
}

numberInputEl.addEventListener('input',(event)=>{
  const number = parseInt(event.target.value);
  if (isNaN(number)){
    writeFactRandom('please enter a valid number')
  }
  else {
    fetchdata(number)
      .then(writeFactRandom)
  }
})


// fail to stuy history
document.addEventListener('DOMContentLoaded', loadHistory)

function loadHistory(){
  let historyFactsEl = document.getElementById('year-history')
  let currentYear = (new Date).getFullYear()

  function writeFactYear(text){
    historyFactsEl.innerText = text
  }

  function historyFlash(){
    fetch(`http://numbersapi.com/${currentYear}/year`)
      .then(res => res.text())
      .then(writeFactYear)
      currentYear --;
  }
  historyFlash()
  setInterval(historyFlash, 5000)
}


//All the Numbers
let hundredRandomEl = document.querySelector('#all-numbers-button')
let hundredRandomFactsEl = document.querySelector('#all-the-numbers')
hundredRandomFactsEl.innerHTML = '<ul></ul>'
let insertPoint = hundredRandomFactsEl.querySelector('ul')
hundredRandomEl.addEventListener('click', loadHundredRandomFacts)

function loadHundredRandomFacts(){
  fetch("http://numbersapi.com/1..100")
    .then(res => res.json())
    .then(writeFactRandomFactofHundre)
}

function writeRandomFactofOne(text){
  insertPoint.innerHTML += `<li>${text}</li>`
}

function writeFactRandomFactofHundre(factObject){
  insertPoint.innerHTML = ''
  for (const number in factObject) {
    writeRandomFactofOne(factObject[number])
  }
}

// one hundred randome number between 0 - 1000
function randomeNumberGenerator(){
  let randomNumbers = [];
  for (i=0; i<100; i++) {
    let number = Math.round(Math.random()*1000)
    randomNumbers.push(number)
  }
  return randomNumbers;
}
