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

      const result = await response.json();

      console.log("FLUXION direct email response:", result);

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "FormSubmit rejected the request.");
      }

      directEmailLink.textContent = "Sent — we'll be in touch ✓";

      setTimeout(() => {
        directEmailLink.textContent = originalText;
      }, 4000);
    } catch (error) {
      console.error("Direct email error:", error);

      directEmailLink.textContent = originalText;

      alert("The email could not be sent. Please use the inquiry form.");
    }
  });
}

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  /*
   * Save the original form HTML.
   */

  const originalFormHTML = contactForm.innerHTML;

  /*
   * Initialize the contact form.
   */

  function initializeContactForm() {
    const form = document.querySelector(".contact-form");

    if (!form) {
      return;
    }

    form.addEventListener("submit", handleFormSubmit);
  }

  /*
   * Submit the form through AJAX.
   */

  async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const submitButton = form.querySelector(".submit-button");

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
      /* =====================================
               COLLECT FORM DATA
            ===================================== */

      const formData = new FormData(form);

      console.log("FLUXION form data:");

      for (const [key, value] of formData.entries()) {
        console.log(key, ":", value);
      }

      /* =====================================
               SEND TO FORMSUBMIT
            ===================================== */

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

      /* =====================================
               READ RESPONSE
            ===================================== */

      let result;

      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("FormSubmit JSON error:", jsonError);

        throw new Error("FormSubmit did not return a valid response.");
      }

      console.log("FLUXION FormSubmit response:", result);

      /* =====================================
               CHECK FOR ACTUAL SUCCESS
            ===================================== */

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "FormSubmit rejected the submission.",
        );
      }

      /* =====================================
               SUCCESS SCREEN
            ===================================== */

      form.innerHTML = `
                <div class="form-success">

                    <div class="success-icon">
                        ✓
                    </div>


                    <div class="success-label">
                        INQUIRY RECEIVED
                    </div>


                    <h3 class="success-title">
                        Thank You.
                    </h3>


                    <p class="success-description">

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
           * Restore the original form.
           *
           * No reload.
           *
           * No redirect.
           */

          form.innerHTML = originalFormHTML;

          /*
           * Reconnect the submit
           * event listener.
           */

          initializeContactForm();

          /*
           * Focus the name field.
           */

          const nameInput = form.querySelector("#name");

          if (nameInput) {
            nameInput.focus();
          }
        });
      }
    } catch (error) {
      console.error("FLUXION form error:", error);

      /* =====================================
               ERROR STATE
            ===================================== */

      submitButton.disabled = false;

      submitButton.style.opacity = "1";

      submitButton.innerHTML = originalButtonHTML;

      alert(
        "We couldn't send your inquiry.\n\n" +
          "Please check the browser console (F12) " +
          "for the FormSubmit error.",
      );
    }
  }

  /*
   * Start the form.
   */

  initializeContactForm();
}
