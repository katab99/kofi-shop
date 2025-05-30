const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");

const parseCoffeeData = (text) => {
	const $ = cheerio.load(text);

	const coffeeRows = $("table.table tbody tr").not(":first-child");

	return coffeeRows
		.map((_, row) => {
			const cells = $(row).find("td");
			const href = $(cells[3]).find("a.btn-primary").attr("href") || "";
			const idMatch = href.match(/\/coffee\/(.+?)\/edit/);
			const id = idMatch ? idMatch[1] : null;

			return {
				id: id,
				name: $(cells[0]).text().trim(),
				price: parseFloat($(cells[1]).text().trim()),
				state: $(cells[2]).text().trim(),
			};
		})
		.get();
};

const newCoffeePayload = () => {
	return {
		name: `kofi-${uuidv4()}`,
		price: Math.floor(Math.random() * 1000) + 1, // 1 - 1000
		state: "available",
	};
};

module.exports = { parseCoffeeData, newCoffeePayload };
