// BOOk constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor

function UI() { }

UI.prototype.addBookToList = function (book) {
    const raw = document.getElementById('book-list');
    const tr = document.createElement('tr');
    raw.appendChild(tr);
    const td1 = document.createElement('td');
    td1.innerHTML = book.title;
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    td2.innerHTML = book.author;
    tr.appendChild(td2);
    const td3 = document.createElement('td');
    tr.appendChild(td3);
    td3.innerHTML = book.isbn;

    const td4 = document.createElement('td');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.innerHTML = 'X';
    a.classList.add('delete');
    td4.appendChild(a);
    tr.appendChild(td4);



}

UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


// form section

const form = document.getElementById('book-form');
form.addEventListener('submit', (e) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI()

    if (title !== '' && author !== '' && isbn !== '') {
        ui.addBookToList(book)
        ui.clearFields()
        ui.showAlert('Book Added!', 'success');
    } else {
        ui.showAlert('Please fill the all fields', 'error');
    }


    e.preventDefault();
})

// delete book

document.getElementById('book-list').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Deleted!', 'success');
})