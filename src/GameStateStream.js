const { GameState, getLevel, getLevelIndex } = require("./GameState");
const { scan, level, map, distinctUntilChanged } = require("rxjs/operators");

const scanGameState = scan((gameState, f) => f(gameState), GameState);

const mapStartLevel = distinctUntilChanged((p, q) => (
    getLevelIndex(p) === getLevelIndex(q)
));

module.exports = {
    scanGameState
};
