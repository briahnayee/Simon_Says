
//Assign four colors to numbers in an object. For each colored button, set an event listener

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

//declare empty array for machine patterns
let simonPattern = [];
//declare empty array for user patterns
let userPattern = [];

function randomColor(x,y){
    return Math.ceil(Math.random() * (4 - 1) + 1);
}

//declare functions for lighting up buttons to patterns
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


//while the game is running
let startRound = function () {
    //generate random color
    let newColor = randomColor();
    //add first color to the pattern array
    simonPattern.push(newColor);
    //highlight the button that corresponds to each color in the pattern array with time delays between
    lightOn(0);
}

//when the user clicks a button...
function userInput(b) {
        //  store the button that the user clicked into a userClick array
        userPattern.push(b)
        //check if the inputted pattern matches order of the pattern array as user inputs 
        if (userPattern[userPattern.length - 1] !== simonPattern[userPattern.length - 1]) {
            alert("Game Over.")
            simonPattern = [];
            userPattern = [];
            return false;
        }
        //if arrays are the same length, check for match. If arrays match, repeat loop, otherwise reset game
        if (userPattern.length === simonPattern.length) {
            userPattern =[];
            startRound();
        }
}

//when the user clicks a button, store the button that the user clicked into a userClick array
simonButtons[1].addEventListener('click', () => {
    userInput(1)
});
simonButtons[2].addEventListener('click', () => {
    userInput(2)
});
simonButtons[3].addEventListener('click', () => {
    userInput(3)
});
simonButtons[4].addEventListener('click', () => {
    userInput(4)
});

//on start button click, start game 
startButtons[1].addEventListener('click', startRound)


//comment