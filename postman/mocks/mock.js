const http = require("http");

const PORT = process.env.PORT || 4510;

// Response data from collection examples

// GET /books - List Books
const listBooksResponse = {
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify([
    {
      "id": "ZUST9JFx-Sd9X0k",
      "title": "Ficciones",
      "author": "Jorge Luis Borges",
      "genre": "fiction",
      "yearPublished": 1944,
      "checkedOut": true,
      "isPermanentCollection": false,
      "createdAt": "2021-06-02 17:37:38"
    },
    {
      "id": "bJmPVX5oFzAQJwI",
      "title": "Dust Tracks on a Road",
      "author": "Zora Neale Hurston",
      "genre": "biography",
      "yearPublished": 1942,
      "checkedOut": true,
      "isPermanentCollection": false,
      "createdAt": "2021-06-02 17:37:38"
    }
  ])
};

// POST /books - Create Book
const createBookResponse = {
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    "id": "7f04875b-9201-4c8f-b381-18370f9b2dfb",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "fiction",
    "yearPublished": 1925,
    "checkedOut": false,
    "isPermanentCollection": false,
    "createdAt": "2024-09-27T15:48:46.962Z"
  })
};

// GET /books/:id - Get Book (success)
const getBookResponse = {
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    "id": "7f04875b-9201-4c8f-b381-18370f9b2dfb",
    "title": "Rubber maroon",
    "author": "Gabriel García Márquez",
    "genre": "fiction",
    "yearPublished": 1967,
    "checkedOut": false,
    "isPermanentCollection": false,
    "createdAt": "2024-09-27T15:59:14.438Z"
  })
};

// PUT /books/:id - Update Book
const updateBookResponse = {
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    "id": "7f04875b-9201-4c8f-b381-18370f9b2dfb",
    "title": "The Great Gatsby (Updated)",
    "author": "F. Scott Fitzgerald",
    "genre": "fiction",
    "yearPublished": 1925,
    "checkedOut": false,
    "isPermanentCollection": false,
    "createdAt": "2024-09-27T15:48:46.962Z"
  })
};

// DELETE /books/:id - Delete Book
const deleteBookResponse = {
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    "message": "Book successfully removed."
  })
};

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url.split("?")[0]; // strip query params

  // Match /books/:id pattern
  const bookByIdPattern = /^\/books\/([^/]+)$/;
  const bookByIdMatch = url.match(bookByIdPattern);

  // @endpoint GET /books
  if (method === "GET" && url === "/books") {
    console.log("Matched: GET /books - List Books");
    res.writeHead(listBooksResponse.statusCode, listBooksResponse.headers);
    res.end(listBooksResponse.body);

  // @endpoint POST /books
  } else if (method === "POST" && url === "/books") {
    console.log("Matched: POST /books - Create Book");
    res.writeHead(createBookResponse.statusCode, createBookResponse.headers);
    res.end(createBookResponse.body);

  // @endpoint GET /books/:id
  } else if (method === "GET" && bookByIdMatch) {
    const id = bookByIdMatch[1];
    console.log(`Matched: GET /books/:id - Get Book (id=${id})`);
    res.writeHead(getBookResponse.statusCode, getBookResponse.headers);
    res.end(getBookResponse.body);

  // @endpoint PUT /books/:id
  } else if (method === "PUT" && bookByIdMatch) {
    const id = bookByIdMatch[1];
    console.log(`Matched: PUT /books/:id - Update Book (id=${id})`);
    res.writeHead(updateBookResponse.statusCode, updateBookResponse.headers);
    res.end(updateBookResponse.body);

  // @endpoint DELETE /books/:id
  } else if (method === "DELETE" && bookByIdMatch) {
    const id = bookByIdMatch[1];
    console.log(`Matched: DELETE /books/:id - Delete Book (id=${id})`);
    res.writeHead(deleteBookResponse.statusCode, deleteBookResponse.headers);
    res.end(deleteBookResponse.body);

  // Fallback 404
  } else {
    console.log(`No match for: ${method} ${url}`);
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: { code: 404, message: "Not Found" } }));
  }
});

server.listen(PORT, () => {
  console.log(`New Book From Spec mock server running on port ${PORT}`);
});
