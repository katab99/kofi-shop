const express = require("express")
const app = express()
app.set("view engine", "ejs")

app.use(express.static("static"))

// Load routing
require('./routes/index')(app);

const server = app.listen(3000, () => {
  console.log("Server running at http://localhost:" + server.address().port);
});
