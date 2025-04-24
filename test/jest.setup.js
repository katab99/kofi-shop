const express = require("express");
const { connectDB, disconnectDB, mongoose } = require("../config/db");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();
	await connectDB(mongoUri);
});

afterAll(async () => {
	await disconnectDB();
	await mongoServer.stop();
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.deleteMany({});
	}
});
