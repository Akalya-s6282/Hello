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
