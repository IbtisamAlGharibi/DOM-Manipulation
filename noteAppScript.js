
let notes = [];
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");
addBtn.addEventListener("click", addNote);


searchInput.addEventListener("input", function () {
    searchNotes(searchInput.value);
});
notesContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("delete-btn")){
        const noteId = Number(event.target.parentElement.dataset.noteId);
        deleteNote(noteId);
    }

});
function addNote(){
    const title = titleInput.value.trim();
    const content = contentInput.value;
    if(title === ""){
        alert("Please enter a note title.");
        return;
    }

    const note = {
        id: Date.now(),
        title: title,
        content: content
    };

    notes.push(note);
    saveNotes();
    renderNotes();

    titleInput.value = "";
    contentInput.value = "";
}
function renderNotes(notesArray = notes){
    notesContainer.innerHTML = "";
    notesArray.forEach(function(note){
        const noteCard = document.createElement("div");
        noteCard.className = "note-card";
        noteCard.dataset.noteId = note.id;
        const title = document.createElement("h3");
        title.textContent = note.title;
        const content = document.createElement("p");
        content.textContent = note.content;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        noteCard.appendChild(title);
        noteCard.appendChild(content);
        noteCard.appendChild(deleteBtn);
        notesContainer.appendChild(noteCard);
    });
}
function deleteNote(noteId){
    notes = notes.filter(function(note){
        return note.id !== noteId;
    });
    saveNotes();
    renderNotes();

}
function saveNotes(){
    localStorage.setItem("notesData", JSON.stringify(notes));
}
function loadNotes(){
    const storedNotes = localStorage.getItem("notesData");
    if(storedNotes){
        notes = JSON.parse(storedNotes);
    }else{
        notes = [];
    }
    renderNotes();

}
function searchNotes(query){
    query = query.toLowerCase();
    const filteredNotes = notes.filter(function(note){

        return note.title.toLowerCase().includes(query) ||
               note.content.toLowerCase().includes(query);

    });
    renderNotes(filteredNotes);
}
loadNotes();