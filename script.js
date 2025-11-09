const sections = document.querySelectorAll(".section");
const sidebar = document.getElementById("sidebar");
const sideNav = document.getElementById("sideNav");
const profilePhoto = document.getElementById("profilePhoto");
const topNav = document.getElementById("topNav");

// get the scrollable container
const mainContent = document.querySelector(".main-content");

// listen for scroll events on the main content
mainContent.addEventListener("scroll", () => {
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
});
