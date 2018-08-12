const { expect } = require("chai");
const { compose, pipe } = require("ramda");
const {
    GameState, pause, resume, setIsPaused, setLevel, goToMenu, isGameOver,
    updateLevelState, getLevel, setLevelIndex, getLevelIndex, startLevel,
    nextLevel, timeAllowed
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
            const state = pipe(
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
            const state = pipe(
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

    describe(".startLevel()", () => {
        context("level index 1", () => {
            const level = "dummy";
            const levelIndex = 1;
            const result = startLevel(level, levelIndex)(GameState).toObject();

            it("sets the level index to 1", () => {
                expect(result.levelIndex).to.equal(levelIndex);
            });

            it("sets the level to dummy", () => {
                expect(result.level).to.equal(level);
            });
        });
    });

    describe(".nextLevel()", () => {
        const levels = ["dummy", "dummy-2", "dummy-3"];

        context("default -1, level 0 exists", () => {
            const result = nextLevel(levels)(GameState).toObject();

            it("sets levelIndex to 0", () => {
                expect(result.levelIndex).to.equal(0);
            });

            it("sets the level to dummy", () => {
                expect(result.level).to.equal("dummy");
            });
        });

        context("level is last", () => {
            const state = pipe(
                setLevelIndex(2),
                startLevel(levels[2], 2)
            )(GameState);

            const result = nextLevel(levels)(state).toObject();

            it("sets levelIndex to -1", () => {
                expect(result.levelIndex).to.equal(-1);
            });

            it("sets level to null", () => {
                expect(result.level).to.be.null;
            });

            it("sets is complete to true", () => {
                expect(result.isCompleted).to.be.true;
            });
        });
    });

    describe(".timeAllowed", () => {
        context("level is null", () => {
            const result = timeAllowed(GameState);

            it("returns 0", () => {
                expect(result).to.equal(0);
            });
        });

        context("level is 60 bpm", () => {
            const state = setLevel({
                bpm: 60
            })(GameState);

            const result = timeAllowed(state);

            it("returns 1000", () => {
                expect(result).to.equal(1000);
            });
        });

        context("level is 30 bpm", () => {
            const state = setLevel({
                bpm: 30
            })(GameState);

            const result = timeAllowed(state);

            it("returns 2000", () => {
                expect(result).to.equal(2000);
            });
        });
    });
});
