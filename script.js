const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector("#themeToggle");
const paletteButton = document.querySelector("#paletteButton");
const commandPalette = document.querySelector("#commandPalette");
const paletteSearch = document.querySelector("#paletteSearch");
const paletteList = document.querySelector("#paletteList");
const projectSearch = document.querySelector("#projectSearch");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card")];
const caseModal = document.querySelector("#caseModal");
const modalTitle = document.querySelector("#modalTitle");
const modalType = document.querySelector("#modalType");
const modalSummary = document.querySelector("#modalSummary");
const modalStats = document.querySelector("#modalStats");
const modalDetails = document.querySelector("#modalDetails");
const modalLinks = document.querySelector("#modalLinks");
const roleRotator = document.querySelector("#roleRotator");
const nameDecoder = document.querySelector("#nameDecoder");

const caseStudies = {
  urlspace: {
    type: "Full-Stack Deployment",
    title: "URLSpace",
    summary:
      "URLSpace is a deployed full-stack URL shortener designed to convert long URLs into short, shareable links while keeping the interface fast, simple, and responsive.",
    details: [
      {
        heading: "Core Features",
        items: ["Custom short-code support", "Redirect handling for generated links", "Basic click tracking", "Light and dark React interface"],
      },
      {
        heading: "Engineering Focus",
        items: ["Environment-based configuration", "FastAPI backend endpoints", "PostgreSQL persistence", "Serverless AWS deployment path"],
      },
    ],
    stats: ["React + FastAPI", "PostgreSQL + Amazon RDS", "AWS Lambda, API Gateway, Amplify"],
    links: [
      { label: "Live Demo", url: "https://main.d1o6mtelt6huup.amplifyapp.com/" },
      { label: "Source Code", url: "https://github.com/Phaneeeee/url-shortener" },
    ],
  },
  otp: {
    type: "Authentication System",
    title: "Flask OTP Authentication",
    summary:
      "A Flask-based authentication system that verifies users through email OTP before allowing secure login and protected dashboard access.",
    details: [
      {
        heading: "Core Features",
        items: ["User signup with email", "OTP verification before login", "bcrypt password hashing", "Protected dashboard with logout"],
      },
      {
        heading: "Implementation",
        items: ["Python Flask backend", "MySQL database integration", "HTML, CSS, and JavaScript frontend", "Deployed on Render"],
      },
    ],
    stats: ["OTP email verification", "bcrypt password hashing", "Flask, MySQL, Render"],
    links: [
      { label: "Live Demo", url: "https://flask-otp-signup.onrender.com/" },
      { label: "Source Code", url: "https://github.com/Phaneeeee/flask-otp-signup" },
    ],
  },
  foundation: {
    type: "Engineering Foundation",
    title: "DSA & Cloud Practice",
    summary:
      "A focused snapshot of the engineering fundamentals behind my projects, combining problem solving, backend development, database work, and cloud foundations.",
    details: [
      {
        heading: "Problem Solving",
        items: ["180+ LeetCode problems", "Arrays, trees, graphs, and dynamic programming", "Data structures and algorithm practice"],
      },
      {
        heading: "Technical Base",
        items: ["Python and SQL", "OOP, DBMS, and operating-system concepts", "AWS Cloud Foundations"],
      },
    ],
    stats: ["180+ LeetCode problems", "AWS Cloud Foundations", "Python, SQL, REST APIs"],
    links: [{ label: "LeetCode Profile", url: "https://leetcode.com/u/Phanee17/" }],
  },
};

const commands = [
  { label: "About", target: "#about", detail: "Profile" },
  { label: "Projects", target: "#projects", detail: "Selected work" },
  { label: "Experience", target: "#experience", detail: "Timeline" },
  { label: "Contact", target: "#contact", detail: "Links" },
];

const rolePhrases = [
  "Full Stack Developer",
  "Software Developer",
  "Web Developer",
  "Open Source Contributor",
  "The One",
];
let roleIndex = 0;
let roleCharacterIndex = rolePhrases[0].length;
let isDeletingRole = true;

function typeRole() {
  const phrase = rolePhrases[roleIndex];
  roleRotator.textContent = phrase.slice(0, roleCharacterIndex);

  if (isDeletingRole) {
    roleCharacterIndex -= 1;
    if (roleCharacterIndex === 0) {
      isDeletingRole = false;
      roleIndex = (roleIndex + 1) % rolePhrases.length;
    }
  } else {
    roleCharacterIndex += 1;
    if (roleCharacterIndex > rolePhrases[roleIndex].length) {
      isDeletingRole = true;
      setTimeout(typeRole, 2400);
      return;
    }
  }

  setTimeout(typeRole, isDeletingRole ? 32 : 58);
}

setTimeout(typeRole, 600);

function decodeName() {
  if (!nameDecoder) return;

  const finalText = nameDecoder.dataset.text;
  const scrambleCharacters =
    "\u30a2\u30a4\u30a6\u30a8\u30aa\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0\u30e1\u30e2\u30e4\u30e6\u30e8\u30e9\u30ea\u30eb\u30ec\u30ed\u30ef\u30f2\u30f3\u6f22\u5b57\u6771\u4eac\u958b\u767a";
  const letters = [...finalText].map((character, index) => {
    const span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");
    span.className = character === " " ? "glyph space" : "glyph scrambling";
    span.textContent = character === " " ? " " : scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)];
    return { character, span, lockAt: 3 + index };
  });
  let frame = 0;

  nameDecoder.textContent = "";
  letters.forEach(({ span }) => nameDecoder.appendChild(span));

  const interval = setInterval(() => {
    frame += 1;
    let settled = 0;

    letters.forEach((letter) => {
      if (letter.character === " ") {
        settled += 1;
        return;
      }

      if (frame >= letter.lockAt) {
        letter.span.textContent = letter.character;
        letter.span.classList.remove("scrambling");
        settled += 1;
      } else {
        letter.span.textContent = scrambleCharacters[Math.floor(Math.random() * scrambleCharacters.length)];
      }
    });

    if (settled === letters.length) {
      clearInterval(interval);
    }
  }, 40);
}

setTimeout(decodeName, 650);
setInterval(decodeName, 50200);

const storedTheme = localStorage.getItem("portfolio-theme");
if (storedTheme === "light") {
  root.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("portfolio-theme", root.classList.contains("light") ? "light" : "dark");
});

function filterProjects() {
  const activeFilter = document.querySelector(".filter-button.active").dataset.filter;
  const search = projectSearch.value.trim().toLowerCase();

  projectCards.forEach((card) => {
    const categories = card.dataset.category;
    const title = card.dataset.title.toLowerCase();
    const text = card.textContent.toLowerCase();
    const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch = !search || title.includes(search) || text.includes(search);
    card.classList.toggle("hidden", !(matchesFilter && matchesSearch));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    filterProjects();
  });
});

projectSearch.addEventListener("input", filterProjects);

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => openCaseStudy(button.dataset.modal));
});

function openCaseStudy(key) {
  const study = caseStudies[key];
  modalType.textContent = study.type;
  modalTitle.textContent = study.title;
  modalSummary.textContent = study.summary;
  modalDetails.innerHTML = study.details
    .map(
      (detail) => `
        <section>
          <h3>${detail.heading}</h3>
          <ul>${detail.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </section>
      `,
    )
    .join("");
  modalStats.innerHTML = study.stats.map((stat) => `<span>${stat}</span>`).join("");
  modalLinks.innerHTML = study.links
    .map((link) => `<a class="project-action-button" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`)
    .join("");
  caseModal.classList.add("open");
  caseModal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
}

function closeCaseStudy() {
  caseModal.classList.remove("open");
  caseModal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
}

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeCaseStudy);
});

function renderCommands(query = "") {
  const normalized = query.toLowerCase();
  const visibleCommands = commands.filter((command) => command.label.toLowerCase().includes(normalized));
  paletteList.innerHTML = visibleCommands
    .map(
      (command) =>
        `<button type="button" data-target="${command.target}"><span>${command.label}</span><small>${command.detail}</small></button>`,
    )
    .join("");

  paletteList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      closePalette();
      document.querySelector(button.dataset.target).scrollIntoView({ behavior: "smooth" });
    });
  });
}

function openPalette() {
  renderCommands();
  commandPalette.classList.add("open");
  commandPalette.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  requestAnimationFrame(() => paletteSearch.focus());
}

function closePalette() {
  commandPalette.classList.remove("open");
  commandPalette.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  paletteSearch.value = "";
}

paletteButton?.addEventListener("click", openPalette);
paletteSearch.addEventListener("input", () => renderCommands(paletteSearch.value));
document.querySelectorAll("[data-close-palette]").forEach((element) => {
  element.addEventListener("click", closePalette);
});

document.addEventListener("keydown", (event) => {
  const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openPalette();
  }
  if (event.key === "Escape") {
    closeCaseStudy();
    closePalette();
  }
  if (!isTyping && event.key === "/") {
    event.preventDefault();
    projectSearch.focus();
  }
});

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      skillObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.45 },
);

document.querySelectorAll(".skill-item").forEach((item) => skillObserver.observe(item));

projectCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 5;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const navLinks = [...document.querySelectorAll(".nav-links a")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-42% 0px -52% 0px" },
);

document.querySelectorAll("main > section").forEach((section) => sectionObserver.observe(section));

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Portfolio inquiry from ${form.get("name")}`);
  const bodyText = encodeURIComponent(`${form.get("message")}\n\nReply to: ${form.get("email")}`);
  window.location.href = `mailto:phaneewhat@gmail.com?subject=${subject}&body=${bodyText}`;
});

const canvas = document.querySelector("#signalCanvas");
const context = canvas.getContext("2d");
let points = [];
let animationFrame;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  points = Array.from({ length: Math.min(58, Math.floor(window.innerWidth / 24)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
  }));
}

function drawSignal() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.lineWidth = 1;

  points.forEach((point, index) => {
    point.x += point.vx;
    point.y += point.vy;
    if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
    if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

    for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
      const next = points[nextIndex];
      const distance = Math.hypot(point.x - next.x, point.y - next.y);
      if (distance < 150) {
        context.strokeStyle = `rgba(78, 205, 196, ${0.13 * (1 - distance / 150)})`;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      }
    }
  });

  animationFrame = requestAnimationFrame(drawSignal);
}

resizeCanvas();
drawSignal();
window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawSignal();
});
