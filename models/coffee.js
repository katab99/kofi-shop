const Schema = require("mongoose").Schema;
const { mongoose } = require("../config/db");

const Coffee = mongoose.model("Coffee", {
	name: String,
	price: Number,
	state: String,
});

module.exports = Coffee;
