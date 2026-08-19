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


/* SAMS-SMART AI Assistant */

const aiButton = document.getElementById("aiButton");
const aiChat = document.getElementById("aiChat");
const aiClose = document.getElementById("aiClose");
const aiMessages = document.getElementById("aiMessages");
const aiOptions = document.querySelectorAll(".ai-options button");

const aiAnswers = {
  lighting:
    "We offer smart spotlights, magnetic track lighting, smart switches and electrical sockets. Everything can be controlled through your app, scenes or central screen.",

  climate:
    "We provide smart AC control and automated curtains. You can create schedules and scenes such as Good Morning, Away Mode and Sleep Mode.",

  security:
    "Our security solutions include alarm systems, surveillance cameras, video doorbells, gas detectors and water leak sensors with mobile notifications.",

  locks:
    "Our smart locks support options such as fingerprint, PIN code, access card, mechanical key and mobile app control.",

  consultation:
    `Great! Tell us about your property and we will help you choose the right system.<br><br>
    <a href="https://wa.me/971502807970?text=Hello%20SAMS-SMART%2C%20I%20would%20like%20a%20free%20smart%20home%20consultation."
       target="_blank"
       style="color:#9edcff;font-weight:700;">
       Start WhatsApp Consultation →
    </a>`
};

function addAiMessage(message, type) {
  const messageBox = document.createElement("div");

  messageBox.classList.add("ai-message");

  if (type === "user") {
    messageBox.classList.add("user");
    messageBox.textContent = message;
  } else {
    messageBox.innerHTML = message;
  }

  aiMessages.appendChild(messageBox);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

aiButton.addEventListener("click", () => {
  aiChat.classList.toggle("open");
});

aiClose.addEventListener("click", () => {
  aiChat.classList.remove("open");
});

aiOptions.forEach(button => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;

    addAiMessage(button.textContent, "user");

    setTimeout(() => {
      addAiMessage(aiAnswers[question], "assistant");
    }, 450);
  });
});

/* INTERACTIVE SMART ROOM */

const demoRoom = document.getElementById("demoRoom");
const lightControl = document.getElementById("lightControl");
const curtainControl = document.getElementById("curtainControl");
const acControl = document.getElementById("acControl");
const cinemaControl = document.getElementById("cinemaControl");
const roomStatus = document.getElementById("roomStatus");
const temperatureStatus = document.getElementById("temperatureStatus");

let roomTemperature = 22;

lightControl.addEventListener("click", () => {
  const isOn = demoRoom.classList.toggle("lights-on");

  lightControl.classList.toggle("active", isOn);
  lightControl.querySelector("small").textContent = isOn ? "ON" : "OFF";
  roomStatus.textContent = isOn ? "Lighting Activated" : "Lighting Off";
});

curtainControl.addEventListener("click", () => {
  const isOpen = demoRoom.classList.toggle("curtains-open");

  curtainControl.classList.toggle("active", isOpen);
  curtainControl.querySelector("small").textContent =
    isOpen ? "OPEN" : "CLOSED";

  roomStatus.textContent =
    isOpen ? "Curtains Opening" : "Curtains Closing";
});

acControl.addEventListener("click", () => {
  roomTemperature--;

  if (roomTemperature < 18) {
    roomTemperature = 24;
  }

  acControl.classList.add("active");
  acControl.querySelector("small").textContent =
    roomTemperature + "°C";

  temperatureStatus.textContent =
    roomTemperature + "°C";

  roomStatus.textContent = "Smart AC Active";
});

cinemaControl.addEventListener("click", () => {
  const cinemaOn = demoRoom.classList.toggle("cinema-mode");

  cinemaControl.classList.toggle("active", cinemaOn);
  cinemaControl.querySelector("small").textContent =
    cinemaOn ? "ACTIVE" : "SCENE";

  if (cinemaOn) {
    demoRoom.classList.add("curtains-open");
    demoRoom.classList.remove("lights-on");

    curtainControl.classList.add("active");
    curtainControl.querySelector("small").textContent = "OPEN";

    lightControl.classList.remove("active");
    lightControl.querySelector("small").textContent = "OFF";

    roomStatus.textContent = "Cinema Scene Activated";
  } else {
    roomStatus.textContent = "Living Room Ready";
  }
});

/* SCROLL REVEAL ANIMATION */

const scrollRevealElements = document.querySelectorAll(
  ".section-heading, .flow-card, .solution-card, .smart-room-demo, .compatibility"
);

scrollRevealElements.forEach((element, index) => {
  element.classList.add("reveal-item");

  const delayNumber = (index % 3) + 1;
  element.classList.add("reveal-delay-" + delayNumber);
});

const scrollRevealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

scrollRevealElements.forEach(element => {
  scrollRevealObserver.observe(element);
});

/* AC VISUAL EFFECT & SMART AUDIO */

const smartAudioControl =
  document.getElementById("speakerControl");

acControl.addEventListener("click", () => {
  const acIsActive =
    demoRoom.classList.toggle("ac-active");

  acControl.classList.toggle("active", acIsActive);

  if (acIsActive) {
    acControl.querySelector("small").textContent =
      roomTemperature + "°C";

    temperatureStatus.textContent =
      roomTemperature + "°C";

    roomStatus.textContent = "Smart AC Active";
  } else {
    acControl.querySelector("small").textContent = "OFF";
    temperatureStatus.textContent = "--";
    roomStatus.textContent = "Smart AC Off";
  }
});

smartAudioControl.addEventListener("click", () => {
  const audioIsOn =
    demoRoom.classList.toggle("speaker-on");

  smartAudioControl.classList.toggle("active", audioIsOn);

  smartAudioControl.querySelector("small").textContent =
    audioIsOn ? "PLAYING" : "OFF";

  roomStatus.textContent =
    audioIsOn ? "Smart Audio Playing" : "Smart Audio Off";
});

/* INTERACTIVE SMART DOOR LOCK */

const smartLockPoint =
  document.getElementById("smartLockPoint");

const lockState =
  document.getElementById("lockState");

let doorIsLocked = true;

smartLockPoint.addEventListener("click", () => {
  doorIsLocked = !doorIsLocked;

  smartLockPoint.classList.toggle(
    "unlocked",
    !doorIsLocked
  );

  lockState.textContent =
    doorIsLocked ? "LOCKED" : "UNLOCKED";

  roomStatus.textContent =
    doorIsLocked
      ? "Smart Door Secured"
      : "Smart Door Unlocked";
});

/* =========================
   SMART ROOM SCENES
========================= */

const sceneButtons =
  document.querySelectorAll(".scene-buttons button");

function setSceneDoorLock(locked) {
  doorIsLocked = locked;

  smartLockPoint.classList.toggle(
    "unlocked",
    !locked
  );

  lockState.textContent =
    locked ? "LOCKED" : "UNLOCKED";
}

function activateSmartScene(scene) {
  const morning = scene === "morning";
  const cinema = scene === "cinema";
  const sleep = scene === "sleep";
  const away = scene === "away";

  /* Lighting */
  demoRoom.classList.toggle("lights-on", morning);
  lightControl.classList.toggle("active", morning);

  lightControl.querySelector("small").textContent =
    morning ? "ON" : "OFF";

  /* Curtains */
  demoRoom.classList.toggle("curtains-open", morning);
  curtainControl.classList.toggle("active", morning);

  curtainControl.querySelector("small").textContent =
    morning ? "OPEN" : "CLOSED";

  /* Dark room effect */
  demoRoom.classList.toggle(
    "cinema-mode",
    cinema || sleep || away
  );

  cinemaControl.classList.toggle("active", cinema);

  cinemaControl.querySelector("small").textContent =
    cinema ? "ACTIVE" : "SCENE";

  /* Smart Audio */
  demoRoom.classList.toggle("speaker-on", cinema);
  smartAudioControl.classList.toggle("active", cinema);

  smartAudioControl.querySelector("small").textContent =
    cinema ? "PLAYING" : "OFF";

  /* Smart AC */
  const acShouldRun = !away;

  demoRoom.classList.toggle("ac-active", acShouldRun);
  acControl.classList.toggle("active", acShouldRun);

  if (morning) roomTemperature = 22;
  if (cinema) roomTemperature = 21;
  if (sleep) roomTemperature = 20;

  acControl.querySelector("small").textContent =
    acShouldRun ? roomTemperature + "°C" : "OFF";

  temperatureStatus.textContent =
    acShouldRun ? roomTemperature + "°C" : "--";

  /* Door security */
  setSceneDoorLock(true);

  /* Room message */
  if (morning) {
    roomStatus.textContent = "Good Morning Scene";
  }

  if (cinema) {
    roomStatus.textContent = "Cinema Scene Activated";
  }

  if (sleep) {
    roomStatus.textContent = "Sleep Scene Activated";
  }

  if (away) {
    roomStatus.textContent = "Away Mode • Security Armed";
  }
}

sceneButtons.forEach(button => {
  button.addEventListener("click", () => {
    sceneButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    activateSmartScene(button.dataset.scene);
  });
});

/* Make the original Cinema control close curtains */
cinemaControl.addEventListener("click", () => {
  if (demoRoom.classList.contains("cinema-mode")) {
    demoRoom.classList.remove("curtains-open");

    curtainControl.classList.remove("active");
    curtainControl.querySelector("small").textContent =
      "CLOSED";
  }
});
