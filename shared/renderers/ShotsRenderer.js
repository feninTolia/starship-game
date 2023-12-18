import {
  IS_CHROME,
  SCALE_COEF,
  STARSHIP_SHOT_WIDTH,
} from '../constants/constants';

export class ShotsRenderer {
  shots = []; //{x: number, y: number}
  constructor(ctx, sceneWidth) {
    this.ctx = ctx;
    this.sceneWidth = sceneWidth + 20;
  }

  addShot = (x, y) => {
    this.shots.push({ x, y });
  };

  renderShot = (x, y) => {
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(x, y, STARSHIP_SHOT_WIDTH, SCALE_COEF);
  };

  moveShots = (onMoveShots) => {
    this.shots.forEach((shot, idx) => {
      if (shot.x < this.sceneWidth) {
        shot.x += IS_CHROME ? 17 : 10;
        this.renderShot(shot.x, shot.y);
      } else if (shot.x > this.sceneWidth) {
        this.shots.splice(idx, 1);
      }
    });

    onMoveShots();
  };
}
