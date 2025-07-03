let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById("display");
const lapsList = document.getElementById("lapsList");

function formatTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 10);
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  return (
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds) + "." +
    (milliseconds < 10 ? "0" + milliseconds : milliseconds)
  );
}

function updateDisplay() {
  const now = Date.now() - startTime + elapsedTime;
  display.textContent = formatTime(now);
}

document.getElementById("startBtn").onclick = () => {
  if (!timerInterval) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
  }
};

document.getElementById("pauseBtn").onclick = () => {
  if (timerInterval) {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

document.getElementById("resetBtn").onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  startTime = 0;
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
};

document.getElementById("lapBtn").onclick = () => {
  const now = Date.now() - startTime + elapsedTime;
  const lapTime = formatTime(now);
  const lapItem = document.createElement("li");
  lapItem.textContent = "Lap " + (lapsList.children.length + 1) + ": " + lapTime;
  lapsList.prepend(lapItem);
};
