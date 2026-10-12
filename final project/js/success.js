import { setupNavigation, updateYear } from "./ui.js";

setupNavigation();
updateYear();

const labels = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email address",
  vehicleMake: "Vehicle make",
  vehicleModel: "Model and year",
  enquiryType: "Enquiry type",
  message: "Message",
  acknowledged: "Acknowledgement"
};
const params = new URLSearchParams(window.location.search);
const container = document.querySelector("#summary-content");
const hasSubmission = [...params.keys()].length > 0;

if (!hasSubmission) {
  document.querySelector("#summary-heading").textContent = "No enquiry details found";
  document.querySelector("#summary-intro").textContent = "Open the contact form and submit it to see a summary here.";
  const paragraph = document.createElement("p");
  paragraph.className = "summary-row";
  const message = document.createElement("dd");
  message.textContent = "No URL search parameters were provided.";
  paragraph.append(message);
  container.append(paragraph);
} else {
  document.querySelector("#summary-intro").textContent = "These values were read from the URL using URLSearchParams.";
  const fragment = document.createDocumentFragment();
  Object.entries(labels).forEach(([key, label]) => {
    const value = params.get(key);
    if (value === null) return;
    const row = document.createElement("dl");
    row.className = "summary-row";
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value || "Not provided";
    row.append(term, description);
    fragment.append(row);
  });
  container.append(fragment);
}
