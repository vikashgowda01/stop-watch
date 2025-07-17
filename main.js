let startTime, updatedTime, difference, timerInterval;
let running = false;
let lapCounter = 1;

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    running = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    updateDisplay(0, 0, 0, 0);
    lapsContainer.innerHTML = "";
    lapCounter = 1;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let milliseconds = difference % 1000;
    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    updateDisplay(hours, minutes, seconds, milliseconds);
}

function updateDisplay(hours, minutes, seconds, milliseconds) {
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    millisecondsEl.textContent = String(milliseconds).padStart(3, '0');
}

function recordLap() {
    if (running) {
        let lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${hoursEl.textContent}:${minutesEl.textContent}:${secondsEl.textContent}.${millisecondsEl.textContent}`;
        lapsContainer.appendChild(lapTime);
        lapCounter++;
    }
}