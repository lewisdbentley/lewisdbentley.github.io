// define elements to play with
const play = document.getElementById('play')
const next = document.getElementById('next')
const cButton = document.getElementById('c')
const dButton = document.getElementById('d')
const scoreKeeper = document.getElementById('scoreKeeper')

// define variables
let randomSelection = random(2)
let note = new Audio(`./assets/${randomSelection}.mp3`)
let userInput;

console.log(randomSelection)

// define functionality
function random (max) {
    return Math.floor(Math.random() * Math.floor(max))
}

const setup = function() {
    randomSelection = random(2)
    note = new Audio(`./assets/${randomSelection}.mp3`)
    console.log(randomSelection)
}

const checker = function(selection) {
    let score = scoreKeeper.firstChild.nodeValue
    const checkAnswer = Boolean(selection === randomSelection)
    if (checkAnswer) {
        score++
        scoreKeeper.firstChild.nodeValue = score
    }
}

const audio = function() {
    note.play()
}

// interactive elements

play.addEventListener('click', audio)

next.addEventListener('click', setup)

cButton.addEventListener('click', function() {
    checker(0)
})

dButton.addEventListener('click', function() {
    checker(1)
})