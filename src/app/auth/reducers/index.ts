import { User } from './../model/user.model';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../action-types';

export interface AuthState {
  user: User
}

export const initialAuthState = {
  user: undefined
}



export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    console.log("Calling login reducer")
    return {
      user: action.user
    }
  })
)

// Reducer concept:
// function authReducer(State, actions): AuthState {

// }


