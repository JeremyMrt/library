/* eslint-disable prefer-const */
const modal = document.getElementById("modal");
const booksContent = document.getElementsByClassName("books-content")[0];
const closeModal = document.getElementsByClassName("close")[0];
const unreadShelf = document.getElementsByClassName("unread")[0];
const bookshelves = document.querySelectorAll(".bookshelf");
let draggables = document.querySelectorAll(".draggable");
const readShelf = document.getElementsByClassName("read")[0];
const form = document.getElementById("book-form");
let books = document.getElementsByClassName("books");

const bookColors = [
  "#4d4b30",
  "#7e846e",
  "#919478",
  "#9da584",
  "#a5b297",
  "#444929",
  "#737148",
  "#767933",
  "#7f822e",
  "#808000",
  "#597161",
  "#556246",
  "#89815d",
  "#8b8762",
  "#ada87a",
  "#482217",
  "#572c14",
  "#a8693f",
  "#8b5a26",
  "#b77332",
  "#1a1a43",
  "#201321",
  "#5b4c5f",
  "#4e2F08",
  "#8f673d",
  "#8d775c",
];
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
    const bookDivDeleteButton = document.createElement("div");
    const bookDivReadButton = document.createElement("div");

    bookDiv.classList.add("books");
    bookDiv.classList.add("draggable");
    bookDivTitle.classList.add("spine-title");
    bookDivAuthor.classList.add("spine-author");
    bookDivPages.classList.add("spine-pages");
    bookDivDeleteButton.classList.add("delete-btn");
    bookDivReadButton.classList.add("read-btn");

    bookDivTitle.textContent = this.title;
    bookDivAuthor.textContent = this.author;
    bookDivPages.textContent = `${this.pages}p`;

    bookDiv.append(
      bookDivTitle,
      bookDivPages,
      bookDivAuthor,
      bookDivDeleteButton,
      bookDivReadButton
    );

    // Code logic doesn't need the index anymore but I leave it. Using it might be closer to what the exercice was supposed to teach...
    bookDiv.setAttribute("index", myLibrary.length - 1);
    bookDiv.setAttribute("draggable", true);

    let randomHeight = getBookHeight(300, 360);
    bookDiv.style.height = `${randomHeight}px`;
    let randomBackground = randomChoice(availableBackground);
    bookDiv.style.background = `var(${randomBackground})`;
    let randomColor = randomChoice(bookColors);
    bookDiv.style.backgroundColor = randomColor;

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
    const bookDivDeleteButton = document.createElement("div");
    const bookDivReadButton = document.createElement("div");

    bookDiv.classList.add("books");
    bookDiv.classList.add("draggable");
    bookDivTitle.classList.add("spine-title");
    bookDivAuthor.classList.add("spine-author");
    bookDivPages.classList.add("spine-pages");
    bookDivDeleteButton.classList.add("delete-btn");
    bookDivReadButton.classList.add("read-btn");

    bookDivTitle.textContent = book.title;
    bookDivAuthor.textContent = book.author;
    bookDivPages.textContent = `${book.pages}p`;

    bookDiv.append(
      bookDivTitle,
      bookDivPages,
      bookDivAuthor,
      bookDivDeleteButton,
      bookDivReadButton
    );

    bookDiv.setAttribute("index", myLibrary.indexOf(book));
    bookDiv.setAttribute("draggable", true);

    let randomHeight = getBookHeight(31, 38);
    bookDiv.style.height = `${randomHeight}vh`;
    let randomBackground = randomChoice(availableBackground);
    bookDiv.style.background = `var(${randomBackground})`;
    let randomColor = randomChoice(bookColors);
    bookDiv.style.backgroundColor = randomColor;

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
  if (e.target.className === "delete-btn") {
    myLibrary.splice(
      myLibrary.findIndex(
        (object) =>
          object.title === e.target.parentElement.firstElementChild.outerText
      ),
      1
    );
    e.target.parentElement.remove();
    updateDataIndexAttributes();
  }
});

booksContent.addEventListener("click", (e) => {
  if (
    e.target.className === "read-btn" &&
    e.target.parentElement.parentElement.className === "bookshelf read"
  ) {
    unreadShelf.appendChild(e.target.parentElement);
    updateDataIndexAttributes();
  } else if (
    e.target.className === "read-btn" &&
    e.target.parentElement.parentElement.className === "bookshelf unread"
  ) {
    readShelf.appendChild(e.target.parentElement);
    updateDataIndexAttributes();
  }
});

// Drag and Drop from WDS
booksContent.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");

  e.target.addEventListener("dragend", () => {
    e.target.classList.remove("dragging");
  });
});

bookshelves.forEach((bookshelf) => {
  bookshelf.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(bookshelf, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement !== null) {
      bookshelf.insertBefore(draggable, afterElement);
    } else {
      bookshelf.appendChild(draggable);
    }
  });
});

function getDragAfterElement(bookshelf, x) {
  const draggableElements = [
    ...bookshelf.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        // eslint-disable-next-line object-shorthand
        return { offset: offset, element: child };
        // eslint-disable-next-line no-else-return
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}
