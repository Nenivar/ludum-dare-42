import { getGUISprite, getIngredientSprite } from './textures';

// shorthands for PIXI var.
let loader = PIXI.loader,
    resources = loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container;

/*
*   [level_state_display.js]
*   has container with level elements
*/

let cont;
let ingredients = [];

function setup () {
    cont = new Container();

    let fakeIngredientData = {
        "name": "onion",
        "chopPattern": [2, 1, 1, 2]
    };

    ingredients.push(fakeIngredientData);

    for (let x of ingredients) {
        let sprite = getIngredientSprite(x.name);
        sprite.x = 100;
        sprite.y = 100;
        cont.addChild(sprite);
    }

    return cont;
}

export function getContainerForLevel () {
    if (cont == null) cont = setup();
    
    return cont;
}

