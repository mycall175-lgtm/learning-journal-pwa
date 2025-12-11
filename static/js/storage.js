/**
 * Lab 4: Storage API Implementation
 * Handles localStorage for preferences and offline entry caching
 */

// Storage keys
const STORAGE_KEYS = {
    THEME: 'learningJournal_theme',
    ENTRIES_CACHE: 'learningJournal_entries_cache',
    PREFERENCES: 'learningJournal_preferences'
};

/**
 * Save theme preference to localStorage
 */
function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        console.log('Theme saved to localStorage:', theme);
    } catch (error) {
        console.error('Error saving theme:', error);
    }
}

/**
 * Load theme preference from localStorage
 */
function loadTheme() {
    try {
        const theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
        return theme;
    } catch (error) {
        console.error('Error loading theme:', error);
        return 'light';
    }
}

/**
 * Cache journal entries to localStorage for offline access
 */
function cacheEntries(entries) {
    try {
        localStorage.setItem(STORAGE_KEYS.ENTRIES_CACHE, JSON.stringify(entries));
        console.log('Entries cached to localStorage:', entries.length);
    } catch (error) {
        console.error('Error caching entries:', error);
    }
}

/**
 * Load cached entries from localStorage
 */
function loadCachedEntries() {
    try {
        const cached = localStorage.getItem(STORAGE_KEYS.ENTRIES_CACHE);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (error) {
        console.error('Error loading cached entries:', error);
    }
    return [];
}

/**
 * Save user preferences
 */
function savePreferences(prefs) {
    try {
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (error) {
        console.error('Error saving preferences:', error);
    }
}

/**
 * Load user preferences
 */
function loadPreferences() {
    try {
        const prefs = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
        if (prefs) {
            return JSON.parse(prefs);
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
    return {};
}

/**
 * Clear all stored data (useful for testing or reset)
 */
function clearStorage() {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('Storage cleared');
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveTheme,
        loadTheme,
        cacheEntries,
        loadCachedEntries,
        savePreferences,
        loadPreferences,
        clearStorage
    };
}

