// ===================================
// Theological Study Application
// ===================================

class TheologicalStudyApp {
    constructor() {
        this.currentPassage = null;
        this.notes = [];
        this.bookmarks = [];
        this.collections = [];
        this.darkMode = false;

        this.init();
    }

    // ===================================
    // Initialization
    // ===================================

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.initializeDarkMode();
        this.renderNotes();
        this.renderBookmarks();
        this.updateTagFilter();
    }

    // ===================================
    // Local Storage Management
    // ===================================

    loadFromStorage() {
        try {
            this.notes = JSON.parse(localStorage.getItem('theologicalNotes')) || [];
            this.bookmarks = JSON.parse(localStorage.getItem('theologicalBookmarks')) || [];
            this.collections = JSON.parse(localStorage.getItem('theologicalCollections')) || [];
            this.darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
            this.currentPassage = JSON.parse(localStorage.getItem('currentPassage')) || null;
        } catch (error) {
            console.error('Error loading from storage:', error);
            this.showNotification('Error loading saved data', 'error');
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('theologicalNotes', JSON.stringify(this.notes));
            localStorage.setItem('theologicalBookmarks', JSON.stringify(this.bookmarks));
            localStorage.setItem('theologicalCollections', JSON.stringify(this.collections));
            localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
            localStorage.setItem('currentPassage', JSON.stringify(this.currentPassage));
        } catch (error) {
            console.error('Error saving to storage:', error);
            this.showNotification('Error saving data', 'error');
        }
    }

    // ===================================
    // Event Listeners
    // ===================================

    setupEventListeners() {
        // Dark Mode Toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => this.toggleDarkMode());

        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Passage Navigation
        document.getElementById('searchBtn').addEventListener('click', () => this.searchPassage());
        document.getElementById('passageSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchPassage();
        });
        document.getElementById('quickNavBtn').addEventListener('click', () => this.quickNavigate());

        // Bookmark current passage
        document.getElementById('bookmarkPassageBtn').addEventListener('click', () => this.bookmarkCurrentPassage());

        // Chapter Navigation
        document.getElementById('prevChapterBtn')?.addEventListener('click', () => this.navigateChapter(-1));
        document.getElementById('nextChapterBtn')?.addEventListener('click', () => this.navigateChapter(1));

        // Notes
        document.getElementById('saveNoteBtn').addEventListener('click', () => this.saveNote());
        document.getElementById('clearNoteBtn').addEventListener('click', () => this.clearNoteForm());
        document.getElementById('notesSearchInput').addEventListener('input', (e) => this.searchNotes(e.target.value));
        document.getElementById('tagFilter').addEventListener('change', (e) => this.filterNotesByTag(e.target.value));
        document.getElementById('exportNotesBtn').addEventListener('click', () => this.exportNotes());
        document.getElementById('importNotesBtn').addEventListener('click', () => document.getElementById('importNotesFile').click());
        document.getElementById('importNotesFile').addEventListener('change', (e) => this.importNotes(e));

        // Collections
        document.getElementById('createCollectionBtn').addEventListener('click', () => this.showCollectionModal());
        document.getElementById('saveCollectionBtn').addEventListener('click', () => this.saveCollection());

        // Modal Close
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Click outside modal to close
        document.getElementById('collectionModal').addEventListener('click', (e) => {
            if (e.target.id === 'collectionModal') this.closeModal();
        });
    }

    // ===================================
    // Dark Mode
    // ===================================

    initializeDarkMode() {
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark-mode');
        this.saveToStorage();
    }

    // ===================================
    // Tab Navigation
    // ===================================

    switchTab(tabName) {
        // Remove active class from all tabs and sections
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));

        // Add active class to selected tab and section
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    // ===================================
    // Passage Navigation
    // ===================================

    searchPassage() {
        const searchTerm = document.getElementById('passageSearch').value.trim();
        if (!searchTerm) return;

        const parsed = this.parsePassageReference(searchTerm);
        if (parsed) {
            this.loadPassage(parsed);
        } else {
            this.showNotification('Invalid passage format. Try "John 3:16" or "Romans 8:28-30"', 'warning');
        }
    }

    quickNavigate() {
        const book = document.getElementById('bookSelect').value;
        const chapter = document.getElementById('chapterInput').value;
        const verse = document.getElementById('verseInput').value;

        if (!book) {
            this.showNotification('Please select a book', 'warning');
            return;
        }

        const reference = {
            book: book,
            chapter: parseInt(chapter) || 1,
            verse: parseInt(verse) || null
        };

        this.loadPassage(reference);
    }

    parsePassageReference(text) {
        // Simple parser for references like "John 3:16" or "Romans 8:28-30"
        const pattern = /^(\d?\s?[A-Za-z]+)\s+(\d+)(?::(\d+))?(?:-(\d+))?$/;
        const match = text.match(pattern);

        if (!match) return null;

        return {
            book: this.normalizeBookName(match[1].trim()),
            chapter: parseInt(match[2]),
            verse: match[3] ? parseInt(match[3]) : null,
            verseEnd: match[4] ? parseInt(match[4]) : null
        };
    }

    normalizeBookName(name) {
        // Convert book name to lowercase format matching our select options
        return name.toLowerCase().replace(/\s+/g, '');
    }

    loadPassage(reference) {
        this.currentPassage = reference;
        this.saveToStorage();

        // Update UI
        const bookName = this.getDisplayBookName(reference.book);
        let title = `${bookName} ${reference.chapter}`;
        if (reference.verse) {
            title += `:${reference.verse}`;
            if (reference.verseEnd) {
                title += `-${reference.verseEnd}`;
            }
        }

        document.getElementById('passageTitle').textContent = title;

        // Placeholder for actual Bible text
        // In production, this would fetch from a Bible API or local database
        document.getElementById('passageText').innerHTML = this.getPlaceholderText(reference);

        // Show chapter navigation
        document.getElementById('chapterNav').classList.remove('hidden');

        // Auto-populate note reference field
        document.getElementById('noteReference').value = title;
    }

    getDisplayBookName(bookKey) {
        // Convert from key format to display format
        const bookMap = {
            'genesis': 'Genesis',
            'exodus': 'Exodus',
            'john': 'John',
            'romans': 'Romans',
            'matthew': 'Matthew',
            // Add more as needed
        };
        return bookMap[bookKey] || bookKey.charAt(0).toUpperCase() + bookKey.slice(1);
    }

    getPlaceholderText(reference) {
        return `
            <div class="placeholder-message">
                <p><strong>Passage loaded: ${this.getDisplayBookName(reference.book)} ${reference.chapter}${reference.verse ? ':' + reference.verse : ''}</strong></p>
                <p class="text-muted">Bible text will appear here once you add Bible data to the application.</p>
                <p class="text-muted">The application is ready to display verses with proper formatting and verse numbers.</p>
                <div class="info-box" style="margin-top: 2rem; text-align: left;">
                    <h4>To add Bible text:</h4>
                    <ul style="list-style-position: inside;">
                        <li>Option 1: Integrate with a Bible API (e.g., ESV API, Bible Gateway)</li>
                        <li>Option 2: Load a local Bible JSON file</li>
                        <li>Option 3: Use IndexedDB for offline Bible storage</li>
                    </ul>
                    <p style="margin-top: 1rem;">The data structure is ready to receive and display Bible text.</p>
                </div>
            </div>
        `;
    }

    navigateChapter(direction) {
        if (!this.currentPassage) return;

        const newChapter = this.currentPassage.chapter + direction;
        if (newChapter < 1) return;

        this.loadPassage({
            book: this.currentPassage.book,
            chapter: newChapter,
            verse: null
        });
    }

    bookmarkCurrentPassage() {
        if (!this.currentPassage) {
            this.showNotification('No passage selected to bookmark', 'warning');
            return;
        }

        const bookName = this.getDisplayBookName(this.currentPassage.book);
        const reference = `${bookName} ${this.currentPassage.chapter}${this.currentPassage.verse ? ':' + this.currentPassage.verse : ''}`;

        // Check if already bookmarked
        const exists = this.bookmarks.some(b => b.reference === reference);
        if (exists) {
            this.showNotification('Passage already bookmarked', 'warning');
            return;
        }

        const bookmark = {
            id: Date.now(),
            reference: reference,
            passage: this.currentPassage,
            preview: 'Bible text preview will appear here',
            createdAt: new Date().toISOString()
        };

        this.bookmarks.unshift(bookmark);
        this.saveToStorage();
        this.renderBookmarks();
        this.showNotification('Passage bookmarked successfully', 'success');
    }

    // ===================================
    // Notes Management
    // ===================================

    saveNote() {
        const reference = document.getElementById('noteReference').value.trim();
        const tags = document.getElementById('noteTags').value.trim();
        const content = document.getElementById('noteContent').value.trim();

        if (!reference || !content) {
            this.showNotification('Reference and note content are required', 'warning');
            return;
        }

        const note = {
            id: Date.now(),
            reference: reference,
            tags: tags ? tags.split(',').map(t => t.trim()) : [],
            content: content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.unshift(note);
        this.saveToStorage();
        this.renderNotes();
        this.updateTagFilter();
        this.clearNoteForm();
        this.showNotification('Note saved successfully', 'success');
    }

    clearNoteForm() {
        document.getElementById('noteReference').value = '';
        document.getElementById('noteTags').value = '';
        document.getElementById('noteContent').value = '';
    }

    renderNotes(filteredNotes = null) {
        const notesContainer = document.getElementById('notesList');
        const notesToRender = filteredNotes || this.notes;

        if (notesToRender.length === 0) {
            notesContainer.innerHTML = '<div class="placeholder-message"><p>No notes found.</p></div>';
            return;
        }

        notesContainer.innerHTML = notesToRender.map(note => `
            <div class="note-item" data-note-id="${note.id}">
                <div class="note-header">
                    <div class="note-reference">${this.escapeHtml(note.reference)}</div>
                    <div class="note-actions">
                        <button class="icon-btn" onclick="app.editNote(${note.id})" title="Edit note">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="icon-btn" onclick="app.deleteNote(${note.id})" title="Delete note">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                ${note.tags.length > 0 ? `
                    <div class="note-tags">
                        ${note.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="note-content">${this.escapeHtml(note.content)}</div>
                <div class="note-meta">
                    Created: ${new Date(note.createdAt).toLocaleDateString()} at ${new Date(note.createdAt).toLocaleTimeString()}
                </div>
            </div>
        `).join('');
    }

    editNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (!note) return;

        document.getElementById('noteReference').value = note.reference;
        document.getElementById('noteTags').value = note.tags.join(', ');
        document.getElementById('noteContent').value = note.content;

        // Delete the old note (will be replaced when saved)
        this.deleteNote(noteId, false);

        // Scroll to editor
        document.querySelector('.note-editor').scrollIntoView({ behavior: 'smooth' });
    }

    deleteNote(noteId, confirm = true) {
        if (confirm && !window.confirm('Are you sure you want to delete this note?')) {
            return;
        }

        this.notes = this.notes.filter(n => n.id !== noteId);
        this.saveToStorage();
        this.renderNotes();
        this.updateTagFilter();
        if (confirm) {
            this.showNotification('Note deleted', 'success');
        }
    }

    searchNotes(query) {
        if (!query.trim()) {
            this.renderNotes();
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = this.notes.filter(note =>
            note.reference.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery) ||
            note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );

        this.renderNotes(filtered);
    }

    filterNotesByTag(tag) {
        if (!tag) {
            this.renderNotes();
            return;
        }

        const filtered = this.notes.filter(note =>
            note.tags.includes(tag)
        );

        this.renderNotes(filtered);
    }

    updateTagFilter() {
        const tagFilter = document.getElementById('tagFilter');
        const allTags = new Set();

        this.notes.forEach(note => {
            note.tags.forEach(tag => allTags.add(tag));
        });

        const sortedTags = Array.from(allTags).sort();

        tagFilter.innerHTML = '<option value="">All Tags</option>' +
            sortedTags.map(tag => `<option value="${this.escapeHtml(tag)}">${this.escapeHtml(tag)}</option>`).join('');
    }

    exportNotes() {
        if (this.notes.length === 0) {
            this.showNotification('No notes to export', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.notes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `theological-notes-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification('Notes exported successfully', 'success');
    }

    importNotes(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (!Array.isArray(imported)) {
                    throw new Error('Invalid format');
                }

                // Merge with existing notes (avoiding duplicates by ID)
                const existingIds = new Set(this.notes.map(n => n.id));
                const newNotes = imported.filter(n => !existingIds.has(n.id));

                this.notes = [...newNotes, ...this.notes];
                this.saveToStorage();
                this.renderNotes();
                this.updateTagFilter();

                this.showNotification(`Imported ${newNotes.length} notes`, 'success');
            } catch (error) {
                this.showNotification('Error importing notes. Check file format.', 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);

        // Reset file input
        event.target.value = '';
    }

    // ===================================
    // Bookmarks & Collections
    // ===================================

    renderBookmarks() {
        const container = document.getElementById('allBookmarksList');

        if (this.bookmarks.length === 0) {
            container.innerHTML = '<div class="placeholder-message"><p>No bookmarks yet. Bookmark passages from the Passage tab.</p></div>';
            return;
        }

        container.innerHTML = this.bookmarks.map(bookmark => `
            <div class="bookmark-item" onclick="app.loadBookmark(${bookmark.id})">
                <div>
                    <div class="bookmark-reference">${this.escapeHtml(bookmark.reference)}</div>
                    <div class="bookmark-preview">${this.escapeHtml(bookmark.preview)}</div>
                </div>
                <div class="bookmark-actions">
                    <button class="icon-btn" onclick="event.stopPropagation(); app.deleteBookmark(${bookmark.id})" title="Delete bookmark">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadBookmark(bookmarkId) {
        const bookmark = this.bookmarks.find(b => b.id === bookmarkId);
        if (!bookmark) return;

        this.loadPassage(bookmark.passage);
        this.switchTab('passage');
    }

    deleteBookmark(bookmarkId) {
        if (!window.confirm('Remove this bookmark?')) return;

        this.bookmarks = this.bookmarks.filter(b => b.id !== bookmarkId);
        this.saveToStorage();
        this.renderBookmarks();
        this.showNotification('Bookmark removed', 'success');
    }

    showCollectionModal() {
        document.getElementById('collectionModal').classList.remove('hidden');
        document.getElementById('collectionName').value = '';
        document.getElementById('collectionDescription').value = '';
    }

    closeModal() {
        document.getElementById('collectionModal').classList.add('hidden');
    }

    saveCollection() {
        const name = document.getElementById('collectionName').value.trim();
        const description = document.getElementById('collectionDescription').value.trim();

        if (!name) {
            this.showNotification('Collection name is required', 'warning');
            return;
        }

        const collection = {
            id: Date.now(),
            name: name,
            description: description,
            bookmarks: [],
            createdAt: new Date().toISOString()
        };

        this.collections.push(collection);
        this.saveToStorage();
        this.renderCollections();
        this.closeModal();
        this.showNotification('Collection created', 'success');
    }

    renderCollections() {
        // This would render custom collections
        // Simplified for MVP - can be expanded later
        console.log('Collections:', this.collections);
    }

    // ===================================
    // Utility Functions
    // ===================================

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Simple console notification for MVP
        // Could be enhanced with toast notifications later
        console.log(`[${type.toUpperCase()}] ${message}`);

        // Show alert for important messages
        if (type === 'error' || type === 'warning') {
            // Use a more subtle approach than alert for production
            console.warn(message);
        }
    }
}

// ===================================
// Initialize Application
// ===================================

let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new TheologicalStudyApp();
    console.log('Theological Study App initialized');
});
