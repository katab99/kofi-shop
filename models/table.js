const Schema = require("mongoose").Schema;
const { mongoose } = require("../config/db");

const Table = mongoose.model("Table", {
	num: Number,
	state: String,
	_orders: [
		{
			type: Schema.Types.ObjectId,
			ref: "Coffee",
		},
	],
});

module.exports = Table;
