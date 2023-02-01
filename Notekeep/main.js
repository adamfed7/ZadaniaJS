const noteDiv = document.querySelector('.Notes');
const showAddNoteBtn = document.querySelector('.ShowAddNoteBtn');
const showEditNoteBtn = document.querySelector('.ShowEditNoteBtn');
const addNoteBtn = document.querySelector('.AddNoteBtn');
const editNoteBtn = document.querySelector('.EditNoteBtn');

var indexGlobal = 0;
let notes = JSON.parse(localStorage.getItem("notes"));
displayNotes();

class Note {
    constructor(title, description, color, isPinned) {
        this.title = title;
        this.description = description;
        this.color = color;
        this.isPinned = isPinned;
        this.createdAt = new Date().toLocaleString();
    }
}

function showAddNote() {
    if (noteDiv.style.display == "block") {
        noteDiv.style.display = "none";
        addNoteBtn.style.display = "none";
        showAddNoteBtn.style.left = "46.5%";
        showAddNoteBtn.innerHTML = "Add your note";
    } else {
        noteDiv.style.display = "block";
        addNoteBtn.style.display = "block";
        showAddNoteBtn.style.left = "33%";
        showAddNoteBtn.innerHTML = "Hide add note";
    }
}

function sortNodes(notes) {
    notes = JSON.parse(localStorage.getItem("notes"));

    notes.sort((a, b) => {
        if (a.isPinned !== b.isPinned) {
            return a.isPinned ? -1 : 1;
        }
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    notes = JSON.parse(localStorage.getItem("notes"));
    return notes;
}

function addNote() {
    const titleN = document.getElementById('title').value;
    const descriptionN = document.getElementById('description').value;
    const colorN = document.getElementById('color').value;
    const isPinnedN = document.getElementById('isPinned').checked;

    if (titleN == "") {
        alert('Title cannot be empty');
    } else {
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
        document.getElementById('isPinned').checked = false;


        let note = new Note(titleN, descriptionN, colorN, isPinnedN);
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
        showAddNote();
        location.reload();
    }
}

function displayNotes() {
    sortNodes(notes);
    let html = "";
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let headerColor = "";

        switch (note.color) {
            case '#a10d0d':
                headerColor = "#ff4848e3";
                break;
            case '#01bd6f':
                headerColor = "#7ffd80";
                break;
            case '#ceca04':
                headerColor = "#ffff31";
                break;
            case '#0074d5':
                headerColor = "#06b0eb";
                break;
        }

        html += `
          <div class="NotesElement" style="background-color: ${note.color}">
            <h2 style="background-color:${headerColor}">${note.title}</h2>
            <p style="text-align:left; font-weight: bold;">Description:<p>
            <p style="text-align:left;">${note.description}</p>
            
            

            <button id="editBtn" onclick="editNote(${i})">Edit</button>
            <button id="deleteBtn" onclick="deleteNote(${i})">Delete</button><br>

            <p style="text-align:left;">${note.createdAt}</p>
            <p style="text-align:right;">Pin: ${note.isPinned}</p>
          </div>
        `;
    }
    document.getElementById("ListOfNotes").innerHTML = html;
}

function editMenu() {
    if (noteDiv.style.display == "block") {
        noteDiv.style.display = "none";
        editNoteBtn.style.display = "none";
        showEditNoteBtn.style.display = "none";

    } else {
        noteDiv.style.display = "block";
        editNoteBtn.style.display = "block";
        showEditNoteBtn.style.display = "block";
        showEditNoteBtn.style.left = "32%";
    }
}

function editNote(index) {
    editMenu();
    document.getElementById('title').value = notes[index].title;
    document.getElementById('description').value = notes[index].description;
    document.getElementById('color').value = notes[index].color;
    document.getElementById('isPinned').checked = notes[index].isPinned;
    indexGlobal = index;
}

function updateNote() {
    index = indexGlobal;
    notes[index].title = document.getElementById('title').value;
    notes[index].description = document.getElementById('description').value;
    notes[index].color = document.getElementById('color').value;
    notes[index].isPinned = document.getElementById('isPinned').checked;
    notes[index].createdAt = new Date().toLocaleString();

    localStorage.setItem("notes", JSON.stringify(notes));
    editMenu();
    displayNotes();
    location.reload();
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}