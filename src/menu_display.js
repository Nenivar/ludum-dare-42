import { getGUISprite } from './textures';

// shorthands for PIXI var.
let loader = PIXI.loader,
    resources = loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container;

/*
*   [menu_display.js]
*   has container with menu elements
*/

let menu;
let img_title, button_play;

function setup () {
    menu = new Container();

    img_title = getTitleSprite();
    button_play = getPlaySprite();

    menu.addChild(img_title);
    menu.addChild(button_play);

    return menu;
}

function getTitleSprite () {
    return getGUISprite("menu_title");
}

function getPlaySprite () {
    return getGUISprite("menu_play");
}

export function getContainerForMenu () {
    if (menu == null) menu = setup();
    
    return menu;
}