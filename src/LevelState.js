const { Map } = require("immutable");
const { inc, append, compose, drop, head } = require("ramda");
const { update, get, set } = require("./MapHelpers");

const LevelState = Map({
    beatsMissed: 0,
    ingredientsOnBench: [],
    ingredientBeingChopped: null,
    stepsThrough: 0,
    lastChopTime: 0,
    startTime: 0
});

const getBeatsMissed            = get("beatsMissed");
const updateBeatsMissed         = update("beatsMissed");
const getIngredientsOnBench     = get("ingredientsOnBench");
const setIngredientsOnBench     = set("ingredientsOnBench");
const updateIngredientsOnBench  = update("ingredientsOnBench");
const getIngredientBeingChopped = get("ingredientBeingChopped");
const setIngredientBeingChopped = set("ingredientBeingChopped");
const getStepsThrough           = get("stepsThrough");
const setStepsThrough           = set("stepsThrough");
const setLastChopTime           = set("lastChopTime");
const getStartTime              = get("startTime");
const setStartTime              = set("startTime");

const missedABeat = updateBeatsMissed(inc);

const addIngredient = compose(updateIngredientsOnBench, append);

const removeNextFromBench = compose(updateIngredientsOnBench, drop)(1);

const nextOnBench = getIngredientsOnBench

const moveNextOnChoppingBoard = compose(
    removeNextFromBench,
    setStepsThrough(0),
    state => {
        const nextIngredient = head(getIngredientsOnBench(state));

        return setIngredientBeingChopped(nextIngredient)(state);
    }
);

module.exports = {
    LevelState, missedABeat, getBeatsMissed, addIngredient,
    getIngredientsOnBench, removeNextFromBench, moveNextOnChoppingBoard,
    getIngredientBeingChopped, getStepsThrough, setStepsThrough, setStartTime,
    getStartTime
};
