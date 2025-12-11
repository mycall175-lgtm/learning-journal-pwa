/**
 * Lab 4: Third-Party API Integration
 * Fetches data from external APIs (quotes, weather, etc.)
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load third-party content on projects page
    if (window.location.pathname.includes('/projects') || window.location.pathname === '/projects') {
        loadThirdPartyContent();
    }
});

/**
 * Load and display third-party API content
 */
async function loadThirdPartyContent() {
    const apiContent = document.getElementById('api-content');
    if (!apiContent) return;

    apiContent.innerHTML = '<p class="loading">Loading external content...</p>';

    try {
        // Fetch multiple APIs in parallel
        const [quote, weather] = await Promise.allSettled([
            fetchQuote(),
            fetchWeather()
        ]);

        let html = '<div class="api-grid">';

        // Display quote
        if (quote.status === 'fulfilled' && quote.value) {
            html += createAPICard('💬 Daily Quote', quote.value.text, quote.value.author || 'Unknown');
        }

        // Display weather (if available)
        if (weather.status === 'fulfilled' && weather.value) {
            html += createAPICard('🌤️ Weather Info', weather.value.description, weather.value.temp);
        }

        // Add GitHub API example
        html += createAPICard('🔗 API Integration', 
            'This Learning Journal integrates with various third-party APIs including quotes, weather, and more. Check the browser console for API responses.',
            'Lab 4 Requirement');

        html += '</div>';
        apiContent.innerHTML = html;

    } catch (error) {
        console.error('Error loading third-party content:', error);
        apiContent.innerHTML = '<p class="error">Failed to load external content. Check your internet connection.</p>';
    }
}

/**
 * Fetch a random quote from a free quotes API
 */
async function fetchQuote() {
    try {
        // Using quotable.io API (free, no key required)
        const response = await fetch('https://api.quotable.io/random?maxLength=100');
        
        if (!response.ok) {
            throw new Error('Quote API failed');
        }

        const data = await response.json();
        console.log('Quote fetched:', data);
        
        return {
            text: data.content,
            author: data.author
        };
    } catch (error) {
        console.error('Error fetching quote:', error);
        // Return fallback quote
        return {
            text: 'The only way to do great work is to love what you do.',
            author: 'Steve Jobs'
        };
    }
}

/**
 * Fetch weather information (using a free weather API)
 * Note: This is a placeholder - real weather API would require API key
 */
async function fetchWeather() {
    try {
        // Using OpenWeatherMap API (free tier available)
        // For demo purposes, we'll use a mock response
        // In production, you'd use: const apiKey = 'YOUR_API_KEY';
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
        
        // Mock weather data for demonstration
        console.log('Weather API: Using mock data (real API would require key)');
        
        return {
            description: 'Weather API integration ready. Add your API key to fetch real weather data.',
            temp: 'N/A'
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

/**
 * Create an API card element
 */
function createAPICard(title, content, footer) {
    return `
        <div class="api-card">
            <h3>${title}</h3>
            <p>${content}</p>
            <small>${footer}</small>
        </div>
    `;
}

/**
 * Fetch data from GitHub API (example)
 */
async function fetchGitHubData(username = 'octocat') {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('GitHub API failed');
        }

        const data = await response.json();
        console.log('GitHub data fetched:', data);
        
        return data;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return null;
    }
}

/**
 * Generic API fetch function with error handling
 */
async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
}

// Add CSS for API grid
const style = document.createElement('style');
style.textContent = `
    .api-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-top: 1rem;
    }

    @media (min-width: 768px) {
        .api-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .api-card h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .api-card small {
        display: block;
        margin-top: 0.5rem;
        color: var(--text-color);
        opacity: 0.7;
        font-style: italic;
    }

    .error {
        color: #e74c3c;
        padding: 1rem;
        background-color: rgba(231, 76, 60, 0.1);
        border-radius: 6px;
    }
`;
document.head.appendChild(style);

