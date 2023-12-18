import {
  SCALE_COEF,
  SCENE_HIGHT,
  SCENE_WIDTH,
  STARSHIP_HEIGHT,
  STARSHIP_SHOT_HEIGHT,
  STARSHIP_SHOT_WIDTH,
  STARSHIP_WIDTH,
  TICK,
} from './shared/constants/constants';
import { getSceneTimer } from './sceneTimer';
import { StarsRenderer } from './shared/renderers/StarsRenderer';
import {
  STARSHIP_TEMPLATE_COLORS,
  STARSHIP_TEMPLATE_DEFAULT,
} from './shared/templates/starshipTemplates';
import { AsteroidsRenderer } from './shared/renderers/AsteroidsRenderer';
import {
  ASTEROID_TEMPLATE_COLORS,
  ASTEROID_TEMPLATE_DEFAULT,
} from './shared/templates/asteroidTemplates';
import { StarshipRenderer } from './shared/renderers/StarshipRenderer';
import { ShotsRenderer } from './shared/renderers/ShotsRenderer';

const controller = document.getElementById('controller');
const canvasScene = document.getElementsByTagName('canvas')[0];
const sceneCtx = canvasScene.getContext('2d');

canvasScene.addEventListener('click', () => controller.focus());

const controllerState = {
  pressedHorizontalKey: '',
  pressedVerticalKey: '',
};
const state = {
  posX: 100,
  posY: 100,
};

function getState() {
  switch (controllerState.pressedHorizontalKey) {
    case 'ArrowRight':
      if (state.posX >= SCENE_WIDTH - STARSHIP_WIDTH) {
        state.posX += 0;
      } else {
        state.posX += 3;
      }
      break;
    case 'ArrowLeft':
      if (state.posX <= 0) {
        state.posX = 0;
      } else {
        state.posX -= 3;
      }
      break;
  }
  switch (controllerState.pressedVerticalKey) {
    case 'ArrowUp':
      if (state.posY <= 0) {
        state.posY -= 0;
      } else {
        state.posY -= 4;
      }
      break;
    case 'ArrowDown':
      if (state.posY >= SCENE_HIGHT - STARSHIP_HEIGHT) {
        state.posY += 0;
      } else {
        state.posY += 4;
      }
      break;
  }

  return state;
}

function clearScene(ctx) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HIGHT);
}

export function initGame() {
  controller.focus();
  const starsRenderer = new StarsRenderer(sceneCtx, SCENE_WIDTH, SCENE_HIGHT);
  const starshipRenderer = new StarshipRenderer(
    sceneCtx,
    STARSHIP_TEMPLATE_DEFAULT,
    STARSHIP_TEMPLATE_COLORS
  );
  const asteroidsRenderer = new AsteroidsRenderer(
    sceneCtx,
    ASTEROID_TEMPLATE_DEFAULT,
    ASTEROID_TEMPLATE_COLORS,
    SCENE_WIDTH,
    SCENE_HIGHT
  );
  const shotsRenderer = new ShotsRenderer(sceneCtx, SCENE_WIDTH);

  const keydownActionsMap = {
    ArrowUp: () => {
      controllerState.pressedVerticalKey = 'ArrowUp';
    },
    ArrowDown: () => {
      controllerState.pressedVerticalKey = 'ArrowDown';
    },
    ArrowRight: () => {
      controllerState.pressedHorizontalKey = 'ArrowRight';
    },
    ArrowLeft: () => {
      controllerState.pressedHorizontalKey = 'ArrowLeft';
    },
    Space: () => {
      shotsRenderer.addShot(
        state.posX + STARSHIP_WIDTH - STARSHIP_SHOT_WIDTH * 2,
        state.posY
      );
      shotsRenderer.addShot(
        state.posX + STARSHIP_WIDTH - STARSHIP_SHOT_WIDTH * 2,
        state.posY + STARSHIP_HEIGHT - STARSHIP_SHOT_HEIGHT
      );
    },
  };

  const keyupActionsMap = {
    ArrowUp: () => {
      controllerState.pressedVerticalKey = '';
    },
    ArrowDown: () => {
      controllerState.pressedVerticalKey = '';
    },
    ArrowRight: () => {
      controllerState.pressedHorizontalKey = '';
    },
    ArrowLeft: () => {
      controllerState.pressedHorizontalKey = '';
    },
  };

  function handleKeyDown(event) {
    keydownActionsMap[event.code]?.();
  }
  function handleKeyUp(event) {
    keyupActionsMap[event.code]?.();
  }

  controller.addEventListener('keydown', handleKeyDown);
  controller.addEventListener('keyup', handleKeyUp);

  const renderFns = [
    clearScene,
    starsRenderer.moveStars,
    (_, currentState) =>
      starshipRenderer.renderStarship(
        currentState.posX,
        currentState.posY,
        SCALE_COEF
      ),
    asteroidsRenderer.moveAsteroids,
    () => {
      shotsRenderer.moveShots(() => {
        shotsRenderer.shots.forEach((shot) => {
          const foundAsteroidIndex = asteroidsRenderer.asteroids.findIndex(
            (asteroid) => {
              return (
                shot.x >= asteroid.x &&
                shot.x <= asteroid.x + 10 &&
                shot.y >= asteroid.y &&
                shot.y <= asteroid.y + STARSHIP_HEIGHT
              );
            }
          );

          if (foundAsteroidIndex > -1) {
            const asteroid = asteroidsRenderer.asteroids[foundAsteroidIndex];
            asteroid.x = asteroid.initX;
            shot.y = SCENE_HIGHT + 20;
          }
        });
      });
    },
  ];

  const sceneTimer = getSceneTimer(renderFns, sceneCtx, getState, TICK);

  sceneTimer();
}
