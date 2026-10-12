import { setupNavigation, updateYear, setupDialogs, trackVisit } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  updateYear();
  setupDialogs();
  trackVisit();
});
