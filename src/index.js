/* lots of code taken from
 * https://github.com/kittykatattack/learningPixi
 */

import { inherits } from 'util';
import { getGUISprite, getIngredientSprite, init } from './frontend/textures';
import { getContainerMenu } from './frontend/container_menu';
import { switchLevel, switchLevelContainer } from './frontend/level_manager';
import levels from './levels.json';

import {
    gameStateStream, onStartLevel, onPause, onReturnToMenu, onResume
} from './GameStateStream';
import { Subject } from 'rxjs';
import { getContainerLevel } from './frontend/container_level';

gameStateStream.subscribe(gameState => {
    console.log("GAME STATE CHANGED", gameState.toJS());
});

onStartLevel.subscribe(gameState => {
    console.log("STARTED LEVEL", gameState.toJS());
});

onResume.subscribe(() => console.log("RESUME"));
onPause.subscribe(() => console.log("PAUSED"));
onReturnToMenu.subscribe(() => console.log("RETURNED TO MENU"));

// load in sprites -> spritesheet
/*var spritesheet = require('spritesheet-js');
spritesheet('assets/*.png', {format: 'pixi.js'}, function (err) {
    if (err) throw err;
    console.log('spritesheet successfully generated');
});*/

/*
    SETUP
*/
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.resources,
    Sprite = PIXI.Sprite;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let Container = PIXI.Container;

let app = new Application({
    width: 800,
    height: 600,
    antialias: true,
    transparent: false,
    resolution: 1
});

document.body.appendChild(app.view);

/*
    TEXTURES
*/

init();
PIXI.loader.load(setup);

/*
    RXJS
*/

onStartLevel.subscribe(x => switchLevel(app, x.toJS().level));


onReturnToMenu.subscribe(x => switchLevelContainer(app, getContainerMenu()));

/*
    DO STUFF
*/
let state;

// init
function setup () {
    let fakeIngredientData = {
        "name": "onion",
        "chopPattern": [2, 1, 1, 2]
    };
    let onion = getIngredientSprite(fakeIngredientData.name);

    switchLevelContainer(app, getContainerMenu());
    app.stage.width *= 4;
    app.stage.height *= 4;

    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

// run game current state in loop
// & render sprites
function gameLoop (delta) {
    state(delta);
}

// all game logic here
function play (delta) {
    //onion.vx = 1;
    /* onion.x += 1; */
}

// all code to run @ end of game
function end (delta) {

}
