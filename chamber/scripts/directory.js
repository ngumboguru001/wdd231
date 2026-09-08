// Navigation Toggle
const menuButton = document.querySelector('#menu');
const navMenu = document.querySelector('#nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Footer Dates
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

// Grid/List View Toggle
const display = document.querySelector('#members');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

gridButton.addEventListener('click', () => {
    display.classList.add('grid');
    display.classList.remove('list');
});

listButton.addEventListener('click', () => {
    display.classList.add('list');
    display.classList.remove('grid');
});

// Fetch and Display Member Data (Async/Await)
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        }
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

const displayMembers = (members) => {
    members.forEach((member) => {
        const card = document.createElement('section');
        
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Website</a></p>
        `;
        
        display.appendChild(card);
    });
};

getMembers();