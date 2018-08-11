const { expect } = require("chai");
const { loadIngredients, Ingredient } = require("../src/Ingredients");

describe("Ingredients", () => {
    describe(".loadIngredient", () => {
        context("given some ingredients in JSON format", () => {
            const ingredients = [
                {
                    "name": "mushroom",
                    "chopPattern": [1, 2, 1, 1]
                }
            ];

            const result = loadIngredients(ingredients);

            it("returns it mapped to the Ingredient object", () => {
                const mushroom = new Ingredient("mushroom", [1, 2, 1, 1]);

                expect(result[0]).to.deep.equal(mushroom);
            });
        });
    });
});
