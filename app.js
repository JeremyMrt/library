const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const unreadShelf = document.getElementsByClassName("unread")[0];
const readShelf = document.getElementsByClassName("read")[0];
const form = document.getElementById("book-form");

// eslint-disable-next-line no-unused-vars
function openModal() {
  modal.style.display = "flex";
}

span.onclick = function () {
  modal.style.display = "none";
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

const myLibrary = [
  {
    title: "The Hobbit",
    author: "Tolkien",
    pages: 354,
  },
  {
    title: "Harry Potter",
    author: "Rowling",
    pages: 476,
  },
  {
    title: "50 shades",
    author: "James",
    pages: 560,
  },
  {
    title: "The Alchemist",
    author: "Coelho",
    pages: 556,
  },
  {
    title: "JS for Dummies",
    author: "Not a dummy",
    pages: 1,
  },
  {
    title: "The Odin Project",
    author: "All",
    pages: 5600,
  },
];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

// function addingBook() {
//   const newBook = document.createElement("div");

//   const newBookTitle = document.createElement("div");
//   newBookTitle.classList.add("spine-title");
//   const newBookAuthor = document.createElement("div");
//   newBookAuthor.classList.add("spine-author");
//   const newBookPages = document.createElement("div");
//   newBookPages.classList.add("spine-pages");
//   const newBookButtons = document.createElement("div");
//   newBookButtons.classList.add("delete-btn");

//   newBookTitle.textContent = myLibrary[0].title;
//   newBookAuthor.textContent = myLibrary[0].author;
//   newBookPages.textContent = `${myLibrary[0].pages}p`;

//   newBook.append(newBookTitle, newBookPages, newBookAuthor, newBookButtons);
//   newBook.classList.add("books");
//   newBook.setAttribute("index", "0");
//   if (!formBookRead) unreadShelf.insertAdjacentElement("afterbegin", newBook);
//   if (formBookRead) readShelf.insertAdjacentElement("afterbegin", newBook);
// }

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formBookTitle = event.currentTarget.title.value;
  const formBookAuthor = event.currentTarget.author.value;
  const formBookPages = event.currentTarget.pages.value;
  const formBookRead = event.currentTarget.read.checked;

  const addbook = new Book(formBookTitle, formBookAuthor, formBookPages);
  myLibrary.unshift(addbook);
  // addingBook();

  modal.style.display = "none";
  event.currentTarget.title.value = "";
  event.currentTarget.author.value = "";
  event.currentTarget.pages.value = "";

  const newBook = document.createElement("div");

  const newBookTitle = document.createElement("div");
  newBookTitle.classList.add("spine-title");
  const newBookAuthor = document.createElement("div");
  newBookAuthor.classList.add("spine-author");
  const newBookPages = document.createElement("div");
  newBookPages.classList.add("spine-pages");
  const newBookButtons = document.createElement("div");
  newBookButtons.classList.add("delete-btn");

  newBookTitle.textContent = myLibrary[0].title;
  newBookAuthor.textContent = myLibrary[0].author;
  newBookPages.textContent = `${myLibrary[0].pages}p`;

  newBook.append(newBookTitle, newBookPages, newBookAuthor, newBookButtons);
  newBook.classList.add("books");

  newBook.setAttribute("index", "0");

  if (!formBookRead) unreadShelf.insertAdjacentElement("afterbegin", newBook);
  else readShelf.insertAdjacentElement("afterbegin", newBook);
});

// Fake books in array for landing page

function addingFakeBeginningBooks() {
  myLibrary.forEach((book) => {
    const newBook = document.createElement("div");

    const newBookTitle = document.createElement("div");
    newBookTitle.classList.add("spine-title");
    const newBookAuthor = document.createElement("div");
    newBookAuthor.classList.add("spine-author");
    const newBookPages = document.createElement("div");
    newBookPages.classList.add("spine-pages");
    const newBookButtons = document.createElement("div");
    newBookButtons.classList.add("delete-btn");

    newBookTitle.textContent = book.title;
    newBookAuthor.textContent = book.author;
    newBookPages.textContent = `${book.pages}p`;

    newBook.append(newBookTitle, newBookPages, newBookAuthor, newBookButtons);
    newBook.classList.add("books");
    unreadShelf.insertAdjacentElement("beforeend", newBook);
  });
}

addingFakeBeginningBooks();
