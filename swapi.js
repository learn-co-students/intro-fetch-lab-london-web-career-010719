const crawlBtn = document.querySelector("#crawlBtn")
const crawlDiv = document.querySelector("#crawlDiv")
const searchForm = document.querySelector("#planetForm")
const planetDataDiv = document.querySelector("#planetData")

// Event Handler
function getOpeningCrawl(e) {
    return fetch('https://swapi.co/api/films/1/')
    .then(res => res.json())
    .then(json => {
        crawlDiv.innerHTML = json["opening_crawl"]
    })
}

function getPlanet(e) {
    e.preventDefault();
    let input = parseInt(searchForm.elements[0].value) //"123"
    if (input > 0, input < 61) {
        //display the name and climate of the planet
        return fetch(`https://swapi.co/api/planets/${input}/`)
        .then(res => res.json())
        .then(json => {
            planetDataDiv.innerText = `${json["name"]}: ${json["climate"]}`
        })
    } else {
        planetDataDiv.innerText = "The planet number is between 1 and 60."
    }
}

function getDroids() {
    let droidsArr = [];
    for (let i =0; i < arguments.length; i++ ) {droidsArr.push(arguments[i])}
    for (const el of droidsArr) {
        fetch(`https://swapi.co/api/people/${el}/`)
        .then(res => res.json())
        .then(json => {
            document.querySelector(`#droid-${el}`).innerHTML = 
            `<span>Name: ${json["name"]}</span><br> 
            <span>Height: ${json["height"]}</span><br>
            <span>Mass: ${json["mass"]}</span><br>
            <button id = "droid-${el}-btn">🌏</button>
            <hr>`
            getHomePlanet(json, el)
        })
    }
}

function getHomePlanet(json, el) {
    document.addEventListener("click", (e) => {
        if(e.target.id === `droid-${el}-btn`) {
            fetch(json["homeworld"])
            .then(res => res.json())
            .then(json => {
                document.querySelector(`#droid-${el}`).innerHTML =      `<span>Name: ${json["name"]}</span><br> 
                <span>Climate: ${json["climate"]}</span><br>
                <hr>`
            })
        }
    })
}


// Event Listener
crawlBtn.addEventListener("click", getOpeningCrawl)
searchForm.addEventListener("submit", getPlanet)
document.addEventListener("DOMContentLoaded", getDroids(2,3))