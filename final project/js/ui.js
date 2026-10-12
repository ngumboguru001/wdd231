export function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }));
}

export function updateYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

export function setupDialogs() {
  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog")?.close());
  });
  document.querySelectorAll("dialog.modal").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
  const maintenanceOpen = document.querySelector("#maintenance-modal-open");
  const maintenanceModal = document.querySelector("#maintenance-modal");
  maintenanceOpen?.addEventListener("click", () => maintenanceModal?.showModal());
}

export function trackVisit() {
  const note = document.querySelector("#visit-note");
  if (!note) return;
  try {
    const count = Number(localStorage.getItem("autohubVisitCount") || "0") + 1;
    localStorage.setItem("autohubVisitCount", String(count));
    note.textContent = `Welcome to AutoHub · Visit ${count}`;
    note.classList.add("show");
    window.setTimeout(() => note.classList.remove("show"), 3500);
  } catch (error) {
    console.warn("Local storage is unavailable in this browser.", error);
  }
}
