/* lots of code taken from
 * https://github.com/kittykatattack/learningPixi
 */

// load in sprites -> spritesheet
/*var spritesheet = require('spritesheet-js');
spritesheet('assets/*.png', {format: 'pixi.js'}, function (err) {
    if (err) throw err;
    console.log('spritesheet successfully generated');
});*/

/*
    SETUP
*/
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.resources,
    Sprite = PIXI.Sprite;

let app = new Application({
    width: 800,
    height: 600,
    antialias: true,
    transparent: false,
    resolution: 1
});

document.body.appendChild(app.view);

/*
    TEXTURES
*/
loader
    .add("assets/spritesheet.json")
    .load(setup);

// runs when image loaded
function setup () {
    let fakeIngredientData = {
        "name": "onion",
        "chopPattern": [2, 1, 1, 2]
    };
    let onion = getIngredientSprite(fakeIngredientData);
    onion.x = 30;
    onion.y = 30;

    app.stage.addChild(onion);
}

const SPRITESHEET_LOC = "assets/spritesheet.json";
const SPRITESHEET = loader.resources[SPRITESHEET_LOC];

function getIngredientSprite (ingredient) {
    return new Sprite(SPRITESHEET.textures[ingredient.name + ".png"]);
}