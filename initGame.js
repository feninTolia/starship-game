import { StarshipRenderer } from './StarshipRenderer';
import { SCENE_HIGHT, SCENE_WIDTH } from './constants';
import { getSceneTimer } from './sceneTimer';
import { StarsRenderer } from './starsRenderer';
import {
  STARSHIP_TEMPLATE_COLORS,
  STARSHIP_TEMPLATE_DEFAULT,
} from './starshipTemplates';

const canvasScene = document.getElementsByTagName('canvas')[0];
const sceneCtx = canvasScene.getContext('2d');

const state = {};
const tick = 10;

function clearScene(ctx) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HIGHT);
}

export function initGame() {
  const starsRenderer = new StarsRenderer(sceneCtx, SCENE_WIDTH, SCENE_HIGHT);
  const starshipRenderer = new StarshipRenderer(
    sceneCtx,
    STARSHIP_TEMPLATE_DEFAULT,
    STARSHIP_TEMPLATE_COLORS
  );
  const renderFns = [
    clearScene,
    starsRenderer.moveStars,
    () => starshipRenderer.renderStarship(20, 200, 4),
  ];

  const sceneTimer = getSceneTimer(renderFns, sceneCtx, state, tick);

  sceneTimer();
}
