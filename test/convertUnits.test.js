const { expect } = require("chai");
const { getPounds, getFeetAndInches } = require("../util/convertUnits");

describe("unit conversion helpers", () => {
	describe("getPounds", () => {
		// Weight of Snorlax
		it('should convert 4600 hectograms to "1014 pounds"', async () => {
			expect(getPounds(4600)).to.eq("1014 pounds");
		});
		// Weight of Gengar
		it('should convert 400 hectograms to "88 pounds"', async () => {
			expect(getPounds(400)).to.eq("88 pounds");
		});
		// Weight of Scyther
		it('should convert 560 hectograms to "123 pounds"', async () => {
			expect(getPounds(560)).to.eq("123 pounds");
		});
	});
	describe("getFeetAndInches", () => {
		// Height of Gengar
		it('should convert 15 decimeters to "4 feet 11 inches"', async () => {
			expect(getFeetAndInches(15)).to.eq("4 feet 11 inches");
		});
		// Height of Snorlax
		it('should convert 21 decimeters to "6 feet 10 inches"', async () => {
			expect(getFeetAndInches(21)).to.eq("6 feet 10 inches");
		});
		// Height of Gyarados
		it('should convert 65 decimeters to "21 feet 3 inches"', async () => {
			expect(getFeetAndInches(65)).to.eq("21 feet 3 inches");
		});
	});
});
