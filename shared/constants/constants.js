import { STARSHIP_TEMPLATE_DEFAULT } from '../templates/starshipTemplates';

export const SCENE_WIDTH = 800;
export const SCENE_HIGHT = 600;
export const TICK = 10;

export const SCALE_COEF = 3;
export const STARSHIP_WIDTH = STARSHIP_TEMPLATE_DEFAULT[0].length * SCALE_COEF;
export const STARSHIP_HEIGHT = STARSHIP_TEMPLATE_DEFAULT.length * SCALE_COEF;
export const STARSHIP_SHOT_HEIGHT = SCALE_COEF;
export const STARSHIP_SHOT_WIDTH = 3 * SCALE_COEF;
export const IS_CHROME = navigator.userAgent.indexOf('Chrome') !== -1;
