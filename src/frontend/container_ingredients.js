import { getIngredientSprite } from './textures';

import { gameStateStream } from '../GameStateStream';
import { moveNextOnChoppingBoard } from '../LevelState';
import { updateLevelState } from '../GameState';

// shorthands for PIXI var.
let Container = PIXI.Container;

/*
*   [container_ingredients.js]
*/

function moveIngredientOntoBench (sprite) {
    sprite.y = 150;
}

// priorities sprites placed furthest away in time
function findIngredientSprite (cont) {
    
}

export function getContainerIngredients (jsonData) {
    let cont = new Container();
    jsonData.ingredients.map(getIngredientSprite).forEach((x, i) => {
        x.interactive = true;
        x.cursor = true;
        x.on('click', () => {
            gameStateStream.next(updateLevelState(moveNextOnChoppingBoard));
        });
        x.x += i * 10;
        cont.addChild(x);
    });
    return cont;
}