$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);

  // TODO - Add code for edit & delete buttons
  $('#bookShelf').on('click', '.deleteButton', handleDelete);
}

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
    let $tr = $('<tr></tr>');
    $tr.data('bookId', book.id);
    $tr.append(`<td>${book.title}</td>`);
    $tr.append(`<td>${book.author}</td>`);
    // delete button
    $tr.append(`<td><button class="deleteButton">Delete Book</button></td>`);
    $('#bookShelf').append($tr);
  }
}

// remove a book
function handleDelete() {
  console.log('clicked delete');
  // get the book's id from the DOM
  // start at button
  let bookId = $(this).parent().parent().data('bookId');
  console.log('book id: ', bookId);

  // tell server to delete this specific book
  // route: /books/18
  $.ajax({
    method: 'DELETE',
    // url: '/books/' + bookId,
    url: `/books/${bookId}`,
  })
  .then(function(response) {
    console.log('Response from server.', response);
    refreshBooks(); // go get all the books, again
  })
  .catch(function(error) {
    console.log('Error in DELETE', error)
    alert('Unable to remove book at this time. Please try again later.');
  });

}
