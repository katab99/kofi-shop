const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { parseCoffeeData } = require("../utils/coffeeTestUtils");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("static"));

require("../../routes/index")(app);

const CoffeeModel = require("../../models/coffee");
let coffeePayload;

beforeEach(() => {
	coffeePayload = {
		name: `kofi-${uuidv4()}`,
		price: 123,
		state: "available",
	};
});

//to make sure testing works - DELETE LATER
describe("GET / ", () => {
	it("should return the index page", async () => {
		const res = await request(app)
			.get("/")
			.expect(200)
			.expect("Content-Type", /html/);

		expect(res.text).toContain("Kofi Shop");
	});
});

// DELETE LATER
describe("GET /coffee", () => {
	it("should return a list of coffees and render the coffee-list view", async () => {
		const res = await request(app)
			.get("/coffee")
			.expect(200)
			.expect("Content-Type", /html/);

		expect(res.text).toContain("Coffees");
	});
});

describe("POST /coffee/new", () => {
	it("should create a new coffee", async () => {
		const response = await request(app).post("/coffee/new").send(coffeePayload);
		expect(response.status).toBe(302);

		const coffeeListResponse = await request(app).get("/coffee");
		expect(coffeeListResponse.status).toBe(200);

		const coffeeData = parseCoffeeData(coffeeListResponse.text);
		expect(coffeeData[0].name).toEqual(coffeePayload.name);
		expect(coffeeData[0].price).toEqual(coffeePayload.price);
		expect(coffeeData[0].state).toEqual(coffeePayload.state);
	});
});

describe("POST /coffee/:coffeeId/edit", () => {
	it("should update 'name' property", async () => {
		// -- create new instance
		await request(app).post("/coffee/new").send(coffeePayload);

		// -- update
		// get the id of created instance
		const coffeeResponse = await request(app).get("/coffee");
		const coffeeData = parseCoffeeData(coffeeResponse.text);

		// update name property
		const updatedCoffee = { ...coffeePayload, name: "espresso macchiato" };
		await request(app)
			.post(`/coffee/${coffeeData[0].id}/edit`)
			.send(updatedCoffee);

		// -- check the result
		const coffeeUpdateResponse = await request(app).get("/coffee");
		const coffeeUpdateData = parseCoffeeData(coffeeUpdateResponse.text);

		expect(coffeeUpdateResponse.status).toEqual(200);
		expect(coffeeUpdateData[0].id).toEqual(coffeeData[0].id);
		expect(coffeeUpdateData[0].name).toEqual(updatedCoffee.name);
	});
});

// TODO : list of coffees
describe("GET /coffee", () => {
	it("should return a list of coffees", async () => {
		console.log("under construction 🚧");
		// create
		// list
	});
});

// TODO : delete coffee
describe("DELETE /coffee", () => {
	it("should delete coffee with id", async () => {
		console.log("under construction 🚧");
		// delete
		// get
	});
});
