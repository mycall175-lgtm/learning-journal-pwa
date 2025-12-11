# Lab 6 Compliance Checklist

## ✅ Lab 6 Requirements - All Met

### Folder Structure ✅
- ✅ `/templates` - HTML pages served by Flask
- ✅ `/static` - Client-side assets
  - `/static/css` - Stylesheets
  - `/static/js` - JavaScript files
  - `/static/images` - Media assets
- ✅ `/backend` - Backend data files
  - `reflections.json` - JSON file storing reflections
- ✅ `flask_app.py` - Main Flask backend file

### Flask Backend ✅

#### 1. Flask Application Created ✅
**File:** `flask_app.py`

**Features:**
- ✅ Flask application initialized
- ✅ Uses `os.path.dirname(__file__)` for PythonAnywhere compatibility
- ✅ Proper file path handling for hosting
- ✅ Error handling for file operations
- ✅ JSON file management functions

**Key Functions:**
- `load_reflections()` - Loads reflections from JSON file
- `save_reflections()` - Saves reflections to JSON file
- `get_next_id()` - Generates unique IDs

#### 2. Routes Implemented ✅

**Template Routes:**
- ✅ `GET /` - Homepage (index.html)
- ✅ `GET /journal` - Journal page
- ✅ `GET /projects` - Projects page
- ✅ `GET /about` - About page

**API Routes (Lab 6 Requirements):**

1. **GET /api/reflections** ✅
   - Returns all reflections as JSON
   - Loads from reflections.json file
   - Returns 200 status code
   - Error handling included

2. **POST /api/reflections** ✅
   - Accepts JSON data from frontend
   - Creates new reflection entry
   - Adds date automatically
   - Appends to reflections.json
   - Returns new entry with 201 status code
   - Error handling included

3. **PUT /api/reflections/<id>** ✅ (Extra Feature)
   - Updates existing reflection
   - Finds entry by ID
   - Updates specified fields
   - Saves to JSON file
   - Returns updated entry

4. **DELETE /api/reflections/<id>** ✅ (Extra Feature)
   - Deletes reflection by ID
   - Removes from reflections list
   - Saves updated JSON file
   - Returns success message

**Additional Routes:**
- ✅ `GET /manifest.json` - PWA manifest
- ✅ `GET /sw.js` - Service worker
- ✅ `GET /backend/reflections.json` - Direct JSON access (Lab 5)

### Frontend (HTML, CSS, JavaScript) ✅

#### 1. Fetch Reflections from Flask ✅
**File:** `static/js/journal.js`

**Implementation:**
- ✅ Uses `fetch('/api/reflections')` to get reflections from Flask
- ✅ Uses `fetch('/api/reflections', { method: 'POST' })` to submit new entries
- ✅ Uses `fetch('/api/reflections/<id>', { method: 'DELETE' })` to delete entries
- ✅ Frontend updates dynamically when new reflections are added
- ✅ Error handling for failed requests
- ✅ Loading states displayed to user

**Code Examples:**
```javascript
// GET reflections
const response = await fetch('/api/reflections');
const entries = await response.json();

// POST new reflection
const response = await fetch('/api/reflections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});

// DELETE reflection
const response = await fetch(`/api/reflections/${id}`, {
    method: 'DELETE'
});
```

#### 2. DOM Manipulation ✅
- ✅ Uses existing HTML/CSS for styling
- ✅ Inserts entries dynamically into DOM
- ✅ Creates entry cards with all information
- ✅ Updates UI after create/delete operations
- ✅ Real-time form submission without page reload

#### 3. Extra Features Using Flask Backend ✅

**Feature 1: DELETE Request** ✅
- Delete button on each entry card
- Sends DELETE request to Flask
- Removes entry from JSON file
- Updates UI immediately

**Feature 2: PUT Request (Update)** ✅
- Update functionality ready (can be extended)
- PUT route implemented in Flask
- Can update existing entries

**Feature 3: Search and Filter** ✅
- Client-side filtering of entries
- Search by keyword
- Filter by tags
- Works with data from Flask API

**Feature 4: Statistics** ✅
- Fetches entries from Flask
- Calculates total entries
- Counts weekly entries
- Displays on homepage

**Feature 5: Real-time Updates** ✅
- After creating entry, list refreshes automatically
- After deleting entry, list updates immediately
- No page reload required

### PythonAnywhere Deployment ✅

**Deployment Readiness:**
- ✅ File paths use `os.path.dirname(__file__)` for compatibility
- ✅ Proper Flask structure (templates/, static/)
- ✅ Error handling for file operations
- ✅ JSON file path resolution works on PythonAnywhere
- ✅ All routes properly configured

**Deployment Instructions:**
See `README.md` for detailed PythonAnywhere deployment guide.

## Lab 6 Journal Questions (For myUCA Submission)

### 1. Why is the frontend–backend connection important?

**Answer:**

The frontend-backend connection is crucial for several reasons:

**Separation of Concerns:**
- **Frontend** handles user interface, user interactions, and presentation
- **Backend** handles data storage, business logic, and server-side operations
- This separation makes code more maintainable and scalable

**Data Persistence:**
- Backend stores data in files/databases that persist beyond browser sessions
- Multiple users can access the same data
- Data can be shared, backed up, and version-controlled

**Security:**
- Backend can validate and sanitize data before storage
- Sensitive operations (file writing, data validation) happen server-side
- Prevents client-side manipulation of data

**Scalability:**
- Backend can handle multiple clients simultaneously
- Can add authentication, rate limiting, and other server-side features
- Can scale to handle more users and data

**Functionality:**
- Enables features that require server-side processing
- Can integrate with databases, external APIs, file systems
- Supports complex operations that JavaScript alone cannot do

**In This Project:**
- Flask backend manages the JSON file (persistent storage)
- Frontend sends requests, backend processes and stores data
- Enables CRUD operations (Create, Read, Update, Delete)
- Makes the PWA more powerful and professional

### 2. Which HTTP methods did you use in Flask, and why?

**Answer:**

**GET Method:**
- **Route:** `GET /api/reflections`
- **Purpose:** Retrieve all reflections from JSON file
- **Why:** GET is the standard method for reading/retrieving data. It's safe, idempotent, and cacheable. Perfect for fetching data without side effects.

**POST Method:**
- **Route:** `POST /api/reflections`
- **Purpose:** Create a new reflection entry
- **Why:** POST is used for creating new resources. It's not idempotent (each call creates a new entry). Standard RESTful practice for resource creation.

**PUT Method:**
- **Route:** `PUT /api/reflections/<id>`
- **Purpose:** Update an existing reflection
- **Why:** PUT is used for updating/replacing entire resources. It's idempotent (calling it multiple times has the same effect). Standard for updates in REST APIs.

**DELETE Method:**
- **Route:** `DELETE /api/reflections/<id>`
- **Purpose:** Delete a reflection by ID
- **Why:** DELETE is the standard method for removing resources. It's idempotent (deleting twice has the same effect as deleting once). Clear semantic meaning.

**Why These Methods:**
- **RESTful Design:** Follows REST (Representational State Transfer) principles
- **Semantic Clarity:** Each method has a clear, standard meaning
- **Best Practices:** Industry-standard approach to API design
- **Compatibility:** Works well with frontend Fetch API
- **Scalability:** Easy to extend with authentication, validation, etc.

**HTTP Status Codes Used:**
- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST (resource created)
- `400 Bad Request` - Invalid data
- `404 Not Found` - Entry not found
- `500 Internal Server Error` - Server error

### 3. What is the difference between using Flask to store and load JSON data and reading JSON directly in the browser?

**Answer:**

**Using Flask (Backend):**

**Advantages:**
- **Server-side Processing:** Data operations happen on server, more secure
- **Persistence:** Data stored on server, accessible to all users
- **Validation:** Can validate data before saving
- **Multi-user:** Multiple users can access same data
- **Version Control:** JSON file can be tracked in Git
- **Backup:** Easy to backup server files
- **Scalability:** Can handle many concurrent requests
- **Security:** Can add authentication, authorization
- **Error Handling:** Server-side error handling and logging

**How It Works:**
1. Frontend sends request to Flask route
2. Flask reads/writes JSON file on server
3. Flask processes data (validation, formatting)
4. Flask returns JSON response to frontend
5. Frontend displays data

**Reading JSON Directly in Browser:**

**Advantages:**
- **Simplicity:** No server needed, works offline
- **Speed:** Direct file access, no network request
- **Development:** Easier for simple projects

**Limitations:**
- **No Write Access:** Browsers can't write to files (security)
- **CORS Issues:** May have cross-origin restrictions
- **Single User:** Only works for that browser instance
- **No Validation:** Client-side only, can be bypassed
- **No Persistence:** Changes don't persist (unless using localStorage)
- **Limited:** Can't handle complex operations

**How It Works:**
1. Frontend fetches JSON file directly
2. Browser reads file (if accessible)
3. JavaScript parses JSON
4. Data displayed (read-only)

**Key Differences:**

| Aspect | Flask (Backend) | Direct Browser Read |
|--------|----------------|---------------------|
| Write Access | ✅ Yes | ❌ No |
| Multi-user | ✅ Yes | ❌ No |
| Validation | ✅ Server-side | ❌ Client-side only |
| Security | ✅ Better | ⚠️ Limited |
| Persistence | ✅ Server files | ❌ Browser storage only |
| Scalability | ✅ High | ❌ Low |
| Complexity | ⚠️ More complex | ✅ Simpler |

**In This Project:**
- Flask handles all JSON file operations
- Frontend sends requests, Flask processes them
- Data persists on server, accessible to all
- Can add features like authentication, rate limiting
- More professional and scalable approach

### 4. Did you face any difficulties when running your project on PythonAnywhere? How did you handle them?

**Answer:**

**Challenges and Solutions:**

**Challenge 1: File Path Resolution**
- **Problem:** File paths that work locally might not work on PythonAnywhere
- **Solution:** Used `os.path.dirname(os.path.abspath(__file__))` to get absolute paths relative to script location. This ensures paths work regardless of where the script is executed.

**Challenge 2: Static Files Not Loading**
- **Problem:** CSS, JS, images not loading correctly
- **Solution:** 
  - Used Flask's `url_for('static', filename='...')` in templates
  - Configured static files mapping in PythonAnywhere Web tab
  - Ensured correct folder structure (static/css, static/js, etc.)

**Challenge 3: JSON File Location**
- **Problem:** JSON file not found when Flask tries to read it
- **Solution:** 
  - Used `os.path.join()` to build paths correctly
  - Created backend directory if it doesn't exist
  - Used absolute paths based on script location

**Challenge 4: WSGI Configuration**
- **Problem:** Flask app not starting correctly
- **Solution:** 
  - Configured WSGI file to import flask_app
  - Set correct Python path
  - Used `app` as the application object

**Challenge 5: Dependencies**
- **Problem:** Flask or other packages not installed
- **Solution:** 
  - Installed Flask using pip in PythonAnywhere Bash console
  - Created requirements.txt for easy installation
  - Used `pip3.10 install --user Flask` for user-level installation

**Challenge 6: Reloading Changes**
- **Problem:** Changes not appearing after upload
- **Solution:** 
  - Clicked "Reload" button in PythonAnywhere Web tab
  - Cleared browser cache
  - Checked file permissions

**Best Practices Applied:**
- ✅ Used relative paths with `os.path` functions
- ✅ Tested locally before deploying
- ✅ Kept file structure consistent
- ✅ Used proper error handling
- ✅ Documented deployment process

**Prevention:**
- Test file paths work in different environments
- Use Flask's built-in path functions
- Keep folder structure simple and standard
- Document all dependencies
- Test deployment process

### 5. What extra feature did you build into your PWA with Flask, and why did you add it?

**Answer:**

**Extra Feature: Full CRUD Operations (Create, Read, Update, Delete)**

**What It Does:**
- **Create (POST):** Add new journal entries via form submission
- **Read (GET):** Display all entries from JSON file
- **Update (PUT):** Update existing entries (route implemented, can be extended with UI)
- **Delete (DELETE):** Remove entries with delete button

**Implementation:**

**DELETE Feature (Fully Implemented):**
```python
@app.route('/api/reflections/<int:entry_id>', methods=['DELETE'])
def delete_reflection(entry_id):
    reflections = load_reflections()
    reflections = [e for e in reflections if e.get('id') != entry_id]
    save_reflections(reflections)
    return jsonify({'message': 'Entry deleted successfully'}), 200
```

**Frontend Integration:**
```javascript
async function handleDeleteEntry(id) {
    const response = await fetch(`/api/reflections/${id}`, {
        method: 'DELETE'
    });
    await loadEntries(); // Refresh list
}
```

**Why This Feature:**
1. **Complete Functionality:** Makes the journal fully functional, not just read-only
2. **User Control:** Users can manage their entries (add, view, delete)
3. **RESTful Design:** Demonstrates proper REST API implementation
4. **Real-world Application:** Shows how real applications work (full CRUD)
5. **Learning Value:** Demonstrates all HTTP methods (GET, POST, PUT, DELETE)
6. **Professional:** Makes the PWA more complete and professional

**Additional Features:**
- **Real-time Updates:** UI updates immediately after operations
- **Error Handling:** Proper error messages for failed operations
- **Validation:** Server-side validation before saving
- **Statistics:** Counts and displays entry statistics
- **Search/Filter:** Client-side filtering of entries

**Benefits:**
- Users can fully manage their journal
- Demonstrates backend-frontend communication
- Shows proper API design
- Makes the PWA production-ready
- Provides complete learning experience

## Technical Implementation Summary

### Flask Routes:
```python
# Template Routes
GET  /                    → index.html
GET  /journal            → journal.html
GET  /projects           → projects.html
GET  /about              → about.html

# API Routes
GET    /api/reflections           → Get all entries
POST   /api/reflections           → Create new entry
PUT    /api/reflections/<id>      → Update entry
DELETE /api/reflections/<id>      → Delete entry
```

### Frontend Fetch API Usage:
```javascript
// GET - Load entries
fetch('/api/reflections')

// POST - Create entry
fetch('/api/reflections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})

// DELETE - Delete entry
fetch(`/api/reflections/${id}`, {
    method: 'DELETE'
})
```

### File Structure:
```
/mysite (or project root)
  ├── flask_app.py          ✅ Main Flask backend
  ├── requirements.txt      ✅ Dependencies
  ├── templates/            ✅ HTML templates
  │   ├── index.html
  │   ├── journal.html
  │   ├── about.html
  │   └── projects.html
  ├── static/               ✅ Static assets
  │   ├── css/
  │   ├── js/
  │   └── images/
  └── backend/              ✅ Backend data
      └── reflections.json  ✅ JSON data file
```

### PythonAnywhere Deployment:
1. Upload all files to PythonAnywhere
2. Configure WSGI file to import flask_app
3. Set static files mapping
4. Install dependencies: `pip3.10 install --user Flask`
5. Reload web app
6. Access at: `yourusername.pythonanywhere.com`

---

**Student:** Mykal Yadave  
**Student ID:** 2321764  
**Module:** FGCT6021 Mobile Application Development  
**Lab:** Lab 6 - Frontend & Backend

