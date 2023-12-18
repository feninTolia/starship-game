import { IS_CHROME } from '../constants/constants';
import { getRandomInt } from '../utils/utils';

export class StarsRenderer {
  stars = []; //{x:number, y:number}
  constructor(ctx, sceneWidth, sceneHight) {
    this.ctx = ctx;
    this.sceneWidth = sceneWidth;
    this.sceneHight = sceneHight;

    this.generateStars();
    console.log(IS_CHROME);
  }

  generateStars = () => {
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
        star.x -= IS_CHROME ? 2 : 1;
      }

      this.renderStars(star.x, star.y);
    });
  };
}
