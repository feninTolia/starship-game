import { SCALE_COEF } from '../constants/constants';

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
    this.ctx.fillRect(x, y, 10, SCALE_COEF);
  };

  moveShots = (onMoveShots) => {
    this.shots.forEach((shot) => {
      if (shot.x < this.sceneWidth) {
        shot.x += 10;
        this.renderShot(shot.x, shot.y);
      }
    });

    onMoveShots();
  };
}
