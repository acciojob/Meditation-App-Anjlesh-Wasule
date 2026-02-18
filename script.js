const audio = document.getElementById("audio");
const video = document.getElementById("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600; // 10 minutes default
let isPlaying = false;

// Play / Pause
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    playBtn.textContent = "❚ ❚";
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = "▶";
  }
  isPlaying = !isPlaying;
});

// Time select
timeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    duration = parseInt(btn.dataset.time);
    audio.currentTime = 0;
    updateTime(duration);
  });
});

// Sound & video switch
soundButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const sound = btn.dataset.sound;
    const vid = btn.dataset.video;

    audio.src = `Sounds/${sound}.mp3`;
    video.src = `Sounds/${vid}.mp4`;

    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

// Countdown logic
audio.ontimeupdate = () => {
  const remaining = duration - audio.currentTime;

  if (remaining <= 0) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    playBtn.textContent = "▶";
    isPlaying = false;
  }

  updateTime(remaining);
};

function updateTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
}
