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

let simonPattern = [];
let userPattern = [];

function randomColor(x,y){
    return Math.ceil(Math.random() * (4 - 1) + 1);
}

function lightOn (i) {
    simonButtons[simonPattern[i]].style.opacity = .2;
    setTimeout(() => {
        lightOff(i);
    }, 500)
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
            document.getElementById("message").innerHTML = "Wrong Pattern. Game Over."
            simonPattern = [];
            userPattern = [];
            return false;
        }
        if (userPattern.length === simonPattern.length) {
            userPattern =[];
            document.getElementById("message").innerHTML = "You won this round! Keep going!";
            startRound();
        }
}

for ( let i = 1; i <= Object.keys(simonButtons).length; i++) {
    simonButtons[i].addEventListener('click', () => {
        userInput(i)
    });
}

startButtons[1].addEventListener('click', () => {
    document.getElementById("message").innerHTML = "Repeat the pattern";
    startRound();
});

startButtons[2].addEventListener('click', () => {
    simonPattern = [];
    userPattern = [];
    for (let i = 1; i < Object.keys(simonButtons).length; i++) {
        simonButtons[i].style.opacity = 1;
    }
    document.getElementById("message").innerHTML = "Game reset.";
})

