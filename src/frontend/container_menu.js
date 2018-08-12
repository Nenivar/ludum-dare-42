import { getGuiSprite } from './textures';
import { switchLevelByContainer, switchLevel } from './level_manager';
import { getContainerLevel } from './container_level';

import { gameStateStream } from './../GameStateStream';
import { nextLevel } from './../GameState';
import levels from './../levels.json';

// shorthands for PIXI var.
let Container = PIXI.Container;
let _app;

/*
*   [container_menu.js]
*/

function getTitleSprite () {
    let sp = getGuiSprite("menu_title");
    return sp;
}

function getPlaySprite () {
    let sp = getGuiSprite("menu_play");
    sp.y = 100;
    sp.interactive = true;
    sp.buttonMode = true;

    sp.on('click', function () {
        console.log("play game!!");
        gameStateStream.next(nextLevel(levels));
    });

    return sp;
}

export function getContainerMenu (app) {
    _app = app;
    let cont = new Container();

    cont.addChild(getTitleSprite(), getPlaySprite());

    return cont;
}