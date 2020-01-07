function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function UI() {}

UI.prototype.addBookToList = function() {
  const list = document.getElementById('book-list');

  const row = document.createElement('tr');

  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><a href="#" class = "delete">X</a></td>
    `;

  list.appendChild(row);
};

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
};

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    pages = document.getElementById('pages').value;

  const book = new Book(title, author, pages);

  const ui = new UI();

  ui.addBookToList(book);

  ui.clearFields();

  e.preventDefault();
});
