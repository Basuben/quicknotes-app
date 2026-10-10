# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You type a note, pick a category, and it appears as a card in your list. Your notes stay in your browser, so they are still there after you refresh the page.

## Features

- Add notes with a category: Personal, Work or Study
- Each category has its own colour on the note card
- Delete any single note, or clear them all with a confirmation
- Search notes as you type, ignoring upper and lower case
- Validation: empty notes and notes over 200 characters show an error message
- A note count that reads correctly for none, one or many notes
- Notes are saved with localStorage and survive a page refresh
- Layout adjusts for phone screens

## How to run it locally

There is nothing to install.

1. Clone the repository:
   ```bash
   git clone https://github.com/Basuben/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**. You can also just double-click `index.html` to open it in your browser.

## Files

- `index.html`: the page structure
- `style.css`: layout, note cards and category colours
- `script.js`: adding, deleting, searching, validation and saving

## What I learned

- I learned to handle form submissions with JavaScript and use `event.preventDefault()` to prevent the browser's default form submission, which would otherwise reload the page.
- I practiced saving and loading notes with `localStorage`. Because it stores strings, I used `JSON.stringify()` to save the notes as JSON and `JSON.parse()` to load them back.
- I learned to keep the notes in an array and call `render()` after changes so the displayed list stays in sync with the data.
- I used `textContent` to display note text as plain text instead of inserting it as HTML, reducing the risk of cross-site scripting (XSS).
- I learned to validate notes before saving them by trimming whitespace and rejecting empty notes or notes longer than 200 characters.
