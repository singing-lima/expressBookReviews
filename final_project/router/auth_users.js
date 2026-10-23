const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

//let users = [];
let users = [
  {"user": "Carlos", "password": "pass"}, 
  {"user": "Ruben", "password": "pass2"}];

const isValid = (username)=>{ //returns boolean
    let result = users.filter(userOfL => userOfL.user.toLowerCase() === username.toLowerCase());
    return result.length === 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  return users.some(user => user.user === username && user.password === password);
   
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  let {username, password} = req.body
  if (username && password) {
    if (authenticatedUser(username, password)){
        let accessToken = jwt.sign({user: username}, "secret", {expiresIn: 60 * 60});
        req.session.authorization = {accessToken, username};
        res.status(201).json({ message: "Access successful." });
    }else {
        res.status(400).json({message: "User or password invalid."});
    };
  } else {
    res.status(400).json({message: "Complete the fields."});
  };
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
