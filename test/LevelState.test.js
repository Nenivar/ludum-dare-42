const { expect } = require("chai");
const {
    LevelState, missedABeat, getBeatsMissed, addIngredient,
    getIngredientsOnBench, removeNextFromBench, moveNextOnChoppingBoard,
    getIngredientBeingChopped, getStepsThrough, setStepsThrough
} = require("../src/LevelState");
const { pipe } = require("ramda");

describe("LevelState", () => {
    const mushroom = "mushroom";
    const onion = "onion";

    describe(".missedABeat()", () => {
        context("default level state", () => {
            const result = missedABeat(LevelState);

            it("sets missedBeats to 1", () => {
                expect(getBeatsMissed(result)).to.equal(1);
            });
        });
    });

    describe(".addIngredient()", () => {
        context("adds mushroom", () => {
            const result = addIngredient(mushroom)(LevelState);

            it("sets ingredients to [mushroom]", () => {
                expect(getIngredientsOnBench(result)).to.deep.equal([mushroom]);
            });
        });

        context("adds mushroom and onion", () => {
            const result = pipe(
                addIngredient(mushroom),
                addIngredient(onion)
            )(LevelState);

            it("sets ingredients to [mushroom, onion]", () => {
                const expected = [mushroom, onion];

                expect(getIngredientsOnBench(result)).to.deep.equal(expected);
            });
        });
    });

    describe(".removeNextFromBench()", () => {
        context("[mushroom, onion] on the bench", () => {
            const state = pipe(
                addIngredient(mushroom),
                addIngredient(onion)
            )(LevelState);

            const result = removeNextFromBench(state);

            it("sets it to [onion]", () => {
                expect(getIngredientsOnBench(result)).to.deep.equal([onion]);
            });
        });
    });

    describe(".moveNextOnChoppingBoard()", () => {
        context("[mushroom, onion] on the bench, 10 steps through", () => {
            const state = pipe(
                addIngredient(mushroom),
                addIngredient(onion),
                setStepsThrough(10)
            )(LevelState);

            const result = moveNextOnChoppingBoard(state);

            it("sets the bench to [onion]", () => {
                expect(getIngredientsOnBench(result)).to.deep.equal([onion]);
            });

            it("sets the bench to mushroom", () => {
                expect(getIngredientBeingChopped(result)).to.equal(mushroom);
            });

            it("sets the setsThrough to 0", () => {
                expect(getStepsThrough(result)).to.equal(0);
            });
        });
    });
});
