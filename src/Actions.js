const { find, equals, append, head, tail } = require("ramda");

const loadFirstLevel = ({ levels, ingredients }) => gameState => (
    gameState
        .set("levelIndex", 0)
        .set("level", levels[0])
        .update(gameState => {
            const items = gameState.get("level").ingredients;

            const itemsOffScreen = items.map(itemName => (
                find(({ name }) => equals(name, itemName), ingredients)
            ));

            return gameState.set("itemsOffScreen", itemsOffScreen);
        })
        .set("itemsOnBench", [])
);

const startLevel = time => gameState => (
    gameState
        .set("startTime", time)
);

const resetLevelState = gameState => (
    gameState
        .set("startTime", 0)
);

const moveNextToBench = gameState => {
    const nextItem = head(gameState.get("itemsOffScreen"));

    return gameState
        .update("itemsOffScreen", tail)
        .update("itemsOnBench", append(nextItem));
};

module.exports = {
    loadFirstLevel, startLevel, resetLevelState, moveNextToBench
};
