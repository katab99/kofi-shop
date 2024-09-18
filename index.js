const express = require("express");
const app = express();

// TODO : add routing filegit init -b main

app.use(express.static("static"));

const server = app.listen(3000, () => {
  console.log("Server running at http://localhost:" + server.address().port);
});
