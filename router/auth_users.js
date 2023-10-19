const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const bookarry = Object.values(books);
const regd_users = express.Router();
const accesstoken = "klajsdlkfh24";
let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  const checkusername = users.filter((user) => {
    return user.username === username;
  });
  if (checkusername.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  const checkuserandpass = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (checkuserandpass.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;
  if (user || pass) {
    if (!isValid(user)) {
      return res.status(300).json({ message: "The user dose not exsit" });
    }
    if (authenticatedUser(user, pass)) {
      const token = jwt.sign({ password: users.password }, accesstoken, {
        expiresIn: "60m",
      });
      req.session.authorization = {
        token,
        user,
      };
      return res.status(300).json({ message: "Welcome " });
    } else {
      return res
        .status(300)
        .json({ message: "Invalid User name And Password" });
    }
  } else {
    return res.status(300).json({ message: "Your Must Enter your user name " });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  const isbn = req.params.isbn;
   let checkisbn=books[isbn];
 if(checkisbn){
  const user = req.session.authorization['user'];
  const book=  books[isbn]={'reviews':{Isbn:req.params.isbn ,user:user}};
    return res
   .status(300)
   .json({ message: "your book reviewed ",data:book });
 }
else{
  return res
  .status(300)
  .json({ message: "your not exsited "});
 }
 });

 //delete review book 
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
   let checkisbn=books[isbn];
 if(checkisbn){
  
  const book=  books[isbn]={'reviews':{}};
   return res
   .status(300)
   .json({ message: "your book review deleted !"});
 }
else{
  return res
  .status(300)
  .json({ message: "your isbn exsited "});
 
}
  
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
