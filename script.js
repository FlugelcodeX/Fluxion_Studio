/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("mobile-open");
  });
});

/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.style.background = "rgba(5, 11, 24, 0.94)";
  } else {
    navbar.style.background = "rgba(5, 11, 24, 0.72)";
  }
});

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  ".section-heading, " +
    ".service-item, " +
    ".project, " +
    ".process-card, " +
    ".about-intro, " +
    ".stat, " +
    ".contact-info, " +
    ".contact-form-wrapper",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";

        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.1,
  },
);

revealElements.forEach((element) => {
  element.style.opacity = "0";

  element.style.transform = "translateY(30px)";

  element.style.transition = "opacity 0.8s ease, " + "transform 0.8s ease";

  observer.observe(element);
});

/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow = document.createElement("div");

cursorGlow.style.position = "fixed";

cursorGlow.style.width = "250px";

cursorGlow.style.height = "250px";

cursorGlow.style.borderRadius = "50%";

cursorGlow.style.pointerEvents = "none";

cursorGlow.style.zIndex = "-1";

cursorGlow.style.background = "rgba(37, 137, 255, 0.035)";

cursorGlow.style.filter = "blur(60px)";

cursorGlow.style.transform = "translate(-50%, -50%)";

document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;

  cursorGlow.style.top = `${event.clientY}px`;
});
