const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();




public_users.post("/register", (req,res) => {
  let {username, password} = req.body;
  
  if (username && password){
    if (isValid(username)) {
      users.push({"user": username, "password": password});
      res.status(201).json({ message: "User registered successfully." });
    } else {
      
      res.status(400).json({message: "User already registered."});
    };
  } else {
    res.status(400).json({message: "Complete the fields."});
  };
  console.log(users);
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const allBooks = new Promise((resolve, reject)=>{
    resolve(JSON.stringify(books, null, 4));
  });
  
  allBooks
  .then((bookL) => res.status(200).send(bookL))
  .catch((err) => res.status(500).json({ message: "Error" }));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const booksbyI = new Promise((resolve, reject) => {
    let isbnN = parseInt(req.params.isbn);
    resolve(books[isbnN]);
  });
  booksbyI
  .then((bookbyI) => res.status(200).send(bookbyI))
  .catch((err) => res.status(500).json({ message: "Error" }));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const booksbyA = new Promise((resolve, reject) => {
    const booksArray = Object.entries(books);
    let authorBooks = booksArray.filter(([key, bookData]) => bookData.author.toLowerCase() === req.params.author.toLowerCase());
    authorBooks = authorBooks.map(([key, bookData]) => bookData);
    resolve(authorBooks);
  });
  booksbyA
  .then((bookbyA) => res.status(200).send (bookbyA))
  .catch((err) => res.status(500).json({ message: "Error" }));
 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  
  const booksbyT = new Promise((resolve, reject) => {
      const booksArray = Object.entries(books);
    let titleBook = booksArray.filter(([key, bookData]) => bookData.title.toLowerCase() === req.params.title.toLowerCase());
    titleBook = titleBook.map(([key, bookData]) => bookData);
    if (titleBook.length != 0){
        resolve(titleBook);
    } else {
        reject("Not found.");
    }
  });

  booksbyT
  .then((tBook)=>res.status(200).send(tBook))
  .catch((err)=>res.status(404).send(err.message()));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    
    const booksArray = Object.entries(books);
    let bookRes = booksArray.filter(([key, bookData]) => parseInt(key) === parseInt(req.params.isbn));
    bookRes = bookRes.map(([key, bookData]) => bookData.reviews);
    res.status(200).send(bookRes);
});

module.exports.general = public_users;
