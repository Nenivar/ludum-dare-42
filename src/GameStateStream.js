const { GameState, getLevel } = require("./GameState");
const { scan, level, map } = require("rxjs/operators");

const scanGameState = scan((gameState, f) => f(gameState), GameState);

const mapStartLevel = map(getLevel);

module.exports = {
    scanGameState
};
