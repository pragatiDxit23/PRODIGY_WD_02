let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 1;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("pauseBtn").addEventListener("click", pause);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", recordLap);

function start() {
  if (timerInterval) return;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
}

function pause() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function reset() {
  pause();
  elapsedTime = 0;
  lapCount = 1;
  display.textContent = "00:00.00";
  laps.innerHTML = "";
}

function recordLap() {
  if (!timerInterval) return;
  const li = document.createElement("li");
  li.innerHTML = `<span>Lap ${lapCount}</span><span>${display.textContent}</span>`;
  laps.prepend(li);
  lapCount++;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;

  let ms = Math.floor((elapsedTime % 1000) / 10);
  let sec = Math.floor((elapsedTime / 1000) % 60);
  let min = Math.floor((elapsedTime / (1000 * 60)) % 60);

  display.textContent = `${pad(min)}:${pad(sec)}.${pad(ms)}`;
}

function pad(unit) {
  return unit.toString().padStart(2, "0");
}
