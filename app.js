/* eslint-disable prefer-const */
const modal = document.getElementById("modal");
const booksContent = document.getElementsByClassName("books-content")[0];
const closeModal = document.getElementsByClassName("close")[0];
const unreadShelf = document.getElementsByClassName("unread")[0];
const readShelf = document.getElementsByClassName("read")[0];
const form = document.getElementById("book-form");
let books = document.getElementsByClassName("books");

const myLibrary = [
  {
    title: "The Hobbit",
    author: "Tolkien",
    pages: "354",
    read: true,
  },
  {
    title: "Harry Potter",
    author: "Rowling",
    read: true,
    pages: "476",
  },
  {
    title: "50 shades",
    author: "James",
    read: true,
    pages: "560",
  },
  {
    title: "The Alchemist",
    author: "Coelho",
    read: false,
    pages: "556",
  },
  {
    title: "JS for Dummies",
    author: "Not a dummy",
    read: false,
    pages: "1",
  },
  {
    title: "The Odin Project",
    author: "All",
    read: false,
    pages: "5600",
  },
];

// invoked from html
// eslint-disable-next-line no-unused-vars
function openModal() {
  modal.style.display = "flex";
}
closeModal.onclick = function () {
  modal.style.display = "none";
};
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

function getBookHeight(a, b) {
  let min = Math.ceil(a);
  let max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRootCssStyles(rootRule = ":root") {
  const cssRulesArray = [...document.styleSheets].map((styleSheet) =>
    [...styleSheet.cssRules].map((rule) => rule)
  );

  let cssVars = [];

  Object.values(cssRulesArray).forEach((arrayElement) => {
    Object.values(arrayElement).forEach((ruleElement) => {
      if (ruleElement.selectorText === rootRule) {
        Object.values(ruleElement.style).forEach((style) => {
          if (style.startsWith("--bg-") && cssVars.indexOf(style) === -1) {
            cssVars.push(style);
          }
        });
      }
    });
  });
  return cssVars;
}

let availableBackground = getRootCssStyles();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  addBookToLibrary() {
    const bookDiv = document.createElement("div");
    const bookDivTitle = document.createElement("div");
    const bookDivAuthor = document.createElement("div");
    const bookDivPages = document.createElement("div");
    const bookDivButtons = document.createElement("div");

    bookDiv.classList.add("books");
    bookDivTitle.classList.add("spine-title");
    bookDivAuthor.classList.add("spine-author");
    bookDivPages.classList.add("spine-pages");
    bookDivButtons.classList.add("delete-btn");

    bookDivTitle.textContent = this.title;
    bookDivAuthor.textContent = this.author;
    bookDivPages.textContent = `${this.pages}p`;

    bookDiv.append(bookDivTitle, bookDivPages, bookDivAuthor, bookDivButtons);

    bookDiv.setAttribute("index", myLibrary.length - 1);

    let randomHeight = getBookHeight(300, 360);
    bookDiv.style.height = `${randomHeight}px`;
    let randomBackground = randomChoice(availableBackground);
    bookDiv.style.background = `var(${randomBackground})`;
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    bookDiv.style.backgroundColor = `#${randomColor}`;

    if (this.read) readShelf.appendChild(bookDiv);
    else unreadShelf.appendChild(bookDiv);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const createdBook = new Book(
    event.currentTarget.title.value,
    event.currentTarget.author.value,
    event.currentTarget.pages.value,
    event.currentTarget.read.checked
  );

  myLibrary.push(createdBook);
  createdBook.addBookToLibrary();

  modal.style.display = "none";
});

// Fake books in myLibrary for landing page
function addingFakeBeginningBooks() {
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    const bookDivTitle = document.createElement("div");
    const bookDivAuthor = document.createElement("div");
    const bookDivPages = document.createElement("div");
    const bookDivButtons = document.createElement("div");

    bookDiv.classList.add("books");
    bookDivTitle.classList.add("spine-title");
    bookDivAuthor.classList.add("spine-author");
    bookDivPages.classList.add("spine-pages");
    bookDivButtons.classList.add("delete-btn");

    bookDivTitle.textContent = book.title;
    bookDivAuthor.textContent = book.author;
    bookDivPages.textContent = `${book.pages}p`;

    bookDiv.append(bookDivTitle, bookDivPages, bookDivAuthor, bookDivButtons);

    bookDiv.setAttribute("index", myLibrary.indexOf(book));

    let randomHeight = getBookHeight(300, 360);
    bookDiv.style.height = `${randomHeight}px`;
    let randomBackground = randomChoice(availableBackground);
    bookDiv.style.background = `var(${randomBackground})`;
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    bookDiv.style.backgroundColor = `#${randomColor}`;

    if (book.read) readShelf.appendChild(bookDiv);
    else unreadShelf.appendChild(bookDiv);
  });
}

addingFakeBeginningBooks();

function updateDataIndexAttributes() {
  for (let i = 0; i < books.length; i++) {
    books[i].setAttribute("index", i);
  }
}

booksContent.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.className === "delete-btn") {
    myLibrary.splice(e.target.parentElement.getAttribute("index"), 1);
    e.target.parentElement.remove();
    updateDataIndexAttributes();
  }
});
