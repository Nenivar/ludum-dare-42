import { getGUISprite, getIngredientSprite } from './textures';
import { pause, returnToMenu } from "./GameState";

import {
    goToMenu
} from './GameState';

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

function setup (subject) {
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
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on('click', event => {
            subject.next(goToMenu);
            //console.log(event.type, event.target);
            
        });
        cont.addChild(sprite);
    }

    

    return cont;
}

export function getContainerForLevel (subject) {
    if (cont == null) cont = setup(subject);
    
    return cont;
}