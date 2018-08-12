const { updateLevelState } = require("../src/GameState");
const {
    setIsGameOver, getIngredientBeingChopped, setLastChopTime, getLastChopTime
} = require("../src/LevelState");
const { isNil, compose } = require("ramda");

const chop = time => gameState => (
    updateLevelState(levelState => {
        const lastChopTime = getLastChopTime(levelState);
        const threshold = 150;

        if (isNil(getIngredientBeingChopped(levelState))) {
            return setIsGameOver(true)(levelState);
        } else if (
                time < lastChopTime - threshold) {
                //time > lastChopTime + threshold) {
            return setIsGameOver(true)(levelState);
        }

        return setLastChopTime(time)(levelState);
    })(gameState)
);

module.exports = {
    chop
};
