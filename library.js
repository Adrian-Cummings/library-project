
let myLibrary = [];
let id;



function Book(title, author, pages, imageLink, read, id) {
    //constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.imageLink = imageLink;
    this.read = read;
    this.id = id;
}



function render(){
    
        if (localStorage.getItem('books') == null)
        {
            saveToLocalData();
        }
        let myLibrary_deSerialized = JSON.parse(localStorage.getItem('books'));

        myLibrary = myLibrary_deSerialized;

        for (let i = 0; i < myLibrary.length; i++) {
        
            let title = myLibrary[i]['title'];
            
            let author = myLibrary[i]['author'];
            let pages = myLibrary[i]['pages'];
            let imageLink = myLibrary[i]['imageLink'];
            let read = myLibrary[i]['read'];
            let id = myLibrary[i]['id'];
            let checkbox
            if (read == true){
                checkbox = "checked";
            }
            else{
                checkbox = "";
            }

            const div = document.createElement('div')
            div.className = 'book-container';
            div.innerHTML = `<div data-id=${id} class="book-card">
                <img src="${imageLink}" alt="${title}" style="width: 100%">
                <div id=completed-banner>Completed</div>
                <div class="card-description">
                    <a href="#" id="delete-button" onClick="DeleteBook(${id})">X</a>
                    <h2>${title}</h2>
                    <h3>By: ${author}</h3>
                    <p>Pages: ${pages}</p>
                    <input type="checkbox" ${checkbox} name="Completed?" id="Completed?" onClick="markBookComplete(this, ${id});">Completed?
                    
                </div>
        
            </div>`;
        document.getElementById('container').appendChild(div);

        let banner = document.querySelectorAll(`[data-id = '${id}']`).item(0).getElementsByTagName('div')[0];
        
        if (read == true){
            banner.style.display = 'block';
        }
        else{
            banner.style.display = 'none';

        }
    
        }
        
      
        
}

function addBookToLibrary(title, author, pages, imageLink, read, id) {
    //Adding a new book to myLibrary.
    newBook = new Book(title, author, pages, imageLink, read, id)
    myLibrary.push(newBook); 

    saveToLocalData();
    
    const div = document.createElement('div')
    div.className = 'book-container';
    div.innerHTML = `<div data-id=${id} class="book-card">
        <img src="${imageLink}" alt="${title}" style="width: 100%">
        <div id=completed-banner>Completed</div>
        <div class="card-description">
            <a href="#" id="delete-button" onClick="DeleteBook(${id})">X</a>
            <h2>${title}</h2>
            <h3>By: ${author}</h3>
            <p>Pages: ${pages}</p>
            <input type="checkbox" name="Completed?"id="Completed?" onClick="markBookComplete(this, ${id});">Completed?
            
        </div>

    </div>`;
document.getElementById('container').appendChild(div);


}
function markBookComplete(cb, id){
    //Select the node with a data-attribute of id = (bookId), and then select the div element containing the banner.
    let banner = document.querySelectorAll(`[data-id = '${id}']`).item(0).getElementsByTagName('div')[0];
    let objIndex = myLibrary.findIndex(Book => Book.id == id);
    if (cb.checked == true){
        //display completed banner over book
        banner.style.display = "block";
        //update object to read == true
        myLibrary[objIndex].read = true;


        saveToLocalData();
    }
    else{
        //hide completed banner over book
        banner.style.display = "none";
        //update object to read == false
        myLibrary[objIndex].read = false;
        saveToLocalData();
    }
}
function showForm(){
    let form = document.getElementById("form-container");
    form.style.display = "block";
    
}
function hideForm(){
    let form = document.getElementById("form-container");
    form.style.display = "none";
    
}

function createNewBookFromForm(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let imageLink = document.getElementById("image-link").value;
    let read = false;
    if(id == null){
        id = 1;
    }
    else{
        id++;
    }
    
    console.log(`ID:${id}`);

    addBookToLibrary(title, author, pages, imageLink, read, id);
    saveToLocalData();
}

function DeleteBook(id){

    //get index of book object, and remove from array
    let index = myLibrary.findIndex(Book => Book.id == id);
    myLibrary.splice(index, 1);
    
    localStorage.removeItem(`book: ${id}`);

    //Delete book card from website
    let bookCard = document.querySelectorAll(`[data-id = '${id}']`).item(0);
    bookCard.parentElement.remove();
    saveToLocalData();

}


function saveToLocalData(){
    localStorage.setItem("books", JSON.stringify(myLibrary));
}













