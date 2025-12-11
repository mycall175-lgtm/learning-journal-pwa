/**
 * Lab 3: Navigation JavaScript
 * Injects reusable navigation bar into all pages using DOM manipulation
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the navigation container
    const navContainer = document.getElementById('main-nav');
    
    if (!navContainer) {
        console.warn('Navigation container not found');
        return;
    }

    // Define navigation items
    const navItems = [
        { href: '/', text: 'Home' },
        { href: '/journal', text: 'Journal' },
        { href: '/projects', text: 'Projects' },
        { href: '/about', text: 'About' }
    ];

    // Get current page path to highlight active link
    const currentPath = window.location.pathname;
    
    // Create navigation structure
    const nav = document.createElement('ul');
    
    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = item.href;
        a.textContent = item.text;
        
        // Add 'active' class if current page matches
        if (currentPath === item.href || 
            (currentPath === '/' && item.href === '/') ||
            (currentPath.includes(item.href) && item.href !== '/')) {
            a.classList.add('active');
        }
        
        li.appendChild(a);
        nav.appendChild(li);
    });
    
    // Inject navigation into container
    navContainer.appendChild(nav);
    
    console.log('Navigation injected successfully');
});

