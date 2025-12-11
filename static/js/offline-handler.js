/**
 * Lab 7: Offline Handler & Background Sync
 * Handles offline detection, online/offline events, and background sync
 */

// Offline indicator element
let offlineIndicator = null;

/**
 * Initialize offline handling
 */
function initializeOfflineHandler() {
    // Create offline indicator
    createOfflineIndicator();
    
    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check initial status
    if (!navigator.onLine) {
        handleOffline();
    }
    
    // Setup background sync for pending entries
    setupBackgroundSync();
}

/**
 * Create offline indicator element
 */
function createOfflineIndicator() {
    offlineIndicator = document.createElement('div');
    offlineIndicator.id = 'offline-indicator';
    offlineIndicator.style.cssText = `
        position: fixed;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #f59e0b;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: none;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    `;
    offlineIndicator.innerHTML = '📡 You are offline. Some features may be limited.';
    document.body.appendChild(offlineIndicator);
}

/**
 * Handle going offline
 */
function handleOffline() {
    console.log('App went offline');
    
    if (offlineIndicator) {
        offlineIndicator.style.display = 'flex';
    }
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification('You are now offline. Cached content is available.', 'info');
    }
    
    // Try to load cached entries
    if (typeof loadCachedEntries === 'function') {
        const cached = loadCachedEntries();
        if (cached.length > 0 && typeof displayEntries === 'function') {
            console.log('Loading cached entries:', cached.length);
        }
    }
}

/**
 * Handle coming back online
 */
function handleOnline() {
    console.log('App came back online');
    
    if (offlineIndicator) {
        offlineIndicator.style.display = 'none';
    }
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification('You are back online! Syncing data...', 'success');
    }
    
    // Reload entries from server
    if (typeof loadEntries === 'function') {
        setTimeout(() => {
            loadEntries();
            if (typeof updateStats === 'function') {
                updateStats();
            }
        }, 500);
    }
    
    // Sync any pending operations
    syncPendingOperations();
}

/**
 * Setup background sync for pending entries
 */
function setupBackgroundSync() {
    // Check if Background Sync API is available
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        console.log('Background Sync API available');
        
        // Register sync event listener in service worker
        // This would be handled in sw.js
    } else {
        console.log('Background Sync API not available, using manual sync');
    }
}

/**
 * Sync pending operations when back online
 */
async function syncPendingOperations() {
    try {
        // Check for pending entries in localStorage
        const pendingEntries = localStorage.getItem('pending_entries');
        if (pendingEntries) {
            const entries = JSON.parse(pendingEntries);
            console.log('Syncing pending entries:', entries.length);
            
            // Try to sync each pending entry
            for (const entry of entries) {
                try {
                    const response = await fetch('/api/reflections', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(entry)
                    });
                    
                    if (response.ok) {
                        console.log('Entry synced successfully:', entry.title);
                        // Remove from pending list
                        entries.splice(entries.indexOf(entry), 1);
                    }
                } catch (error) {
                    console.error('Failed to sync entry:', error);
                }
            }
            
            // Update pending entries
            if (entries.length > 0) {
                localStorage.setItem('pending_entries', JSON.stringify(entries));
            } else {
                localStorage.removeItem('pending_entries');
            }
        }
    } catch (error) {
        console.error('Error syncing pending operations:', error);
    }
}

/**
 * Queue entry for sync when offline
 */
function queueEntryForSync(entryData) {
    try {
        const pending = localStorage.getItem('pending_entries');
        const entries = pending ? JSON.parse(pending) : [];
        entries.push(entryData);
        localStorage.setItem('pending_entries', JSON.stringify(entries));
        console.log('Entry queued for sync:', entryData.title);
    } catch (error) {
        console.error('Error queueing entry:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeOfflineHandler();
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    #offline-indicator {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

