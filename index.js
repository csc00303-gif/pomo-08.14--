const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;

function getSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  if (Number.isInteger(saved) && saved >= 1 && saved <= 60) {
    return saved;
  }
  return DEFAULT_MINUTES;
}

let remainingSeconds = getSavedMinutes() * 60;
let timerId = null;

const timeLeftEl = document.getElementById("time-left");
const clockEl = document.getElementById("clock");

function formatClock(date) {
  const period = date.getHours() < 12 ? "오전" : "오후";
  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${period} ${hours}:${minutes}:${seconds}`;
}

function updateClock() {
  clockEl.textContent = formatClock(new Date());
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeLeftEl.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }
    remainingSeconds -= 1;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getSavedMinutes() * 60;
  updateDisplay();
}

updateDisplay();
updateClock();
setInterval(updateClock, 1000);
