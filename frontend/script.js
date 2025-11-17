const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const openModalBtn = document.querySelector(".js-open-modal");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
const modalIframe = modal?.querySelector("iframe");
const newsletterForm = document.querySelector(".newsletter-form");
const backToTop = document.querySelector(".back-to-top");

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("is-open");
});

document.addEventListener("click", (event) => {
  if (
    navLinks?.classList.contains("is-open") &&
    !navLinks.contains(event.target) &&
    !navToggle.contains(event.target)
  ) {
    navLinks.classList.remove("is-open");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    navLinks?.classList.remove("is-open");
  });
});

const trailerURL = "https://www.youtube.com/embed/F9gB5b4jgOI?autoplay=1";

openModalBtn?.addEventListener("click", () => {
  modal?.classList.add("is-open");
  if (modalIframe) {
    modalIframe.src = trailerURL;
  }
});

const closeModal = () => {
  modal?.classList.remove("is-open");
  if (modalIframe) {
    modalIframe.src = "";
  }
};

modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("is-open")) {
    closeModal();
  }
});

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(newsletterForm);
  const email = formData.get("email");
  if (email) {
    alert(`Thanks! We'll reach out to ${email} with new drops.`);
    newsletterForm.reset();
  }
});

backToTop?.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" });
});
