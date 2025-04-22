const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static("static"));

// Load routing
require("./routes/index")(app);

// Connect to database
connectDB();

app.use((err, req, res, next) => {
	res.end("Problem with status code: " + err.statusCode);
	console.log(err);
});

const server = app.listen(3000, () => {
	console.log("Server running at http://localhost:" + server.address().port);
});
