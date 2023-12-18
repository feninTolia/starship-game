import { getRandomInt } from '../utils/utils';

export class AsteroidsRenderer {
  asteroids = [];
  constructor(ctx, template, colorsMap, sceneWidth, sceneHight) {
    this.ctx = ctx;
    this.template = template;
    this.colorsMap = colorsMap;
    this.sceneWidth = sceneWidth;
    this.sceneHight = sceneHight - 40;
    this.generateAsteroids();
  }

  generateAsteroids = () => {
    for (let y = 0; y < this.sceneHight; y++) {
      for (let x = this.sceneWidth; x < this.sceneWidth * 5; x++) {
        const random = getRandomInt(100000);

        if (random === 100) {
          this.asteroids.push({ x, y, initX: x });
        }
      }
    }
  };

  renderAsteroids = (x, y, coef = 3) => {
    for (let j = 0; j < this.template.length; j++) {
      const row = this.template[j];
      for (let i = 0; i < row.length; i++) {
        const cell = row[i];

        if (cell === 0) continue;
        this.ctx.fillStyle = this.colorsMap[cell];
        this.ctx.fillRect(x + i * coef, y + j * coef, coef, coef);
      }
    }
  };

  moveAsteroids = () => {
    this.asteroids.forEach((asteroid) => {
      if (asteroid.x <= -40) {
        asteroid.x = asteroid.initX;
      } else {
        asteroid.x -= 2;
      }

      this.renderAsteroids(asteroid.x, asteroid.y, 4);
    });
  };
}
