import clone from 'lodash/clone';
import setWith from 'lodash/setWith';

import { UserInfo } from '../../interfaces/UserInfo';
import { AllUsersAction } from './actions';
import { LOAD_ALL_USERS_ATTEMPT, LOAD_ALL_USERS_ERROR, LOAD_ALL_USERS_SUCCESS, SET_USER_ROLE_SUCCESS } from './constants';


export interface AllUsersPageOwnProps {
  users: UserInfo[],
  isInProgress: boolean,
}

const allUsersPageInitialState: AllUsersPageOwnProps = {
  users: [],
  isInProgress: false,
};

export default function allUsersReducer(
  state: AllUsersPageOwnProps = allUsersPageInitialState,
  action: AllUsersAction,
): AllUsersPageOwnProps {
  switch (action.type) {
    case LOAD_ALL_USERS_ATTEMPT: {
      return {
        ...state,
        isInProgress: true,
      };
    }
    case LOAD_ALL_USERS_SUCCESS: {
      return {
        ...state,
        isInProgress: false,
        users: action.payload,
      };
    }
    case LOAD_ALL_USERS_ERROR: {
      return {
        ...state,
        isInProgress: false,
      };
    }
    case SET_USER_ROLE_SUCCESS: {
      const userIndex = state.users.findIndex(({ id }) => id === action.payload.id);
      const updatedUser: UserInfo = {
        ...state.users[userIndex],
        role: action.payload.role,
      };
      const updatedUsersList = setWith(clone(state.users), [userIndex], updatedUser, clone);
      return {
        ...state,
        users: updatedUsersList,
      };
    }
    default: {
      return state;
    }
  }
}
