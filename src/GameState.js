const { Map } = require("immutable");
const { LevelState, getStartTime } = require("./LevelState");
const { get, set, update } = require("./MapHelpers");
const { pipe, isNil, always } = require("ramda");

const GameState = Map({
    level: null,
    levelIndex: -1,
    isPaused: false,
    isMenu: true,
    isCompleted: false,
    levelState: LevelState
});

const setLevel         = set("level");
const getLevel         = get("level");
const setLevelIndex    = set("levelIndex");
const getLevelIndex    = get("levelIndex");
const setIsPaused      = set("isPaused");
const getLevelState    = get("levelState");
const updateLevelState = update("levelState");

const pause    = setIsPaused(true);
const resume   = setIsPaused(false);

const goToMenu = pipe(
    setLevel(null),
    setLevelIndex(-1),
    resume
);

const isGameOver = time => state => (
    isNil(getLevel(state))
        || time > getStartTime(getLevelState(state)) + getLevel(state).timeLimit
);

module.exports = {
    GameState, pause, resume, setIsPaused, setLevel, goToMenu, isGameOver,
    updateLevelState, getLevel, getLevelIndex, setLevelIndex
};
