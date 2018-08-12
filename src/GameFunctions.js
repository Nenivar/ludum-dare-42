const { updateLevelState, timeAllowed } = require("../src/GameState");
const {
    setIsGameOver, getIngredientBeingChopped, setLastChopTime, getLastChopTime,
    setIngredientBeingChopped
} = require("../src/LevelState");
const { isNil, compose } = require("ramda");

const chop = (time, chopType) => gameState => (
    updateLevelState(levelState => {
        const lastChopTime = getLastChopTime(levelState);
        const threshold = 150;

        if (isNil(getIngredientBeingChopped(levelState))) {
            return setIsGameOver(true)(levelState);
        } else if (
                time < lastChopTime - threshold + timeAllowed(gameState) ||
                time > lastChopTime + threshold + timeAllowed(gameState)) {
            return setIsGameOver(true)(levelState);
        }

        return compose(
            setLastChopTime(time),
            setIngredientBeingChopped(null)
        )(levelState);
    })(gameState)
);

module.exports = {
    chop
};
