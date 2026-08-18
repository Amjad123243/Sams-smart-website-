const powerButton = document.getElementById("powerButton");
const intro = document.getElementById("intro");
const website = document.getElementById("website");

const welcomeAudio = new Audio("./welcome.mp3");
welcomeAudio.preload = "auto";
welcomeAudio.volume = 1;

let isOpening = false;

powerButton.addEventListener("click", () => {
  if (isOpening) return;
  isOpening = true;

  welcomeAudio.currentTime = 0;
  welcomeAudio.play().catch(error => {
    console.log("Audio could not play:", error);
  });

  intro.classList.add("active");

  setTimeout(() => {
    website.classList.add("visible");
    intro.classList.add("leaving");
  }, 1800);

  setTimeout(() => {
    intro.style.display = "none";
  }, 3400);
});
