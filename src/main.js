import { siteConfig, navItems, sections } from "./content.js";

const navList = document.getElementById("nav-list");
const contentArea = document.getElementById("content-area");
const logoImg = document.getElementById("logo");
const logoHome = document.getElementById("logo-home");
const sidebar = document.getElementById("sidebar");
const panelInner = document.getElementById("panel-inner");
const navOverlay = document.getElementById("nav-overlay");
const navToggle = document.getElementById("nav-toggle");

let activeSection = siteConfig.homeSection || "home";
let isFirstRender = true;
let menuOpen = false;

function init() {
  document.title = siteConfig.title;
  logoImg.src = siteConfig.logo;
  logoImg.alt = `${siteConfig.title} logo`;

  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  });
  navOverlay.addEventListener("click", () => setMenuOpen(false));
  logoHome.addEventListener("click", goHome);

  updateMobileTopbarMetrics();
  window.addEventListener("resize", updateMobileTopbarMetrics);
  window.addEventListener("orientationchange", updateMobileTopbarMetrics);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  renderNav();
  renderContent(activeSection, isFirstRender);
  isFirstRender = false;
}

function updateMobileTopbarMetrics() {
  const header = document.querySelector(".sidebar__header");
  if (!header) return;

  const { bottom } = header.getBoundingClientRect();
  document.documentElement.style.setProperty("--mobile-topbar-bottom", `${bottom}px`);
}

function setMenuOpen(open) {
  menuOpen = open;

  if (open) {
    updateMobileTopbarMetrics();
  }

  sidebar.classList.toggle("sidebar--menu-open", open);
  panelInner.classList.toggle("panel--menu-open", open);
  navToggle.classList.toggle("nav-toggle--open", open);
  document.body.classList.toggle("menu-open", open);
  navOverlay.setAttribute("aria-hidden", String(!open));
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu"
  );
}

function renderNav() {
  navList.innerHTML = navItems
    .map(
      (item) => `
    <li class="nav-item">
      <button
        type="button"
        class="nav-btn${item.id === activeSection ? " nav-btn--active" : ""}"
        data-section="${item.id}"
        aria-label="${item.ariaLabel}"
        aria-current="${item.id === activeSection ? "page" : "false"}"
      >
        <img class="nav-btn__icon" src="${item.icon}" alt="" aria-hidden="true" />
        <span class="nav-btn__label">${item.label}</span>
      </button>
    </li>
  `
    )
    .join("");

  navList.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveSection(btn.dataset.section);
      setMenuOpen(false);
    });
  });
}

function renderPost(post) {
  const dateHtml = `<time class="content-block__date" datetime="${post.datetime}">${post.date}</time>`;

  if (post.paragraphs) {
    return `
      <div class="content-block__text content-block__post">
        ${post.paragraphs.map((p) => `<p class="content-block__post-paragraph">${p}</p>`).join("")}
        ${dateHtml}
      </div>
    `;
  }

  return `
    <p class="content-block__text content-block__post">
      ${post.text}
      ${dateHtml}
    </p>
  `;
}

function renderBlockBody(block) {
  if (block.posts) {
    return block.posts.map((post) => renderPost(post)).join("");
  }

  return (block.paragraphs || [])
    .map((p) => {
      if (block.variant === "quote-rainbow") {
        return `
          <blockquote class="content-block__quote">
            <div class="content-block__quote-inner">
              <p class="content-block__text content-block__quote-text">${p}</p>
            </div>
          </blockquote>
        `;
      }

      return `<p class="content-block__text">${p}</p>`;
    })
    .join("");
}

function buildSectionHtml(section) {
  return section.blocks
    .map(
      (block) => `
      <section class="content-block">
        <div class="content-block__heading-row">
          <h2 class="content-block__heading">${block.heading}</h2>
          <span class="content-block__divider" aria-hidden="true"></span>
        </div>
        ${renderBlockBody(block)}
      </section>
    `
    )
    .join("");
}

function renderContent(sectionId, skipTransition = false) {
  const section = sections[sectionId];
  if (!section) return;

  if (skipTransition) {
    contentArea.innerHTML = buildSectionHtml(section);
    contentArea.classList.add("content-area--visible");
    contentArea.classList.remove("content-area--hidden");
    return;
  }

  contentArea.classList.remove("content-area--visible");
  contentArea.classList.add("content-area--hidden");

  window.setTimeout(() => {
    contentArea.innerHTML = buildSectionHtml(section);
    contentArea.classList.remove("content-area--hidden");
    contentArea.classList.add("content-area--visible");
  }, 120);
}

function goHome() {
  setMenuOpen(false);
  const homeSection = siteConfig.homeSection || "home";

  if (activeSection !== homeSection) {
    activeSection = homeSection;
    renderNav();
    renderContent(homeSection);
    window.setTimeout(() => {
      contentArea.scrollTop = 0;
    }, 150);
    return;
  }

  contentArea.scrollTop = 0;
}

function setActiveSection(sectionId) {
  if (sectionId === activeSection || !sections[sectionId]) return;

  activeSection = sectionId;
  renderNav();
  renderContent(sectionId);
}

init();
