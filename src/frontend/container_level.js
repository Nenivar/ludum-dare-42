import { getContainerBg } from './container_bg'
import { getContainerIngredients } from './container_ingredients'
import { getContainerGui } from './container_gui'

// shorthands for PIXI var.
let Container = PIXI.Container;

/*
*   [level.js]
*/

export function getContainerLevel (jsonData) {
    let cont = new Container();
    cont.addChild(getContainerBg(jsonData),
                  getContainerIngredients(jsonData),
                  getContainerGui(jsonData));
    return cont;
}