const { Map } = require("immutable");

const GameState = Map({
    levelIndex: -1,
    level: null
});

module.exports = { GameState };
