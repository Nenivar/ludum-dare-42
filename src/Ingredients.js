const { map } = require("ramda");

function Ingredient(name, chopPattern) {
    this.name = name;
    this.chopPattern = chopPattern;
}

const loadIngredients = map(({ name, chopPattern }) => (
    new Ingredient(name, chopPattern)
));

module.exports = {
    Ingredient, loadIngredients
};
