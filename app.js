//Cache DOM elements
let simonButtons = {
  1: document.getElementById('red'),
  2: document.getElementById('orange'),
  3: document.getElementById('yellow'),
  4: document.getElementById('green')
}

let startButtons = {
  1: document.getElementById('start'),
  2: document.getElementById('reset')
}

let message = document.getElementById('message')

//Establish empty arrays
let simonPattern = [];
let userPattern = [];

//Functions
const randomColor = (x, y) => Math.ceil(Math.random() * (4 - 1) + 1);

const lightOn = (i) => {
  simonButtons[simonPattern[i]].style.opacity = .2;
  setTimeout(() => lightOff(i), 500);
}

function lightOff(i) {
  simonButtons[simonPattern[i]].style.opacity = 1;
  setTimeout(() => {
    i++
    if (i < simonPattern.length) {
      lightOn(i)
    }
  }, 500)
}

//Game logic
let startRound = function () {
  let newColor = randomColor();
  simonPattern.push(newColor);
  setTimeout(() => {
    lightOn(0);
  }, 500)
}

function userInput(b) {
  userPattern.push(b)
  if (userPattern[userPattern.length - 1] !== simonPattern[userPattern.length - 1]) {
    message.innerHTML = "Wrong Pattern. Game Over."
    simonPattern = [];
    userPattern = [];
    return false;
  }
  if (userPattern.length === simonPattern.length) {
    userPattern = [];
    message.innerHTML = "You won this round! Keep going!";
    startRound();
  }
}

//Event Listeners
for (let i = 1; i <= Object.keys(simonButtons).length; i++) {
  simonButtons[i].addEventListener('click', () => {
    userInput(i)
  });
}

startButtons[1].addEventListener('click', () => {
  message.innerHTML = "Repeat the pattern";
  startRound();
});

startButtons[2].addEventListener('click', () => {
  simonPattern = [];
  userPattern = [];
  for (let i = 1; i < Object.keys(simonButtons).length; i++) {
    simonButtons[i].style.opacity = 1;
  }
  message.innerHTML = "Game reset.";
})

