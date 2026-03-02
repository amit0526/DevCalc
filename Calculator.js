/* =========================
   CALCULATOR FINAL JS
========================= */

let currentDisplay = "";
const display = document.getElementById("display");

/* ---- SHORT CLICK SOUND (no mp3 needed) ---- */
function playClick() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "square";
  oscillator.frequency.value = 900; // pitch

  gainNode.gain.value = 0.05; // volume (soft)

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.05); // 0.05 sec sound
}

/* ---- BUTTON CLICK HANDLING ---- */
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", function () {
    playClick(); // sound

    // numbers & operators
    if (this.dataset.value) {
      currentDisplay += this.dataset.value;
    }

    // clear
    if (this.dataset.action === "clear") {
      currentDisplay = "";
    }

    // equals
    if (this.dataset.action === "equals") {
      try {
        currentDisplay = eval(currentDisplay).toString();
      } catch {
        currentDisplay = "";
      }
    }

    display.value = currentDisplay;
  });
});

/* ---- KEYBOARD SUPPORT ---- */
document.addEventListener("keydown", function (e) {
  // numbers
  if (!isNaN(e.key)) {
    currentDisplay += e.key;
  }

  // operators
  if (["+", "-", "*", "/", "."].includes(e.key)) {
    currentDisplay += e.key;
  }

  // enter = calculate
  if (e.key === "Enter") {
    try {
      currentDisplay = eval(currentDisplay).toString();
    } catch {
      currentDisplay = "";
    }
  }

  // backspace delete
  if (e.key === "Backspace") {
    currentDisplay = currentDisplay.slice(0, -1);
  }

  // escape clear
  if (e.key === "Escape") {
    currentDisplay = "";
  }

  display.value = currentDisplay;
});
