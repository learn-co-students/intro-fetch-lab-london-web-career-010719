//attach listeners
document.querySelector('#crawlBtn').addEventListener('click',() => {
    const crawlEl = document.querySelector('#crawlDiv')
    getOpeningCrawl(1)
        .then(crawl => crawlEl.innerText = crawl )
})
document.querySelector('#planetForm').addEventListener('submit', () => {
    const planetEl = document.querySelector('#planetData')
    const userInput = document.querySelector('#planetInput').value
    getPlanetNameAndClimate(userInput)
        .then(planet => planetEl.innerText = `${planet['name']} is ${planet['climate']}`)
})
//DO NOT GET WHY THIS IS NOT WORKING
window.addEventListener("load", () => {
    //2:C3PO, 3:R2D2 
    // getCharacter(2).then(char => console.log(char))
    // getCharacter(3).then(char => console.log(char))
})



//takes a movieID input and returns an opening crawl in a promise
function getOpeningCrawl(movieId) {
    return getMovie(movieId)
        .then(json => json['opening_crawl'])
}
//takes a movieID and returns a promise containing JSON for that movie
function getMovie(movieId) {
    return fetch(`https://swapi.co/api/films/${movieId}/`)
        .then(resp => resp.json())
}
//takes a planet Id and if it is valid, return a promise with name and climate
function getPlanetNameAndClimate(planetId){
    if (planetId > 0 && planetId <= 60){
        return fetch(`https://swapi.co/api/planets/${planetId}/`)
            .then(resp => resp.json())
            .then(planet => {
                return {name: planet['name'], climate: planet['climate']}
        })
    }
}
//gets data on a character, if id is valid returns a promise conataining data
function getCharacter(charId){
    return fetch(`https://swapi.co/api/people/${charId}/`)
        .then(resp => resp.json())
        .then(character => {
            return { 
                name: character['name'], 
                height: character['height'], 
                mass: character['mass'] }
        })
}

