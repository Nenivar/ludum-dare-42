import { getGUISprite } from './textures';

// shorthands for PIXI var.
let loader = PIXI.loader,
    resources = loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container;

/*
*   [gui_display.js]
*   has container with gui elements
*/

let cont;
let time, beatsMissed, bpm;

function setup () {
    cont = new Container();

    time = getTimeSprite();
    beatsMissed = getBeatsSprite();
    bpm = getBpmSprite();

    cont.addChild(time, beatsMissed, bpm);

    return cont;
}

export function getGuiContainer () {
    let gui = new Container();

    return gui;
}

function getTimeSprite () {
    return null;
}

function getBeatsSprite () {
    return null;
}

function getBpmSprite () {
    return null;
}