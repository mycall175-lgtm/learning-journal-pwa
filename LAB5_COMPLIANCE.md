# Lab 5 Compliance Checklist

## ✅ Lab 5 Requirements - All Met

### Folder Structure
- ✅ `/backend` - Contains JSON and Python files
- ✅ `/backend/reflections.json` - JSON data file
- ✅ `/backend/save_entry.py` - Python script to add entries

### Python and JSON ✅

#### 1. JSON File Created ✅
**File:** `backend/reflections.json`

**Structure:**
- Empty array `[]` initially (can be populated)
- Each entry contains:
  - `id` - Unique identifier
  - `date` - Date in YYYY-MM-DD format
  - `title` - Entry title
  - `content` - Reflection text
  - `tags` - Array of tags

**Example Entry:**
```json
{
    "id": 1,
    "date": "2025-01-10",
    "title": "Getting Started with PWA Development",
    "content": "Today I learned about Progressive Web Apps...",
    "tags": ["PWA", "Web Development", "JavaScript"]
}
```

#### 2. Python Script (save_entry.py) ✅
**File:** `backend/save_entry.py`

**Features:**
- ✅ Asks user to type a reflection (using `input()`)
- ✅ Appends reflection with date and other information
- ✅ Saves updated JSON file using `json.dump()`
- ✅ Interactive menu system
- ✅ Error handling for file operations
- ✅ Auto-generates unique IDs
- ✅ Validates required fields (title, content)

**Functions:**
- `load_reflections()` - Loads existing entries from JSON
- `save_reflections()` - Saves entries to JSON file
- `get_next_id()` - Generates next available ID
- `add_entry()` - Interactive function to add new entry
- `list_entries()` - Display all entries
- `main()` - Main menu system

**Usage:**
```bash
python backend/save_entry.py
```

**Output:**
- Updates `reflections.json` file
- Prints confirmation message
- Shows total entry count

### Front-End (HTML, CSS, JavaScript) ✅

#### 1. Fetch JSON Data ✅
**File:** `static/js/json-loader.js`

**Implementation:**
- ✅ Uses `fetch("backend/reflections.json")` to load JSON file
- ✅ Parses JSON response using `.json()`
- ✅ Displays entries on journal page
- ✅ Error handling for failed requests
- ✅ Fallback to empty array if file not found

**Code Example:**
```javascript
async function loadEntriesFromJSON() {
    const response = await fetch('/backend/reflections.json');
    const entries = await response.json();
    return entries;
}
```

#### 2. DOM Manipulation ✅
**Files:** `static/js/journal.js`, `static/js/json-loader.js`

**Implementation:**
- ✅ Uses existing HTML/CSS for styling
- ✅ Inserts JSON entries dynamically into DOM
- ✅ Displays date and reflection text
- ✅ Creates entry cards with all information
- ✅ Updates tag filter dropdown from JSON data
- ✅ Displays statistics (total entries, this week)

**DOM Methods Used:**
- `getElementById()` - Select containers
- `querySelector()` - Find elements
- `createElement()` - Create entry cards
- `innerHTML` - Insert HTML content
- `textContent` - Update text
- `appendChild()` - Add elements to DOM

#### 3. Extra Features Using JSON File ✅

**Feature 1: Export JSON File** ✅
- ✅ Export button on journal page
- ✅ Downloads reflections.json as file
- ✅ Includes all entries with formatting
- ✅ Filename includes current date
- ✅ Uses Blob API and download link

**Feature 2: Filter Entries** ✅
- ✅ Search by keyword (title, content, tags)
- ✅ Filter by tags using dropdown
- ✅ Real-time filtering as user types
- ✅ Uses `filterEntriesByKeyword()` function

**Feature 3: Entry Counter** ✅
- ✅ Displays total entries count
- ✅ Shows entries from this week
- ✅ Updates dynamically from JSON file
- ✅ Displayed on homepage stats section

**Feature 4: Statistics Display** ✅
- ✅ Total entries count
- ✅ Weekly entries count
- ✅ Updates from JSON file data
- ✅ Visual display with numbers

## Lab 5 Journal Questions (For myUCA Submission)

### 1. How is storing data in a JSON file different from using browser storage?

**Answer:**

**JSON File Storage:**
- **Persistence**: Data persists on the server/file system, independent of browser
- **Accessibility**: Can be accessed by multiple users, shared, version-controlled (Git)
- **Size**: No browser-imposed size limits (typically 5-10MB for localStorage)
- **Portability**: File can be moved, backed up, edited manually
- **Server-side**: Can be modified by Python scripts, server processes
- **Sharing**: Can be shared between different browsers/devices via file transfer
- **Version Control**: Can be tracked in Git, see history of changes
- **Backup**: Easy to backup as a file

**Browser Storage (localStorage/sessionStorage):**
- **Persistence**: Only persists in specific browser on specific device
- **Accessibility**: Only accessible to that browser instance
- **Size**: Limited to ~5-10MB per domain
- **Portability**: Tied to browser, not easily portable
- **Client-side**: Only modifiable by JavaScript in browser
- **Sharing**: Cannot easily share between browsers/devices
- **Version Control**: Not visible in Git (browser-specific)
- **Backup**: Requires browser export functionality

**Key Differences:**
- JSON file is **server-side, shareable, version-controllable**
- Browser storage is **client-side, browser-specific, temporary**
- JSON file can be **edited with Python, shared via Git**
- Browser storage is **JavaScript-only, browser-bound**

### 2. How did you use Python to create or update your JSON file?

**Answer:**

**Python Script: `save_entry.py`**

**Step 1: Load Existing Data**
```python
def load_reflections():
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)  # Parse JSON to Python list
```

**Step 2: Get User Input**
```python
title = input("Title: ").strip()
content = input("Content: ").strip()
date = input("Date (YYYY-MM-DD) [today]: ").strip() or datetime.now().strftime('%Y-%m-%d')
```

**Step 3: Create Entry Object**
```python
new_entry = {
    "id": get_next_id(reflections),
    "date": date_input,
    "title": title,
    "content": content,
    "tags": tags
}
```

**Step 4: Append to List**
```python
reflections.append(new_entry)  # Add to Python list
```

**Step 5: Save to JSON File**
```python
def save_reflections(reflections):
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(reflections, f, indent=4, ensure_ascii=False)
        # Convert Python list to JSON and write to file
```

**Process:**
1. **Read**: `json.load()` reads JSON file into Python list
2. **Modify**: Add new entry to Python list
3. **Write**: `json.dump()` writes Python list back to JSON file
4. **Format**: `indent=4` makes JSON readable with proper formatting

**Key Python Functions Used:**
- `json.load()` - Parse JSON to Python
- `json.dump()` - Write Python to JSON
- `open()` - File operations
- `input()` - User input
- `datetime.now()` - Current date

### 3. What does your PWA show locally, and what will users see on GitHub? Are they the same? Why or why not?

**Answer:**

**Locally (Running Flask Server):**
- **Full PWA**: Complete application with all features
- **Interactive**: All JavaScript works, forms submit, APIs fetch data
- **Dynamic**: Entries load from JSON, can be created/edited/deleted
- **Backend**: Flask server processes requests, serves JSON
- **Real-time**: Changes reflect immediately
- **Functional**: All features work (theme, validation, notifications, etc.)

**On GitHub (Repository):**
- **Source Code**: All HTML, CSS, JavaScript, Python files visible
- **JSON File**: `reflections.json` with sample entries visible
- **Static Files**: All templates, static assets visible
- **Documentation**: README, compliance documents visible
- **History**: Git commit history shows development progress
- **Structure**: Folder organization visible

**Are They the Same?**
**No, they are different:**

**Differences:**
1. **Functionality**: 
   - Local: Full working application
   - GitHub: Just source code (not executable without server)

2. **JSON File**:
   - Local: Can be updated by Python script or Flask API
   - GitHub: Shows current state at last commit (static snapshot)

3. **Runtime**:
   - Local: Requires Python/Flask server running
   - GitHub: Just files, no server running

4. **User Experience**:
   - Local: Users interact with live application
   - GitHub: Users view code, need to clone and run locally

**Why Different:**
- GitHub is a **code repository**, not a hosting platform for running applications
- Local requires **server environment** (Flask) to execute
- GitHub shows **source code** and **data files** as they are committed
- Local shows **running application** with dynamic behavior

**To Make It Work:**
- Users need to clone repository
- Install dependencies (`pip install flask`)
- Run `python flask_app.py`
- Then they see the same as local

### 4. What extra feature did you add to your PWA using the JSON file, and why?

**Answer:**

**Extra Feature: Export JSON File**

**What It Does:**
- Adds an "Export JSON" button on the journal page
- Downloads the current `reflections.json` file
- Allows users to save a backup copy of their entries
- Filename includes date for organization

**Implementation:**
```javascript
async function exportJSONFile() {
    const entries = await loadEntriesFromJSON();
    const dataStr = JSON.stringify(entries, null, 4);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reflections-${date}.json`;
    link.click();
}
```

**Why This Feature:**
1. **Backup**: Users can backup their journal entries
2. **Portability**: Can move entries to another device/system
3. **Sharing**: Can share entries with others
4. **Data Ownership**: Users have control over their data
5. **Compliance**: Demonstrates file manipulation with JSON
6. **Practical**: Real-world use case (data export)

**Additional Features Also Implemented:**
- **Filter by Keyword**: Search entries by title, content, or tags
- **Filter by Tags**: Dropdown to filter by specific tags
- **Entry Counter**: Displays total entries and weekly count
- **Statistics**: Shows data insights from JSON file

**Why These Features:**
- **Filtering**: Makes it easy to find specific entries in large journals
- **Counter**: Provides quick overview of journal activity
- **Statistics**: Helps users track their learning progress
- **User Experience**: Makes the journal more useful and functional

**DOM Integration:**
- Export button added dynamically using `createElement()`
- Filter uses `addEventListener('input')` for real-time search
- Counter updates using `textContent` from JSON data
- All features interact with JSON file using `fetch()` and DOM manipulation

## Technical Implementation Summary

### Python Script Usage:
```bash
# Run Python script
python backend/save_entry.py

# Options:
# 1. Add new entry (interactive input)
# 2. List all entries
# 3. Exit
```

### JSON File Structure:
```json
[
    {
        "id": 1,
        "date": "2025-01-10",
        "title": "Entry Title",
        "content": "Entry content...",
        "tags": ["tag1", "tag2"]
    }
]
```

### JavaScript JSON Loading:
```javascript
// Fetch JSON file
const response = await fetch('/backend/reflections.json');
const entries = await response.json();

// Display in DOM
displayEntries(entries);
```

### Extra Features:
1. **Export JSON** - Download reflections.json file
2. **Filter by Keyword** - Search entries
3. **Filter by Tags** - Tag-based filtering
4. **Entry Counter** - Total and weekly counts
5. **Statistics** - Data insights from JSON

### Files Structure:
```
/backend/
  ├── reflections.json    ✅ JSON data file
  └── save_entry.py       ✅ Python script

/static/js/
  ├── json-loader.js      ✅ Direct JSON loading (Lab 5)
  └── journal.js          ✅ Entry management
```

---

**Student:** Mykal Yadave  
**Student ID:** 2321764  
**Module:** FGCT6021 Mobile Application Development  
**Lab:** Lab 5 - Python & JSON Backend Data

