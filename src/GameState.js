const { Map } = require("immutable");

const GameState = Map({
    levelIndex: -1,
    level: null,
    startTime: 0,
    itemsOffScreen: null,
    itemsOnBench: null
});

module.exports = { GameState };
