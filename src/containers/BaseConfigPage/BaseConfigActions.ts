import { action, ActionType } from 'typesafe-actions';

import * as BaseConfigConstants from './BaseConfigConstants';

export const setSearchRadius = (radius: number) => action(BaseConfigConstants.BASE_CONFIG_RADIUS_SET, radius);
export type setSearchRadiusAction = ActionType<typeof setSearchRadius>;
export type setSearchRadiusActionCreator = (radius: number) => setSearchRadiusAction;

export const resetSearchRadius = () => action(BaseConfigConstants.BASE_CONFIG_RADIUS_RESET);
export type resetBaseConfigRadiusAction = ActionType<typeof resetSearchRadius>;

export const openSidebar = () => action(BaseConfigConstants.BASE_CONFIG_OPEN_SIDEBAR);
export type openSidebarAction = ActionType<typeof openSidebar>;
export type openSidebarActionCreator = () => openSidebarAction;

export const closeSidebar = () => action(BaseConfigConstants.BASE_CONFIG_CLOSE_SIDEBAR);
export type closeSidebarAction = ActionType<typeof closeSidebar>;
export type closeSidebarActionCreator = () => closeSidebarAction;


export type BaseConfigAction = setSearchRadiusAction
  | resetBaseConfigRadiusAction
  | openSidebarAction
  | closeSidebarAction
;
