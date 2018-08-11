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

let SS_ING, SS_GUI;

// called once
export function init () {
    loader
        .add(SS_ING_LOC)
        .add(SS_GUI_LOC);
    
    SS_ING = resources[SS_ING_LOC];
    SS_GUI = resources[SS_GUI_LOC];
}

export function getIngredientSprite (ingredient) {
    return new Sprite(SS_ING.textures[ingredient.name + ".png"]);
}

export function getGUISprite (name) {
    return new Sprite(SS_GUI.textures[name + ".png"]);
}