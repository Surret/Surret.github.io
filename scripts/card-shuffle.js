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
        tag: null,
        modules: ["module-01", "module-02"]
    },
    {
        title: "The Engine Roof Project",
        description: "Converting an existing design to CAD for professional manufacturing and creating a custom power bank holder.",
        imageSrc: "img/engine-roof/engine_roof4.jpg",
        altText: "Image of a CAD-modelled roof for the steam engine",
        link: "engine-roof.html",
        tag: null,
        modules: ["module-01",]
    },
    /*{
        title: "NFC Keyring Concept",
        description: "A conceptual design for a custom keyring with an embedded NFC chip, exploring personal and medical applications.",
        imageSrc: "https://placehold.co/600x400/A0E7E5/ffffff?text=NFC+Concept+Drawing",
        altText: "Conceptual drawing of an NFC keyring",
        link: "nfc-keyring.html",
        tag: "Concept"
    },*/
    {
        title: "Racking Hook",
        description: "A custom-designed hook to hold ear defenders on the company's rapid racking system when not in use.",
        imageSrc: "img/racking-hook/racking-hook2.jpg",
        altText: "Image of a hook for racking",
        link: "racking-hook.html",
        tag: null,
        modules: ["module-01", "module-02"]
    },
    {
        title: "Keep Alive Circuit",
        description: "A custom-designed circuit to prevent power banks from shutting off due to low current draw.",
        imageSrc: "img/keep-alive-circuit/powerbank-circuit4.jpg",
        altText: "Image of the keep-alive circuit inside a custom enclosure",
        link: "keep-alive-circuit.html",
        tag: null,
        modules: ["module-01", "module-03"]
    },
    {
        title: "PIR Control Module",
        description: "A custom-designed module to control PIR (Passive Infrared) sensors for automated lighting applications.",
        imageSrc: "img/pir-circuit/PIR_final.jpg",
        altText: "Image of the PIR control module inside a parametric enclosure",
        link: "pir-circuit.html",
        tag: null,
        modules: ["module-01", "module-03"]
    },
    {
        title: "Hybrid Bowl Carrier",
        description: "A custom-designed hybrid carrier for transporting bowls and drinks while navigating gated partitions.",
        imageSrc: "img/bowl-holder/Bowl_holder_final.jpg",
        altText: "Image of the hybrid bowl carrier system",
        link: "bowl-carrier.html",
        tag: null,
        modules: ["module-01", "module-02"]
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
        // Clean tag badge using subtle dark slate/cyan backdrop glassmorphism
        const tagHtml = project.tag 
            ? `
                <div class="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm">
                    ${project.tag}
                </div>
            `
            : '';

        // Build the updated HTML for a single card
        htmlContent += `
            <div class="group bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 project-card h-full flex flex-col">
                
                <!-- Image Header with Hover Zoom -->
                <div class="relative overflow-hidden bg-zinc-100 border-b border-zinc-200 h-48">
                    <img src="${project.imageSrc}" alt="${project.altText}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out">
                    ${tagHtml}
                </div>
                
                <!-- Card Body -->
                <div class="p-6 flex flex-col flex-1 justify-between">
                    
                    <div class="mb-6">
                        <h3 class="font-bold text-xl text-zinc-900 mb-2 group-hover:text-cyan-600 transition-colors duration-200">${project.title}</h3>
                        <p class="text-zinc-600 text-sm leading-relaxed">${project.description}</p>
                    </div>
                    
                    <!-- Action Link styled to match the dark slate / cyan theme -->
                    <a href="${project.link}"
                        class="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-cyan-400 no-underline 
                            bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 shadow-sm 
                            transition-colors duration-200 ease-in-out 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
