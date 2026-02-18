const audio = document.querySelector(".audio");
const video = document.querySelector(".video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");

let duration = 600;
let remaining = 600;
let intervalId = null;
let isPlaying = false;

/* ---------- helpers ---------- */
function renderTime() {
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  timeDisplay.textContent = `${mins}:${secs}`;
}

function clearTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

/* ---------- pause ---------- */
function pauseMedia() {
  clearTimer();

  if (!audio.paused) audio.pause();
  if (!video.paused) video.pause();

  playBtn.textContent = "▶";
  isPlaying = false;
}

/* ---------- play ---------- */
async function playMedia() {
  // immediate tick (required by Cypress)
  remaining--;
  renderTime();

  try {
    await audio.play();   // 🔑 WAIT here
    await video.play();
  } catch (e) {
    // ignore autoplay errors in test env
  }

  intervalId = setInterval(() => {
    remaining--;
    renderTime();

    if (remaining <= 0) {
      pauseMedia();
      remaining = duration;
      renderTime();
    }
  }, 1000);

  playBtn.textContent = "❚❚";
  isPlaying = true;
}

/* ---------- toggle ---------- */
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    playMedia();   // async-safe
  } else {
    pauseMedia();
  }
});

/* ---------- time select ---------- */
timeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    duration = parseInt(btn.dataset.time);
    remaining = duration;
    renderTime();
  });
});

/* ---------- sound switch ---------- */
soundButtons.forEach(btn => {
  btn.addEventListener("click", async () => {
    audio.src = `Sounds/${btn.dataset.sound}.mp3`;
    video.src = `Sounds/${btn.dataset.video}.mp4`;

    if (isPlaying) {
      try {
        await audio.play();
        await video.play();
      } catch (e) {}
    }
  });
});

/* ---------- init ---------- */
renderTime();
