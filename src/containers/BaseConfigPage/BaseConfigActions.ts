import { action, ActionType } from 'typesafe-actions';

import { BASE_CONFIG_RADIUS_RESET, BASE_CONFIG_RADIUS_SET } from './BaseConfigConstants';

export const setBaseConfigRadius = (radius: number) => action(BASE_CONFIG_RADIUS_SET, radius);
export type setBaseConfigRadiusAction = ActionType<typeof setBaseConfigRadius>;

export const resetBaseConfigRadius = () => action(BASE_CONFIG_RADIUS_RESET);
export type resetBaseConfigRadiusAction = ActionType<typeof resetBaseConfigRadius>;


export type BaseConfigAction = setBaseConfigRadiusAction | resetBaseConfigRadiusAction;
