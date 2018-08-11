const { expect } = require("chai");
const { compose } = require("ramda");
const {
    GameState, pause, resume, setIsPaused, setLevel, goToMenu, isGameOver,
    updateLevelState, getLevel, setLevelIndex, getLevelIndex
} = require("../src/GameState");
const { setStartTime } = require("../src/LevelState");

describe("GameState", () => {
    describe(".pause()", () => {
        const result = pause(GameState).toObject();

        it("sets isPaused to true", () => {
            expect(result.isPaused).to.be.true;
        });
    });

    describe(".resume()", () => {
        context("paused", () => {
            const state = setIsPaused(true)(GameState);
            const result = resume(state).toObject();

            it("sets isPaused to false", () => {
                expect(result.isPaused).to.be.false;
            });
        });
    });

    describe(".goToMenu()", () => {
        context("level is set and it's paused", () => {
            const state = compose(
                pause,
                setLevel("dummy"),
                setLevelIndex(10)
            )(GameState);

            const result = goToMenu(state).toObject();

            it("sets level to null", () => {
                expect(result.level).to.be.null;
            });

            it("sets isPaused to false", () => {
                expect(result.isPaused).to.be.false;
            });

            it("sets levelIndex to -1", () => {
                expect(result.levelIndex).to.equal(-1);
            });
        });
    });

    describe(".isGameOver()", () => {
        context("default state, with null level", () => {
            const time = 1000;
            const result = isGameOver(time)(GameState);

            it("returns true", () => {
                expect(result).to.be.true;
            });
        });

        context("level where the time limit hasn't exceeded", () => {
            const time = 1002;
            const state = compose(
                setLevel({
                    timeLimit: 5
                }),
                updateLevelState(setStartTime(1000))
            )(GameState);
            const result = isGameOver(time)(state);

            it("returns false", () => {
                expect(result).to.be.false;
            });
        });

        context("level where the time limit has exceeded", () => {
            const time = 1007;
            const state = compose(
                setLevel({
                    timeLimit: 5
                }),
                updateLevelState(setStartTime(1000))
            )(GameState);
            const result = isGameOver(time)(state);

            it("returns true", () => {
                expect(result).to.be.true;
            });
        });
    });
});
