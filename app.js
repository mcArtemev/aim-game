const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 10;
let score = 0;

startBtn.addEventListener('click', e => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
       time = parseInt(e.target.getAttribute('data-time'));

       screens[1].classList.add('up');
       startGame();
    }
});

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
        createRandomCiv();
    }
    if (e.target.classList.contains('civ')) {
        score--;
        e.target.remove();
        createRandomCiv();
    } 
})

function startGame() {
    setInterval(decreaseTime, 1000);
    setTime(time);
    createRandomCircle();
    createRandomCiv();
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;

        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(50, 64);
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-size);
    const y = getRandomNumber(0, height-size);
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    board.append(circle);
}

function createRandomCiv() {
    const civ = document.createElement('div');
    const size = getRandomNumber(50, 64);
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-size);
    const y = getRandomNumber(0, height-size);
    civ.style.top = `${y}px`;
    civ.style.left = `${x}px`;

    civ.classList.add('civ');
    civ.style.width = `${size}px`;
    civ.style.height = `${size}px`;

    board.append(civ);
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}