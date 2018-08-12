// shorthands for PIXI var.
let loader = PIXI.loader,
    resources = loader.resources,
    Sprite = PIXI.Sprite;

/*
*   [textures.js]
*   loads in spritesheets
*   has methods to access sprites
*/

const SS_ING_LOC = "assets/spritesheet_ingredients.json";
const SS_GUI_LOC = "assets/spritesheet_gui.json";
const SS_BG_LOC = "assets/spritesheet_bg.json";

let SS_ING, SS_GUI, SS_BG;

// called once
export function init () {
    loader
        .add(SS_ING_LOC)
        .add(SS_GUI_LOC)
        .add(SS_BG_LOC);
    
    SS_ING = resources[SS_ING_LOC];
    SS_GUI = resources[SS_GUI_LOC];
    SS_BG = resources[SS_BG_LOC];
}

export function getIngredientSprite (name) {
    return new Sprite(SS_ING.textures[name + ".png"]);
}

export function getGuiSprite (name) {
    return new Sprite(SS_GUI.textures[name + ".png"]);
}

export function getBgSprite (name) {
    return new Sprite(SS_BG.textures[name + ".png"]);
}