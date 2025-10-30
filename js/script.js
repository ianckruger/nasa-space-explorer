// Use this URL to fetch NASA APOD JSON data.
const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

// Dom
const gallery = document.getElementById('gallery');
const getImageBtn = document.getElementById('getImageBtn');

const facts = [
    "The Sun accounts for about 99.86% of the total mass of the Solar System.",
    "One day on Venus is longer than one year on Venus.",
    "Neutron stars can spin 600 times per second.",
    "Jupiter’s Great Red Spot is a storm that’s been raging for at least 350 years.",
    "There are more stars in the universe than grains of sand on all of Earth’s beaches.",
    "Saturn could float in water because it’s mostly made of gas.",
    "A day on Mars is just over 24 hours long.",
    "There’s a planet made of diamonds called 55 Cancri e.",
    "Space is completely silent because there’s no air for sound to travel."
];

function showRandomFact() {
    const fact = facts[Math.floor(Math.random() * facts.length)]
    const factBanner = document.createElement('div');
    factBanner.classList.add('fact-banner');
    factBanner.textContent = `Did you know? ${fact}`;
    document.body.prepend(factBanner);
}

// async --> get it on load
async function fetchAPODData() {
    gallery.innerHTML = `<p class="loading"> Loading Images from NASA...</p>`;
    try {
        const response = await fetch(apodData);
        const data = await response.json();

        const start = Math.floor(Math.random() * (data.length - 9));
        const selected = data.slice(start, start + 9);

        displayGallery(selected);
    } catch (err) {
        console.error(err);
        gallery.innerHTML = `<p class="error"> Failed to load images. Please try again later. </p>`;
    }
}


function displayGallery(items) {
    // you have to clear it for when button is clicked multiple times
    gallery.innerHTML = '';

    items.forEach((item) => {
        if (!item.url || item.media_type !== 'image') return;

        const card = document.createElement('div');
        card.classList.add('gallery-item');

        card.innerHTML = `
        <img src="${item.url}" alt="${item.title}" />
        <p><strong>${item.title}</strong></p>
        <p>${item.date}</p>
        `;

        // modal
        card.querySelector('img').addEventListener('click', () => openModal(item));
        gallery.appendChild(card);
    });
}

// modal function
function openModal(item) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-btn">&times;</span>
        <img src="${item.hdurl || item.url}" alt="${item.title}" />
        <h2>${item.title}</h2>
        <p><em>${item.date}</em></p>
        <p>${item.explanation}</p>
    </div>`;
    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Event listener for button
getImageBtn.addEventListener('click', fetchAPODData);

// On load
showRandomFact();