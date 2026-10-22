const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.status(200).send (JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbnN = parseInt(req.params.isbn);
  res.status(200).send (books[isbnN]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const booksArray = Object.entries(books);
  let authorBooks = booksArray.filter(([key, bookData]) => bookData.author.toLowerCase() === req.params.author.toLowerCase());
  authorBooks = authorBooks.map(([key, bookData]) => bookData);

  res.status(200).send(authorBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const booksArray = Object.entries(books);
  let titleBook = booksArray.filter(([key, bookData]) => bookData.title.toLowerCase() === req.params.title.toLowerCase());
  titleBook = titleBook.map(([key, bookData]) => bookData);
  res.status(200).send(titleBook);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const booksArray = Object.entries(books);
    let bookRes = booksArray.filter(([key, bookData]) => parseInt(key) === parseInt(req.params.isbn));
    //bookRes = bookRes.map(([key, bookData]) => bookData.reviews);
    res.status(200).send(bookRes);
});

module.exports.general = public_users;
