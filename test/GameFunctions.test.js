const { expect } = require("chai");
const { LevelState } = require("../src/LevelState");
const {
    GameState, setLevelState, updateLevel, setLevel
} = require("../src/GameState");
const { chop } = require("../src/GameFunctions");
const { Map } = require("immutable");
const { Ingredient } = require("../src/Ingredients");
const { pipe } = require("ramda");

describe("GameFunctions", () => {
    const mushroom = new Ingredient("mushroom", [1, 2, 2, 1]);

    describe(".chop()", () => {
        context("nothing on the chopping board", () => {
            const result = chop(1000)(GameState).toJS();

            it("sets isGameOver to true", () => {
                expect(result.levelState.isGameOver).to.be.true;
            });
        });

        context("it's on the time", () => {
            const levelState = Map({
                startTime: 0,
                lastChopTime: 0,
                levelState: LevelState,
                ingredientBeingChopped: mushroom,
                isGameOver: false
            });

            const state = pipe(
                setLevelState(levelState),
                setLevel({
                    bpm: 60
                })
            )(GameState);

            const result = chop(1000)(state).toJS();

            it("sets isGameOver to false", () => {
                expect(result.levelState.isGameOver).to.be.false;
            });

            it("sets the last chop time to the given time", () => {
                expect(result.levelState.lastChopTime).to.equal(1000);
            });

            it("sets the chopping item to null", () => {
                expect(result.levelState.ingredientBeingChopped).to.be.null;
            });
        });

        context("it's before the time", () => {
            const levelState = Map({
                startTime: 0,
                lastChopTime: 0,
                levelState: LevelState,
                ingredientBeingChopped: mushroom,
                isGameOver: false
            });

            const state = pipe(
                setLevelState(levelState),
                setLevel({
                    bpm: 60
                })
            )(GameState);

            const result = chop(800)(state).toJS();

            it("sets isGameOver to true", () => {
                expect(result.levelState.isGameOver).to.be.true;
            });
        });

        context("it's after the time", () => {
            const levelState = Map({
                startTime: 0,
                lastChopTime: 0,
                levelState: LevelState,
                ingredientBeingChopped: mushroom,
                isGameOver: false
            });

            const state = pipe(
                setLevelState(levelState),
                setLevel({
                    bpm: 60
                })
            )(GameState);

            const result = chop(1200)(state).toJS();

            it("sets isGameOver to true", () => {
                expect(result.levelState.isGameOver).to.be.true;
            });
        });
    });
});
