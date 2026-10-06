/**
 * Executes general site logic that relies on the main page structure.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 0. Load the navigation bar first. The menu will be initialized inside this function.
    loadNavbar('navbar.html', 'navbar-placeholder'); 
    
    // 1. BACK-TO-TOP BUTTON LOGIC
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Function to show/hide the back-to-top button based on scroll position
        const handleScroll = () => {
            // Using classList.toggle for clean switching
            backToTopBtn.classList.toggle('opacity-100', window.scrollY > 200);
            backToTopBtn.classList.toggle('opacity-0', window.scrollY <= 200);
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Execute once to check position on load
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

/**
 * Loads the navigation bar HTML from a file and injects it, then initializes the mobile menu.
 * @param {string} url - The path to the HTML file (e.g., 'navbar.html').
 * @param {string} targetId - The ID of the element to place the HTML into (e.g., 'navbar-placeholder').
 */
function loadNavbar(url, targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
        console.error(`Target element with ID #${targetId} not found for navbar.`);
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // *** NEW: Log the raw HTML data for inspection ***
            console.log("--- Raw HTML received from navbar.html ---");
            console.log(data.trim());
            console.log("------------------------------------------");

            // 1. Inject the HTML content
            targetElement.innerHTML = data;
            
            // Initialise Share Modal (Separate Sandbox)
            window.initShareModal?.();

            // 2. IMMEDIATE MOBILE MENU INITIALIZATION (Scoped to the injected container)
            
            // Use querySelector on the targetElement for elements *within* the injected content.
            const button = targetElement.querySelector('#mobile-menu-button');
            const menu = targetElement.querySelector('#mobile-nav-menu');
            const openIcon = targetElement.querySelector('#icon-menu-open');
            const closeIcon = targetElement.querySelector('#icon-menu-close');

            if (button && menu && openIcon && closeIcon) {
                
                // Ensure the close icon is initially hidden
                closeIcon.classList.add('hidden');
                button.setAttribute('aria-expanded', 'false');

                button.addEventListener('click', () => {
                    // Toggle the visibility of the mobile menu (removes/adds 'hidden' class)
                    const isMenuCurrentlyHidden = menu.classList.toggle('hidden');

                    // Toggle the icons and ARIA attribute for accessibility
                    if (isMenuCurrentlyHidden) {
                        // Menu is now CLOSED: show hamburger, hide X
                        openIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                        button.setAttribute('aria-expanded', 'false');
                    } else {
                        // Menu is now OPEN: hide hamburger, show X
                        openIcon.classList.add('hidden');
                        closeIcon.classList.remove('hidden');
                        button.setAttribute('aria-expanded', 'true');
                    }
                });
                
                console.log("SUCCESS: Navbar loaded and mobile menu initialized successfully.");

            } else {
                // This is the failure message (which you are seeing)
                const missing = [];
                if (!button) missing.push('#mobile-menu-button');
                if (!menu) missing.push('#mobile-nav-menu');
                if (!openIcon) missing.push('#icon-menu-open');
                if (!closeIcon) missing.push('#icon-menu-close');
                
                console.error(`FAILURE: Mobile menu initialization FAILED after injection. The following required IDs were NOT found: ${missing.join(', ')}. Please check your 'navbar.html' for correct element IDs.`);
            }

        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}