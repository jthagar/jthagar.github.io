/**
 * Portfolio shell: sticky nav, scroll spy, mobile menu, theme, ripples.
 */

const STORAGE_KEY = "portfolio-theme";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getStoredTheme(): "light" | "dark" | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* private mode */
  }
  return null;
}

function prefersLight(): boolean {
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

function applyTheme(theme: "light" | "dark"): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  syncThemeToggleIcon(theme);
}

function syncThemeToggleIcon(theme: "light" | "dark"): void {
  const icon = document.querySelector<HTMLElement>(
    "#theme-toggle .material-symbols-outlined"
  );
  if (!icon) return;
  icon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
}

function toggleTheme(): void {
  const cur =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  applyTheme(cur === "dark" ? "light" : "dark");
}

function initTheme(): void {
  const stored = getStoredTheme();
  const initial = stored ?? (prefersLight() ? "light" : "dark");
  applyTheme(initial);

  const btn = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", () => toggleTheme());
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
    }
  });

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (mq) => {
      if (getStoredTheme() !== null) return;
      applyTheme(mq.matches ? "light" : "dark");
    });
}

function initReducedMotion(): void {
  if (prefersReducedMotion()) {
    document.documentElement.classList.add("reduce-motion");
  }
}

function initRipples(): void {
  if (prefersReducedMotion()) return;

  document.body.addEventListener(
    "click",
    (e) => {
      const host = (e.target as HTMLElement).closest<HTMLElement>(".md-ripple");
      if (!host || !(host instanceof HTMLElement)) return;
      const rect = host.getBoundingClientRect();
      const wave = document.createElement("span");
      wave.className = "md-ripple__wave";
      const size = Math.max(rect.width, rect.height) * 1.2;
      wave.style.width = `${size}px`;
      wave.style.height = `${size}px`;
      wave.style.left = `${e.clientX - rect.left - size / 2}px`;
      wave.style.top = `${e.clientY - rect.top - size / 2}px`;
      host.appendChild(wave);
      wave.addEventListener("animationend", () => wave.remove());
    },
    { capture: true }
  );
}

const NAV_OPEN_CLASS = "site-nav-open";

function isNavOpen(): boolean {
  return document.body.classList.contains(NAV_OPEN_CLASS);
}

function setNavOpen(open: boolean): void {
  const toggle = document.querySelector<HTMLButtonElement>("#nav-toggle");
  document.body.classList.toggle(NAV_OPEN_CLASS, open);
  toggle?.setAttribute("aria-expanded", open ? "true" : "false");
  toggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
}

function initMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>("#nav-toggle");
  const nav = document.querySelector<HTMLElement>("#site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => setNavOpen(!isNavOpen()));

  nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isNavOpen()) setNavOpen(false);
  });
}

function scrollToHash(hash: string): void {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

function initSmoothAnchors(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();
      scrollToHash(href);
      history.pushState(null, "", href);
    });
  });

  const hash = window.location.hash;
  if (hash && document.querySelector(hash)) {
    requestAnimationFrame(() => scrollToHash(hash));
  }

  window.addEventListener("hashchange", () => {
    if (window.location.hash) scrollToHash(window.location.hash);
  });
}

function initScrollSpy(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".site-nav__link[href^='#']")
  );
  if (!links.length) return;

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("main#main-content section[id]")
  );
  if (!sections.length) return;

  const setActive = (id: string | null): void => {
    links.forEach((a) => {
      const href = a.getAttribute("href")?.replace(/^#/, "") ?? "";
      a.classList.toggle("is-active", id !== null && href === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((en) => en.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length === 0) return;
      const id = visible[0].target.id;
      if (id) setActive(id);
    },
    {
      root: null,
      rootMargin: "-38% 0px -38% 0px",
      threshold: 0,
    }
  );

  sections.forEach((sec) => observer.observe(sec));
}

function boot(): void {
  initReducedMotion();
  initTheme();
  initRipples();
  initMobileNav();
  initSmoothAnchors();
  initScrollSpy();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
