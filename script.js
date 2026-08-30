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
    <a href="https://wa.me/971543699997?text=Hello%20SAMS-SMART%2C%20I%20would%20like%20a%20free%20smart%20home%20consultation."
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
  ".section-heading, .flow-card, .solution-card, .smart-room-demo, .compatibility, .process-heading, .process-card"
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

/* =========================
   MULTIPAGE CATALOG VIEWER
========================= */

const catalogModal =
  document.getElementById("catalogModal");

const catalogPages =
  document.getElementById("catalogPages");

const catalogClose =
  document.getElementById("catalogClose");

const catalogTitle =
  document.getElementById("catalogTitle");

const catalogLoading =
  document.getElementById("catalogLoading");

const catalogButtons =
  document.querySelectorAll(".catalog-links a");

let pdfJsPromise = null;
let catalogSession = 0;

function loadPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import(
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/build/pdf.min.mjs"
    ).then(pdfjsLib => {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/build/pdf.worker.min.mjs";

      return pdfjsLib;
    });
  }

  return pdfJsPromise;
}

async function renderCatalog(catalogUrl) {
  const currentSession = ++catalogSession;

  try {
    const pdfjsLib = await loadPdfJs();

    const fullUrl =
      new URL(catalogUrl, window.location.href).href;

    const pdfDocument =
      await pdfjsLib.getDocument(fullUrl).promise;

    await new Promise(resolve => {
      requestAnimationFrame(resolve);
    });

    for (
      let pageNumber = 1;
      pageNumber <= pdfDocument.numPages;
      pageNumber++
    ) {
      if (currentSession !== catalogSession) return;

      const page =
        await pdfDocument.getPage(pageNumber);

      const originalViewport =
        page.getViewport({ scale: 1 });

      const availableWidth =
        Math.max(catalogPages.clientWidth - 40, 280);

      const scale =
        availableWidth / originalViewport.width;

      const viewport =
        page.getViewport({ scale });

      const outputScale =
        Math.min(window.devicePixelRatio || 1, 1.5);

      const canvas =
        document.createElement("canvas");

      const context =
        canvas.getContext("2d");

      canvas.width =
        Math.floor(viewport.width * outputScale);

      canvas.height =
        Math.floor(viewport.height * outputScale);

      canvas.style.width =
        Math.floor(viewport.width) + "px";

      canvas.style.height =
        Math.floor(viewport.height) + "px";

      catalogPages.appendChild(canvas);

      await page.render({
        canvas,
        canvasContext: context,
        viewport,
        transform: outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : null
      }).promise;

      if (pageNumber === 1) {
        catalogLoading.classList.add("hidden");
      }
    }

    catalogLoading.classList.add("hidden");

  } catch (error) {
    console.error("Catalogue error:", error);

    catalogLoading.classList.add("hidden");

    catalogPages.innerHTML = `
      <div style="
        margin:auto;
        padding:30px;
        text-align:center;
        color:#26343b;
      ">
        Catalogue could not load.<br><br>
        Please close it and try again.
      </div>
    `;
  }
}

catalogButtons.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();

    const catalogUrl =
      button.getAttribute("href");

    catalogTitle.textContent =
      button.textContent.trim();

    catalogPages.innerHTML = "";
    catalogLoading.textContent =
      "Loading catalogue...";

    catalogLoading.classList.remove("hidden");
    catalogModal.classList.add("open");
    catalogModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("catalog-is-open");

    renderCatalog(catalogUrl);
  });
});

function closeCatalogViewer() {
  catalogSession++;

  catalogModal.classList.remove("open");
  catalogModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("catalog-is-open");

  setTimeout(() => {
    catalogPages.innerHTML = "";
  }, 350);
}

catalogClose.addEventListener(
  "click",
  closeCatalogViewer
);

catalogModal.addEventListener("click", event => {
  if (event.target === catalogModal) {
    closeCatalogViewer();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCatalogViewer();
  }
});

/* ==================================
   SMART HOME PLANNER - WHATSAPP
================================== */

const plannerSubmit = document.getElementById("plannerSubmit");

if (plannerSubmit) {
  plannerSubmit.addEventListener("click", () => {
    const property = document.querySelector(
      'input[name="property"]:checked'
    );

    const rooms = document.getElementById("plannerRooms").value;

    const selectedProducts = Array.from(
      document.querySelectorAll(".planner-products input:checked")
    ).map(product => product.value);

    if (!property) {
      alert("Please select your property type.");
      return;
    }

    if (!rooms) {
      alert("Please select the number of rooms.");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("Please select at least one smart solution.");
      return;
    }

    const message =
`Hello SAMS-SMART,

I would like a customized smart home proposal.

Property Type: ${property.value}
Property Size: ${rooms}

Selected Smart Solutions:
- ${selectedProducts.join("\n- ")}

Please contact me to arrange a free consultation.`;

    const whatsappURL =
      "https://wa.me/971502807970?text=" +
      encodeURIComponent(message);

    plannerSubmit.innerHTML = "Preparing Your Plan...";

    setTimeout(() => {
      window.location.href = whatsappURL;

      plannerSubmit.innerHTML =
        'Request My Smart Home Plan <span>→</span>';
    }, 500);
  });
}

/* ==================================
   SMART PLANNER POPUP
================================== */

const plannerOpenButton = document.getElementById("plannerOpen");
const plannerCloseButton = document.getElementById("plannerClose");
const plannerPopup = document.getElementById("plannerBox");

function openSmartPlanner() {
  plannerPopup.classList.add("open");
  plannerPopup.setAttribute("aria-hidden", "false");
  document.body.classList.add("planner-is-open");
}

function closeSmartPlanner() {
  plannerPopup.classList.remove("open");
  plannerPopup.setAttribute("aria-hidden", "true");
  document.body.classList.remove("planner-is-open");
}

plannerOpenButton.addEventListener("click", (event) => {
  event.stopPropagation();
  openSmartPlanner();
});

plannerCloseButton.addEventListener("click", closeSmartPlanner);

/* Close when clicking outside the form */
document.addEventListener("click", (event) => {
  if (
    plannerPopup.classList.contains("open") &&
    !plannerPopup.contains(event.target) &&
    event.target !== plannerOpenButton
  ) {
    closeSmartPlanner();
  }
});

/* Close using Escape */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSmartPlanner();
  }
});

/* ==================================
   RESPONSIVE NAVIGATION MENU
================================== */

const siteMenuButton = document.getElementById("menuToggle");
const siteMainNav = document.getElementById("mainNav");

function openSiteMenu() {
  siteMenuButton.classList.add("active");
  siteMainNav.classList.add("open");
  siteMenuButton.setAttribute("aria-expanded", "true");
}

function closeSiteMenu() {
  siteMenuButton.classList.remove("active");
  siteMainNav.classList.remove("open");
  siteMenuButton.setAttribute("aria-expanded", "false");
}

siteMenuButton.addEventListener("click", (event) => {
  event.stopPropagation();

  if (siteMainNav.classList.contains("open")) {
    closeSiteMenu();
  } else {
    openSiteMenu();
  }
});

/* Close after selecting a menu option */
siteMainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeSiteMenu);
});

/* Close when clicking outside */
document.addEventListener("click", (event) => {
  if (
    siteMainNav.classList.contains("open") &&
    !siteMainNav.contains(event.target) &&
    !siteMenuButton.contains(event.target)
  ) {
    closeSiteMenu();
  }
});

/* Close with Escape */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSiteMenu();
  }
});

/* About SAMS SMART */
const aboutLink = document.getElementById("aboutLink");
const aboutModal = document.getElementById("aboutModal");
const aboutClose = document.getElementById("aboutClose");
const aboutContact = document.getElementById("aboutContact");

function openAboutModal() {
  aboutModal.classList.add("open");
  aboutModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (typeof closeSiteMenu === "function") {
    closeSiteMenu();
  }
}

function closeAboutModal() {
  aboutModal.classList.remove("open");
  aboutModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

aboutLink.addEventListener("click", (event) => {
  event.preventDefault();
  openAboutModal();
});

aboutClose.addEventListener("click", closeAboutModal);

aboutModal.addEventListener("click", (event) => {
  if (event.target === aboutModal) {
    closeAboutModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAboutModal();
  }
});

aboutContact.addEventListener("click", () => {
  const message =
    "Hello SAMS SMART, I would like to request a free smart home consultation.";

  window.open(
    "https://wa.me/971502807970?text=" + encodeURIComponent(message),
    "_blank"
  );
});

/* Open Smart Home Planner from Contact menu */
(() => {
  const contactMenuLink = document.getElementById("contactLink");
  const plannerTrigger = document.getElementById("plannerOpen");

  if (!contactMenuLink || !plannerTrigger) return;

  contactMenuLink.addEventListener("click", (event) => {
    event.preventDefault();

    if (typeof closeSiteMenu === "function") {
      closeSiteMenu();
    }

    plannerTrigger.click();
  });
})();
