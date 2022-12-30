const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const unreadShelf = document.getElementsByClassName("unread")[0];
const readShelf = document.getElementsByClassName("read")[0];
const form = document.getElementById("book-form");
const books = document.getElementsByClassName("books");

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

    if (!this.read) unreadShelf.appendChild(bookDiv);
    else readShelf.appendChild(bookDiv);
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

    unreadShelf.appendChild(bookDiv);
  });
}

addingFakeBeginningBooks();

// if (books[0] !== undefined) {
//   for (let i = 0; i <= books.length; i++) {
//     const book = books[i];
//     book.addEventListener("click", () => {
//       myLibrary.splice(i, 1);
//       bookshelf.removeChild(books[i]);
//     });
//   }
// }

// OK FOR NOW
// Array.from(books).forEach((book) => {
//   book.addEventListener("click", () => {
//     myLibrary.splice(book.dataset.index, 1);

//     if (book.read) readShelf.removeChild(book);
//     else unreadShelf.removeChild(book);
//   });
// });
function updateDataIndexAttributes() {
  for (let i = 0; i < books.length; i++) {
    books[i].setAttribute("index", i++);
  }
}

Array.from(books).forEach((book) => {
  book.addEventListener("click", () => {
    console.log(book.getAttribute("index"));
    myLibrary.splice(book.getAttribute("index"), 1);

    if (book.read) readShelf.removeChild(book);
    else unreadShelf.removeChild(book);

    updateDataIndexAttributes();
  });
});
