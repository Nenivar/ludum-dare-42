const { LevelState } = require("./LevelState");
const { scan } = require("rxjs/operators");

const scanLevelState = scan((levelState, f) => f(levelState), LevelState);

module.exports = {
    scanLevelState
};
