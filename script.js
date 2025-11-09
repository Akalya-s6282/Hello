document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const sidebar = document.getElementById("sidebar");
  const sideNav = document.getElementById("sideNav");
  const profilePhoto = document.getElementById("profilePhoto");
  const topNav = document.getElementById("topNav");
  const mainContent = document.querySelector(".main-content");

  const updateNavVisibility = () => {
    const fromTop = mainContent.scrollTop;
    const activeSection = [...sections].find(
      (section) =>
        section.offsetTop <= fromTop + 100 &&
        section.offsetTop + section.offsetHeight > fromTop
    );

    if (activeSection && activeSection.id === "landing") {
      sideNav.style.display = "flex";
      profilePhoto.style.display = "none";
      topNav.style.display = "none";
    } else {
      sideNav.style.display = "none";
      profilePhoto.style.display = "block";
      topNav.style.display = "flex";
    }
  };

  // Run once immediately when page loads
  updateNavVisibility();

  // Then keep watching for scroll events
  mainContent.addEventListener("scroll", updateNavVisibility);
});


const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let index = 0;
let autoSlideInterval; // for controlling auto slide

function showSlide(i) {
  if (i >= slides.length) index = 0;
  else if (i < 0) index = slides.length - 1;
  else index = i;

  slider.style.transform = `translateX(-${index * 100}%)`;
}

// Navigation buttons
nextBtn.addEventListener("click", () => {
  showSlide(index + 1);
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  showSlide(index - 1);
  resetAutoSlide();
});

// Auto-slide setup
function startAutoSlide() {
  autoSlideInterval = setInterval(() => showSlide(index + 1), 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Modal functionality
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const modalGithub = document.getElementById("modalGithub");
const closeModal = document.querySelector(".close");

slides.forEach(slide => {
  slide.addEventListener("click", () => {
    // Stop sliding when a project is selected
    stopAutoSlide();

    modal.style.display = "block";
    modalImg.src = slide.querySelector("img").src;
    modalTitle.textContent = slide.dataset.title;
    modalDesc.textContent = slide.dataset.description;
    modalGithub.href = slide.dataset.github;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  startAutoSlide(); // Resume auto-slide when closed
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    startAutoSlide();
  }
});
document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('modalTitle').innerText = item.dataset.title;
    document.getElementById('modalDescription').innerHTML = `
      ${item.dataset.description}<br><br>
      <a href="${item.dataset.link}" target="_blank">View on GitHub</a>
    `;
    document.getElementById('projectModal').style.display = 'flex';
  });
});


// Start auto-slide initially
startAutoSlide();