const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const shelf = document.getElementsByClassName("shelf")[0];

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
];

myLibrary.forEach(book => {
  
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
// };

// const theHobbit = new Book(
//   "The Hobbit",
//   "J.R.R. Tolkien",
//   "295",
//   "not read yet"
// );

// function addBookToLibrary() {

//     const
// }
