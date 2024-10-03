// Array to store book objects
const myLibrary = [];

// Book constructor function
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Add toggleReadStatus method to Book prototype
Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to display all books in the library
function displayBooks() {
    const container = document.getElementById("library-container");
    container.innerHTML = ""; // Clear existing display

    myLibrary.forEach((book, index) => {
        // Create book card
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
        <h3 class="book-title">${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.isRead ? 'Read' : 'Not read yet'}</p>
        <button class="toggle-read" data-index="${index}">Toggle Read Status</button>
        <button class="remove-book" data-index="${index}">Remove</button>
    `;

    // Append book card to the container
    container.appendChild(bookCard);
    });

    // Add event listeners for remove and toggle read status buttons
    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          removeBook(index);
        });
    });

    document.querySelectorAll('.toggle-read').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          toggleReadStatus(index);
        });
    });
}

// Function to remove a book from the library
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}
  
// Function to toggle the read status of a book
function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    displayBooks();
}

// Event listener for the "New Book" button to show the form modal
document.getElementById('newBook').addEventListener('click', () => {
    document.getElementById('newBookDialog').showModal();
});

// Event listener for form submission
document.getElementById('newBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('read').checked;
  
    // Add new book to the library
    addBookToLibrary(title, author, pages, isRead);
  
    // Close the form dialog and reset the form
    document.getElementById('newBookDialog').close();
    document.getElementById('newBookForm').reset();
});

// Example: Add a few books for testing
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
myLibrary.push(new Book("1984", "George Orwell", 328, true));
myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
  
// Initial display of books
displayBooks();
