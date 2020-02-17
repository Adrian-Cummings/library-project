
let myLibrary = [];


function Book(title, author, pages, read) {
    //constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    //Adding a new book to myLibrary.
    newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook); 

    console.log(myLibrary) // Teting purposes. TODO: REMOVE

    let table = document.getElementById('book-table');
    let row = table.insertRow(-1);
    row.innerHTML = `<td>${title}</td> <td>${author}</td> <td>${pages}</td> <td>${read}</td> <td><a href="#" onclick="DeleteBook(this)">X</a></td>`
}

function createNewBookFromForm(){

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("completed").value;

    addBookToLibrary(title, author, pages, read);
}

function DeleteBook(row){

    let book = row.parentNode.parentNode.rowIndex;
    document.getElementById('book-table').deleteRow(book);

    myLibrary.splice(this, 1); // fix this


}
















