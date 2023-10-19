const axios = require("axios").default;
const express = require("express");
let books = require("./booksdb.js");
const bookarry = Object.values(books);
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", async (req, res) => {
  //Write your code here
  if (isValid(req.body.username)) {
    return res.status(300).json({ message: "The User Allready Exsit" });
  } else {
    const { username, password } = req.body;
    await users.push({ username: username, password: password });

    return res
      .status(300)
      .json({ message: "You are Registered ! ", data: { username } });
  }
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  const getallbook = await JSON.stringify(bookarry);

  return res.status(200).json({ data: getallbook });
});

//axios with async and await  you ned to call this  function getaxios();
async function getaxios() {
  await axios
    .get("http://127.0.0.1:5000/")
    .then((response) => {
      return console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  const getbookbyisbn = await books[req.params.isbn];
  if (getbookbyisbn) {
    return res
      .status(200)
      .json({ message: "get book by  isbn", data: getbookbyisbn });
  } else {
    res.json({ message: "Invalid Id" }).status(404);
  }
});
//axios with async and await  you ned to call this  getisbnaxios(req.params.isbn);
async function getisbnaxios(isbn) {
  await axios
    .get(`http://127.0.0.1:5000/isbn/${isbn}`)
    .then((response) => {
      return console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const getbookbyauthors = bookarry.filter(
    (book) => book.author == req.params.author
  );
  if (getbookbyauthors) {
    return res.status(200).json({
      message: "Get  All Book Base on author",
      data: getbookbyauthors,
    });
  } else {
    res.json({ message: "Invalid author name" }).status(404);
  }
});
//axios with async and await  you ned to call this  getaxiosbasonauthor(req.params.author);;

async function getaxiosbasonauthor(author) {
  await axios
    .get(`http://127.0.0.1:5000/author/${author}`)
    .then((response) => {
      return console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const getbookbytitle = bookarry.filter(
    (book) => book.title == req.params.title
  );
  if (getbookbytitle) {
    return res
      .status(200)
      .json({ message: "Get All book base  on title ", data: getbookbytitle });
  } else {
    res.json({ message: "Invalid title name" }).status(404);
  }
});

//axios with async and await  you ned to call this  getaxiosbasontitle(req.params.title);;

async function getaxiosbasontitle(title) {
  await axios
    .get(`http://127.0.0.1:5000/title/${title}`)
    .then((response) => {
      return console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const getbookreviewbyisbn = books[req.params.isbn]["reviews"];
  if (getbookreviewbyisbn) {
    return res
      .status(300)
      .json({ message: "get review by isbn", data: getbookreviewbyisbn });
  } else {
    res.json({ message: "Invalid isbn num" }).status(404);
  }
});

module.exports.general = public_users;
