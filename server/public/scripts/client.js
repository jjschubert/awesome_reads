$(document).ready(function () {
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

let editStatus = '';
let bookToEdit = '';

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  $('#bookShelf').on('click', '.deleteBtn', deleteBook);
  $('#bookShelf').on('click', '.markReadBtn', updateBookStatus);
  $('#bookShelf').on('click', '.editBtn', editBook);
  $('#forCancelBtn').on('click', '#cancelBtn', cancelEdit);
  $('#titleSortBtn').on('click', titleSort);
  $('#authorSortBtn').on('click', authorSort);
}

function authorSort() {
  $.ajax({
    type: 'GET',
    url: '/books/author'
  }).then(function (response) {
    console.log(response);
    renderBooks(response);
  }).catch(function (error) {
    console.log('error in author GET', error);
  });
}

function titleSort() {
  console.log('in title sort');
  refreshBooks();
  
}

function cancelEdit() {
  $('#forCancelBtn').text('');
  $('input').val('');
  //turn title back to add book
  $('#pageTitle').text('Add Book');
  let editStatus = false;
}

function editBook() {
  console.log('in editBook');
  editStatus = true;
  //add cancel button
  $('#forCancelBtn').append(`
  <button class="btn btn-secondary" id='cancelBtn'>Cancel<button>`);
  $('#pageTitle').text('Edit Book');

  //fill inputs for editing
  bookToEdit = $(this).closest('tr').data('book');
  console.log(bookToEdit);
  $("#title").val(bookToEdit.title);
  $("#author").val(bookToEdit.author);
  bookToEdit.editStatus = 'toEdit';
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
  }).catch(function (error) {
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
  }).then(function (response) {
    refreshBooks();
  }).catch(function (error) {
    console.log(error);
  })
};

let book = {};

function handleSubmit() {
  console.log('Submit button clicked.');
  book.author = $('#author').val();
  book.title = $('#title').val();
  if (editStatus === true) {
    book.editStatus = 'toEdit';
    submitEditedBook(book);
  } else {
    addBook(book);
  }
}

function submitEditedBook() {
  console.log('in submitEditedBook');
  console.log(bookToEdit.id);
  $.ajax({
    method: 'PUT',
    url: `/edit/${bookToEdit.id}`,
    data: book
  }).then(function () {
    refreshBooks();
    $('input').val('');
  }).catch(function (error) {
    console.log('Error in submitEditedBook', error);
  })
}

// adds a book to the database
function addBook(bookToAdd) {
  if ($('#title').val() === '' || $('#author').val() === ''  ) {
    alert('All fields are required');
  } else {
    $.ajax({
      type: 'POST',
      url: '/books',
      data: bookToAdd,
    }).then(function (response) {
      console.log('Response from server.', response);
      refreshBooks();
      $('input').val('');
    }).catch(function (error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
  }
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function (response) {
    console.log(response);
    renderBooks(response);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();

  for (let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    let $tr = $(`<tr data-book-id="${book.id}"></tr>`);
    $tr.data('book', book);
    $tr.append(`<td>${book.title}</td>`);
    $tr.append(`<td>${book.author}</td>`);
    $tr.append(`<td>${book.status}</td>`);
    $tr.append(`<td><button class="btn btn-outline-dark btn-sm markReadBtn">Mark as Read</button></td>`);
    $tr.append(`<td><button class="btn btn-outline-dark btn-sm editBtn">Edit</button></td>`)
    $tr.append(`<td><button class="btn btn-outline-dark btn-sm deleteBtn">Delete</button></td>`);
    $('#bookShelf').append($tr);
  }
}
