 //Book constructor
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

 //UI constructor
 function UI() {
     
 }

 //add book to the list 
 UI.prototype.addBookToList  = function(book) {
    const list = document.getElementById('book-list');

    //create tr element
    const row = document.createElement('tr');
    //insert cols

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><a href="#" class = "delete">X</a></td>
    `;

    list.appendChild(row);
 }

 //clear fields

 UI.prototype.clearFields = function() {
     document.getElementById('title').value = '';
     document.getElementById('author').value = '';
     document.getElementById('pages').value = '';
 }

 //event listeners
 document.getElementById('book-form').addEventListener('submit',
    function(e){
        //Get form values
        const title = document.getElementById('title').value, 
              author = document.getElementById('author').value,
              pages = document.getElementById('pages').value
        
        //instantiate book
        const book = new Book(title,author, pages);       


        //instantiate ui
        const ui = new UI();

        //add book to the list
        ui.addBookToList(book);

        //clear fields
        ui.clearFields();

        e.preventDefault();
    }
 );