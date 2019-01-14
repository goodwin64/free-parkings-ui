import { action, ActionType } from 'typesafe-actions';

import { BASE_CONFIG_RADIUS_RESET, BASE_CONFIG_RADIUS_SET } from './BaseConfigConstants';

export const setSearchRadius = (radius: number) => action(BASE_CONFIG_RADIUS_SET, radius);
export type setBaseConfigRadiusAction = ActionType<typeof setSearchRadius>;
export type setBaseConfigRadiusActionCreator = (radius: number) => setBaseConfigRadiusAction;

export const resetSearchRadius = () => action(BASE_CONFIG_RADIUS_RESET);
export type resetBaseConfigRadiusAction = ActionType<typeof resetSearchRadius>;


export type BaseConfigAction = setBaseConfigRadiusAction | resetBaseConfigRadiusAction;
