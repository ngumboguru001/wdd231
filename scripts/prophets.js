const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');
    let portrait = document.createElement('img');

    // Set heading text to full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Set birth information
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Set image attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append child elements to card section
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    // Append card section to main cards container
    cards.appendChild(card);
  });
};

async function getProphetData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayProphets(data.prophets);
    } else {
      console.error('Response failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching prophet data:', error);
  }
}

getProphetData();