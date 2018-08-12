const { Map } = require("immutable");
const { LevelState, getStartTime } = require("./LevelState");
const { get, set, update } = require("./MapHelpers");
const { pipe, isNil, always, inc } = require("ramda");

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
const getIsMenu        = get("isMenu");
const getIsPaused      = get("isPaused");
const setIsPaused      = set("isPaused");
const getLevelState    = get("levelState");
const updateLevelState = update("levelState");
const updateLevelIndex = update("levelIndex");
const getIsCompleted   = get("isCompleted");
const setIsCompleted   = set("isCompleted");

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

const startLevel = (level, levelIndex) => pipe(
    setLevel(level),
    setLevelIndex(levelIndex)
);

const nextLevel = levels => pipe(
    updateLevelIndex(inc),
    state => {
        const levelIndex = getLevelIndex(state);
        const level = levels[levelIndex];

        if (isNil(level)) {
            return pipe(
                setLevelIndex(-1),
                setLevel(null),
                setIsCompleted(true)
            )(state);
        }

        return setLevel(level)(state);
    }
);

module.exports = {
    GameState, pause, resume, setIsPaused, setLevel, goToMenu, isGameOver,
    updateLevelState, getLevel, getLevelIndex, setLevelIndex, startLevel,
    nextLevel, getIsPaused, getIsMenu, getIsCompleted
};
