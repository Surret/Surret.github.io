// --- detail-gallery.js ---
// Contains logic specific to project detail pages, handling the image gallery and thumbnail resizing.

document.addEventListener('DOMContentLoaded', () => {
    // Attempt to find the main image and container elements. 
    // If they aren't found (meaning we are not on a detail page), the script safely exits.
    const mainImage = document.getElementById('main-image');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (!mainImage || !thumbnailContainer || thumbnails.length === 0) {
        return; // Exit if necessary gallery elements aren't present
    }
    
    // =========================================================================
    // CRITICAL FIX UTILITY
    // =========================================================================
    /**
     * Forces the browser to recalculate the layout (reflow).
     * This is the fix for the temporary mobile layout glitch when swapping image sources.
     * @param {Element} element The element to base the reflow on.
     */
    function forceReflow(element) {
        // Reading an element's offsetHeight/Width is a widely used trick to force a synchronous layout calculation.
        void element.offsetHeight;
    }

    // =========================================================================
    // GALLERY HEIGHT MANAGEMENT
    // =========================================================================

    // Function to update the thumbnail container height to match the main image (for desktop layout)
    function updateThumbnailContainerHeight() {
        // Only apply height on desktop view (md breakpoint or greater, typically 768px)
        if (window.innerWidth >= 768) {
            const setHeight = () => {
                // We use the rendered height of the main image
                const mainImageHeight = mainImage.offsetHeight; 
                thumbnailContainer.style.height = `${mainImageHeight}px`;
            };
            
            // Set height after the image loads (in case it's slow)
            mainImage.onload = setHeight;
            
            // Set height immediately if the image is already loaded
            if (mainImage.complete) {
                setHeight();
            }
        } else {
            // On mobile, remove the fixed height to allow stacking
            thumbnailContainer.style.height = 'auto';
        }
    }

    // =========================================================================
    // IMAGE SWAP LOGIC (FIXED)
    // =========================================================================

    /**
     * Handles the image swap when a thumbnail is clicked.
     * Includes the critical reflow logic to prevent mobile layout glitches.
     * @param {string} newSrc The new image URL.
     * @param {string} newAlt The new alt text.
     */
    function swapMainImage(newSrc, newAlt) {
        // Temporarily hide the image for a smoother transition
        mainImage.style.opacity = '0'; 
        
        // 1. Set the onload handler *before* changing the source
        mainImage.onload = () => {
            // 2. Once the NEW image has fully loaded:
            mainImage.alt = newAlt;
            
            // *** CRITICAL FIX: Force a layout recalculation (reflow) ***
            // This prevents the momentary visual artifact you saw on mobile scroll.
            forceReflow(mainImage);
            
            // Fade the new image back in
            mainImage.style.opacity = '1';

            // Re-run the height update in case the new image has a different aspect ratio (desktop only)
            updateThumbnailContainerHeight();
            
            // Clean up the onload handler to prevent unnecessary calls
            mainImage.onload = null;
        };
        
        // 3. Change the source (this triggers the 'load' event)
        mainImage.src = newSrc;
        
        // 4. Handle cache hit (image already loaded)
        if (mainImage.complete) {
            // Use a slight timeout to ensure this logic executes after the browser's internal sync operations
            setTimeout(() => {
                // If the onload handler is still present, call it. Otherwise, manually execute the logic.
                if (mainImage.onload) {
                    mainImage.onload();
                }
            }, 50); 
        }
    }

    // Event listener for thumbnail clicks: swaps the main image source
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // We use the thumbnail's current source as the full-size image source
            const newSrc = thumbnail.src; 
            // Update the alt text for accessibility
            const newAlt = thumbnail.alt.replace("Thumbnail", "Main view"); 
            
            swapMainImage(newSrc, newAlt);
        });
    });

    // Run height update on page load and window resize events
    window.addEventListener('load', updateThumbnailContainerHeight);
    window.addEventListener('resize', updateThumbnailContainerHeight);
});
