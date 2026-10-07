# QuickNotes

QuickNotes is a simple, responsive note-taking web application that allows users to create, categorize, search, and manage their personal notes directly in the browser. Built with vanilla HTML, CSS, and JavaScript, it provides a clean and intuitive interface for capturing thoughts instantly, with data persistence using `localStorage` so your notes are safely saved across page refreshes.

## Features

- **Add Notes**: Create notes with a text input and categorize them as Personal, Work, or Study.
- **Validation**: Ensures notes are not empty and do not exceed 200 characters, displaying clear error messages.
- **Categorized Styling**: Each category has a distinct visual style with a color-coded left border.
- **Search**: Real-time, case-insensitive filtering of notes based on text content.
- **Delete Management**: Remove individual notes or clear all notes at once with a safety confirmation prompt.
- **Data Persistence**: Notes are saved to `localStorage` and survive browser reloads.
- **Responsive Design**: Fully responsive layout that adapts to mobile screens (under 600px) using CSS media queries.

## How to Run Locally

1. Clone or download this repository to your local machine.
2. Open the `quicknotes-app` folder in your preferred code editor.
3. Open the `index.html` file in any modern web browser (e.g., Chrome, Firefox, Edge).
4. Start adding, searching, and managing your notes!

## What I Learned

1. **Secure DOM Manipulation**: I learned how to safely build UI components using `document.createElement` and `textContent` instead of `innerHTML`, preventing XSS vulnerabilities when handling user-generated text.
2. **Local Storage Management**: I gained practical experience in serializing and deserializing JavaScript objects using `JSON.stringify` and `JSON.parse` to persist application state across browser sessions.
3. **Responsive Flexbox Layouts**: I improved my CSS skills by creating a flexible form layout that gracefully degrades into a vertical stack on smaller screens using `@media` queries.