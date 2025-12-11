# Learning Journal PWA

A Progressive Web App (PWA) for tracking learning experiences and reflections. This project fulfills requirements from Lab 2 through Lab 7 of a Mobile Application Development module.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Lab Requirements](#lab-requirements)
- [Installation & Setup](#installation--setup)
- [Running Locally](#running-locally)
- [Deployment to PythonAnywhere](#deployment-to-pythonanywhere)
- [Usage](#usage)

## ✨ Features

- 📝 Create, read, update, and delete journal entries
- 💾 Local storage for offline access and preferences
- 🌐 Third-party API integrations (quotes, weather)
- 📱 Mobile-first responsive design
- 🔧 Flask backend with RESTful API
- ⚡ Progressive Web App capabilities (offline support, installable)
- 🌙 Dark/Light theme switching
- 🔍 Search and filter entries by tags
- 📊 Statistics dashboard

## 📁 Project Structure

```
EmotiVerse/
├── flask_app.py              # Main Flask application
├── requirements.txt           # Python dependencies
├── README.md                 # This file
├── templates/                # HTML templates
│   ├── index.html           # Home page
│   ├── journal.html         # Journal entries page
│   ├── about.html           # About page
│   └── projects.html        # Projects page
├── static/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── nav.js          # Navigation injection (Lab 3)
│   │   ├── storage.js      # Storage API (Lab 4)
│   │   ├── browser.js      # Browser APIs (Lab 4)
│   │   ├── thirdparty.js   # Third-party APIs (Lab 4)
│   │   ├── journal.js      # Journal entry management
│   │   ├── pwa.js          # PWA registration (Lab 7)
│   │   └── sw.js           # Service worker (Lab 7)
│   ├── images/             # PWA icons (placeholder)
│   └── manifest.json       # Web app manifest (Lab 7)
└── backend/
    ├── reflections.json    # JSON data storage (Lab 5)
    └── save_entry.py       # Console entry script (Lab 5)
```

## 🎓 Lab Requirements

### Lab 2: Frontend Fundamentals (HTML & CSS)

**Requirements Met:**
- ✅ Four pages: Home (`index.html`), Journal (`journal.html`), About (`about.html`), Projects (`projects.html`)
- ✅ Navigation bar on all pages (injected via JavaScript in Lab 3)
- ✅ Mobile-first responsive CSS with breakpoints for tablet (768px) and desktop (1024px)
- ✅ Clean, semantic HTML structure
- ✅ No JavaScript dependencies (pure HTML/CSS)

**Files:**
- `templates/*.html` - All HTML pages
- `static/css/style.css` - Responsive stylesheet with mobile-first approach

### Lab 3: JavaScript & DOM Manipulation

**Requirements Met:**
- ✅ Reusable navigation via JavaScript injection (`nav.js`)
- ✅ DOM interactions:
  - Date/time display updated every second
  - Theme switcher (dark/light mode)
  - Form validation
  - Dynamic content rendering
- ✅ Uses `querySelector`, `getElementById`, `classList`, event listeners

**Files:**
- `static/js/nav.js` - Navigation injection
- `static/js/browser.js` - DOM manipulation, theme switching, date/time

### Lab 4: Storage API, Browser API, Third-Party API

**Requirements Met:**

**Storage API:**
- ✅ `localStorage` for theme preferences
- ✅ `localStorage` for caching journal entries offline
- ✅ Functions: `saveTheme()`, `loadTheme()`, `cacheEntries()`, `loadCachedEntries()`

**Browser API:**
- ✅ Clipboard API - Copy entry content to clipboard
- ✅ Geolocation API - Function available (requires user permission)
- ✅ Notifications API - Permission request and notification support
- ✅ Form Validation API - HTML5 validation with custom validation

**Third-Party API:**
- ✅ Quotes API - Fetches daily quotes from `quotable.io`
- ✅ Weather API - Structure ready (requires API key for production)
- ✅ GitHub API - Example function included
- ✅ Uses Fetch API for all HTTP requests

**Files:**
- `static/js/storage.js` - Storage API implementation
- `static/js/browser.js` - Browser APIs (clipboard, geolocation, notifications, validation)
- `static/js/thirdparty.js` - Third-party API integrations

### Lab 5: Python & JSON Backend

**Requirements Met:**
- ✅ `reflections.json` structure with entries containing:
  - `id` (unique identifier)
  - `date` (YYYY-MM-DD format)
  - `title` (entry title)
  - `content` (reflection text)
  - `tags` (array of tags)
- ✅ `save_entry.py` script for console-based entry creation
- ✅ Frontend fetches and displays JSON entries
- ✅ Extra features: Filter by tags, search entries, statistics

**Files:**
- `backend/reflections.json` - JSON data file
- `backend/save_entry.py` - Console script for adding entries

**Usage:**
```bash
python backend/save_entry.py
```

### Lab 6: Flask Backend + PythonAnywhere Deployment Readiness

**Requirements Met:**
- ✅ `flask_app.py` serving templates and static files
- ✅ API routes:
  - `GET /api/reflections` - Retrieve all entries
  - `POST /api/reflections` - Create new entry
  - `PUT /api/reflections/<id>` - Update entry
  - `DELETE /api/reflections/<id>` - Delete entry
- ✅ Frontend uses Fetch API for CRUD operations
- ✅ File paths use `os.path.dirname(__file__)` for hosting compatibility
- ✅ Error handling and JSON responses

**Files:**
- `flask_app.py` - Main Flask application
- `static/js/journal.js` - Frontend CRUD operations

**API Endpoints:**
- `GET /` - Home page
- `GET /journal` - Journal page
- `GET /projects` - Projects page
- `GET /about` - About page
- `GET /api/reflections` - Get all entries
- `POST /api/reflections` - Create entry
- `PUT /api/reflections/<id>` - Update entry
- `DELETE /api/reflections/<id>` - Delete entry

### Lab 7: Progressive Web App (PWA)

**Requirements Met:**
- ✅ `manifest.json` with:
  - App name, short name, description
  - Icons (multiple sizes for different devices)
  - Display mode: `standalone`
  - Theme color: `#4a90e2`
  - Start URL: `/`
- ✅ Service Worker (`sw.js`):
  - Cache static assets (CSS, JS, images)
  - Offline support with cache-first and network-first strategies
  - Cache management and versioning
- ✅ PWA registration script (`pwa.js`)
- ✅ Install prompt handling
- ✅ Offline indicator (via service worker)

**Files:**
- `static/manifest.json` - Web app manifest
- `static/js/sw.js` - Service worker
- `static/js/pwa.js` - PWA registration

**PWA Features:**
- Installable on mobile and desktop
- Works offline (cached content)
- App-like experience (standalone display mode)
- Fast loading (cached assets)

## 🚀 Installation & Setup

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Step 1: Clone or Download the Project

Navigate to the project directory:
```bash
cd "C:\Users\MD JAWAR SAFI\Desktop\Learning Journal PWA.m\EmotiVerse"
```

### Step 2: Install Dependencies

Install Flask and required packages:
```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install Flask==3.0.0
```

## 🏃 Running Locally

1. **Start the Flask server:**
   ```bash
   python flask_app.py
   ```

2. **Open your browser:**
   Navigate to `http://localhost:5000`

3. **Test the application:**
   - Visit all pages (Home, Journal, Projects, About)
   - Create journal entries
   - Test theme switching
   - Try offline mode (disable network in DevTools)
   - Test PWA installation

### Development Mode

The app runs in debug mode by default. For production, modify `flask_app.py`:
```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

## 🌐 Deployment to PythonAnywhere

### Step 1: Prepare for Deployment

1. **Update `flask_app.py`** for production:
   ```python
   if __name__ == '__main__':
       app.run(debug=False)  # Disable debug mode
   ```

2. **Ensure file paths are compatible:**
   - The app uses `os.path.dirname(__file__)` for path resolution
   - This works on PythonAnywhere

### Step 2: Upload Files

1. Upload all project files to PythonAnywhere:
   - `flask_app.py`
   - `requirements.txt`
   - `templates/` folder
   - `static/` folder
   - `backend/` folder

2. **Create directories if needed:**
   ```bash
   mkdir -p templates static/css static/js static/images backend
   ```

### Step 3: Install Dependencies

In PythonAnywhere Bash console:
```bash
pip3.10 install --user Flask==3.0.0
```

### Step 4: Configure Web App

1. Go to **Web** tab in PythonAnywhere dashboard
2. Click **Add a new web app**
3. Choose **Manual configuration** → **Python 3.10** (or your version)
4. In **WSGI configuration file**, add:
   ```python
   import sys
   path = '/home/yourusername/path/to/EmotiVerse'
   if path not in sys.path:
       sys.path.append(path)
   
   from flask_app import app as application
   ```

5. **Set Static files mapping:**
   - URL: `/static/`
   - Directory: `/home/yourusername/path/to/EmotiVerse/static/`

6. **Reload the web app**

### Step 5: Test Deployment

1. Visit your PythonAnywhere URL (e.g., `https://yourusername.pythonanywhere.com`)
2. Test all features
3. Verify PWA installation works
4. Test offline functionality

## 📖 Usage

### Creating Journal Entries

1. Navigate to **Journal** page
2. Fill in the form:
   - Date (defaults to today)
   - Title (required, min 3 characters)
   - Reflection content (required, min 10 characters)
   - Tags (optional, comma-separated)
3. Click **Save Entry**

### Using Console Script (Lab 5)

```bash
python backend/save_entry.py
```

Follow the prompts to add entries via console.

### Filtering Entries

- Use the **Search** box to filter by title or content
- Use the **Tag filter** dropdown to filter by tags

### Theme Switching

Click the **Toggle Theme** button on the Journal page to switch between light and dark modes. Your preference is saved in localStorage.

### Installing as PWA

1. Visit the app in a supported browser (Chrome, Edge, Safari)
2. Look for the install prompt or use browser menu
3. Click **Install** to add to home screen
4. The app will work offline after installation

## 🔧 Extra Features

- **Statistics Dashboard**: View total entries and weekly count on home page
- **Copy to Clipboard**: Copy entry content with one click
- **Offline Support**: Cached entries available when offline
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Form Validation**: Real-time validation with helpful error messages
- **Tag System**: Organize entries with tags
- **Search Functionality**: Quick search across all entries

## 📝 Notes

- **Icons**: Place PWA icons in `static/images/` directory. The manifest references:
  - `icon-72x72.png`, `icon-96x96.png`, `icon-128x128.png`, etc.
  - You can generate icons using tools like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)

- **Service Worker**: The service worker caches assets for offline use. Clear cache in browser DevTools if you need to update cached files.

- **API Keys**: For production use of weather API, add your API key to `thirdparty.js`.

## 🐛 Troubleshooting

**Issue**: Service worker not registering
- **Solution**: Ensure you're accessing via `http://localhost` (not `file://`)
- Check browser console for errors

**Issue**: Entries not saving
- **Solution**: Check that `backend/reflections.json` exists and is writable
- Verify Flask server is running

**Issue**: PWA not installable
- **Solution**: Ensure `manifest.json` is accessible
- Check that service worker is registered
- Use HTTPS in production (PythonAnywhere provides this)

## 📄 License

This project is created for educational purposes as part of a Mobile Application Development module.

---

**Built with ❤️ for learning and reflection**

