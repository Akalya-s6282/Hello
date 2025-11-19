document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const sections = document.querySelectorAll(".section");
  const mainContent = document.querySelector(".main-content");
  const sideNav = document.getElementById("sideNav");
  const profilePhoto = document.getElementById("profilePhoto");
  const topNav = document.getElementById("topNav");

  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalGithub = document.getElementById("modalGithub");
  const closeModal = document.querySelector(".close");
  const gridItems = document.querySelectorAll(".grid-item");
 const hamburger = document.getElementById("hamburger");


hamburger.addEventListener("click", () => {
  topNav.classList.toggle("show");
   hamburger.classList.toggle("active");
});

document.querySelectorAll('.top-nav a').forEach(link => {
  link.addEventListener('click', () => {
    topNav.classList.remove('show');   // hide dropdown
    hamburger.classList.remove('active');  // reset hamburger state
  });
});



  // --- NAV VISIBILITY LOGIC ---
 const updateNavVisibility = () => {
  const fromTop = mainContent.scrollTop;
  const activeSection = [...sections].find(
    section =>
      section.offsetTop <= fromTop + 100 &&
      section.offsetTop + section.offsetHeight > fromTop
  );

    if (activeSection && activeSection.id === "landing") {
      sideNav.style.display = "flex";
      profilePhoto.classList.remove("show");
      topNav.style.display = "none";
    } else {
      sideNav.style.display = "none";
      profilePhoto.classList.add("show");
      topNav.style.display = "flex";
    }
  };

  // Throttle scroll for smooth behavior
  let ticking = false;
  mainContent.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavVisibility();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateNavVisibility(); // Run once at start

  // --- SLIDER LOGIC ---
  let index = 0;
  let autoSlideInterval;

  const showSlide = (i) => {
    if (i >= slides.length) index = 0;
    else if (i < 0) index = slides.length - 1;
    else index = i;

    slider.style.transform = `translateX(-${index * 100}%)`;
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => showSlide(index + 1), 4000);
  };

  const stopAutoSlide = () => clearInterval(autoSlideInterval);
  const resetAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  nextBtn.addEventListener("click", () => {
    showSlide(index + 1);
    resetAutoSlide();
  });
  prevBtn.addEventListener("click", () => {
    showSlide(index - 1);
    resetAutoSlide();
  });

  startAutoSlide(); // initial auto-slide

  // --- MODAL LOGIC ---
  const openModal = (item) => {
    stopAutoSlide();
    modal.style.display = "block";
    modalImg.src = item.querySelector("img").src;
    modalTitle.textContent = item.dataset.title;
    modalDesc.textContent = item.dataset.description;
    modalGithub.href = item.dataset.github;
  };

  const closeModalHandler = () => {
    modal.style.display = "none";
    startAutoSlide();
  };

  slides.forEach((slide) => slide.addEventListener("click", () => openModal(slide)));
  gridItems.forEach((item) => item.addEventListener("click", () => openModal(item)));

  closeModal.addEventListener("click", closeModalHandler);
  window.addEventListener("click", (e) => { if (e.target === modal) closeModalHandler(); });
});
const skillProjects = {
  foundation: [
    "Blink Controlled Assistive Keyboard (base logic & Python)",
    "Discord Verification Bot (Python)"
  ],
  problem: [
    "Blink Signal Interpretation & Navigation Logic",
    "Matrix-style Functional Test Cases"
  ],
  web: [
    "Assistive Keyboard UI (Pygame → Flet)",
    "Portfolio Website",
    "Flask Based Calorie Estimator"
  ],
  ai: [
    "Codebase modification using AI",
    "Feature Integration & Adaptation"
  ]
};
// Show projects when clicking a skill card
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.skill;
    const projectBox = document.getElementById("skillProjects");

    projectBox.innerHTML = `
      <h3>Projects Applied:</h3>
      ${skillProjects[key].map(p => `<p>• ${p}</p>`).join('')}
    `;

    projectBox.style.display = "block";
  });
});

// Scroll to full projects section when projectBox is clicked
document.getElementById("skillProjects").addEventListener("click", () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".skill-card").forEach(card => {
  const icons = card.querySelectorAll(".icon-row i");
  const infoArea = card.querySelector(".icon-info");

  icons.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      infoArea.textContent = icon.getAttribute("data-tooltip");
      card.classList.add("show-info");
    });

    icon.addEventListener("mouseleave", () => {
      infoArea.textContent = "";
      card.classList.remove("show-info");
    });
  });
});
const cards = document.querySelectorAll(".certificate-card");
const modal = document.getElementById("certificatePreview");
const modalImg = document.getElementById("previewCertImg");
const modalTitle = document.getElementById("previewCertTitle");
const modalIssuer = document.getElementById("previewCertIssuer");
const modalLink = document.getElementById("previewCertLink");
const closeBtn = document.getElementById("closeCertificatePreview");

const modalIframe = document.getElementById("previewCertIframe"); // new

cards.forEach(card => {
  card.querySelector(".view-btn").addEventListener("click", e => {
    e.preventDefault();
    const fileId = card.dataset.fileId;
    modalTitle.textContent = card.dataset.title;
    modalIssuer.textContent = card.dataset.issuer;

    // Set iframe src instead of img
  modalIframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
;
    modalLink.href = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    modal.style.display = "block";
  });
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
