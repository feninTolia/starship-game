import { SCENE_HIGHT, SCENE_WIDTH } from './constants';
import { getSceneTimer } from './sceneTimer';

const canvasScene = document.getElementsByTagName('canvas')[0];
const sceneCtx = canvasScene.getContext('2d');

const state = {};
const tick = 100;

function clearScene(ctx) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HIGHT);
}

export function initGame() {
  const renderFns = [clearScene];

  const sceneTimer = getSceneTimer(renderFns, sceneCtx, state, tick);

  sceneTimer();
}
