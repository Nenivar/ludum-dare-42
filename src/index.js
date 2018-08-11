const app = new PIXI.Application(800, 600, { antialias: true });

document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();

graphics.beginFill(0xFF3300);
graphics.lineStyle(4, 0xFFD900, 1);

graphics.moveTo(50, 50);
graphics.lineTo(250, 50);
graphics.lineTo(100, 100);
graphics.lineTo(50, 50);
graphics.endFill();

app.stage.addChild(graphics);
