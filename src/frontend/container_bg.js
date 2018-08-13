import { getBgSprite } from './textures';

import { gameStateStream } from './../GameStateStream';
import { goToMenu } from './../GameState';

// shorthands for PIXI var.
let Container = PIXI.Container;

/*
*   [container_bg.js]
*   generates new container for given json data
*/

function getLogSprite () {
    let sp = getBgSprite("log");
    sp.x = 200;
    sp.y = 100;
    return sp;
}

function getRockSprite () {
    let sp = getBgSprite("rock");
    sp.x = 100;
    sp.y = 100;
    sp.interactive = true;
    sp.cursor = true;
    sp.on('click', x => {
        gameStateStream.next(goToMenu);
    });
    return sp;
}

export function getContainerBg (jsonData) {
    let cont = new Container();

    cont.addChild(getRockSprite(), getLogSprite());

    return cont;
}