/**
 * Lab 4: Browser API Implementation
 * Demonstrates various browser APIs: Clipboard, Geolocation, Notifications, Validation
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeBrowserAPIs();
});

/**
 * Initialize all browser API features
 */
function initializeBrowserAPIs() {
    // Initialize date/time display (Lab 3)
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second

    // Initialize theme switcher (Lab 3)
    initializeThemeSwitcher();

    // Initialize form validation
    initializeFormValidation();

    // Initialize clipboard functionality
    initializeClipboard();

    // Request notification permission
    requestNotificationPermission();
}

/**
 * Lab 3: Update date/time display
 * Uses getElementById to select elements and changes text content dynamically
 */
function updateDateTime() {
    // Use getElementById to select the datetime element on journal page
    const datetimeElement = document.getElementById('current-datetime');
    if (datetimeElement) {
        const now = new Date(); // Date() object
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        // Change text content dynamically
        datetimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Also update homepage datetime if it exists
    const homeDateTime = document.getElementById('home-datetime');
    if (homeDateTime) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        homeDateTime.textContent = 'Today is ' + now.toLocaleDateString('en-US', options);
    }
}

/**
 * Lab 3: Initialize theme switcher with localStorage persistence
 */
function initializeThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Load saved theme
    const savedTheme = loadTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonText(savedTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        saveTheme(newTheme);
        updateThemeButtonText(newTheme);
        
        console.log('Theme switched to:', newTheme);
    });
}

/**
 * Update theme button text based on current theme
 */
function updateThemeButtonText(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

/**
 * Lab 4: Form validation using HTML5 and custom validation
 */
function initializeFormValidation() {
    const entryForm = document.getElementById('entry-form');
    if (!entryForm) return;

    // Add custom validation
    const titleInput = document.getElementById('entry-title');
    const contentInput = document.getElementById('entry-content');

    if (titleInput) {
        titleInput.addEventListener('input', function() {
            if (this.value.length < 3) {
                this.setCustomValidity('Title must be at least 3 characters long');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    if (contentInput) {
        contentInput.addEventListener('input', function() {
            if (this.value.length < 10) {
                this.setCustomValidity('Reflection must be at least 10 characters long');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Handle form submission
    entryForm.addEventListener('submit', function(e) {
        if (!entryForm.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            alert('Please fill in all required fields correctly.');
        } else {
            // Form is valid, will be handled by main journal script
            console.log('Form validation passed');
        }
    });
}

/**
 * Lab 4: Clipboard API - Copy entry content to clipboard
 */
function initializeClipboard() {
    // Add copy buttons to entry cards dynamically
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-entry')) {
            const entryCard = e.target.closest('.entry-card');
            if (entryCard) {
                const content = entryCard.querySelector('.entry-content').textContent;
                copyToClipboard(content);
            }
        }
    });
}

/**
 * Copy text to clipboard using Clipboard API
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            showNotification('Entry copied to clipboard!', 'success');
            console.log('Text copied to clipboard');
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Entry copied to clipboard!', 'success');
        }
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        showNotification('Failed to copy to clipboard', 'error');
    }
}

/**
 * Lab 4: Request notification permission
 */
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        // Optionally request permission (commented out to avoid annoying users)
        // Notification.requestPermission();
    }
}

/**
 * Lab 4: Show browser notification
 */
function showBrowserNotification(title, options) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, options);
    }
}

/**
 * Show in-app notification (simple alert-style)
 */
function showNotification(message, type = 'info') {
    // Create a simple notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#50c878' : type === 'error' ? '#e74c3c' : '#4a90e2'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Lab 4: Get user's geolocation (if permission granted)
 */
function getGeolocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            (error) => {
                reject(error);
            },
            { timeout: 10000 }
        );
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

