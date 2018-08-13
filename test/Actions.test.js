const { expect } = require("chai");
const { GameState } = require("../src/GameState");
const { loadFirstLevel } = require("../src/Actions");
const levels = require("../src/levels.json");

describe("Actions", () => {
    describe(".loadFirstLevel", () => {
        context("default GameState", () => {
            const result = loadFirstLevel(levels)(GameState);

            it("sets the levelIndex to 0", () => {
                expect(result.get("levelIndex")).to.equal(0);
            });

            it("sets the level to the first level", () => {
                expect(result.get("level")).to.equal(levels[0]);
            });
        });
    });
});
