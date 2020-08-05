$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  $('#bookShelf').on('click', '.deleteBtn', deleteBook)
  $('#bookShelf').on('click', '.markReadBtn', updateBookStatus)
}

function updateBookStatus() {
  console.log('in status clicker');
  let idToUpdate = $(this).closest('tr').data('book-id');
  let status = {
    status: 'read',
  };

  $.ajax({
    method: 'PUT',
    url: `/books/${idToUpdate}`,
    data: status
  }).then(function () {
    refreshBooks();
  }).catch(function(error){
    console.log(error);
  });
}


function deleteBook() {
  console.log('delete clicker');
  let idToDelete = $(this).closest('tr').data('book-id')
  console.log(idToDelete);
  $.ajax({
    method: 'DELETE',
    url: `/books/${idToDelete}`
  }).then(function(response) {
    refreshBooks();
  }).catch(function(error) {
    console.log(error);
  })
};

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();

  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    let $tr = $(`<tr data-book-id="${book.id}"></tr>`);
    $tr.data('book', book);
    $tr.append(`<td>${book.title}</td>`);
    $tr.append(`<td>${book.author}</td>`);
    $tr.append(`<td>${book.status}</td>`);
    $tr.append(`<td><button class="markReadBtn">Mark as Read</button></td>`);
    $tr.append(`<td><button class="deleteBtn">Delete</button></td>`);
    $('#bookShelf').append($tr);
  }
}
