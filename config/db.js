require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async (uri = process.env.KOFI_DB_URI) => {
	await mongoose.connect(uri).then(() => {
		console.log("MongoDB Connected");
	});
};

const disconnectDB = async () => {
	await mongoose.connection.close();
};

module.exports = { connectDB, disconnectDB, mongoose };
