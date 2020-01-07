// //pop up function
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const closeModalSubmit = document.querySelectorAll('[data-close-submit]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
    ui.clearFields();
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.form-block');
    closeModal(modal);
  });
});

closeModalSubmit.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.form-block');
    closeSubmit(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

function closeSubmit(modal) {
  if (modal == null) return;
  setTimeout(() => {
    modal.classList.remove('active');
  }, 1500);
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 1800);
}

class Book {
  constructor(title, author, pages, status = 'Unread') {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');

    //create tr element
    const row = document.createElement('tr');
    //insert cols

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button  class = "done">${book.status}</button></td>
            <td><a href="#" class = "delete">X</a></td>
        `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    //timeout for message
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
  }
}

//local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(status) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.status === status) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  updateStatus = (status, title) => {
    const books = Store.getBooks();
    books.forEach((book) => {
      if (book.title === title) book.status = status;
    });

    localStorage.setItem('books', JSON.stringify(books));
  };
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//event listener for adding book
document.getElementById('book-form').addEventListener('submit', function(e) {
  //Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    pages = document.getElementById('pages').value,
    status = document.getElementById('status').value;

  //instantiate book
  const book = new Book(title, author, pages, status);

  //instantiate ui
  const ui = new UI();

  //validation
  if (title === '' || author === '' || pages === '') {
    //alert messages
    ui.showAlert('Please fill the all form values', 'error');
  } else {
    //add book to the list
    ui.addBookToList(book);

    // add to the storage
    Store.addBook(book);

    //show success message
    ui.showAlert('Book added successfully!', 'success');

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for deletion
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  //remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});

// Event for update status
document.getElementById('book-list').addEventListener('click', function(e) {
  if (e.target.className === 'done') {
    if (e.target.textContent == 'Read') {
      e.target.textContent = 'Unread';
      Store.updateStatus(
        e.target.textContent,
        e.target.parentElement.children[0].textContent
      );
    } else {
      e.target.textContent = 'Read';
      Store.updateStatus(
        e.target.textContent,
        e.target.parentElement.children[0].textContent
      );
    }
  }
});
