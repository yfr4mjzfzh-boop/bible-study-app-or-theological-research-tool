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
        this.bibleCache = {}; // Cache API responses
        this.selectedTranslation = 'kjv'; // Default translation
        this.commentaries = []; // Commentary database
        this.enabledTraditions = ['reformed', 'patristic']; // Default traditions
        this.currentView = 'bible'; // 'bible' or 'commentary'

        // API Keys (get free keys at respective websites)
        this.esvApiKey = '948f99e1f43d00f0d3fef28825fb24022c09a127'; // ESV: https://api.esv.org/
        this.apiBibleKey = ''; // API.Bible: https://scripture.api.bible/ (for future use)

        // Keyword-to-Scripture mapping for quick theological topic search
        this.keywordMap = {
            // Salvation & Gospel
            'salvation': ['John 3:16', 'Romans 10:9-10', 'Ephesians 2:8-9', 'Acts 4:12'],
            'gospel': ['1 Corinthians 15:1-4', 'Romans 1:16', 'Mark 1:15'],
            'grace': ['Ephesians 2:8-9', 'Romans 3:23-24', 'Titus 2:11', '2 Corinthians 12:9'],
            'faith': ['Hebrews 11:1', 'Romans 1:17', 'Ephesians 2:8', 'James 2:17'],
            'justification': ['Romans 5:1', 'Romans 3:28', 'Galatians 2:16'],
            'sanctification': ['1 Thessalonians 4:3', 'Hebrews 12:14', '2 Thessalonians 2:13'],
            'glorification': ['Romans 8:30', 'Philippians 3:21', '1 Corinthians 15:42-44'],
            'redemption': ['Ephesians 1:7', 'Colossians 1:14', 'Romans 3:24', 'Hebrews 9:12'],

            // God's Attributes
            'love': ['1 John 4:8', 'John 3:16', 'Romans 5:8', '1 Corinthians 13:4-7'],
            'holiness': ['Leviticus 19:2', '1 Peter 1:15-16', 'Isaiah 6:3', 'Revelation 4:8'],
            'sovereignty': ['Psalm 115:3', 'Daniel 4:35', 'Romans 9:20-21', 'Ephesians 1:11'],
            'omnipotence': ['Jeremiah 32:17', 'Matthew 19:26', 'Job 42:2'],
            'omniscience': ['Psalm 139:1-6', '1 John 3:20', 'Hebrews 4:13'],
            'omnipresence': ['Psalm 139:7-10', 'Jeremiah 23:24'],
            'justice': ['Deuteronomy 32:4', 'Psalm 89:14', 'Isaiah 30:18'],
            'mercy': ['Psalm 103:8-12', 'Ephesians 2:4-5', 'Lamentations 3:22-23'],

            // Trinity
            'trinity': ['Matthew 28:19', '2 Corinthians 13:14', '1 Peter 1:2', 'John 14:16-17'],
            'father': ['Matthew 6:9', 'John 14:6', 'Romans 8:15'],
            'son': ['John 1:1', 'Colossians 1:15-20', 'Hebrews 1:1-3', 'Philippians 2:5-11'],
            'holy spirit': ['John 14:26', 'Acts 1:8', 'Romans 8:26', 'Galatians 5:22-23'],
            'spirit': ['John 14:26', 'Acts 1:8', 'Romans 8:26', 'Galatians 5:22-23'],

            // Jesus Christ
            'incarnation': ['John 1:14', 'Philippians 2:6-8', '1 Timothy 3:16', 'Hebrews 2:14'],
            'resurrection': ['1 Corinthians 15:3-4', 'Romans 6:9', 'Matthew 28:5-6', 'Acts 2:24'],
            'atonement': ['Romans 3:25', '1 John 2:2', 'Hebrews 2:17', 'Isaiah 53:5-6'],
            'cross': ['1 Corinthians 1:18', 'Galatians 6:14', 'Colossians 2:14', 'Hebrews 12:2'],
            'blood': ['Hebrews 9:22', '1 Peter 1:18-19', 'Revelation 1:5', 'Ephesians 1:7'],
            'sacrifice': ['Hebrews 10:10', 'Ephesians 5:2', '1 Corinthians 5:7'],

            // Christian Life
            'prayer': ['Matthew 6:9-13', 'Philippians 4:6', '1 Thessalonians 5:17', 'James 5:16'],
            'worship': ['John 4:23-24', 'Psalm 95:6', 'Romans 12:1', 'Revelation 4:11'],
            'obedience': ['John 14:15', '1 Samuel 15:22', 'James 1:22', 'Luke 6:46'],
            'repentance': ['Acts 3:19', '2 Corinthians 7:10', 'Luke 13:3', '1 John 1:9'],
            'forgiveness': ['Ephesians 4:32', 'Colossians 3:13', '1 John 1:9', 'Matthew 6:14'],
            'peace': ['John 14:27', 'Philippians 4:7', 'Romans 5:1', 'Isaiah 26:3'],
            'joy': ['Nehemiah 8:10', 'Philippians 4:4', 'John 15:11', 'Romans 15:13'],
            'hope': ['Romans 15:13', 'Hebrews 6:19', '1 Peter 1:3', 'Jeremiah 29:11'],

            // Fruit of the Spirit
            'fruit': ['Galatians 5:22-23', 'John 15:5', 'Colossians 1:10'],
            'patience': ['Romans 12:12', 'James 5:7-8', 'Galatians 5:22'],
            'kindness': ['Ephesians 4:32', 'Colossians 3:12', 'Galatians 5:22'],
            'goodness': ['Psalm 34:8', 'Romans 15:14', 'Galatians 5:22'],
            'gentleness': ['Philippians 4:5', '1 Peter 3:15', 'Galatians 5:22'],
            'self-control': ['Proverbs 25:28', '1 Corinthians 9:25', 'Galatians 5:22'],

            // Sin & Temptation
            'sin': ['Romans 3:23', 'Romans 6:23', '1 John 1:8-10', 'James 1:15'],
            'temptation': ['1 Corinthians 10:13', 'James 1:13-14', 'Matthew 26:41', 'Hebrews 4:15'],
            'flesh': ['Galatians 5:16-17', 'Romans 8:5-8', '1 John 2:16'],
            'pride': ['Proverbs 16:18', 'James 4:6', '1 Peter 5:5', 'Proverbs 11:2'],
            'idolatry': ['Exodus 20:3-4', '1 Corinthians 10:14', 'Colossians 3:5'],

            // Spiritual Warfare
            'armor': ['Ephesians 6:10-18', '1 Thessalonians 5:8', 'Romans 13:12'],
            'devil': ['1 Peter 5:8', 'James 4:7', 'Ephesians 6:11', 'John 8:44'],
            'satan': ['1 Peter 5:8', 'James 4:7', 'Ephesians 6:11', 'Revelation 12:9'],
            'spiritual warfare': ['Ephesians 6:12', '2 Corinthians 10:4', '1 Timothy 6:12'],

            // End Times
            'second coming': ['Acts 1:11', '1 Thessalonians 4:16-17', 'Revelation 1:7', 'Matthew 24:30'],
            'heaven': ['John 14:2-3', 'Revelation 21:1-4', 'Philippians 3:20', '2 Corinthians 5:1'],
            'hell': ['Matthew 25:46', 'Revelation 20:15', '2 Thessalonians 1:9', 'Matthew 13:42'],
            'judgment': ['Hebrews 9:27', '2 Corinthians 5:10', 'Romans 14:10', 'Revelation 20:12'],
            'eternal life': ['John 3:16', 'John 10:28', '1 John 5:11-13', 'Romans 6:23'],

            // Church & Community
            'church': ['Matthew 16:18', 'Ephesians 5:25', 'Acts 2:42', '1 Corinthians 12:27'],
            'unity': ['John 17:21', 'Ephesians 4:3', 'Psalm 133:1', '1 Corinthians 1:10'],
            'fellowship': ['1 John 1:7', 'Acts 2:42', 'Hebrews 10:25', 'Philippians 2:1'],
            'baptism': ['Matthew 28:19', 'Romans 6:3-4', 'Acts 2:38', 'Galatians 3:27'],
            'communion': ['1 Corinthians 11:23-26', 'Luke 22:19-20', 'Acts 2:42'],

            // Wisdom & Knowledge
            'wisdom': ['Proverbs 9:10', 'James 1:5', 'Proverbs 3:5-6', 'Colossians 2:3'],
            'knowledge': ['Proverbs 1:7', 'Hosea 4:6', 'Philippians 3:8', '2 Peter 3:18'],
            'truth': ['John 8:32', 'John 14:6', 'Psalm 119:160', 'Ephesians 4:15'],
            'word': ['Psalm 119:105', '2 Timothy 3:16-17', 'Hebrews 4:12', 'Matthew 4:4'],
            'scripture': ['2 Timothy 3:16-17', 'Psalm 119:105', 'Hebrews 4:12', '2 Peter 1:20-21'],

            // Discipleship & Service
            'disciple': ['Matthew 28:19-20', 'Luke 14:27', 'John 8:31', '2 Timothy 2:2'],
            'servant': ['Mark 10:45', 'Philippians 2:7', 'Galatians 5:13', 'Matthew 20:26-28'],
            'mission': ['Matthew 28:18-20', 'Acts 1:8', 'Romans 10:14-15', 'Mark 16:15'],
            'witness': ['Acts 1:8', '1 Peter 3:15', 'Matthew 5:16', 'Acts 4:20'],

            // Relationships
            'marriage': ['Genesis 2:24', 'Ephesians 5:22-33', 'Hebrews 13:4', '1 Corinthians 7:3-5'],
            'family': ['Ephesians 6:1-4', 'Joshua 24:15', 'Psalm 127:3', 'Proverbs 22:6'],
            'children': ['Psalm 127:3', 'Ephesians 6:1-4', 'Proverbs 22:6', 'Mark 10:14'],
            'parents': ['Exodus 20:12', 'Ephesians 6:1-3', 'Colossians 3:20', 'Proverbs 1:8'],
            'neighbor': ['Matthew 22:39', 'Luke 10:27', 'Romans 13:9', 'Leviticus 19:18'],

            // Spiritual Gifts
            'gifts': ['1 Corinthians 12:4-11', 'Romans 12:6-8', 'Ephesians 4:11-13', '1 Peter 4:10'],
            'tongues': ['1 Corinthians 14:2', 'Acts 2:4', '1 Corinthians 12:10', '1 Corinthians 14:27'],
            'prophecy': ['1 Corinthians 14:1', 'Romans 12:6', '1 Thessalonians 5:20', 'Joel 2:28'],

            // Promises & Covenants
            'promise': ['2 Peter 1:4', 'Hebrews 10:23', '2 Corinthians 1:20', 'Romans 4:21'],
            'covenant': ['Genesis 9:11-17', 'Jeremiah 31:31-34', 'Hebrews 8:6-13', 'Luke 22:20'],
            'blessing': ['Numbers 6:24-26', 'Ephesians 1:3', 'Genesis 12:2', 'Psalm 67:1']
        };

        this.init();
    }

    // ===================================
    // Initialization
    // ===================================

    init() {
        this.loadFromStorage();
        this.loadCommentaryDatabase();
        this.setupEventListeners();
        this.initializeDarkMode();
        this.renderNotes();
        this.renderBookmarks();
        this.updateTagFilter();
        this.setupTraditionFilters();
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
            this.selectedTranslation = localStorage.getItem('selectedTranslation') || 'kjv';

            // Set translation selector
            const translationSelect = document.getElementById('translationSelect');
            if (translationSelect) {
                translationSelect.value = this.selectedTranslation;
            }
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
            localStorage.setItem('selectedTranslation', this.selectedTranslation);
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

        // Translation Selection
        document.getElementById('translationSelect').addEventListener('change', (e) => this.changeTranslation(e.target.value));

        // View Toggle (Bible/Commentary)
        document.querySelectorAll('.segment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleView(e.target.closest('.segment-btn').dataset.view));
        });

        // Passage Navigation
        document.getElementById('searchBtn').addEventListener('click', () => this.searchPassage());
        const passageSearchInput = document.getElementById('passageSearch');
        passageSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchPassage();
        });
        // Keyword suggestions as user types
        passageSearchInput.addEventListener('input', (e) => this.showKeywordSuggestions(e.target.value));
        passageSearchInput.addEventListener('focus', (e) => this.showKeywordSuggestions(e.target.value));
        passageSearchInput.addEventListener('blur', () => {
            // Delay to allow click on suggestions
            setTimeout(() => this.hideKeywordSuggestions(), 200);
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
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        }
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.documentElement.classList.toggle('dark-mode');
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
    // View Toggle (Bible/Commentary)
    // ===================================

    toggleView(viewName) {
        this.currentView = viewName;

        // Update segmented control buttons
        document.querySelectorAll('.segment-btn').forEach(btn => {
            if (btn.dataset.view === viewName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Toggle view content
        if (viewName === 'bible') {
            document.getElementById('bibleView').classList.add('active');
            document.getElementById('commentaryView').classList.remove('active');
        } else {
            document.getElementById('bibleView').classList.remove('active');
            document.getElementById('commentaryView').classList.add('active');
            // Refresh commentary if passage is loaded
            if (this.currentPassage) {
                this.displayCommentary(this.currentPassage);
            }
        }
    }

    // ===================================
    // Keyword Search Suggestions
    // ===================================

    showKeywordSuggestions(query) {
        const suggestionsBox = document.getElementById('keywordSuggestions');

        if (!query || query.length < 2) {
            this.hideKeywordSuggestions();
            return;
        }

        const queryLower = query.toLowerCase().trim();

        // Check if it looks like a passage reference (contains numbers or book names)
        const passagePattern = /\d|john|genesis|matthew|psalm|romans|corinthians|timothy|peter|james|exodus|leviticus|numbers|deuteronomy|joshua|judges|samuel|kings|chronicles|ezra|nehemiah|esther|job|proverbs|ecclesiastes|isaiah|jeremiah|lamentations|ezekiel|daniel|hosea|joel|amos|obadiah|jonah|micah|nahum|habakkuk|zephaniah|haggai|zechariah|malachi|mark|luke|acts|galatians|ephesians|philippians|colossians|thessalonians|titus|philemon|hebrews|jude|revelation/i;

        if (passagePattern.test(query)) {
            // Likely a passage reference, don't show keyword suggestions
            this.hideKeywordSuggestions();
            return;
        }

        // Find matching keywords
        const matches = Object.keys(this.keywordMap).filter(keyword =>
            keyword.includes(queryLower) || queryLower.includes(keyword)
        );

        if (matches.length === 0) {
            this.hideKeywordSuggestions();
            return;
        }

        // Display up to 5 suggestions
        const suggestions = matches.slice(0, 5);
        let html = '<div class="suggestions-list">';

        suggestions.forEach(keyword => {
            const passages = this.keywordMap[keyword];
            html += `
                <div class="suggestion-item" data-keyword="${keyword}">
                    <div class="suggestion-keyword">
                        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                        </svg>
                        <span class="keyword-text">${keyword}</span>
                    </div>
                    <div class="suggestion-passages">
                        ${passages.slice(0, 3).map(p => `<span class="passage-tag">${p}</span>`).join('')}
                        ${passages.length > 3 ? `<span class="more-count">+${passages.length - 3} more</span>` : ''}
                    </div>
                </div>
            `;
        });

        html += '</div>';
        suggestionsBox.innerHTML = html;
        suggestionsBox.classList.remove('hidden');

        // Add click handlers to suggestions
        suggestionsBox.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const keyword = item.dataset.keyword;
                this.selectKeyword(keyword);
            });
        });
    }

    hideKeywordSuggestions() {
        const suggestionsBox = document.getElementById('keywordSuggestions');
        suggestionsBox.classList.add('hidden');
        suggestionsBox.innerHTML = '';
    }

    selectKeyword(keyword) {
        const passages = this.keywordMap[keyword];
        if (passages && passages.length > 0) {
            // Show modal with all passages for this keyword
            this.showKeywordPassagesModal(keyword, passages);
        }
        this.hideKeywordSuggestions();
    }

    showKeywordPassagesModal(keyword, passages) {
        // Create a temporary modal to show all passages for the keyword
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'keywordModal';

        let html = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>Passages about "${keyword}"</h2>
                </div>
                <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
                    <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                        Select a passage to study:
                    </p>
                    <div class="keyword-passages-list">
        `;

        passages.forEach(passage => {
            html += `
                <button class="keyword-passage-btn" data-passage="${passage}">
                    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    ${passage}
                </button>
            `;
        });

        html += `
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary modal-close">Cancel</button>
                </div>
            </div>
        `;

        modal.innerHTML = html;
        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelectorAll('.keyword-passage-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const passage = btn.dataset.passage;
                document.getElementById('passageSearch').value = passage;
                this.searchPassage();
                document.body.removeChild(modal);
            });
        });

        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // ===================================
    // Translation Management
    // ===================================

    changeTranslation(translation) {
        this.selectedTranslation = translation;
        this.saveToStorage();

        // Reload current passage if one is loaded
        if (this.currentPassage) {
            this.loadPassage(this.currentPassage);
        }
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

    async loadPassage(reference) {
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

        // Show loading state
        document.getElementById('passageText').innerHTML = '<div class="placeholder-message"><p>Loading passage...</p></div>';

        // Fetch Bible text from API
        try {
            const bibleText = await this.fetchPassage(reference);
            document.getElementById('passageText').innerHTML = bibleText;
        } catch (error) {
            console.error('Error fetching passage:', error);
            document.getElementById('passageText').innerHTML = this.getErrorMessage(error);
        }

        // Show chapter navigation
        document.getElementById('chapterNav').classList.remove('hidden');

        // Auto-populate note reference field
        document.getElementById('noteReference').value = title;

        // Update commentary display
        this.renderCommentary();
    }

    getDisplayBookName(bookKey) {
        // Convert from key format to display format
        const bookMap = {
            // Old Testament
            'genesis': 'Genesis', 'exodus': 'Exodus', 'leviticus': 'Leviticus',
            'numbers': 'Numbers', 'deuteronomy': 'Deuteronomy', 'joshua': 'Joshua',
            'judges': 'Judges', 'ruth': 'Ruth', '1samuel': '1 Samuel', '2samuel': '2 Samuel',
            '1kings': '1 Kings', '2kings': '2 Kings', '1chronicles': '1 Chronicles',
            '2chronicles': '2 Chronicles', 'ezra': 'Ezra', 'nehemiah': 'Nehemiah',
            'esther': 'Esther', 'job': 'Job', 'psalms': 'Psalms', 'proverbs': 'Proverbs',
            'ecclesiastes': 'Ecclesiastes', 'songofsolomon': 'Song of Solomon',
            'isaiah': 'Isaiah', 'jeremiah': 'Jeremiah', 'lamentations': 'Lamentations',
            'ezekiel': 'Ezekiel', 'daniel': 'Daniel', 'hosea': 'Hosea', 'joel': 'Joel',
            'amos': 'Amos', 'obadiah': 'Obadiah', 'jonah': 'Jonah', 'micah': 'Micah',
            'nahum': 'Nahum', 'habakkuk': 'Habakkuk', 'zephaniah': 'Zephaniah',
            'haggai': 'Haggai', 'zechariah': 'Zechariah', 'malachi': 'Malachi',
            // New Testament
            'matthew': 'Matthew', 'mark': 'Mark', 'luke': 'Luke', 'john': 'John',
            'acts': 'Acts', 'romans': 'Romans', '1corinthians': '1 Corinthians',
            '2corinthians': '2 Corinthians', 'galatians': 'Galatians', 'ephesians': 'Ephesians',
            'philippians': 'Philippians', 'colossians': 'Colossians',
            '1thessalonians': '1 Thessalonians', '2thessalonians': '2 Thessalonians',
            '1timothy': '1 Timothy', '2timothy': '2 Timothy', 'titus': 'Titus',
            'philemon': 'Philemon', 'hebrews': 'Hebrews', 'james': 'James',
            '1peter': '1 Peter', '2peter': '2 Peter', '1john': '1 John',
            '2john': '2 John', '3john': '3 John', 'jude': 'Jude', 'revelation': 'Revelation'
        };
        return bookMap[bookKey] || bookKey.charAt(0).toUpperCase() + bookKey.slice(1);
    }

    // ===================================
    // Bible API Integration
    // ===================================

    async fetchPassage(reference) {
        const bookName = this.getDisplayBookName(reference.book);
        let passageRef = `${bookName} ${reference.chapter}`;

        if (reference.verse) {
            passageRef += `:${reference.verse}`;
            if (reference.verseEnd) {
                passageRef += `-${reference.verseEnd}`;
            }
        }

        // Check cache first (include translation in cache key)
        const cacheKey = `${passageRef}-${this.selectedTranslation}`;
        if (this.bibleCache[cacheKey]) {
            return this.bibleCache[cacheKey];
        }

        // Fetch based on selected translation
        let html;
        switch (this.selectedTranslation) {
            case 'esv':
                html = await this.fetchFromESV(passageRef, reference);
                break;
            case 'lsb':
                html = await this.fetchFromLSB(passageRef, reference);
                break;
            case 'kjv':
            default:
                html = await this.fetchFromBibleAPI(passageRef, reference);
                break;
        }

        // Cache the result
        this.bibleCache[cacheKey] = html;
        return html;
    }

    async fetchFromBibleAPI(passageRef, reference) {
        // Using bible-api.com (free, no auth required)
        const url = `https://bible-api.com/${encodeURIComponent(passageRef)}?translation=kjv`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch passage: ${response.statusText}`);
        }

        const data = await response.json();
        return this.formatBibleAPIResponse(data, reference);
    }

    async fetchFromESV(passageRef, reference) {
        // Using ESV API (requires free API key from https://api.esv.org/)
        if (!this.esvApiKey) {
            return this.getAPIKeyMessage('ESV', 'https://api.esv.org/');
        }

        const url = `https://api.esv.org/v3/passage/html/?q=${encodeURIComponent(passageRef)}&include-passage-references=false&include-verse-numbers=true&include-first-verse-numbers=true&include-footnotes=false&include-headings=false&include-short-copyright=false`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Token ${this.esvApiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`ESV API error: ${response.statusText}`);
        }

        const data = await response.json();
        let html = `<div class="passage-text">${data.passages[0]}</div>`;
        html += '<div class="text-muted" style="margin-top: 1rem; font-size: 0.875rem; line-height: 1.5;">Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.</div>';
        return html;
    }

    async fetchFromLSB(passageRef, reference) {
        // Using bible-api.com with LSB translation (free, no auth required)
        // Note: LSB may not be available on all APIs, will fallback to WEB if needed
        const url = `https://bible-api.com/${encodeURIComponent(passageRef)}?translation=web`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch LSB passage: ${response.statusText}`);
        }

        const data = await response.json();
        // Using WEB (World English Bible) as LSB isn't available on free APIs yet
        return this.formatBibleAPIResponse(data, reference, 'World English Bible (WEB) - LSB coming soon');
    }

    formatBibleAPIResponse(data, reference, translationName = 'King James Version (KJV)') {
        if (!data.verses || data.verses.length === 0) {
            return '<div class="placeholder-message"><p>No verses found for this reference.</p></div>';
        }

        // Filter verses based on the requested reference
        let filteredVerses = data.verses;

        if (reference.verse) {
            // If a specific verse (or range) was requested, filter to only those verses
            filteredVerses = data.verses.filter(v => {
                const verseNum = parseInt(v.verse);
                if (reference.verseEnd) {
                    // Range requested (e.g., Romans 8:28-30)
                    return verseNum >= reference.verse && verseNum <= reference.verseEnd;
                } else {
                    // Single verse requested (e.g., Genesis 1:1)
                    return verseNum === reference.verse;
                }
            });
        }
        // If no specific verse requested (just chapter), show all verses in the chapter

        let html = '<div class="passage-text">';

        filteredVerses.forEach(verse => {
            html += `
                <span class="verse">
                    <sup class="verse-number">${verse.verse}</sup>
                    ${this.escapeHtml(verse.text)}
                </span>
            `;
        });

        html += '</div>';

        // Add attribution
        html += `<div class="text-muted" style="margin-top: 1rem; font-size: 0.875rem;">Translation: ${translationName}</div>`;

        return html;
    }

    getAPIKeyMessage(translationName, apiUrl) {
        return `
            <div class="placeholder-message">
                <p><strong>${translationName} Translation Requires API Key</strong></p>
                <p class="text-muted">To use the ${translationName} translation, you need a free API key.</p>
                <div class="info-box" style="margin-top: 2rem; text-align: left;">
                    <h4>How to get your free ${translationName} API key:</h4>
                    <ol style="margin-left: 1.5rem;">
                        <li>Visit: <a href="${apiUrl}" target="_blank" style="color: var(--accent-primary);">${apiUrl}</a></li>
                        <li>Sign up for a free account</li>
                        <li>Copy your API key</li>
                        <li>Open the app.js file</li>
                        <li>Add your key to the appropriate variable at the top of the file</li>
                        <li>Refresh the app</li>
                    </ol>
                    <p style="margin-top: 1rem;">Or switch to KJV or LSV which work without an API key!</p>
                </div>
            </div>
        `;
    }

    getErrorMessage(error) {
        return `
            <div class="placeholder-message">
                <p style="color: var(--danger);"><strong>Error loading passage</strong></p>
                <p class="text-muted">${this.escapeHtml(error.message)}</p>
                <div class="info-box" style="margin-top: 2rem; text-align: left;">
                    <h4>Troubleshooting:</h4>
                    <ul style="list-style-position: inside;">
                        <li>Check your internet connection</li>
                        <li>Verify the passage reference is correct</li>
                        <li>Try a different chapter or book</li>
                        <li>For ESV API: verify your API key is correct</li>
                    </ul>
                    <p style="margin-top: 1rem;">You can continue using notes and bookmarks while offline.</p>
                </div>
            </div>
        `;
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
    // Commentary System
    // ===================================

    async loadCommentaryDatabase() {
        // Try to load from external JSON file first
        try {
            const response = await fetch('commentaries.json');
            if (response.ok) {
                const data = await response.json();
                this.commentaries = data.map((c, index) => ({
                    ...c,
                    id: c.id || index + 1
                }));
                console.log(`Loaded ${this.commentaries.length} commentary entries from commentaries.json`);
                return;
            }
        } catch (error) {
            console.log('Could not load external commentaries.json, using embedded data');
        }

        // Fallback to embedded commentary if external file not available
        this.commentaries = [
            {
                id: 1,
                reference: 'Romans 8:28',
                tradition: 'reformed',
                author: 'John Calvin',
                source: 'Commentary on Romans',
                year: 1540,
                text: 'We know that all things work together for good for those who love God. This passage teaches us that God\'s providence extends over all things, and that even adversities are turned to the benefit of believers. The "good" here is not temporal prosperity, but spiritual and eternal good - our conformity to Christ and ultimate glorification.'
            },
            {
                id: 2,
                reference: 'John 3:16',
                tradition: 'reformed',
                author: 'Charles Spurgeon',
                source: 'Metropolitan Tabernacle Pulpit',
                year: 1880,
                text: 'God so loved the world - not a select few, not merely the nation of Israel, but the world. Yet this love is effectual only in those who believe. The gift of the Son is universal in its offer, but particular in its application. Whosoever believes shall not perish, and this belief is itself a gift of grace.'
            }
        ];
    }

    setupTraditionFilters() {
        const checkboxes = document.querySelectorAll('.tradition-filters input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            // Set initial state
            checkbox.checked = this.enabledTraditions.includes(checkbox.value);

            // Add event listener
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.enabledTraditions.push(e.target.value);
                } else {
                    this.enabledTraditions = this.enabledTraditions.filter(t => t !== e.target.value);
                }
                this.renderCommentary();
            });
        });
    }

    renderCommentary() {
        if (!this.currentPassage) {
            document.getElementById('commentaryDisplay').innerHTML = `
                <div class="placeholder-message">
                    <p>Select a passage to view commentary</p>
                </div>
            `;
            return;
        }

        // Get reference string
        const bookName = this.getDisplayBookName(this.currentPassage.book);
        let referenceStr = `${bookName} ${this.currentPassage.chapter}`;
        if (this.currentPassage.verse) {
            referenceStr += `:${this.currentPassage.verse}`;
        }

        // Debug logging
        console.log('Commentary Filter Debug:');
        console.log('  currentPassage:', this.currentPassage);
        console.log('  referenceStr:', referenceStr);
        console.log('  verse selected:', this.currentPassage.verse);

        // Find matching commentaries
        const matchingCommentaries = this.commentaries.filter(c => {
            // Check if tradition is enabled
            if (!this.enabledTraditions.includes(c.tradition)) {
                return false;
            }

            // Check if reference matches
            // If user selected a specific verse, only show commentary for that exact verse
            if (this.currentPassage.verse) {
                const matches = c.reference === referenceStr;
                console.log(`  Checking "${c.reference}" === "${referenceStr}": ${matches}`);
                return matches;
            }

            // If user selected a chapter (no specific verse), show all commentary in that chapter
            return c.reference.startsWith(`${bookName} ${this.currentPassage.chapter}:`);
        });

        console.log('  Total matching commentaries:', matchingCommentaries.length);

        const display = document.getElementById('commentaryDisplay');

        if (matchingCommentaries.length === 0) {
            display.innerHTML = `
                <div class="placeholder-message">
                    <p>No commentary available for ${referenceStr}</p>
                    <p class="text-muted">Commentary can be added for this passage in the commentary database.</p>
                    <div class="info-box" style="margin-top: 2rem;">
                        <h4>How to add commentary:</h4>
                        <p>Commentary entries can be added to the <code>loadCommentaryDatabase()</code> method in app.js.</p>
                        <p>Future feature: AI-powered synthesis of commentary sources.</p>
                    </div>
                </div>
            `;
            return;
        }

        // Render commentaries with expand/collapse
        display.innerHTML = matchingCommentaries.map((c, index) => {
            const commentaryId = `commentary-${index}`;
            const previewLength = 200;
            const fullText = this.escapeHtml(c.text);
            const needsExpand = c.text.length > previewLength;
            const previewText = needsExpand ? fullText.substring(0, previewLength) + '...' : fullText;

            return `
                <div class="commentary-item">
                    <span class="tradition-badge tradition-${c.tradition}">${this.getTraditionLabel(c.tradition)}</span>
                    <h4 style="margin-top: 0.5rem; margin-bottom: 0.5rem;">${this.escapeHtml(c.author)}</h4>
                    <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1rem;">
                        ${this.escapeHtml(c.source)} (${c.year})
                    </p>
                    <div class="commentary-text-wrapper">
                        <p id="${commentaryId}-preview" class="commentary-text ${needsExpand ? '' : 'hidden'}" style="font-family: var(--font-serif); line-height: 1.8;">
                            ${previewText}
                        </p>
                        <p id="${commentaryId}-full" class="commentary-text hidden" style="font-family: var(--font-serif); line-height: 1.8;">
                            ${fullText}
                        </p>
                        ${needsExpand ? `
                            <button class="expand-btn" onclick="app.toggleCommentary('${commentaryId}')" id="${commentaryId}-btn">
                                <span id="${commentaryId}-btn-text">Read more</span>
                                <svg id="${commentaryId}-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-left: 0.25rem; transition: transform 0.2s;">
                                    <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    toggleCommentary(commentaryId) {
        const preview = document.getElementById(`${commentaryId}-preview`);
        const full = document.getElementById(`${commentaryId}-full`);
        const btnText = document.getElementById(`${commentaryId}-btn-text`);
        const icon = document.getElementById(`${commentaryId}-icon`);

        if (preview.classList.contains('hidden')) {
            // Currently showing full, switch to preview
            preview.classList.remove('hidden');
            full.classList.add('hidden');
            btnText.textContent = 'Read more';
            icon.style.transform = 'rotate(0deg)';
        } else {
            // Currently showing preview, switch to full
            preview.classList.add('hidden');
            full.classList.remove('hidden');
            btnText.textContent = 'Read less';
            icon.style.transform = 'rotate(180deg)';
        }
    }

    getTraditionLabel(tradition) {
        const labels = {
            'reformed': 'Reformed',
            'patristic': 'Patristic',
            'catholic': 'Catholic',
            'orthodox': 'Orthodox',
            'mainline': 'Mainline Protestant'
        };
        return labels[tradition] || tradition;
    }

    addCommentary(commentaryData) {
        // Method to add new commentary entries
        const commentary = {
            id: Date.now(),
            reference: commentaryData.reference,
            tradition: commentaryData.tradition,
            author: commentaryData.author,
            source: commentaryData.source,
            year: commentaryData.year || null,
            text: commentaryData.text,
            addedAt: new Date().toISOString()
        };

        this.commentaries.push(commentary);
        // Could save to localStorage here
        // localStorage.setItem('commentaries', JSON.stringify(this.commentaries));
        this.renderCommentary();
        return commentary;
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
