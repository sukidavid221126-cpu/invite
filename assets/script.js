(() => {
  "use strict";

  const WEDDING_TIME = new Date("2026-11-21T17:00:00+05:30").getTime();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const envelopeScreen = document.getElementById("envelope-screen");
  const invitation = document.getElementById("invitation");
  const seal = document.getElementById("seal");
  const openButton = document.getElementById("open-invitation");
  const flap = document.getElementById("flap");
  const cardPreview = document.getElementById("card-preview");
  const backgroundMusic = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicToggleIcon = document.getElementById("music-toggle-icon");

  let hasOpened = false;
  let countdownTimer;

  function delay(callback, milliseconds) {
    window.setTimeout(callback, reducedMotion.matches ? 0 : milliseconds);
  }

  function updateMusicControl(isPlaying) {
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
    musicToggleIcon.textContent = isPlaying ? "Ⅱ" : "♪";
  }

  function playMusic() {
    const playAttempt = backgroundMusic.play();

    if (playAttempt) {
      playAttempt
        .then(() => updateMusicControl(true))
        .catch(() => updateMusicControl(false));
    }
  }

  function toggleMusic() {
    if (backgroundMusic.paused) {
      playMusic();
    } else {
      backgroundMusic.pause();
    }
  }

  function openInvitation() {
    if (hasOpened) return;
    hasOpened = true;

    playMusic();

    seal.disabled = true;
    openButton.disabled = true;
    seal.classList.add("is-hidden");
    flap.classList.add("is-open");

    delay(() => cardPreview.classList.add("is-rising"), 650);

    delay(() => {
      envelopeScreen.classList.add("is-leaving");
      invitation.hidden = false;
      musicToggle.hidden = false;
      document.body.style.overflow = "";

      window.requestAnimationFrame(() => {
        invitation.classList.add("is-visible");
        updateCountdown();
        countdownTimer = window.setInterval(updateCountdown, 1000);
      });

      delay(() => {
        envelopeScreen.hidden = true;
        invitation.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
      }, 750);
    }, 1550);
  }

  function twoDigits(value) {
    return String(Math.max(0, value)).padStart(2, "0");
  }

  function updateCountdown() {
    const distance = WEDDING_TIME - Date.now();
    const status = document.getElementById("countdown-status");

    if (distance <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach((id) => {
        document.getElementById(id).textContent = "00";
      });
      status.textContent = "The celebration day has arrived!";
      if (countdownTimer) window.clearInterval(countdownTimer);
      return;
    }

    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;

    document.getElementById("days").textContent = twoDigits(Math.floor(distance / day));
    document.getElementById("hours").textContent = twoDigits(Math.floor((distance % day) / hour));
    document.getElementById("minutes").textContent = twoDigits(Math.floor((distance % hour) / minute));
    document.getElementById("seconds").textContent = twoDigits(Math.floor((distance % minute) / 1000));
    status.textContent = "";
  }

  document.body.style.overflow = "hidden";
  backgroundMusic.volume = 0.35;
  backgroundMusic.addEventListener("playing", () => updateMusicControl(true));
  backgroundMusic.addEventListener("pause", () => updateMusicControl(false));
  backgroundMusic.addEventListener("error", () => updateMusicControl(false));
  seal.addEventListener("click", openInvitation);
  openButton.addEventListener("click", openInvitation);
  musicToggle.addEventListener("click", toggleMusic);
})();
