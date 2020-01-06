const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.form-block')
        closeModal(modal)
    })
})

function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}


class Book {
    constructor(title,author,pages,status = 'Unread') {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');

        //create tr element
        const row = document.createElement('tr');
        //insert cols
    
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.status}</td>
            <td><a href="#" class = "delete">X</a></td>
        `;
    
        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container  = document.querySelector('.container');
        const form  = document.querySelector('#book-form');
   
        container.insertBefore(div, form);
   
        //timeout for message
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('status').value = 'Unread';
    }
}

//local storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            ui.addBookToList(book);
        });
    };

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    // static removeBook(status) {
    //     const books = Store.getBooks();
    //     books.forEach(function(book, index){
    //         if(book.status === status){
    //             books.splice(index, 1);

    //         }
    //     });

    //     localStorage.setItem('books', JSON.stringify(books));
         
    // }

    static removeBook = (bookIndex) => {
        books.splice(bookIndex, 1);
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//event listener for adding book
document.getElementById('book-form').addEventListener('submit',
function(e){
    //Get form values
    const title = document.getElementById('title').value, 
          author = document.getElementById('author').value,
          pages = document.getElementById('pages').value,
          status = document.getElementById('status').value
    
    //instantiate book
    const book = new Book(title,author, pages, status);       


    //instantiate ui
    const ui = new UI()

    //validation
    if(title === '' || author === '' || pages === '') {
        //alert messages
        ui.showAlert('Please fill the all form values', 'error');
    }else {
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
}
);


// Event listener for deletion
document.getElementById('book-list').addEventListener
('click',function(e){

const ui = new UI();

//show message about deletion
ui.showAlert('book removed', 'success'); 

ui.deleteBook(e.target);

//remove from LS
Store.removeBook(e.target.bookIndex);

e.preventDefault();
});