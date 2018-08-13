import { getContainerLevel } from './container_level';
import { getContainerMenu } from './container_menu';
import levels from './../levels.json';

import { onStartLevel } from './../GameStateStream';

// shorthands for PIXI var.
let Application = PIXI.Application;

/*
*   [level_manager.js]
*   used to switch to levels
*   (levels are containers)
*/

let currentLevel;

/* export function switchLevel (index) {
    if (index < levels.length && index >= -1) {
        currentLevel = levels[index];
        PIXI.Application.stage = currentLevel;
    } else {
        console.log("Tried to switch level to no. " + index + ", but it was not within the size of the array!");
    }
} */

export function switchLevel (app, jsonData) {
    switchLevelContainer(app, getContainerLevel(jsonData));
}

export function switchLevelContainer (app, cont) {
    app.stage.removeChild(getCurrentLevel());
    currentLevel = cont;
    app.stage.addChild(currentLevel);
}

export function getCurrentLevel () {
    return currentLevel;
}