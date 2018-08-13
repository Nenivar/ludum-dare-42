const loadFirstLevel = levels => gameState => (
    gameState
        .set("levelIndex", 0)
        .set("level", levels[0])
);

module.exports = {
    loadFirstLevel
};
