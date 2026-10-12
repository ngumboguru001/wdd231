const symbols = {brand:"◉",vehicle:"▰",part:"⚙"};

export function renderCard(item, onOpen) {
  const article = document.createElement("article");
  article.className = "catalog-card";
  const type = document.createElement("div");
  type.className = "card-topline";
  const pill = document.createElement("span");
  pill.className = `type-pill ${item.type}`;
  pill.textContent = item.type;
  const symbol = document.createElement("span");
  symbol.className = "card-symbol";
  symbol.setAttribute("aria-hidden", "true");
  symbol.textContent = symbols[item.type] || "◈";
  type.append(pill, symbol);
  const heading = document.createElement("h2");
  heading.textContent = item.name;
  const subtitle = document.createElement("p");
  subtitle.className = "card-subtitle";
  subtitle.textContent = item.subtitle;
  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = item.description;
  const meta = document.createElement("div");
  meta.className = "card-meta";
  [item.category, item.origin || item.make || "General", item.compatibility || item.model || "Reference"].forEach((value) => {
    const tag = document.createElement("span");
    tag.textContent = value;
    meta.append(tag);
  });
  const button = document.createElement("button");
  button.type = "button";
  button.className = "card-open";
  button.textContent = "View details →";
  button.setAttribute("aria-label", `View details for ${item.name}`);
  button.addEventListener("click", () => onOpen(item));
  article.append(type, heading, subtitle, description, meta, button);
  return article;
}

export function renderDetails(item) {
  const wrapper = document.createElement("div");
  const description = document.createElement("p");
  description.textContent = item.description;
  const facts = document.createElement("div");
  facts.className = "detail-facts";
  const entries = [
    ["Entry type", item.type],
    ["Category", item.category],
    ["Origin / make", item.origin || item.make || "General"],
    ["Model / compatibility", item.compatibility || item.model || "Varies by vehicle"],
    ["Reference property", item.properties?.[0] || item.subtitle],
    ["Additional detail", item.properties?.[1] || "See the vehicle manual"]
  ];
  entries.forEach(([label, value]) => {
    const fact = document.createElement("div");
    fact.className = "detail-fact";
    const key = document.createElement("span");
    key.textContent = label;
    const content = document.createElement("strong");
    content.textContent = value;
    fact.append(key, content);
    facts.append(fact);
  });
  const note = document.createElement("p");
  note.textContent = item.note || "Always confirm part numbers and fitment using the vehicle identification number (VIN), official service information, and a qualified parts supplier.";
  wrapper.append(description, facts, note);
  return wrapper;
}
