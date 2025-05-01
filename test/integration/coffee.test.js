const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const {
	parseCoffeeData,
	newCoffeePayload,
} = require("../utils/coffeeTestUtils");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("static"));

require("../../routes/index")(app);

let coffeePayload;

beforeEach(() => {
	coffeePayload = newCoffeePayload();
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

describe("PUT /coffee/:coffeeId/edit", () => {
	it("should update 'name' property", async () => {
		// create new instance
		await request(app).post("/coffee/new").send(coffeePayload);

		// update
		// -- get the id of created instance
		const coffeeResponse = await request(app).get("/coffee");
		const coffeeData = parseCoffeeData(coffeeResponse.text);

		// -- update name property
		const updatedCoffee = { ...coffeePayload, name: "espresso macchiato" };
		await request(app)
			.put(`/coffee/${coffeeData[0].id}/edit`)
			.send(updatedCoffee);

		// check the result
		const coffeeUpdateResponse = await request(app).get("/coffee");
		const coffeeUpdateData = parseCoffeeData(coffeeUpdateResponse.text);

		expect(coffeeUpdateResponse.status).toEqual(200);
		expect(coffeeUpdateData[0].id).toEqual(coffeeData[0].id);
		expect(coffeeUpdateData[0].name).toEqual(updatedCoffee.name);
	});
});

describe("GET /coffee", () => {
	it("should return a list of 3 coffees", async () => {
		// create 3 instance
		const n = 3;
		for (let i = 0; i < n; i++) {
			coffeePayload = newCoffeePayload();
			await request(app).post("/coffee/new").send(coffeePayload);
		}

		// list all of them
		const coffeeListResponse = await request(app).get("/coffee");
		const coffeeListData = parseCoffeeData(coffeeListResponse.text);

		expect(coffeeListResponse.status).toEqual(200);
		expect(coffeeListData.length).toEqual(n);
	});
});

describe("DELETE /coffee", () => {
	it("should delete coffee with id", async () => {
		// create new instance
		await request(app).post("/coffee/new").send(coffeePayload);

		// delete
		// -- get the id and check if it gets created
		const coffeeResponse = await request(app).get("/coffee");
		const coffeeData = parseCoffeeData(coffeeResponse.text);

		expect(coffeeData.length).toBe(1);

		await request(app).delete(`/coffee/${coffeeData[0].id}/delete`);

		// get the result
		const deleteResponse = await request(app).get("/coffee");
		const emptyData = parseCoffeeData(deleteResponse.text);

		expect(deleteResponse.status).toBe(200);
		expect(emptyData.length).toBe(0);
	});
});
