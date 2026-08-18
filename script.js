const powerButton = document.getElementById("powerButton");
const intro = document.getElementById("intro");
const website = document.getElementById("website");

function playWelcomeVoice() {
  const welcome = new SpeechSynthesisUtterance(
    "Welcome home... The future starts now."
  );

  welcome.lang = "en-US";
  welcome.rate = 0.82;
  welcome.pitch = 1;
  welcome.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  welcome.voice =
    voices.find(voice =>
      voice.lang.startsWith("en") &&
      /Samantha|Ava|Serena|Karen/i.test(voice.name)
    ) ||
    voices.find(voice => voice.lang.startsWith("en")) ||
    null;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(welcome);
}

powerButton.addEventListener("click", () => {
  playWelcomeVoice();
  intro.classList.add("active");

  setTimeout(() => {
    website.classList.add("visible");
  }, 1800);

  setTimeout(() => {
    intro.style.display = "none";
  }, 3000);
});
