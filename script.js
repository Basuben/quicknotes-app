// QuickNotes: notes live in an array and render() draws them on the page.
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllButton = document.querySelector("#clear-all");

const STORAGE_KEY = "quicknotes-notes";
const MAX_LENGTH = 200;

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

// Every search word must appear in the note text, ignoring upper and lower case.
function getVisibleNotes() {
  const words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

function createNoteElement(note) {
  const item = document.createElement("li");
  const categoryClass = String(note.category).toLowerCase().replace(/[^a-z]/g, "");
  item.className = "note category-" + categoryClass;

  const text = document.createElement("p");
  text.className = "note-text";
  text.textContent = note.text;

  const meta = document.createElement("div");
  meta.className = "note-meta";

  const category = document.createElement("span");
  category.className = "note-category";
  category.textContent = note.category;

  const date = document.createElement("span");
  date.className = "note-date";
  date.textContent = note.createdAt;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteNote(note.id));

  meta.append(category, date, deleteButton);
  item.append(text, meta);
  return item;
}

function render() {
  notesList.textContent = "";
  updateCount();

  const visibleNotes = getVisibleNotes();

  if (visibleNotes.length === 0 && searchInput.value.trim() !== "") {
    const message = document.createElement("li");
    message.className = "no-results";
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
    return;
  }

  visibleNotes.forEach((note) => {
    notesList.appendChild(createNoteElement(note));
  });
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  });
  saveNotes();
  noteInput.value = "";
  render();
});

searchInput.addEventListener("input", render);

clearAllButton.addEventListener("click", () => {
  if (notes.length === 0) {
    return;
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

render();
