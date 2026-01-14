# Theological Study Web Application

A personal Bible study application focused on Reformed theology with comparative perspectives from Patristic, Catholic, Orthodox, and Mainline Protestant traditions.

## Overview

This is a lightweight, offline-capable web application designed for deep theological study and research. Built with pure HTML, CSS, and JavaScript, it runs entirely in the browser with all data stored locally.

### Key Features

- **Passage Navigation**: Search and browse Bible passages with quick jump navigation
- **Personal Notes**: Take detailed notes linked to specific passages with tagging
- **Bookmarks**: Save and organize favorite passages into collections
- **Commentary System**: Ready to integrate theological commentary from multiple traditions
- **Dark Mode**: Eye-friendly reading for extended study sessions
- **Offline-First**: Works completely offline after initial load
- **Mobile-Optimized**: Designed for iOS (iPhone and iPad) with responsive layouts

## Quick Start

### Installation

1. Clone or download this repository
2. Open `index.html` in a web browser (Safari, Chrome, Firefox, etc.)
3. Start studying!

### For iOS Devices (Recommended)

1. Open `index.html` in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will now work like a native application

## Project Structure

```
bible-study-app-or-theological-research-tool/
├── index.html          # Main application structure
├── styles.css          # Comprehensive styling with dark mode
├── app.js              # Core application logic
└── README.md           # This file
```

## Usage Guide

### Searching for Passages

**Text Search:**
- Enter a reference like "John 3:16" or "Romans 8:28-30"
- Click "Go" or press Enter

**Quick Navigation:**
1. Select a book from the dropdown
2. Enter chapter number (and optionally verse)
3. Click "Jump"

### Taking Notes

1. Navigate to the "Notes" tab
2. Enter passage reference (auto-populated if viewing a passage)
3. Add tags for organization (comma-separated: justification, grace, soteriology)
4. Write your theological insights
5. Click "Save Note"

**Note Features:**
- Full-text search across all notes
- Filter by tags
- Edit or delete existing notes
- Export/import for backup

### Bookmarking Passages

1. Navigate to any passage
2. Click the bookmark icon in the passage header
3. Access bookmarks from the "Bookmarks" tab
4. Create collections to organize bookmarks by theme

### Using Commentary

1. Navigate to the "Commentary" tab
2. Filter by theological tradition:
   - **Reformed**: Scholastics and dogmatics
   - **Patristic**: Church fathers
   - **Catholic**: Roman Catholic theology
   - **Orthodox**: Eastern Orthodox theology
   - **Mainline Protestant**: Conservative mainline scholars
3. Commentary will appear when data is added (see below)

### Dark Mode

Click the moon icon in the header to toggle dark mode. Your preference is saved automatically.

## Data Architecture

### Current State (MVP)

The application is fully functional with placeholder data structures ready to receive:
- Bible text (any translation)
- Theological commentary
- Cross-references

### Adding Bible Text

You have several options to integrate Bible data:

#### Option 1: Bible API Integration

Integrate with a Bible API service:

```javascript
// Example: ESV API
async function fetchPassage(reference) {
    const response = await fetch(`https://api.esv.org/v3/passage/text/?q=${reference}`, {
        headers: {
            'Authorization': 'Token YOUR_API_KEY'
        }
    });
    const data = await response.json();
    return data.passages[0];
}
```

Recommended APIs:
- ESV API (https://api.esv.org/)
- Bible.com API
- Bible Gateway API

#### Option 2: Local JSON File

Create a `bible.json` file with structure:

```json
{
    "genesis": {
        "1": {
            "1": "In the beginning, God created the heavens and the earth.",
            "2": "The earth was without form and void..."
        }
    }
}
```

Load in `app.js`:

```javascript
async loadBibleData() {
    const response = await fetch('bible.json');
    this.bibleData = await response.json();
}
```

#### Option 3: IndexedDB for Offline Storage

For large Bible datasets, use IndexedDB:

```javascript
// Store Bible data in IndexedDB for offline access
const db = await idb.openDB('TheologicalStudy', 1, {
    upgrade(db) {
        db.createObjectStore('bible', { keyPath: 'id' });
        db.createObjectStore('commentary', { keyPath: 'id' });
    }
});
```

### Adding Commentary

Commentary should follow this structure:

```javascript
{
    id: unique_id,
    reference: "Romans 8:28",
    tradition: "reformed", // or patristic, catholic, orthodox, mainline
    author: "John Calvin",
    source: "Commentary on Romans",
    text: "Full commentary text here...",
    year: 1540
}
```

Store in localStorage or IndexedDB alongside notes.

## Technical Specifications

### Browser Compatibility

- Safari 14+ (iOS 14+)
- Chrome 90+
- Firefox 88+
- Edge 90+

### Storage

- **localStorage**: Used for notes, bookmarks, collections, and preferences
- **Storage Limit**: ~5-10MB depending on browser
- **Future**: Can migrate to IndexedDB for larger datasets

### Performance

- Minimal bundle size (no frameworks)
- Instant loading
- Efficient search with client-side filtering
- Optimized for mobile devices

### Mobile Optimization

- Touch-optimized controls
- Viewport meta tags for iOS
- Safe area support for notched devices
- Prevents zoom on input focus
- Smooth scrolling with momentum

## Customization

### Typography

Edit CSS variables in `styles.css`:

```css
:root {
    --font-serif: 'Your Preferred Font', serif;
    --font-sans: 'Your Preferred Font', sans-serif;
}
```

### Color Scheme

Customize light/dark mode colors:

```css
:root {
    --accent-primary: #0071e3;  /* Your brand color */
    --bg-primary: #ffffff;
    /* ... */
}

body.dark-mode {
    --accent-primary: #0a84ff;
    --bg-primary: #000000;
    /* ... */
}
```

### Book List

Add or remove books in `index.html` in the `<select id="bookSelect">` element.

## Data Management

### Export Notes

1. Go to "Notes" tab
2. Click "Export All Notes"
3. Save the JSON file to a safe location

### Import Notes

1. Click "Import Notes"
2. Select your previously exported JSON file
3. Notes will be merged with existing notes

### Backup Strategy

**Recommended:**
- Export notes weekly
- Save to cloud storage (iCloud, Dropbox, etc.)
- Keep multiple backup copies

## Theological Framework

### Primary Focus: Reformed Tradition

The application is designed with a Reformed Protestant foundation, emphasizing:
- Sola Scriptura
- Covenant theology
- Reformed scholasticism and dogmatics
- Historical Reformed theologians

### Comparative Sources

- **Patristic**: Early church fathers (Augustine, Chrysostom, etc.)
- **Catholic**: Roman Catholic theological perspectives
- **Orthodox**: Eastern Orthodox tradition
- **Mainline Protestant**: Conservative mainline scholars

### Question-Based Exploration

The app supports comparative theological study:
- "What do different traditions say about justification?"
- "How do Reformed and Catholic views on sacraments differ?"
- "What did the church fathers teach about Trinity?"

## Roadmap

### Phase 1 (Current - MVP)
- ✅ Core navigation and UI
- ✅ Note-taking with tags
- ✅ Bookmark system
- ✅ Dark mode
- ✅ Commentary structure
- ✅ Mobile-responsive design

### Phase 2 (Future)
- [ ] Bible text integration (API or local)
- [ ] Commentary content from multiple sources
- [ ] Advanced search (topics, original languages)
- [ ] Cross-references
- [ ] Reading plans
- [ ] Study collections with notes

### Phase 3 (Advanced)
- [ ] Multiple Bible translations
- [ ] Greek/Hebrew word study tools
- [ ] Parallel passage comparison
- [ ] PDF export of study notes
- [ ] Sync across devices
- [ ] Collaborative study features

## Development

### Making Changes

1. **HTML** (`index.html`): Structure and content
2. **CSS** (`styles.css`): Styling and responsive design
3. **JavaScript** (`app.js`): Application logic and interactivity

### Testing

Open the browser console (F12) to see:
- Application initialization messages
- Error logs
- Data storage operations

### Debugging

```javascript
// In browser console:
app.notes          // View all notes
app.bookmarks      // View all bookmarks
app.currentPassage // View current passage
localStorage       // View all stored data
```

## Privacy & Security

- **All data stored locally** - nothing sent to external servers
- **No tracking or analytics**
- **No external dependencies** (except if you add Bible APIs)
- **Export your data anytime** - you own your notes

## Browser Storage Limits

Different browsers have different localStorage limits:
- Safari: ~5MB
- Chrome: ~10MB
- Firefox: ~10MB

For larger datasets (full Bible + commentary):
- Consider IndexedDB (no practical limit)
- Or keep Bible/commentary separate from personal notes

## Troubleshooting

### Notes not saving
- Check browser console for errors
- Verify localStorage is enabled
- Check storage quota (browser settings)

### Dark mode not persisting
- Ensure localStorage is not disabled
- Try clearing cache and refreshing

### Passage search not working
- Verify reference format: "Book Chapter:Verse"
- Use book names from the dropdown
- Bible text needs to be added (see "Adding Bible Text")

### App not working offline
- Ensure all files are in the same directory
- For true offline, consider using a Service Worker

## Contributing

This is a personal study tool, but you can:
1. Fork the repository
2. Make improvements
3. Share your enhancements

## License

Free to use for personal theological study and research.

## Support

For issues or questions:
- Check the troubleshooting section
- Review browser console for errors
- Consult the inline code comments

## Credits

Built for deep theological study with a focus on:
- Reformed Protestant theology
- Comparative tradition analysis
- Personal research and note-taking
- Mobile-first Bible study

---

**Soli Deo Gloria**
