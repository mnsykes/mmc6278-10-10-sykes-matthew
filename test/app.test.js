const { expect } = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const { JSDOM } = require("jsdom");
const nock = require("nock");
const app = require("../app");
const pokeUtil = require("../util/pokemon");

const POKEMON_DATA = {
	name: "gengar",
	sprite:
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
	types: ["ghost", "poison"],
	height: "4 feet 11 inches",
	weight: "89 pounds"
};

describe("Server Routes", () => {
	describe("GET / - pokemon form", () => {
		it("should return 200 status", async () => await request(app).get("/").expect(200));
		it("should return content-type html header", async () => {
			await request(app).get("/").expect(200).expect("content-type", /html/);
		});
		it('should render form with action of "/pokemon"', async () => {
			const res = await request(app).get("/").expect(200);
			const {
				window: { document }
			} = new JSDOM(res.text);
			expect(document.querySelector("form")).to.exist;
		});
		it('should return input element with name attribute of "name"', async () => {
			const res = await request(app).get("/").expect(200);
			const {
				window: { document }
			} = new JSDOM(res.text);
			const pokemon_name = document.querySelector('[name="name"]');
			expect(pokemon_name).to.exist;
		});
	});
	describe("GET /pokemon - pokemon info page", () => {
		let pokeStub;
		before(() => {
			nock.disableNetConnect();
			nock.enableNetConnect("127.0.0.1");
		});
		beforeEach(() => {
			pokeStub = sinon.stub(pokeUtil, "getPokemon").resolves(POKEMON_DATA);
		});
		afterEach(sinon.restore);
		after(() => {
			nock.cleanAll();
			nock.enableNetConnect();
		});
		it("should redirect to / if name query param not included", async () => {
			await request(app).get("/pokemon").expect(302).expect("location", "/");
		});
		it("/pokemon?name=pokemonName should render pokemon name", async () => {
			const res = await request(app).get("/pokemon?name=banana").expect(200);
			expect(pokeStub.calledWith("banana"));
			const {
				window: { document }
			} = new JSDOM(res.text);
			const nameEl = document.querySelector('[data-test-id="pokemon-name"]');
			expect(nameEl.textContent).to.include(POKEMON_DATA.name);
		});
		it("/pokemon?name=pokemonName should render pokemon image", async () => {
			const res = await request(app).get("/pokemon?name=pokemonName").expect(200);
			expect(pokeStub.calledWith("banana"));
			const {
				window: { document }
			} = new JSDOM(res.text);
			const pokemon_img = document.querySelector("img");
			expect(pokemon_img.src).to.include(POKEMON_DATA.sprite);
		});
		it("/pokemon?name=pokemonName should render pokemon types", async () => {
			const res = await request(app).get("/pokemon?name=pokemonName").expect(200);
			expect(pokeStub.calledWith("banana"));
			const {
				window: { document }
			} = new JSDOM(res.text);
			const pokemon_type = document.querySelector("p");
			expect(pokemon_type.textContent).to.include(POKEMON_DATA.types[0]);
		});
		it("/pokemon?name=pokemonName should render pokemon height", async () => {
			const res = await request(app).get("/pokemon?name=pokemonName").expect(200);
			expect(pokeStub.calledWith("banana"));
			const {
				window: { document }
			} = new JSDOM(res.text);
			const pokemon_height = document.querySelector('[data-test-id="height"]');
			expect(pokemon_height.textContent).to.include(POKEMON_DATA.height);
		});
		it("/pokemon?name=pokemonName should render pokemon weight", async () => {
			const res = await request(app).get("/pokemon?name=pokemonName").expect(200);
			expect(pokeStub.calledWith("banana"));
			const {
				window: { document }
			} = new JSDOM(res.text);
			const pokemon_weight = document.querySelector('[data-test-id="weight"]');
			expect(pokemon_weight.textContent).to.include(POKEMON_DATA.weight);
		});
		it('should render "Pokemon not found" if given non-existent pokemon', async () => {
			pokeStub.restore();
			sinon.stub(pokeUtil, "getPokemon").rejects(new Error("oh no"));
			const res = await request(app).get("/pokemon?name=banana").expect(200);
			expect(pokeStub.calledWith("banana"));
			expect(res.text).to.match(/pokemon not found/i);
		});
	});
});
