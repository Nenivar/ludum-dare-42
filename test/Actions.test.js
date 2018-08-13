const { expect } = require("chai");
const { GameState } = require("../src/GameState");
const {
    loadFirstLevel: lfl, startLevel, resetLevelState, moveNextToBench
} = require("../src/Actions");
const levels = require("../src/levels.json");
const { pipe, find, equals } = require("ramda");
const ingredients = require("../src/ingredients.json");

describe("Actions", () => {
    const loadFirstLevel = lfl({ levels, ingredients });

    const loadedState = pipe(
        loadFirstLevel,
        startLevel(1000)
    )(GameState);

    describe(".loadFirstLevel()", () => {
        context("default GameState", () => {
            const result = loadFirstLevel(GameState);
            const level = levels[0];

            it("sets the levelIndex to 0", () => {
                expect(result.get("levelIndex")).to.equal(0);
            });

            it("sets the level to the first level", () => {
                expect(result.get("level")).to.equal(level);
            });

            it("sets the itemsOffScreen to the level ingredients", () => {
                const items = level.ingredients.map(name => (
                    find(item => equals(item.name, name), ingredients)
                ));

                expect(result.get("itemsOffScreen")).to.deep.equal(items);
            });

            it("sets the itemsOnBench to []", () => {
                expect(result.get("itemsOnBench")).to.deep.equal([]);
            });
        });
    });

    describe(".startLevel()", () => {
        context("loaded first level", () => {
            const state = loadFirstLevel(GameState);
            const result = startLevel(1000)(state);

            it("sets the levelState startTime to the given time", () => {
                expect(result.get("startTime")).to.equal(1000);
            });
        });
    });

    describe(".resetLevelState()", () => {
        context("loaded and started the first level", () => {
            const result = resetLevelState(loadedState);

            it("sets the startTime to 0", () => {
                expect(result.get("startTime")).to.equal(0);
            });
        });
    });

    describe(".moveNextToBench()", () => {
        context("loaded and started the first level", () => {
            const result = moveNextToBench(loadedState);

            it("appends the item to the bench", () => {
                expect(result.get("itemsOnBench")[0]).to.equal(loadedState.get("itemsOffScreen")[0]);
            });

            it("removes the item from off screen", () => {
                expect(result.get("itemsOffScreen").length).to.equal(loadedState.get("itemsOffScreen").length - 1);
            });
        });
    });
});
