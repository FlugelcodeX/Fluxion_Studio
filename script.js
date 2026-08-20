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
   No mail client popup
========================================= */

const directEmailLink = document.getElementById("directEmailLink");

if (directEmailLink) {
  const originalText = directEmailLink.textContent;

  directEmailLink.addEventListener("click", async (event) => {
    event.preventDefault();

    directEmailLink.textContent = "Sending...";

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/dereglafrancisjulian@gmail.com",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Accept: "application/json",
          },

          body: JSON.stringify({
            _subject: "Quick contact click — FLUXION website",

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
      directEmailLink.textContent = originalText;

      alert("Something went wrong — please use the form below instead.");
    }
  });
}

/* =========================================
   CONTACT FORM
   AJAX SUBMISSION
   STAYS ON THE WEBSITE
========================================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    /*
     * IMPORTANT:
     * Prevent the browser from leaving
     * the FLUXION website.
     */

    event.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");

    const originalButtonHTML = submitButton ? submitButton.innerHTML : "";

    /* ==============================
               LOADING STATE
            ============================== */

    if (submitButton) {
      submitButton.disabled = true;

      submitButton.style.opacity = "0.7";

      submitButton.innerHTML = `
                    Sending Inquiry...
                    <span>↗</span>
                    `;
    }

    try {
      /*
       * Collect everything from
       * the form.
       */

      const formData = new FormData(contactForm);

      /*
       * Send the form using FormSubmit's
       * AJAX endpoint instead of normal
       * form submission.
       */

      const response = await fetch(
        "https://formsubmit.co/ajax/dereglafrancisjulian@gmail.com",
        {
          method: "POST",

          body: formData,

          headers: {
            Accept: "application/json",
          },
        },
      );

      /*
       * Convert response to JSON.
       */

      const result = await response.json();

      /*
       * Check if FormSubmit
       * accepted the message.
       */

      if (!response.ok || result.success === false) {
        throw new Error("Form submission failed");
      }

      /* ==============================
                   SUCCESS STATE
                ============================== */

      contactForm.innerHTML = `
                    <div
                        style="
                            min-height: 420px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            padding: 30px;
                        "
                    >

                        <div
                            style="
                                width: 70px;
                                height: 70px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-bottom: 25px;
                                border: 1px solid rgba(37, 137, 255, 0.45);
                                border-radius: 50%;
                                background: rgba(37, 137, 255, 0.08);
                                color: #55B8FF;
                                font-size: 28px;
                            "
                        >
                            ✓
                        </div>


                        <h3
                            style="
                                font-family: 'Space Grotesk', sans-serif;
                                font-size: 32px;
                                margin-bottom: 15px;
                            "
                        >
                            Inquiry Sent.
                        </h3>


                        <p
                            style="
                                max-width: 430px;
                                color: #7186A3;
                                font-size: 14px;
                                line-height: 1.8;
                            "
                        >
                            Thank you for reaching out to FLUXION.
                            We've received your inquiry and will
                            get back to you as soon as possible.
                        </p>


                        <button
                            type="button"
                            id="sendAnotherButton"
                            class="button button-secondary"
                            style="
                                margin-top: 30px;
                            "
                        >
                            Send Another Inquiry
                        </button>

                    </div>
                    `;

      /* ==============================
                   SEND ANOTHER INQUIRY
                ============================== */

      const sendAnotherButton = document.getElementById("sendAnotherButton");

      if (sendAnotherButton) {
        sendAnotherButton.addEventListener("click", () => {
          /*
           * Reloading the page restores
           * the original form and keeps
           * the user on the same website.
           */

          window.location.reload();
        });
      }
    } catch (error) {
      console.error("FLUXION form error:", error);

      /* ==============================
                   ERROR STATE
                ============================== */

      if (submitButton) {
        submitButton.disabled = false;

        submitButton.style.opacity = "1";

        submitButton.innerHTML = originalButtonHTML;
      }

      alert(
        "We couldn't send your inquiry. Please check your connection and try again.",
      );
    }
  });
}
