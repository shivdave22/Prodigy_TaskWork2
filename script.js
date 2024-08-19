// script.js
let startTime, updatedTime, difference, tInterval, running = false;
let minutes = 0, seconds = 0, milliseconds = 0;
let lapCount = 0;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(tInterval);
    }
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    minutes = seconds = milliseconds = 0;
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.getElementById('milliseconds').innerText = '00';
    lapList.innerHTML = '';
    lapCount = 0;
}

function lapTime() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        lapList.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    milliseconds = Math.floor((difference % 1000) / 10);
    seconds = Math.floor((difference / 1000) % 60);
    minutes = Math.floor((difference / (1000 * 60)) % 60);

    document.getElementById('milliseconds').innerText = formatTime(milliseconds);
    document.getElementById('seconds').innerText = formatTime(seconds);
    document.getElementById('minutes').innerText = formatTime(minutes);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTime);

