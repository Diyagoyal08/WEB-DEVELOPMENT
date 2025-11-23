 // Library Array
const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Toggle Read Status
Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

// Add Book to Array
function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

// Display Books on Screen
function displayBooks() {
    const container = document.querySelector(".book");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.read ? "Read" : "Not Read"}</p>
            <button class="toggleBtn" data-id="${book.id}">Toggle Read</button>
            <button class="removeBtn" data-id="${book.id}">Remove</button>
        `;
        container.appendChild(card);
    });

    addButtonEvents();
}

// Attach Events
function addButtonEvents() {
    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;
            const index = myLibrary.findIndex(book => book.id === id);
            myLibrary.splice(index, 1);
            displayBooks();
        };
    });

    document.querySelectorAll(".toggleBtn").forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;
            const book = myLibrary.find(b => b.id === id);
            book.toggleRead();
            displayBooks();
        };
    });
}

// ------------------ POPUP LOGIC ------------------
const addBookBtn = document.getElementById("addBookBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

addBookBtn.onclick = () => popup.style.display = "flex";
closePopup.onclick = (e) => {
    e.preventDefault();
    popup.style.display = "none";
};

// Form Submit
document.getElementById("submitBook").onclick = function(e) {
    e.preventDefault();

    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const pages = document.getElementById("pagesInput").value;
    const read = document.getElementById("readInput").checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    popup.style.display = "none";
};

// ------------- DEFAULT BOOKS -------------------
addBookToLibrary(new Book("Atomic Habits", "James Clear", 280, true));
addBookToLibrary(new Book("The Alchemist", "Paulo Coelho", 197, false));
