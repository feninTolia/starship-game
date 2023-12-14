import { getRandomInt } from './utils';

export class StarsRenderer {
  stars = []; //{x:number, y:number}
  constructor(ctx, sceneWidth, sceneHight) {
    this.ctx = ctx;
    this.sceneWidth = sceneWidth;
    this.sceneHight = sceneHight;

    this.generateStars();
    this.renderStars();
  }

  generateStars = () => {
    console.log('in generate stars');
    for (let y = 0; y < this.sceneHight; y++) {
      for (let x = 0; x < this.sceneWidth; x++) {
        const random = getRandomInt(1000);

        if (random === 100) {
          this.stars.push({ x, y });
        }
      }
    }
  };

  renderStars = (x, y) => {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(x, y, 1, 1);
  };

  moveStars = () => {
    this.stars.forEach((star) => {
      if (star.x === 0) {
        star.x = this.sceneWidth;
      } else {
        star.x -= 1;
      }

      this.renderStars(star.x, star.y);
    });
  };
}
