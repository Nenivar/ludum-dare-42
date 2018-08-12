import { getBgSprite } from './textures';

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
    return sp;
}

export function getContainerBg (jsonData) {
    let cont = new Container();

    cont.addChild(getRockSprite(), getLogSprite());

    return cont;
}