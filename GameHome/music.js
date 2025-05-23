document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bg-music");
  const playBtn = document.getElementById("play-pause");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const seekBar = document.getElementById("seek-bar");
  const timeDisplay = document.getElementById("time-display");
  const player = document.querySelector(".music-player");
  const rotatingIcon = document.querySelector(".rotating-icon");

  // Format time as mm:ss
  function fmt(sec) {
    sec = Math.floor(sec);
    return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;
  }

  // Update time and seek bar
  function update() {
    seekBar.max = audio.duration || 0;
    seekBar.value = audio.currentTime || 0;
    timeDisplay.textContent = `${fmt(audio.currentTime)} / ${
      audio.duration ? fmt(audio.duration) : "0:00"
    }`;
  }

  // Play/Pause toggle
  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  // Show correct icon and animate
  audio.addEventListener("play", function () {
    playIcon.style.display = "none";
    pauseIcon.style.display = "";
    player.classList.remove("paused");
  });
  audio.addEventListener("pause", function () {
    playIcon.style.display = "";
    pauseIcon.style.display = "none";
    player.classList.add("paused");
  });

  // Seek bar interaction
  seekBar.addEventListener("input", function () {
    audio.currentTime = seekBar.value;
    update();
  });

  // Update seek bar as song plays
  audio.addEventListener("timeupdate", update);
  audio.addEventListener("loadedmetadata", update);

  // Handle autoplay restrictions: play on first user interaction
  function tryAutoPlay() {
    audio.play().catch(() => {
      // Wait for user action
      const playOnUserAction = () => {
        audio.play().catch(() => {});
        document.removeEventListener("click", playOnUserAction);
        document.removeEventListener("keydown", playOnUserAction);
      };
      document.addEventListener("click", playOnUserAction);
      document.addEventListener("keydown", playOnUserAction);
    });
  }
  tryAutoPlay();

  // Initial state
  update();
  playIcon.style.display = "";
  pauseIcon.style.display = "none";
  player.classList.add("paused");
});
