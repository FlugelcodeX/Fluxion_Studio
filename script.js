/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("mobile-open");
    }
  });
});

/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) {
    return;
  }

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

if ("IntersectionObserver" in window) {
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

    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);
  });
}

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

/* =========================================
   DIRECT EMAIL SEND
========================================= */

const directEmailLink = document.getElementById("directEmailLink");

if (directEmailLink) {
  const originalText = directEmailLink.textContent;

  directEmailLink.addEventListener("click", async (event) => {
    event.preventDefault();

    directEmailLink.textContent = "Sending...";

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/dereglafrancisjulianderegla@gmail.com",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Accept: "application/json",
          },

          body: JSON.stringify({
            _subject: "Quick contact click — FLUXION website",

            _url: "https://flugelcodex.github.io/Fluxion_Studio/",

            message:
              "A visitor clicked 'Email Us Directly' on the FLUXION website and wants to get in touch.",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      directEmailLink.textContent = "Sent — we'll be in touch ✓";

      setTimeout(() => {
        directEmailLink.textContent = originalText;
      }, 4000);
    } catch (error) {
      console.error("Direct email error:", error);

      directEmailLink.textContent = originalText;

      alert("Something went wrong. Please use the inquiry form.");
    }
  });
}

/* =========================================
   CONTACT FORM
   FORMSubmit AJAX
   STAY ON FLUXION WEBSITE
========================================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    /*
     * Stop normal HTML form submission.
     *
     * Without this, the browser leaves
     * the GitHub Pages website.
     */

    event.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");

    if (!submitButton) {
      return;
    }

    const originalButtonHTML = submitButton.innerHTML;

    /* =====================================
               LOADING
            ===================================== */

    submitButton.disabled = true;

    submitButton.style.opacity = "0.7";

    submitButton.innerHTML = `
                Sending Inquiry...
                <span>↗</span>
                `;

    try {
      /*
       * Collect all form fields.
       */

      const formData = new FormData(contactForm);

      /*
       * Send to FormSubmit AJAX.
       */

      const response = await fetch(
        "https://formsubmit.co/ajax/dereglafrancisjulianderegla@gmail.com",
        {
          method: "POST",

          headers: {
            Accept: "application/json",
          },

          body: formData,
        },
      );

      /*
       * FormSubmit returns JSON.
       */

      let result = null;

      try {
        result = await response.json();
      } catch (jsonError) {
        console.warn("FormSubmit did not return JSON.", jsonError);
      }

      console.log("FLUXION FormSubmit response:", result);

      /*
       * Only HTTP errors should
       * be treated as failed.
       */

      if (!response.ok) {
        throw new Error("FormSubmit request failed");
      }

      /* =====================================
                   SUCCESS
                ===================================== */

      contactForm.innerHTML = `
                    <div
                        class="form-success"
                    >

                        <div
                            class="success-icon"
                        >

                            ✓

                        </div>


                        <div
                            class="success-label"
                        >

                            INQUIRY RECEIVED

                        </div>


                        <h3
                            class="success-title"
                        >

                            Thank You.

                        </h3>


                        <p
                            class="success-description"
                        >

                            Your project inquiry has been
                            sent successfully to the FLUXION
                            team. We'll get back to you as
                            soon as possible.

                        </p>


                        <button
                            type="button"
                            id="sendAnotherButton"
                            class="button success-button"
                        >

                            Send Another Inquiry

                        </button>

                    </div>
                    `;

      /* =====================================
                   SEND ANOTHER INQUIRY
                ===================================== */

      const sendAnotherButton = document.getElementById("sendAnotherButton");

      if (sendAnotherButton) {
        sendAnotherButton.addEventListener("click", () => {
          /*
           * Restore the page without
           * redirecting to FormSubmit.
           *
           * This reloads the SAME
           * GitHub Pages URL.
           */

          window.location.reload();
        });
      }
    } catch (error) {
      console.error("FLUXION form error:", error);

      /* =====================================
                   ERROR
                ===================================== */

      submitButton.disabled = false;

      submitButton.style.opacity = "1";

      submitButton.innerHTML = originalButtonHTML;

      alert(
        "We couldn't send your inquiry. Please check your connection and try again.",
      );
    }
  });
}
