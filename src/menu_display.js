import { getGUISprite } from './textures';
import { switchLevel } from './level_manager';

// shorthands for PIXI var.
let loader = PIXI.loader,
    resources = loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container;

/*
*   [menu_display.js]
*   has container with menu elements
*/

let cont;
let img_title, button_play;

function setup () {
    cont = new Container();

    img_title = getTitleSprite();
    button_play = getPlaySprite();

    cont.addChild(img_title);
    cont.addChild(button_play);

    return cont;
}

function getTitleSprite () {
    return getGUISprite("menu_title");
}

function getPlaySprite () {
    let sp = getGUISprite("menu_play");
    sp.interactive = true;
    sp.buttonMode = true;

    sp.on('click', function () {
        console.log("play game!!");
        switchLevel (1);
    });
    return sp;
}

export function getContainerForMenu () {
    if (cont == null) cont = setup();
    
    return cont;
}