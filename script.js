const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const faqItems = document.querySelectorAll(".faq-item");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Carousel functionality
const carouselSlides = document.querySelectorAll(".hero-card-inner");
const dots = document.querySelectorAll(".carousel-dots .dot");
let currentSlide = 0;
let autoRotateInterval;

function showSlide(index) {
  carouselSlides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));
  
  carouselSlides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % carouselSlides.length;
  showSlide(currentSlide);
}

function startAutoRotate() {
  autoRotateInterval = setInterval(nextSlide, 5000);
}

function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  startAutoRotate();
}

// Initialize carousel
if (carouselSlides.length > 0) {
  showSlide(0);
  startAutoRotate();

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = parseInt(dot.dataset.slide);
      showSlide(currentSlide);
      resetAutoRotate();
    });
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Plan modal functionality
const planModal = document.getElementById("planModal");
const modalClose = document.getElementById("modalClose");
const planName = document.getElementById("planName");
const planButtons = document.querySelectorAll(".plan-button");
const planInquiryForm = document.getElementById("planInquiryForm");
const inquiryMessage = document.getElementById("inquiryMessage");
const inquiryPlan = document.getElementById("inquiryPlan");
const inquirySubject = document.getElementById("inquirySubject");

if (planModal && modalClose && planName && planInquiryForm && inquiryMessage) {
  planButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.getAttribute("data-plan");
      planName.textContent = plan;
      if (inquiryPlan) {
        inquiryPlan.value = plan;
      }
      if (inquirySubject) {
        inquirySubject.value = `Ny paketforfragan: ${plan}`;
      }
      planModal.classList.add("active");
    });
  });

  modalClose.addEventListener("click", () => {
    planModal.classList.remove("active");
  });

  planModal.addEventListener("click", (e) => {
    if (e.target === planModal) {
      planModal.classList.remove("active");
    }
  });

  planInquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(planInquiryForm);

    try {
      const response = await fetch(
        planInquiryForm.action.replace("formsubmit.co/", "formsubmit.co/ajax/"),
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        inquiryMessage.textContent = "Tack! Jag aterkommer till dig sa snart som mojligt.";
        inquiryMessage.classList.add("active");
        planInquiryForm.style.display = "none";

        setTimeout(() => {
          planModal.classList.remove("active");
          planInquiryForm.style.display = "grid";
          inquiryMessage.classList.remove("active");
          planInquiryForm.reset();
          if (inquiryPlan) {
            inquiryPlan.value = "Webbpartner";
          }
          if (inquirySubject) {
            inquirySubject.value = "Ny paketforfragan fran Webbpartner";
          }
        }, 2000);
      } else {
        inquiryMessage.textContent = "Nagot gick fel. Forsok igen.";
        inquiryMessage.classList.add("active");
      }
    } catch (error) {
      inquiryMessage.textContent = "Nagot gick fel. Kontrollera internet eller forsok igen senare.";
      inquiryMessage.classList.add("active");
    }
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => faq.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

if (contactForm && formMessage) {
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      formMessage.textContent = "Tack! Ditt meddelande har skickats.";
      formMessage.style.display = "block";
      contactForm.reset();
    } else {
      formMessage.textContent = "Något gick fel. Försök igen.";
      formMessage.style.display = "block";
    }
  } catch (error) {
    formMessage.textContent = "Något gick fel. Kontrollera internet eller försök igen senare.";
    formMessage.style.display = "block";
  }
});
}

const setActiveLink = () => {
  let currentId = "hem";

  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 140;
    const height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      currentId = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Rocket Runner Timeline Animation
class RocketRunner {
  constructor() {
    this.rocket = document.getElementById('rocketRunner');
    this.timeline = document.querySelector('.process-timeline');
    this.steps = document.querySelectorAll('.timeline-step');
    this.track = document.querySelector('.runner-track');
    this.isAnimating = false;
    this.currentStep = 0;
    this.autoAnimationInterval = null;
    this.resumeAutoTimeout = null;
    this.eventsBound = false;
    this.stepMouseEnterHandlers = [];
    this.stepColors = {
      0: 'linear-gradient(90deg, #00d4ff, #0099cc)', // step-1
      1: 'linear-gradient(90deg, #ff6b35, #ff8c42)', // step-2
      2: 'linear-gradient(90deg, #a855f7, #c084fc)', // step-3
      3: 'linear-gradient(90deg, #fbbf24, #10b981)'  // step-4
    };
    this.handleTrackMouseEnter = this.handleMouseEnter.bind(this);
    this.handleTrackMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTrackMouseMove = this.handleMouseMove.bind(this);
    this.handleRunnerClick = this.handleRocketClick.bind(this);
    this.handleStepMouseLeave = this.handleStepLeave.bind(this);

    if (this.rocket && this.timeline) {
      this.init();
    }
  }

  init() {
    // Set initial size
    this.rocket.style.fontSize = '1.5rem';
    this.positionAtStep(0); // Start at first step
    this.highlightStep(0);

    // Only activate on desktop screens
    if (window.innerWidth >= 1024) {
      this.bindEvents();
      this.startAutoAnimation();
    }

    // Reinitialize on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && !this.isAnimating) {
        this.bindEvents();
        this.startAutoAnimation();
      } else {
        this.unbindEvents();
        this.stopAutoAnimation();
      }
    });
  }

  positionAtStep(stepIndex) {
    const step = this.steps[stepIndex];
    if (step) {
      const stepRect = step.getBoundingClientRect();
      const containerRect = this.timeline.getBoundingClientRect();
      const targetLeft = stepRect.left + stepRect.width / 2 - containerRect.left;
      this.rocket.style.left = `${targetLeft}px`;
    }
  }

  bindEvents() {
    if (this.eventsBound) {
      return;
    }

    this.track.addEventListener('mouseenter', this.handleTrackMouseEnter);
    this.track.addEventListener('mouseleave', this.handleTrackMouseLeave);
    this.track.addEventListener('mousemove', this.handleTrackMouseMove);
    this.rocket.addEventListener('click', this.handleRunnerClick);
    this.steps.forEach((step, index) => {
      const mouseEnterHandler = () => this.handleStepHover(index);
      this.stepMouseEnterHandlers[index] = mouseEnterHandler;
      step.addEventListener('mouseenter', mouseEnterHandler);
      step.addEventListener('mouseleave', this.handleStepMouseLeave);
    });
    this.eventsBound = true;
  }

  unbindEvents() {
    if (!this.eventsBound) {
      return;
    }

    this.track.removeEventListener('mouseenter', this.handleTrackMouseEnter);
    this.track.removeEventListener('mouseleave', this.handleTrackMouseLeave);
    this.track.removeEventListener('mousemove', this.handleTrackMouseMove);
    this.rocket.removeEventListener('click', this.handleRunnerClick);
    this.steps.forEach((step, index) => {
      const mouseEnterHandler = this.stepMouseEnterHandlers[index];
      if (mouseEnterHandler) {
        step.removeEventListener('mouseenter', mouseEnterHandler);
      }
      step.removeEventListener('mouseleave', this.handleStepMouseLeave);
    });
    this.stepMouseEnterHandlers = [];
    this.eventsBound = false;
  }

  handleMouseEnter() {
    this.stopAutoAnimation();
    this.rocket.style.transform = 'translate(-50%, -50%) scale(1.1)';
  }

  handleMouseLeave() {
    this.startAutoAnimation();
    this.rocket.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  handleMouseMove(e) {
    const rect = this.track.getBoundingClientRect();
    const trackWidth = rect.width;
    const mouseX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, mouseX / trackWidth));

    this.moveRocket(progress);
    this.highlightCurrentStep(progress);
  }

  handleRocketClick() {
    this.stopAutoAnimation();
    this.clearResumeAutoTimeout();

    // Add a fun bounce animation
    this.rocket.style.animation = 'none';
    setTimeout(() => {
      this.rocket.style.animation = 'rocket-bounce 0.6s ease-in-out';
    }, 10);

    setTimeout(() => {
      this.rocket.style.animation = 'rocket-float 2s ease-in-out infinite';
    }, 650);

    this.resumeAutoTimeout = setTimeout(() => {
      this.startAutoAnimation();
    }, 10000);
  }

  handleStepHover(stepIndex) {
    this.stopAutoAnimation();
    this.currentStep = stepIndex;
    this.positionAtStep(stepIndex);
    this.highlightStep(stepIndex);
  }

  handleStepLeave() {
    this.startAutoAnimation();
  }

  moveRocket(progress) {
    // Keep the rocket on the runner line even when mouse is between steps
    const trackRect = this.track.getBoundingClientRect();
    const containerRect = this.timeline.getBoundingClientRect();
    const relativeLeft = trackRect.left - containerRect.left;
    const newLeft = relativeLeft + Math.max(0, Math.min(1, progress)) * trackRect.width;
    this.rocket.style.left = `${newLeft}px`;

    // Scale the smiley face based on progress
    const stepIndex = Math.floor(progress * this.steps.length);
    const clampedIndex = Math.min(stepIndex, this.steps.length - 1);
    const sizes = ['1.5rem', '2rem', '2.5rem', '3rem'];
    this.rocket.style.fontSize = sizes[clampedIndex] || '2.5rem';
  }

  highlightCurrentStep(progress) {
    const stepIndex = Math.floor(progress * this.steps.length);
    const clampedIndex = Math.min(stepIndex, this.steps.length - 1);
    this.highlightStep(clampedIndex);
  }

  highlightStep(stepIndex) {
    this.steps.forEach(step => step.classList.remove('highlighted'));

    const currentStep = this.steps[stepIndex];
    if (currentStep) {
      currentStep.classList.add('highlighted');

      // Sync track color with highlighted step
      this.track.style.background = this.stepColors[stepIndex];

      // Scale the smiley face bigger with each step
      const sizes = ['1.5rem', '2rem', '2.5rem', '3rem'];
      this.rocket.style.fontSize = sizes[stepIndex] || '2.5rem';

      const stepRect = currentStep.getBoundingClientRect();
      const containerRect = this.timeline.getBoundingClientRect();
      const targetLeft = stepRect.left + stepRect.width / 2 - containerRect.left;
      this.rocket.style.left = `${targetLeft}px`;
    }
  }

  startAutoAnimation() {
    this.clearResumeAutoTimeout();
    this.stopAutoAnimation();
    this.autoAnimationInterval = setInterval(() => {
      this.currentStep = (this.currentStep + 1) % this.steps.length;
      const progress = this.currentStep / (this.steps.length - 1);
      this.moveRocket(progress);
      this.highlightCurrentStep(progress);
    }, 3000);
  }

  stopAutoAnimation() {
    if (this.autoAnimationInterval) {
      clearInterval(this.autoAnimationInterval);
      this.autoAnimationInterval = null;
    }
  }

  clearResumeAutoTimeout() {
    if (this.resumeAutoTimeout) {
      clearTimeout(this.resumeAutoTimeout);
      this.resumeAutoTimeout = null;
    }
  }
}

// Initialize rocket runner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RocketRunner();
});
