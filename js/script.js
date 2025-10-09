'use strict';

/*========== dark light mode ==========*/
let darkModeBtn = document.querySelector('#dark-mode-btn');
let darkModeIcon = document.querySelector('#dark-mode-icon');

function updateDarkModeIcon() {
  if (document.body.classList.contains('dark-mode'))
    darkModeIcon.innerHTML = 'dark_mode';
  else
    darkModeIcon.innerHTML = 'light_mode';
}

// On click toggle
darkModeBtn.onclick = () => {
  document.body.classList.toggle('dark-mode');
  updateDarkModeIcon();
};

// Set default based on system preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.add('dark-mode');
}

updateDarkModeIcon();

/*========== menu icon navbar ==========*/
let navbar = document.querySelector('.navbar');
let menuBtn = document.querySelector('#menu-btn');
let menuIcon = document.querySelector('#menu-icon');
let navbarLinks = document.querySelector("#nav-links-container");

menuBtn.onclick = () => {
  navbar.classList.toggle('active');
  updateMenuIcon();
};

function updateMenuIcon() {
  if (navbar.classList.contains('active')) {
    menuIcon.innerHTML = 'menu_open';
    navbarLinks.style.right = "0%";
  } else {
    menuIcon.innerHTML = 'menu';
    navbarLinks.style.right = "-100%";
  }
}

updateMenuIcon();

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('main nav ul li a');
let main = document.querySelector('#main-content');

main.onscroll = () => {
  if (window.innerWidth <= 1024) return;
  let top = main.scrollTop;
  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');
    
    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector('main nav ul li a[href*="' + id + '"]').classList.add('active');
    }
  });
};

window.onscroll = () => {
  if (window.innerWidth > 1024) return;
  let top = window.scrollY;
  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');
    
    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector('main nav ul li a[href*="' + id + '"]').classList.add('active');
    }
  });
};

/*========== Display Projects ==========*/

const downloadBtn = document.getElementById("download-cv-btn");
  const filePath = "../Assets/Sameer Shamshad Resume.pdf";

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "Sameer-Shamshad-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

/*========== Display Projects ==========*/
import projects from './projects.js';
const projectList = document.getElementById("project-list");

const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-project-title");
const carousal = document.getElementById("carousal");
const totalImages = document.getElementById("total-images");

// Close modal when user clicks close button
document.querySelector("[data-modal-close-btn]").addEventListener("click", () => {
  modalOverlay.classList.remove("show");
});

projects.forEach(project => {
  const article = document.createElement("article");
  article.classList.add("project-container");

  const showPreviewBtn = project.screenshots && project.screenshots.length > 0;
  const hasLiveDemo = project.url && project.url.trim() !== "";
  const hasGithub = project.github && project.github.trim() !== "";

  article.innerHTML = `
    <div class="project-header">
      <h4 class="project-title">${project.title}</h4>
      ${showPreviewBtn ? `
        <button type="button" class="preview-btn">
          <span class="material-symbols-outlined">visibility</span>
        </button>
      ` : ""}
    </div>

    <p class="project-description">${project.description}</p>
    <p class="project-timeline ${project?.timeline?.end ? '' : 'active'}">
      ${formatTimeline(project.timeline.start, project.timeline.end)}
    </p>

    <ul class="technologies-used">
      ${project.technologies.map(tech => `
        <li>
          <span class="technology-name">${tech.name}</span>
          <img src="${tech.icon}" 
               title="${tech.name}" 
               class="${tech.invert ? "invert-technology-icon" : tech.reinvert ? "reinvert-technology-icon" : ""}">
        </li>
      `).join('')}
    </ul>

    <div class="actions">
      ${hasLiveDemo ? `
        <a href="${project.url}" class="redirect-to-live-demo" target="_blank" rel="noopener noreferrer">
          <span>Live Demo</span>
        </a>
      ` : ""}
      ${hasGithub ? `
        <a href="${project.github}" class="redirect-to-github" target="_blank" rel="noopener noreferrer">
          <ion-icon name="logo-github"></ion-icon>
          <span>Source Code</span>
        </a>
      ` : `<p class="missing-info">The developer chose not to share the source code publicly.</p>`}
    </div>
  `;

  projectList.appendChild(article); // Append to project list

  if (showPreviewBtn) { // Add modal trigger logic
    const previewBtn = article.querySelector(".preview-btn");
    previewBtn.addEventListener("click", () => {
      modalTitle.textContent = project.title; // Set project title in modal

      carousal.innerHTML = project.screenshots.map(src => `
        <img src="${src}" class="carousel-image" alt="${project.title} screenshot">
      `).join(''); // Populate carousel with screenshots

      totalImages.textContent = `1/${project.screenshots.length}`; // Set total images count
      modalOverlay.classList.add("show"); // Show modal
    });
  }
});

function formatTimeline(start, end = "") {
  const options = { month: "2-digit", year: "numeric" };
  const startStr = start.toLocaleDateString("en-US", options).replace(",", "");
  const endStr = end ? end.toLocaleDateString("en-US", options).replace(",", "") : "Now*";
  return `${startStr} - ${endStr}`;
}

// window.location.href = "#projects";

/*========== Carousal Variables ==========*/
const carousel = document.querySelector('#carousal');

projects[1]?.screenshots?.forEach(ui => {
  const img = document.createElement('img');
  img.src = ui;
  img.alt = "Project Screenshot";
  img.classList.add('carousel-image');
  carousel.appendChild(img);
});

// // element toggle function
// const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// // sidebar variables
// const sidebar = document.querySelector("[data-sidebar]");
// const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// // sidebar toggle functionality for mobile
// sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// // testimonials variables
// const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
// const modalContainer = document.querySelector("[data-modal-container]");
// const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
// const overlay = document.querySelector("[data-overlay]");

// // modal variable
// const modalImg = document.querySelector("[data-modal-img]");
// const modalTitle = document.querySelector("[data-modal-title]");
// const modalText = document.querySelector("[data-modal-text]");

// // modal toggle function
// const testimonialsModalFunc = function () {
//   modalContainer.classList.toggle("active");
//   overlay.classList.toggle("active");
// }

// // add click event to all modal items
// for (let i = 0; i < testimonialsItem.length; i++) {

//   testimonialsItem[i].addEventListener("click", function () {

//     modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
//     modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
//     modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
//     modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

//     testimonialsModalFunc();

//   });

// }

// // add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// // custom select variables
// const select = document.querySelector("[data-select]");
// const selectItems = document.querySelectorAll("[data-select-item]");
// const selectValue = document.querySelector("[data-selecct-value]");
// const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// // add event in all select items
// for (let i = 0; i < selectItems.length; i++) {
//   selectItems[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     elementToggleFunc(select);
//     filterFunc(selectedValue);

//   });
// }

// // filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }

// // add event in all filter button items for large screen
// let lastClickedBtn = filterBtn[0];

// for (let i = 0; i < filterBtn.length; i++) {

//   filterBtn[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     filterFunc(selectedValue);

//     lastClickedBtn.classList.remove("active");
//     this.classList.add("active");
//     lastClickedBtn = this;

//   });

// }

// // page navigation variables
// const navigationLinks = document.querySelectorAll("[data-nav-link]");
// const pages = document.querySelectorAll("[data-page]");

// // add event to all nav link
// for (let i = 0; i < navigationLinks.length; i++) {
//   navigationLinks[i].addEventListener("click", function () {

//     for (let i = 0; i < pages.length; i++) {
//       if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
//         pages[i].classList.add("active");
//         navigationLinks[i].classList.add("active");
//         window.scrollTo(0, 0);
//       } else {
//         pages[i].classList.remove("active");
//         navigationLinks[i].classList.remove("active");
//       }
//     }
//   });
// }