const { GameState } = require("./GameState");
const { scan, level } = require("rxjs/operators");

const scanGameState = scan((gameState, f) => f(gameState), GameState);

const mapStartLevel = map(getLevel);

module.exports = {
    scanGameState
};
