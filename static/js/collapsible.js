/**
 * Lab 3: Collapsible Sections
 * Makes sections expandable and collapsible on click
 * Demonstrates DOM manipulation: querySelector, classList, addEventListener
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCollapsibleSections();
});

/**
 * Initialize collapsible sections functionality
 */
function initializeCollapsibleSections() {
    // Use querySelectorAll to select all collapsible sections
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        // Add click event listener to each header
        header.addEventListener('click', function() {
            // Find the parent collapsible section
            const section = this.closest('.collapsible-section');
            const content = section.querySelector('.collapsible-content');
            const icon = this.querySelector('.toggle-icon');
            
            // Toggle the 'active' class on the section
            section.classList.toggle('active');
            
            // Change CSS styles dynamically
            if (section.classList.contains('active')) {
                // Expand: show content and rotate icon
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
                icon.textContent = '▲';
            } else {
                // Collapse: hide content and reset icon
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                icon.style.transform = 'rotate(0deg)';
                icon.textContent = '▼';
            }
        });
        
        // Set initial state (collapsed by default)
        const section = header.closest('.collapsible-section');
        const content = section.querySelector('.collapsible-content');
        if (!section.classList.contains('active')) {
            content.style.maxHeight = '0';
            content.style.opacity = '0';
        }
    });
    
    console.log('Collapsible sections initialized:', collapsibleHeaders.length);
}

