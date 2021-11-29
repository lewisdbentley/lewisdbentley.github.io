// define elements to play with
const title = document.getElementById('title')
const play = document.getElementById('play')
const arrow = document.getElementById('arrow')
const next = document.getElementById('next')
const identicalButton = document.getElementById('0')
const minorSecondButton = document.getElementById('1')
const majorSecondButton = document.getElementById('2')
const minorThirdButton = document.getElementById('3')
const majorThirdButton = document.getElementById('4')
const fourthButton = document.getElementById('5')
const tritoneButton = document.getElementById('6')
const fifthButton = document.getElementById('7')
const minorSixthButton = document.getElementById('8')
const majorSixthButton = document.getElementById('9')
const minorSeventhButton = document.getElementById('10')
const majorSeventhButton = document.getElementById('11')
const octaveButton = document.getElementById('12')
const scoreKeeper = document.getElementById('scoreKeeper')
const totalKeeper = document.getElementById('total')
const percentKeeper = document.getElementById('percent')
const answerButtons = document.getElementById('middle')
const message = document.getElementById('message')

const intervalArray = [
    'identical',
    'the interval of a minor 2nd.',
    'the interval of a major 2nd.',
    'the interval of a minor 3rd.',
    'the interval of a major 3rd.',
    'the interval of a 4th.',
    'the interval of a tritone.',
    'the interval of a 5th.',
    'the interval of a minor 6th.',
    'the interval of a major 6th.',
    'the interval of a minor 7th.',
    'the interval of a major 7th.',
    'the interval of an octave.'
]

// define functionality
const audio = function() {
    note.play()
}

const audio2 = function() {
    note2.play()
}

function random (max) {
    return Math.floor(Math.random() * Math.floor(max))
}

const setup = function() {
    randomSelection = random(13)
    randomSelection2 = (randomSelection + random(13))
    interval = (randomSelection2 - randomSelection)
    note = new Audio(`./notes/${randomSelection}.mp3`)
    note2 = new Audio(`./notes/${randomSelection2}.mp3`)
    // console.log(randomSelection)
    // console.log(randomSelection2)
    // console.log(`the interval of ${intervalArray[interval]}`)
    message.textContent = ''
    identicalButton.style.backgroundColor = 'buttonface'
    minorSecondButton.style.backgroundColor = 'buttonface'
    majorSecondButton.style.backgroundColor = 'buttonface'
    minorThirdButton.style.backgroundColor = 'buttonface'
    majorThirdButton.style.backgroundColor = 'buttonface'
    fourthButton.style.backgroundColor = 'buttonface'
    tritoneButton.style.backgroundColor = 'buttonface'
    fifthButton.style.backgroundColor = 'buttonface'
    minorSixthButton.style.backgroundColor = 'buttonface'
    majorSixthButton.style.backgroundColor = 'buttonface'
    minorSeventhButton.style.backgroundColor = 'buttonface'
    majorSeventhButton.style.backgroundColor = 'buttonface'
    octaveButton.style.backgroundColor = 'buttonface'
}
setup()

const checker = function(selection, event) {
        let score = Number(scoreKeeper.firstChild.nodeValue)
        let total = Number(totalKeeper.firstChild.nodeValue)
        total++
        totalKeeper.firstChild.nodeValue = total
        const checkAnswer = Boolean(selection === interval)
        event.target.style.backgroundColor = 'red'
        message.textContent = `Incorrect, try again.`
        if (checkAnswer) {
            score++
            scoreKeeper.firstChild.nodeValue = score
            event.target.style.backgroundColor = 'green'
            message.textContent = `Correct, it's ${intervalArray[interval]}`
        }
        let percent = Math.floor((score / total) * 100)
        percentKeeper.firstChild.nodeValue = `(${percent}%)`
}

// interactive elements

play.addEventListener('click', function() {
    arrow.removeAttribute('style')
    start = null
    progress = null
    window.requestAnimationFrame(step)
    setTimeout(audio2, 1000)
    audio()
})

next.addEventListener('click', function(){
    arrow.removeAttribute('style')
    start = null
    progress = null
    setup()
})

identicalButton.addEventListener('click', function(event) {
    checker(0, event)
})
minorSecondButton.addEventListener('click', function(event) {
    checker(1, event)
})
majorSecondButton.addEventListener('click', function(event) {
    checker(2, event)
})
minorThirdButton.addEventListener('click', function(event) {
    checker(3, event)
})
majorThirdButton.addEventListener('click', function(event) {
    checker(4, event)
})
fourthButton.addEventListener('click', function(event) {
    checker(5, event)
})
tritoneButton.addEventListener('click', function(event) {
    checker(6, event)
})
fifthButton.addEventListener('click', function(event) {
    checker(7, event)
})
minorSixthButton.addEventListener('click', function(event) {
    checker(8, event)
})
majorSixthButton.addEventListener('click', function(event) {
    checker(9, event)
})
minorSeventhButton.addEventListener('click', function(event) {
    checker(10, event)
})
majorSeventhButton.addEventListener('click', function(event) {
    checker(11, event)
})
octaveButton.addEventListener('click', function(event) {
    checker(12, event)
})

// animation

let start;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  arrow.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
  if (progress < 4000) {
    window.requestAnimationFrame(step);
  }
}
