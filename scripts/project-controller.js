// --- project-controller.js ---
// This single script handles all project card loading across the entire site
// (Index, All Projects, and Project Detail Pages).
//
// Reminder: This file MUST be loaded AFTER card-shuffle.js
// <script src="scripts/card-shuffle.js"></script>
// <script src="scripts/project-controller.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    // 1. Safety Check for core dependencies from card-shuffle.js
    if (typeof window.projectData === 'undefined' || 
        typeof window.renderProjects === 'undefined') 
    {
        console.error("Error: Core dependencies (projectData/renderProjects) failed to load.");
        return;
    }

    // Get the current page's file name (e.g., 'engine-roof.html' or 'index.html')
    const path = window.location.pathname;
    const currentPageLink = path.substring(path.lastIndexOf('/') + 1);

    // --- CONFIGURATION ---
    // Define the required settings for each page type
    let config = {
        containerId: '',
        maxCards: 0,
        filterCurrentPage: false,
        reverseOrder: false,
        shuffle: false
    };

    // Index Page
    if (currentPageLink === 'index.html' || currentPageLink === '') {
        config.containerId = 'featured-projects-container';
        config.maxCards = 4;
        config.shuffle = true;
    } 
    // All Projects Page
    else if (currentPageLink === 'all-projects.html') {
        config.containerId = 'all-projects-container';
        config.maxCards = window.projectData.length; // Show all projects
        config.reverseOrder = true; // Latest projects first
    }
    // Detail Pages (e.g., steam-lamp.html, engine-roof.html)
    else {
        config.containerId = 'related-projects-container';
        config.maxCards = 2;
        config.filterCurrentPage = true;
        config.shuffle = true;
    }

    // Exit if no configuration was found (safety check)
    if (!config.containerId) return;

    // --- DATA PROCESSING ---
    let projectsToDisplay = [...window.projectData]; // Start with a fresh copy

    // A. Filter out the current page if required (for detail pages)
    if (config.filterCurrentPage) {
        projectsToDisplay = projectsToDisplay.filter(
            project => project.link !== currentPageLink
        );
    }

    // B. Apply reverse order if required (for all-projects.html)
    if (config.reverseOrder) {
        // Since you requested latest first, we reverse the list.
        projectsToDisplay.reverse();
    }
    
    // C. Shuffle if required (for index and detail pages)
    if (config.shuffle && typeof window.shuffleArray !== 'undefined') {
        projectsToDisplay = window.shuffleArray(projectsToDisplay);
    }

    // D. Slice the final required number of cards
    const finalProjects = projectsToDisplay.slice(0, config.maxCards);

    // --- RENDERING ---
    // Call the universal render function with the dynamic settings
    window.renderProjects(finalProjects, config.containerId);
});
