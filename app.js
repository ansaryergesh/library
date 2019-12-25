class Book {
    constructor(title,author,pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
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
    }
}

//event listener for adding book
document.getElementById('book-form').addEventListener('submit',
function(e){
    //Get form values
    const title = document.getElementById('title').value, 
          author = document.getElementById('author').value,
          pages = document.getElementById('pages').value
    
    //instantiate book
    const book = new Book(title,author, pages);       


    //instantiate ui
    const ui = new UI()

    //validation
    if(title === '' || author === '' || pages === '') {
        //alert messages
        ui.showAlert('Please fill the all form values', 'error');
    }else {
        //add book to the list
        ui.addBookToList(book);
        
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

e.preventDefault();
});