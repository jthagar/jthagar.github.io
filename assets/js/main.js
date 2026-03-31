(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-theme";
  const sections = document.querySelectorAll(".section");
  const controls = document.querySelector(".controls");
  const themeToggle = document.querySelector(".theme-btn-con");

  function setActiveSection(id) {
    sections.forEach((section) => {
      section.classList.toggle("active", section.id === id);
    });
    document.querySelectorAll(".controls .control").forEach((btn) => {
      const active = btn.getAttribute("data-id") === id;
      btn.classList.toggle("active-btn", active);
      btn.setAttribute("aria-current", active ? "page" : "false");
    });
    if (history.replaceState) {
      history.replaceState(null, "", "#" + id);
    }
  }

  function initNav() {
    if (!controls) return;
    controls.addEventListener("click", (e) => {
      const btn = e.target.closest(".control");
      if (!btn) return;
      const id = btn.getAttribute("data-id");
      if (!id) return;
      setActiveSection(id);
    });
  }

  function applyStoredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light") {
        document.body.classList.add("light-mode");
      } else if (stored === "dark") {
        document.body.classList.remove("light-mode");
      }
    } catch (_) {
      /* ignore */
    }
  }

  function initTheme() {
    applyStoredTheme();
    if (!themeToggle) return;
    const activate = () => {
      document.body.classList.toggle("light-mode");
      try {
        localStorage.setItem(
          STORAGE_KEY,
          document.body.classList.contains("light-mode") ? "light" : "dark"
        );
      } catch (_) {
        /* ignore */
      }
    };
    themeToggle.addEventListener("click", activate);
    themeToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  }

  function initHash() {
    const hash = (window.location.hash || "").replace(/^#/, "");
    if (hash && document.getElementById(hash)) {
      setActiveSection(hash);
    }
  }

  window.addEventListener("hashchange", initHash);
  initNav();
  initTheme();
  initHash();
})();
