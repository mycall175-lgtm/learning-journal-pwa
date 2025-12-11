# Lab 3 Compliance Checklist

## ✅ Lab 3 Requirements - All Met

### Folder Structure
- ✅ `/static/js` - Contains all JavaScript files
- ✅ JavaScript files properly organized and linked

### JavaScript Files Created
- ✅ `nav.js` - Reusable navigation menu (Lab 3)
- ✅ `browser.js` - Interactive features (Lab 3)
- ✅ `collapsible.js` - Collapsible sections (Lab 3)
- ✅ `storage.js` - Storage API (Lab 4)
- ✅ `thirdparty.js` - Third-party APIs (Lab 4)
- ✅ `journal.js` - Journal entry management
- ✅ `pwa.js` - PWA registration (Lab 7)

### Reusable Navigation Menu ✅
**File:** `static/js/nav.js`

**Implementation:**
- Uses `document.getElementById()` to select navigation container
- Uses `document.createElement()` to build navigation structure
- Dynamically inserts navigation into each page
- Automatically highlights active page based on current URL
- Reduces code duplication across all pages

**DOM Methods Used:**
- `getElementById()` - Select navigation container
- `createElement()` - Create `<ul>`, `<li>`, `<a>` elements
- `appendChild()` - Add elements to DOM
- `classList.add()` - Add 'active' class to current page

### Interactive Features ✅

#### 1. Live Date/Time Display
**File:** `static/js/browser.js` - `updateDateTime()`

**Implementation:**
- Uses `Date()` object to get current date/time
- Uses `getElementById()` to select datetime element
- Updates text content every second using `setInterval()`
- Displays on homepage and journal page
- Formats date with full weekday, month, day, year, and time

**DOM Manipulation:**
- `getElementById('current-datetime')` - Select element
- `textContent` - Change text content dynamically

#### 2. Theme Switcher
**File:** `static/js/browser.js` - `initializeThemeSwitcher()`

**Implementation:**
- Toggle button to switch between light and dark themes
- Uses `getElementById()` to select theme toggle button
- Uses `addEventListener('click')` to handle button clicks
- Changes CSS by modifying `data-theme` attribute on `<html>` element
- Persists theme preference using localStorage
- Dynamically updates button text based on current theme

**DOM Manipulation:**
- `getElementById('theme-toggle')` - Select button
- `addEventListener('click')` - Handle click event
- `setAttribute('data-theme')` - Change CSS theme
- `textContent` - Update button text

#### 3. Form Validation
**File:** `static/js/browser.js` - `initializeFormValidation()`

**Implementation:**
- Validates journal entry form before submission
- Title must be at least 3 characters
- Content must be at least 10 characters
- Uses `setCustomValidity()` for custom validation messages
- Real-time validation on input events
- Prevents form submission if validation fails

**DOM Manipulation:**
- `getElementById('entry-form')` - Select form
- `getElementById('entry-title')` - Select title input
- `getElementById('entry-content')` - Select content textarea
- `addEventListener('input')` - Real-time validation
- `addEventListener('submit')` - Form submission handling
- `setCustomValidity()` - Set validation messages

#### 4. Collapsible Sections
**File:** `static/js/collapsible.js`

**Implementation:**
- Makes sections expandable/collapsible on click
- Used on About page for Purpose, Features, Technologies, Lab Requirements
- Smooth animation when expanding/collapsing
- Icon rotates to indicate state (▼/▲)
- Changes CSS styles dynamically (maxHeight, opacity, transform)

**DOM Manipulation:**
- `querySelectorAll('.collapsible-header')` - Select all collapsible headers
- `querySelector('.collapsible-content')` - Select content section
- `querySelector('.toggle-icon')` - Select toggle icon
- `closest('.collapsible-section')` - Find parent section
- `classList.toggle('active')` - Toggle active state
- `style.maxHeight` - Change CSS style dynamically
- `style.opacity` - Change CSS style dynamically
- `style.transform` - Rotate icon
- `textContent` - Change icon text (▼/▲)

### DOM Manipulation Practice ✅

#### DOM Selection Methods Used:
1. **`getElementById()`** - Used extensively:
   - Navigation container (`nav.js`)
   - Date/time elements (`browser.js`)
   - Theme toggle button (`browser.js`)
   - Form elements (`browser.js`, `journal.js`)
   - Stats elements (`journal.js`)

2. **`querySelector()`** - Used for:
   - Selecting specific elements within containers
   - Finding nested elements (e.g., `.entry-title`, `.entry-content`)

3. **`querySelectorAll()`** - Used for:
   - Selecting multiple elements (e.g., all collapsible headers)
   - Selecting all entry cards for filtering

4. **`closest()`** - Used for:
   - Finding parent elements (e.g., finding collapsible section from header)

#### Events Handled:
1. **`click`** - Theme switcher, collapsible sections, buttons
2. **`submit`** - Form submission
3. **`input`** - Real-time form validation, search filtering
4. **`change`** - Tag filter dropdown
5. **`DOMContentLoaded`** - Initialize all features when page loads

#### Text Content Changes:
- Date/time display updates text content every second
- Theme button text changes (🌙 Dark Mode / ☀️ Light Mode)
- Collapsible icon text changes (▼ / ▲)
- Form validation messages
- Entry cards dynamically created with text content

#### CSS Style Changes:
- Theme switching: Changes `data-theme` attribute affecting entire page styles
- Collapsible sections: Changes `maxHeight`, `opacity`, `transform`
- Active navigation: Adds/removes `active` class
- Form validation: Visual feedback on invalid inputs
- Hover effects: Various elements change on hover

## Lab 3 Journal Questions (For myUCA Submission)

### 1. Which DOM selection methods did you use, and why did you choose them?

**Answer:**
I used several DOM selection methods:

- **`getElementById()`**: Used for selecting unique elements like the navigation container, theme toggle button, and form inputs. I chose this because it's the most direct and efficient method when you have a unique ID, and it's well-supported across all browsers.

- **`querySelector()` and `querySelectorAll()`**: Used for selecting elements by class names or more complex selectors. I chose `querySelectorAll()` for collapsible sections because I needed to select multiple elements with the same class and apply the same functionality to each. `querySelector()` was useful for finding nested elements within containers.

- **`closest()`**: Used in collapsible sections to find the parent `.collapsible-section` element from a clicked header. This was the most efficient way to traverse up the DOM tree.

The choice of method depended on the specific use case: `getElementById()` for unique elements, `querySelectorAll()` for multiple elements, and `closest()` for DOM traversal.

### 2. What was the most challenging part about linking JavaScript with your HTML?

**Answer:**
The most challenging aspects were:

- **Timing**: Ensuring JavaScript runs after the DOM is fully loaded. I solved this by wrapping initialization code in `DOMContentLoaded` event listeners, which ensures all HTML elements exist before JavaScript tries to access them.

- **Selecting the right elements**: Sometimes elements didn't exist on all pages (e.g., theme toggle only on journal page). I handled this by checking if elements exist before trying to manipulate them using conditional statements like `if (!element) return;`.

- **Maintaining consistency**: Making sure the reusable navigation worked correctly on all pages with different active states. I solved this by checking the current page path and dynamically adding the 'active' class.

- **Event delegation**: Understanding when to use event listeners on individual elements vs. event delegation on parent elements for dynamically created content.

### 3. How did you test and debug your JavaScript code?

**Answer:**
I used several debugging techniques:

- **Console.log()**: Added console.log statements to track function execution, variable values, and element selection. For example, logging when navigation is injected or when theme is switched.

- **Browser Developer Tools**: Used Chrome DevTools to:
  - Inspect elements and verify they were being selected correctly
  - Check the Console tab for errors and warnings
  - Use the Elements tab to see DOM changes in real-time
  - Test JavaScript in the Console tab directly

- **Incremental development**: Built features one at a time, testing each before moving to the next. This made it easier to identify which part was causing issues.

- **Error handling**: Added conditional checks (e.g., `if (!element) return;`) to prevent errors when elements don't exist on certain pages.

- **Visual testing**: Tested interactive features by clicking buttons, submitting forms, and observing visual changes to ensure they worked as expected.

- **Cross-browser testing**: Tested in different browsers (Chrome, Firefox, Edge) to ensure compatibility.

## Technical Implementation Summary

### JavaScript Files Structure:
```
/static/js/
  ├── nav.js          - Reusable navigation (Lab 3)
  ├── browser.js      - Date/time, theme, validation (Lab 3)
  ├── collapsible.js  - Collapsible sections (Lab 3)
  ├── storage.js      - localStorage (Lab 4)
  ├── journal.js      - Journal entry management
  ├── thirdparty.js   - Third-party APIs (Lab 4)
  └── pwa.js          - PWA registration (Lab 7)
```

### Key DOM Methods Used:
- `getElementById()` - 15+ instances
- `querySelector()` - 10+ instances
- `querySelectorAll()` - 5+ instances
- `createElement()` - Navigation creation
- `appendChild()` - Adding elements to DOM
- `classList.add/toggle/remove()` - CSS class manipulation
- `setAttribute()` - Changing HTML attributes
- `textContent` - Changing text content
- `style.property` - Direct CSS style changes

### Events Implemented:
- `DOMContentLoaded` - Page initialization
- `click` - Buttons, collapsible headers
- `submit` - Form submission
- `input` - Real-time validation, search
- `change` - Dropdown filters

---

**Student:** Mykal Yadave  
**Student ID:** 2321764  
**Module:** FGCT6021 Mobile Application Development  
**Lab:** Lab 3 - JavaScript & DOM Manipulation

