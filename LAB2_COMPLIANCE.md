# Lab 2 Compliance Checklist

## ✅ Lab 2 Requirements - All Met

### Folder Structure
- ✅ `/static/css` - Contains `style.css`
- ✅ `/static/js` - Created (for future labs)
- ✅ `/static/images` - Created for media assets
- ✅ `/templates` - Contains all HTML pages

### Pages Created
- ✅ `index.html` - Homepage with name (Mykal Yadave) and welcome message
- ✅ `journal.html` - Weekly journal entries page
- ✅ `about.html` - Personal profile page
- ✅ `projects.html` - Showcase work page

### Navigation Bar
- ✅ Navigation bar present on all four pages
- ✅ Links to all pages (Home, Journal, Projects, About)
- ✅ Active page highlighting with CSS class
- ✅ Consistent layout across all pages

### CSS Styling
- ✅ Central `style.css` file linked to all pages
- ✅ **Mobile-first design** - Base styles for mobile, enhanced for larger screens
- ✅ **Media queries** for responsiveness:
  - Tablet: `@media (min-width: 768px)`
  - Desktop: `@media (min-width: 1024px)`
- ✅ **Flexbox and Grid** used for layout:
  - Grid for feature cards, entries, projects
  - Flexbox for navigation, profile section, stats
- ✅ Colors, fonts, and spacing applied consistently
- ✅ Active page highlighting in navigation
- ✅ Visual hierarchy with headings and styling

### Homepage Content
- ✅ Name displayed: "Mykal Yadave"
- ✅ Welcome message: "Welcome to My Learning Journal"
- ✅ Brief statement about the site's purpose
- ✅ Student ID: 2321764
- ✅ Profile section with personal information

### Design Features
- ✅ Responsive navigation that adapts to screen size
- ✅ Modern, professional UI with glassmorphism effects
- ✅ Consistent color scheme and typography
- ✅ Mobile-first approach with progressive enhancement

## Lab 2 Journal Questions (For myUCA Submission)

### 1. How did you approach mobile-first design?
**Answer:**
I approached mobile-first design by starting with the smallest screen size (mobile) as the base, then using media queries to enhance the layout for larger screens. The CSS uses:
- Base styles optimized for mobile (single column layouts, touch-friendly buttons)
- `@media (min-width: 768px)` for tablet - 2-column grids
- `@media (min-width: 1024px)` for desktop - 3-column grids and enhanced spacing

This ensures the site works perfectly on mobile devices first, then progressively enhances for larger screens.

### 2. What was the most useful HTML or CSS concept you applied this week?
**Answer:**
The most useful concepts were:
- **CSS Grid and Flexbox** for creating responsive layouts that adapt to different screen sizes
- **CSS Variables** for maintaining consistent colors and spacing across the site
- **Media queries** for implementing true mobile-first responsive design
- **Semantic HTML** for better structure and accessibility

### 3. What part of HTML or CSS did you find most challenging or confusing?
**Answer:**
The most challenging aspects were:
- Understanding when to use Grid vs Flexbox for different layout scenarios
- Getting the navigation to work consistently across all pages while maintaining the same structure
- Ensuring proper responsive breakpoints that work across different device sizes
- Balancing modern design aesthetics with clean, maintainable code

## Technical Implementation

### Mobile-First Approach
- Base styles target mobile devices (320px+)
- Single column layouts for mobile
- Touch-friendly button sizes (minimum 44x44px)
- Readable font sizes without zooming

### Responsive Breakpoints
```css
/* Mobile: Base styles (default) */
/* Tablet: @media (min-width: 768px) */
/* Desktop: @media (min-width: 1024px) */
```

### Layout Methods Used
- **CSS Grid**: Feature cards, entries container, projects grid
- **Flexbox**: Navigation, profile section, stats grid, badges
- **Positioning**: Sticky navigation, absolute positioning for decorative elements

### Color Scheme
- Primary: Indigo (#6366f1)
- Secondary: Emerald (#10b981)
- Accent: Amber (#f59e0b)
- Text: Dark slate (#1e293b) / Light (#f1f5f9) for dark mode

---

**Student:** Mykal Yadave  
**Student ID:** 2321764  
**Module:** FGCT6021 Mobile Application Development  
**Lab:** Lab 2 - Frontend Fundamentals

