const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");
const showBtn = document.querySelector(".show");
const toggleFormBtn = document.querySelector(".new-book");
const booksContainer = document.querySelector(".books-container");

const myLibrary = [
  {
    author: "David",
    title: "Can't hurt me",
    pages: 189,
    read: false,
  },
];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
}

//FUNCTIONALITY TO ADD A BOOK ON SUBMIT
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBook();
});

//ADD BOOK TO MYLIBRARY ARRAY
function addBook() {
  const author = document.querySelector("#author").value;
  const title = document.querySelector("#title").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector('input[name="read"]:checked').value;

  addBookToLibrary(author, title, pages, read);

  //CLEARING FORMS INPUT ELEMENTS
  form.reset();
}

//DISPLAY EACH BOOK ON PAGE
showBtn.addEventListener("click", () => displayBooks());

function displayBooks() {
  //Clearing all child elements
  booksContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("books-card");

    card.innerHTML = `
      <h5><strong>Book Author: </strong>${book.author}</h5>
      <h5><strong>Book Title: </strong>${book.title}</h5>
      <p><strong>Number of Pages: </strong>${book.pages}</p>
      <p><strong>Read Book: </strong><span class="read-state">${
        book.read ? "Yes" : "No"
      }</span></p>
      <button type="button" class="remove-btn">Remove</button>
      <button type="button" class="toggle-read-status">Toggle Read</button>
      
    `;

    booksContainer.appendChild(card);
  });

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => removeCard(button));

  const toggleReadButtons = document.querySelectorAll(".toggle-read-status");
  toggleReadButtons.forEach((button) => toggleReadStatus(button));
}

//REMOVE CARD-(BOOK)
function removeCard(button) {
  button.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });
}

//TOGGLE READ STATUS
function toggleReadStatus(button) {
  button.addEventListener("click", (e) => {
    const card = e.target.parentElement;
    const readState = card.querySelector(".read-state");

    switch (readState.textContent) {
      case "No":
        readState.textContent = "Yes";
        break;
      case "Yes":
        readState.textContent = "No";
        break;
    }
  });
}

//TOGGLE THE FORM
toggleFormBtn.addEventListener("click", () => {
  form.classList.toggle("hide");
});

//SHOW BOOKS ON WINDOWS LOAD
window.onload = () => {
  displayBooks();
};
