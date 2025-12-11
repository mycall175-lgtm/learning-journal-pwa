/**
 * Lab 5: Direct JSON File Loading
 * Fetches and displays entries directly from reflections.json file
 * This demonstrates file-based storage beyond browser storage
 */

/**
 * Load entries directly from JSON file (Lab 5 requirement)
 */
async function loadEntriesFromJSON() {
    try {
        // Fetch directly from JSON file
        const response = await fetch('/backend/reflections.json');
        
        if (!response.ok) {
            throw new Error('Failed to load JSON file');
        }

        const entries = await response.json();
        console.log('Entries loaded from JSON file:', entries.length);
        
        return entries;
    } catch (error) {
        console.error('Error loading JSON file:', error);
        // Fallback to empty array
        return [];
    }
}

/**
 * Display entries count from JSON file
 */
async function displayJSONStats() {
    try {
        const entries = await loadEntriesFromJSON();
        
        const totalEntries = document.getElementById('total-entries');
        if (totalEntries) {
            totalEntries.textContent = entries.length;
        }

        // Count entries from this week
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thisWeek = entries.filter(e => new Date(e.date) >= weekAgo).length;

        const thisWeekEl = document.getElementById('this-week');
        if (thisWeekEl) {
            thisWeekEl.textContent = thisWeek;
        }

        // Display total count in console for Lab 5
        console.log(`Total reflections in JSON: ${entries.length}`);
        
    } catch (error) {
        console.error('Error displaying JSON stats:', error);
    }
}

/**
 * Export reflections.json file (Lab 5 extra feature)
 */
async function exportJSONFile() {
    try {
        const entries = await loadEntriesFromJSON();
        
        // Create downloadable JSON file
        const dataStr = JSON.stringify(entries, null, 4);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `reflections-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        if (typeof showNotification === 'function') {
            showNotification('Reflections exported successfully!', 'success');
        }
        
        console.log('JSON file exported:', entries.length, 'entries');
    } catch (error) {
        console.error('Error exporting JSON:', error);
        if (typeof showNotification === 'function') {
            showNotification('Failed to export JSON file', 'error');
        }
    }
}

/**
 * Filter entries by keyword (Lab 5 extra feature)
 */
function filterEntriesByKeyword(entries, keyword) {
    if (!keyword) return entries;
    
    const lowerKeyword = keyword.toLowerCase();
    return entries.filter(entry => 
        entry.title.toLowerCase().includes(lowerKeyword) ||
        entry.content.toLowerCase().includes(lowerKeyword) ||
        entry.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
    );
}

/**
 * Filter entries by date range (Lab 5 extra feature)
 */
function filterEntriesByDate(entries, startDate, endDate) {
    return entries.filter(entry => {
        const entryDate = new Date(entry.date);
        if (startDate && entryDate < new Date(startDate)) return false;
        if (endDate && entryDate > new Date(endDate)) return false;
        return true;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load and display stats from JSON file
    displayJSONStats();
    
    // Add export button if on journal page
    if (window.location.pathname.includes('/journal') || window.location.pathname === '/journal') {
        addExportButton();
    }
});

/**
 * Add export button to journal page
 */
function addExportButton() {
    const filterSection = document.querySelector('.filter-section');
    if (!filterSection) return;
    
    // Check if button already exists
    if (document.getElementById('export-json-btn')) return;
    
    const exportBtn = document.createElement('button');
    exportBtn.id = 'export-json-btn';
    exportBtn.className = 'btn btn-secondary';
    exportBtn.textContent = '📥 Export JSON';
    exportBtn.addEventListener('click', exportJSONFile);
    
    const filterControls = filterSection.querySelector('.filter-controls');
    if (filterControls) {
        filterControls.appendChild(exportBtn);
    }
}

