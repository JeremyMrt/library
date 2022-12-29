const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const shelf = document.getElementsByClassName("shelf")[0];
const form = document.getElementById("book-form");

function openModal() {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
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
    title: "The Shining",
    author: "Radom",
    pages: 56,
  },
  {
    title: "The Shining",
    author: "Radom",
    pages: 56,
  },
  {
    title: "The Shining",
    author: "Radom",
    pages: 56,
  },
  {
    title: "The Shining",
    author: "Radom",
    pages: 56,
  },
  {
    title: "The Shining",
    author: "Radom",
    pages: 56,
  },
  {
    title: "The Shining",
    author: "Radom",
    pages: 56,
  },
  {
    title: "The Shining",
    author: "Radom",
    pages: 56,
  },
];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addingBook() {
  const newBook = document.createElement("div");

  const newBookTitle = document.createElement("div");
  newBookTitle.classList.add("spine-title");
  const newBookAuthor = document.createElement("div");
  newBookAuthor.classList.add("spine-author");
  const newBookPages = document.createElement("div");
  newBookPages.classList.add("spine-pages");

  newBookTitle.textContent = myLibrary[0].title;
  newBookAuthor.textContent = myLibrary[0].author;
  newBookPages.textContent = `${myLibrary[0].pages}p`;

  newBook.append(newBookTitle, newBookAuthor, newBookPages);
  newBook.classList.add("books");
  shelf.insertAdjacentElement("afterbegin", newBook);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formBookTitle = event.currentTarget.title.value;
  console.log(event.currentTarget.title.value);
  const formBookAuthor = event.currentTarget.author.value;
  console.log(event.currentTarget.author.value);

  const formBookPages = event.currentTarget.pages.value;
  console.log(event.currentTarget.pages.value);

  const addbook = new Book(formBookTitle, formBookAuthor, formBookPages);
  console.log(addbook);
  myLibrary.unshift(addbook);
  addingBook();
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

    newBookTitle.textContent = book.title;
    newBookAuthor.textContent = book.author;
    newBookPages.textContent = `${book.pages}p`;

    newBook.append(newBookTitle, newBookAuthor, newBookPages);
    newBook.classList.add("books");
    shelf.insertAdjacentElement("afterbegin", newBook);
  });
}

addingFakeBeginningBooks();
