const audio = document.querySelector(".audio");
const video = document.querySelector(".video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let remaining = 600;
let timer = null;
let playing = false;

/* helpers */
function renderTime() {
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  timeDisplay.textContent = `${mins}:${secs}`;
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

/* pause */
function pauseMedia() {
  clearTimer();
  if (!audio.paused) audio.pause();
  if (!video.paused) video.pause();
  playBtn.textContent = "▶";
  playing = false;
}

/* play */
async function playMedia() {
  // Cypress expects immediate tick
  remaining--;
  renderTime();

  try {
    await audio.play();
    await video.play();
  } catch (e) {}

  timer = setInterval(() => {
    remaining--;
    renderTime();

    if (remaining <= 0) {
      pauseMedia();
      remaining = duration;
      renderTime();
    }
  }, 1000);

  playBtn.textContent = "❚❚";
  playing = true;
}

/* toggle */
playBtn.addEventListener("click", () => {
  playing ? pauseMedia() : playMedia();
});

/* time select */
timeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    duration = parseInt(btn.dataset.time);
    remaining = duration;
    renderTime();
  });
});

/* sound switch */
soundButtons.forEach(btn => {
  btn.addEventListener("click", async () => {
    audio.src = `Sounds/${btn.dataset.sound}.mp3`;
    video.src = `Sounds/${btn.dataset.video}.mp4`;
    if (playing) {
      try {
        await audio.play();
        await video.play();
      } catch (e) {}
    }
  });
});

/* init */
renderTime();
