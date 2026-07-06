
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const addBtn = document.getElementById("addBtn");
const bookContainer = document.getElementById("bookContainer");
const bookCount = document.getElementById("bookCount");


let count = 0;
addBtn.addEventListener("click", addBook);


function addBook(){
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if(title === "" || author === ""){
        alert("Please enter both book title and author.");
        return;
    }
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    const bookInfo = document.createElement("p");
    bookInfo.innerHTML =
        "<strong>Title:</strong> " + title +
        " | <strong>Author:</strong> " + author;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";


    deleteBtn.addEventListener("click", function(){
        deleteBook(bookCard);
    });

    bookCard.appendChild(bookInfo);
    bookCard.appendChild(deleteBtn);
    bookContainer.appendChild(bookCard);
    count++;
    bookCount.textContent = count;
    titleInput.value = "";
    authorInput.value = "";
}

function deleteBook(bookElement){
    bookElement.remove();
    count--;
    bookCount.textContent = count;
}