const baseURL = 'http://numbersapi.com/'

//attach listeners
document.querySelector('#number-one').addEventListener('click', () => {
    const factsEl = document.querySelector('#one-facts')
    getNumberTrivia(1)
        .then(trivia => factsEl.innerText = trivia)
})
document.querySelector('#pick-a-number').addEventListener('input', () => {
    const numberEl = document.querySelector('#pick-a-number')
    const factEl = document.querySelector('#random-math-fact')
    if (isNaN(parseInt(numberEl.value))) {
        factEl.innerText = 'please enter a valid number'
    } else {
        getNumberTrivia(numberEl.value)
            .then(mathFact => factEl.innerText = mathFact)
    }
})
window.addEventListener("load", () => {
    const historyEl = document.querySelector('#year-history')
    const year = new Date().getFullYear()
    let valid = true
    //FIND A BETTER WAY OF DOING THE BELOW!
    // while (valid){
    //     setTimeout(getYearTrivia(year)
    //         .then(fact => historyEl.innerText = fact)
    //         .catch(() => valid = false)
    //     , 0);
    // }
})



//returns a promise with triva text on a given number
function getNumberTrivia (number){
    return fetch(baseURL+number+'/trivia')
        .then(resp => resp.text())
}
//returns a promise with math text on a given number
function getNumberMath(number) {
    return fetch(baseURL+number+'/math')
        .then(resp => resp.text())
}
//returns a promise with math text on a given number
function getYearTrivia(year) {
    return fetch(baseURL+year+'/year')
        .then(resp => resp.text())
}

