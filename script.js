const powerButton = document.getElementById("powerButton");
const intro = document.getElementById("intro");
const website = document.getElementById("website");

powerButton.addEventListener("click", () => {
  intro.classList.add("active");

  setTimeout(() => {
    website.classList.add("visible");
  }, 1800);

  setTimeout(() => {
    intro.style.display = "none";
  }, 3000);
});
