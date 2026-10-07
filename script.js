// Select elements using querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const clearAllBtn = document.querySelector('#clear-all-btn');

// Notes stored as an array of objects
let notes = [];

// Load notes from localStorage
function loadNotes() {
    const storedNotes = localStorage.getItem('quicknotes');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
}

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
}

// Update note count message
function updateCount() {
    const count = notes.length;
    if (count === 0) {
        noteCount.textContent = 'You have no notes yet.';
    } else if (count === 1) {
        noteCount.textContent = 'You have 1 note.';
    } else {
        noteCount.textContent = `You have ${count} notes.`;
    }
}

// Render function (uses createElement and textContent, never innerHTML for user text)
function render(notesToRender = notes) {
    // Safely clear the list without innerHTML
    while (notesList.firstChild) {
        notesList.removeChild(notesList.firstChild);
    }
    
    if (notesToRender.length === 0 && searchInput.value.trim() !== '') {
        const noMatch = document.createElement('li');
        noMatch.textContent = 'No notes match your search.';
        notesList.appendChild(noMatch);
        return;
    }

    notesToRender.forEach(note => {
        const li = document.createElement('li');
        li.className = `note-card category-${note.category}`;
        
        const textP = document.createElement('p');
        textP.textContent = note.text;
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'note-meta';
        metaDiv.textContent = `${note.category.charAt(0).toUpperCase() + note.category.slice(1)} - ${note.createdAt}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteNote(note.id));
        
        li.appendChild(textP);
        li.appendChild(metaDiv);
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
    
    updateCount();
}

// Add note with validation
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = noteInput.value.trim();
    const category = noteCategory.value;
    
    // Validation
    if (text === '') {
        errorMessage.textContent = 'Please type a note first.';
        return;
    }
    
    if (text.length > 200) {
        errorMessage.textContent = 'Notes must be 200 characters or fewer.';
        return;
    }
    
    // Clear error on valid input
    errorMessage.textContent = '';
    
    // Create note object
    const newNote = {
        id: Date.now().toString(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };
    
    notes.push(newNote);
    saveNotes();
    render();
    
    // Clear input after adding
    noteInput.value = '';
});

// Delete note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    render();
}

// Search feature (case-insensitive)
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(searchTerm));
    render(filteredNotes);
});

// Bonus: Clear all notes with confirmation
clearAllBtn.addEventListener('click', () => {
    if (confirm('Delete all notes?')) {
        notes = [];
        saveNotes();
        render();
    }
});

// Initial load
loadNotes();
render();