/**
 * Journal Entry Management
 * Handles CRUD operations for journal entries via Flask API
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('/journal') || window.location.pathname === '/journal') {
        initializeJournal();
    }
});

/**
 * Initialize journal functionality
 */
async function initializeJournal() {
    // Set today's date as default
    const dateInput = document.getElementById('entry-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Load and display entries
    await loadEntries();

    // Setup form submission
    const entryForm = document.getElementById('entry-form');
    if (entryForm) {
        entryForm.addEventListener('submit', handleFormSubmit);
    }

    // Setup search and filter
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterEntries);
    }

    const tagFilter = document.getElementById('tag-filter');
    if (tagFilter) {
        tagFilter.addEventListener('change', filterEntries);
    }

    // Update stats on home page
    updateStats();
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        date: document.getElementById('entry-date').value,
        title: document.getElementById('entry-title').value,
        content: document.getElementById('entry-content').value,
        tags: document.getElementById('entry-tags').value.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
        const response = await fetch('/api/reflections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to save entry');
        }

        const entry = await response.json();
        console.log('Entry saved:', entry);

        // Show success notification (Browser API - Notifications)
        if (typeof showNotification === 'function') {
            showNotification('Entry saved successfully!', 'success');
        }
        
        // Show browser notification if permission granted (Browser API)
        if (typeof showBrowserNotification === 'function') {
            showBrowserNotification('Journal Entry Saved', {
                body: `"${formData.title}" has been saved successfully!`,
                icon: '/static/images/icon-96x96.png',
                badge: '/static/images/icon-72x72.png'
            });
        }

        // Reset form
        document.getElementById('entry-form').reset();
        const dateInput = document.getElementById('entry-date');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }

        // Reload entries
        await loadEntries();
        await updateStats();

    } catch (error) {
        console.error('Error saving entry:', error);
        
        // If offline, queue entry for sync (Lab 7 - Background Sync)
        if (!navigator.onLine || error.message.includes('Failed to fetch')) {
            if (typeof queueEntryForSync === 'function') {
                queueEntryForSync(formData);
                if (typeof showNotification === 'function') {
                    showNotification('Entry saved locally. Will sync when online.', 'info');
                }
                // Add to local cache for immediate display
                if (typeof cacheEntries === 'function') {
                    const cached = loadCachedEntries();
                    cached.push({
                        ...formData,
                        id: cached.length > 0 ? Math.max(...cached.map(e => e.id || 0)) + 1 : 1
                    });
                    cacheEntries(cached);
                }
                // Reload entries to show cached version
                await loadEntries();
                return;
            }
        }
        
        if (typeof showNotification === 'function') {
            showNotification('Failed to save entry. Please try again.', 'error');
        } else {
            alert('Failed to save entry. Please try again.');
        }
    }
}

/**
 * Load entries from API
 */
async function loadEntries() {
    const container = document.getElementById('entries-container');
    if (!container) return;

    container.innerHTML = '<p class="loading">Loading entries...</p>';

    try {
        const response = await fetch('/api/reflections');
        
        if (!response.ok) {
            throw new Error('Failed to load entries');
        }

        const entries = await response.json();
        
        // Cache entries for offline access
        if (typeof cacheEntries === 'function') {
            cacheEntries(entries);
        }

        // Update tag filter
        updateTagFilter(entries);

        // Display entries
        displayEntries(entries);

    } catch (error) {
        console.error('Error loading entries:', error);
        
        // Try to load from cache
        if (typeof loadCachedEntries === 'function') {
            const cached = loadCachedEntries();
            if (cached.length > 0) {
                container.innerHTML = '<p class="loading">Using cached entries (offline mode)</p>';
                displayEntries(cached);
                return;
            }
        }

        container.innerHTML = '<p class="empty-state">No entries found. Create your first entry above!</p>';
    }
}

/**
 * Display entries in the container
 */
function displayEntries(entries) {
    const container = document.getElementById('entries-container');
    if (!container) return;

    if (entries.length === 0) {
        container.innerHTML = '<p class="empty-state">No entries found. Create your first entry above!</p>';
        return;
    }

    // Sort by date (newest first)
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = entries.map(entry => createEntryCard(entry)).join('');

    // Add event listeners for delete buttons
    container.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => handleDeleteEntry(btn.dataset.id));
    });

    // Add event listeners for copy buttons
    container.querySelectorAll('.copy-entry').forEach(btn => {
        btn.addEventListener('click', () => {
            const entryCard = btn.closest('.entry-card');
            const content = entryCard.querySelector('.entry-content').textContent;
            if (typeof copyToClipboard === 'function') {
                copyToClipboard(content);
            }
        });
    });
}

/**
 * Create HTML for an entry card
 */
function createEntryCard(entry) {
    const tags = entry.tags || [];
    const tagsHTML = tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('');

    return `
        <div class="entry-card" data-id="${entry.id}">
            <div class="entry-header">
                <div>
                    <h3 class="entry-title">${escapeHtml(entry.title)}</h3>
                    <p class="entry-date">${formatDate(entry.date)}</p>
                </div>
            </div>
            <div class="entry-content">${escapeHtml(entry.content)}</div>
            ${tags.length > 0 ? `<div class="entry-tags">${tagsHTML}</div>` : ''}
            <div class="entry-actions">
                <button class="btn btn-small copy-entry">📋 Copy</button>
                <button class="btn btn-small btn-danger btn-delete" data-id="${entry.id}">🗑️ Delete</button>
            </div>
        </div>
    `;
}

/**
 * Handle entry deletion
 */
async function handleDeleteEntry(id) {
    if (!confirm('Are you sure you want to delete this entry?')) {
        return;
    }

    try {
        const response = await fetch(`/api/reflections/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete entry');
        }

        if (typeof showNotification === 'function') {
            showNotification('Entry deleted successfully!', 'success');
        }

        // Reload entries
        await loadEntries();
        await updateStats();

    } catch (error) {
        console.error('Error deleting entry:', error);
        if (typeof showNotification === 'function') {
            showNotification('Failed to delete entry. Please try again.', 'error');
        } else {
            alert('Failed to delete entry. Please try again.');
        }
    }
}

/**
 * Update tag filter dropdown
 */
function updateTagFilter(entries) {
    const tagFilter = document.getElementById('tag-filter');
    if (!tagFilter) return;

    // Collect all unique tags
    const allTags = new Set();
    entries.forEach(entry => {
        (entry.tags || []).forEach(tag => allTags.add(tag));
    });

    // Clear existing options (except "All Tags")
    tagFilter.innerHTML = '<option value="">All Tags</option>';

    // Add tag options
    Array.from(allTags).sort().forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
    });
}

/**
 * Filter entries based on search and tag
 */
function filterEntries() {
    const searchInput = document.getElementById('search-input');
    const tagFilter = document.getElementById('tag-filter');
    const container = document.getElementById('entries-container');

    if (!container) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedTag = tagFilter ? tagFilter.value : '';

    // Get all entry cards
    const cards = container.querySelectorAll('.entry-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.entry-title').textContent.toLowerCase();
        const content = card.querySelector('.entry-content').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent);

        const matchesSearch = !searchTerm || title.includes(searchTerm) || content.includes(searchTerm);
        const matchesTag = !selectedTag || tags.includes(selectedTag);

        card.style.display = (matchesSearch && matchesTag) ? 'block' : 'none';
    });
}

/**
 * Update stats on home page
 */
async function updateStats() {
    try {
        const response = await fetch('/api/reflections');
        if (!response.ok) return;

        const entries = await response.json();
        
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

    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

