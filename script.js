// QuickNotes: notes live in an array and render() draws them on the page.
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function createNoteElement(note) {
  const item = document.createElement("li");
  item.className = "note category-" + note.category.toLowerCase();

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

  meta.append(category, date, deleteButton);
  item.append(text, meta);
  return item;
}

function render() {
  notesList.textContent = "";
  notes.forEach((note) => {
    notesList.appendChild(createNoteElement(note));
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  noteInput.value = "";
  render();
});

render();
