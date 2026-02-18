const audio = document.querySelector(".audio");
const video = document.querySelector(".video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");

let duration = 600;
let remainingTime = duration;
let timer = null;
let playing = false;

// format time
function updateDisplay(time) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  timeDisplay.textContent = `${mins}:${secs}`;
}

// play / pause
playBtn.addEventListener("click", () => {
  if (!playing) {
    audio.play();
    video.play();
    playBtn.textContent = "❚❚";

    timer = setInterval(() => {
      remainingTime--;
      updateDisplay(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
        audio.pause();
        video.pause();
        playing = false;
        playBtn.textContent = "▶";
      }
    }, 1000);
  } else {
    audio.pause();
    video.pause();
    clearInterval(timer);
    playBtn.textContent = "▶";
  }

  playing = !playing;
});

// time select
timeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    remainingTime = parseInt(btn.dataset.time);
    duration = remainingTime;
    updateDisplay(remainingTime);
  });
});

// sound switch
soundButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    audio.src = `Sounds/${btn.dataset.sound}.mp3`;
    video.src = `Sounds/${btn.dataset.video}.mp4`;

    if (playing) {
      audio.play();
      video.play();
    }
  });
});
