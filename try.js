// Get references
const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");

let timeLeft = 10;
let intervalId = null;
let isPaused = false;

startButton.addEventListener("click", () => {
  // Reset countdown
  timeLeft = 10;
  countdownDisplay.textContent = timeLeft;

  intervalId = setInterval(() => {
    if (!isPaused) {
      // Only tick if not paused
      timeLeft--;
      countdownDisplay.textContent = timeLeft;

      if (timeLeft === 0) {
        clearInterval(intervalId);
        countdownDisplay.textContent = "Time's up!";
      }
    }
  }, 1000);
});

pauseButton.addEventListener("click", () => {
  if (!isPaused) {
    isPaused = true;
    pauseButton.textContent = "Resume"; // Change button label
  } else {
    isPaused = false;
    pauseButton.textContent = "Pause"; // Change back
  }
});
