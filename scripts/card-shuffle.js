// --- project-card-data.js ---
// This file contains the centralised data and functions for managing project cards
// across the entire website, ensuring consistency and ease of updating.

// --- Central Project Data Array ---
// This is the single source of truth for all projects across the portfolio.
const projectData = [
    {
        title: "Steam Lamp",
        description: "A custom-designed and 3D-printed lamp built to function as headlights and taillights for a miniature steam engine.",
        imageSrc: "img/Steam-Lamp/steam_lamp3.jpg",
        altText: "Image of a 3D-printed steam lamp",
        link: "steam-lamp.html",
        tag: null
    },
    {
        title: "The Engine Roof Project",
        description: "Converting an existing design to CAD for professional manufacturing and creating a custom power bank holder.",
        imageSrc: "img/engine-roof/engine_roof4.jpg",
        altText: "Image of a CAD-modelled roof for the steam engine",
        link: "engine-roof.html",
        tag: null
    },
    {
        title: "NFC Keyring Concept",
        description: "A conceptual design for a custom keyring with an embedded NFC chip, exploring personal and medical applications.",
        imageSrc: "https://placehold.co/600x400/A0E7E5/ffffff?text=NFC+Concept+Drawing",
        altText: "Conceptual drawing of an NFC keyring",
        link: "nfc-keyring.html",
        tag: "Concept"
    },
    {
        title: "Racking Hook",
        description: "A custom-designed hook to hold ear defenders on the company's rapid racking system when not in use.",
        imageSrc: "img/racking-hook/racking-hook2.jpg",
        altText: "Image of a hook for racking",
        link: "racking-hook.html",
        tag: null
    },
    // Future projects should be added here
];

// --- Randomising Function (Fisher-Yates Shuffle) ---
/**
 * Shuffles an array randomly, returning a new shuffled array (non-mutating).
 * @param {Array} array The array to be shuffled.
 * @returns {Array} The new, shuffled array.
 */
function shuffleArray(array) {
    // Create a copy to shuffle, ensuring original data is untouched
    const shuffled = [...array]; 
    let currentIndex = shuffled.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    return shuffled;
}

// --- Project Card Rendering Function ---
/**
 * Generates the HTML string for project cards and injects them into the specified container.
 * @param {Array} projects The array of project data objects to render.
 * @param {string} containerId The ID of the HTML element to insert the cards into.
 */
function renderProjects(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Exit if container isn't found
    
    let htmlContent = '';

    projects.forEach(project => {
        // Check if a tag exists and generate the tag HTML if it does
        const tagHtml = project.tag 
            ? `
                <div class="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                    ${project.tag}
                </div>
              `
            : '';

        // Build the HTML for a single card
        htmlContent += `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 project-card h-full flex flex-col">
                    <div class="relative">
                        <img src="${project.imageSrc}" alt="${project.altText}" class="w-full h-48 object-cover">
                        ${tagHtml}
                    </div>
                    
                    <div class="p-6 flex flex-col flex-1">
                        
                        <!-- This wrapper ensures the content area grows to push the button down -->
                        <div class="flex-1">
                            <h3 class="font-bold text-xl mb-2">${project.title}</h3>
                            <p class="text-gray-600 text-sm mb-4">${project.description}</p>
                        </div>
                        
                        <!-- FIX: The A tag now has ALL the button styling and spans the full width of the card content -->
                        <a href="${project.link}"
                            class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white no-underline 
                                bg-blue-600 hover:bg-blue-700 rounded-full shadow-md 
                                transition duration-150 ease-in-out 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Learn More
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        
                    </div>
                </div>

        `;

    });

    // Insert the generated content into the container
    container.innerHTML = htmlContent;
}

// Make projectData, shuffleArray, and renderProjects available globally for other scripts
window.projectData = projectData;
window.shuffleArray = shuffleArray;
window.renderProjects = renderProjects;
