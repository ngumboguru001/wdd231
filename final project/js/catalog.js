import { setupNavigation, updateYear } from "./ui.js";
import { renderCard, renderDetails } from "./render.js";

const grid = document.querySelector("#catalog-grid");
const searchInput = document.querySelector("#catalog-search");
const typeFilter = document.querySelector("#type-filter");
const categoryFilter = document.querySelector("#category-filter");
const resultsCount = document.querySelector("#results-count");
const status = document.querySelector("#catalog-status");
const emptyState = document.querySelector("#empty-state");
const detailModal = document.querySelector("#detail-modal");
const detailTitle = document.querySelector("#detail-title");
const detailType = document.querySelector("#detail-type");
const detailContent = document.querySelector("#detail-content");
let catalogItems = [];

setupNavigation();
updateYear();
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", () => detailModal?.close()));
detailModal?.addEventListener("click", (event) => { if (event.target === detailModal) detailModal.close(); });

async function loadCatalog() {
  status.textContent = "Loading directory data…";
  try {
    const response = await fetch("./data/catalog.json");
    if (!response.ok) throw new Error(`Could not load catalog data (${response.status}).`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 15) throw new Error("Catalog data must contain at least 15 entries.");
    catalogItems = data;
    status.textContent = "";
    status.hidden = true;
    const params = new URLSearchParams(window.location.search);
    if (["brand", "vehicle", "part"].includes(params.get("type"))) typeFilter.value = params.get("type");
    renderCatalog();
  } catch (error) {
    console.error("AutoHub catalog loading failed:", error);
    status.hidden = false;
    status.textContent = "The directory could not be loaded. Please open this project through VS Code Live Server or another local web server, then refresh the page.";
    resultsCount.textContent = "Directory unavailable";
  }
}

function renderCatalog() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;
  const selectedCategory = categoryFilter.value;
  const filtered = catalogItems.filter((item) => {
    const searchable = [item.name, item.subtitle, item.description, item.make, item.model, item.category, item.origin, item.compatibility, ...(item.properties || [])].join(" ").toLowerCase();
    const matchesQuery = searchable.includes(query);
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesQuery && matchesType && matchesCategory;
  });
  grid.replaceChildren(...filtered.map((item) => renderCard(item, openDetails)));
  resultsCount.textContent = `Showing ${filtered.length} of ${catalogItems.length} directory entries`;
  emptyState.hidden = filtered.length > 0;
  grid.hidden = filtered.length === 0;
}

function openDetails(item) {
  detailTitle.textContent = item.name;
  detailType.textContent = `${item.type} · ${item.category}`;
  detailContent.replaceChildren(renderDetails(item));
  detailModal.showModal();
}

function clearFilters() {
  searchInput.value = "";
  typeFilter.value = "all";
  categoryFilter.value = "all";
  renderCatalog();
}
searchInput.addEventListener("input", renderCatalog);
typeFilter.addEventListener("change", renderCatalog);
categoryFilter.addEventListener("change", renderCatalog);
document.querySelector("#clear-filters").addEventListener("click", clearFilters);
document.querySelector("#empty-clear").addEventListener("click", clearFilters);
loadCatalog();
