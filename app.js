/* eslint-disable prefer-const */
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const unreadShelf = document.getElementsByClassName("unread")[0];
const readShelf = document.getElementsByClassName("read")[0];
const form = document.getElementById("book-form");
let books = document.getElementsByClassName("books");

// invoked from html
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
    pages: "354",
    read: true,
  },
  {
    title: "Harry Potter",
    author: "Rowling",
    read: false,
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
    read: true,
    pages: "5600",
  },
];

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

// Fake books in array for landing page

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

// working here (if array) :
Array.from(books).forEach((book) => {
  book.addEventListener("click", () => {
    console.log("test!!");
    myLibrary.splice(book.getAttribute("index"), 1);
    book.remove();
    updateDataIndexAttributes();
  });
});

// for (let book of books) {
//   book.addEventListener("click", () => {
//     console.log("test!!");
//     myLibrary.splice(book.getAttribute("index"), 1);

//     if (book.read) readShelf.removeChild(book);
//     else unreadShelf.removeChild(book);

//     updateDataIndexAttributes();
//   });
// }
