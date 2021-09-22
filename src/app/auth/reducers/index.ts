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

// An interface or type that defines the shape of the state.
export interface AuthState {
  user: User
}


// The arguments including the initial state or current state and the current action.
export const initialAuthState: AuthState = {
  user: undefined
}

// The functions that handle state changes for their associated action(s).
export const authReducer = createReducer(

  initialAuthState,

  on(AuthActions.login, (state, action) => {
    console.log("Calling login reducer")
    return {
      user: action.user
    }
  }),

  on(AuthActions.logout, (state, action) => {
    console.log("calling logout reduer")
    return {
      user: undefined
    }
  })

)

// Reducer concept:
// Reducers in NgRx are responsible for handling transitions from one state to the next state in your application. Reducer functions handle these transitions by determining which actions to handle based on the action's type.
// There are a few consistent parts of every piece of state managed by a reducer.
// (1) An interface or type that defines the shape of the state.
// (2) The arguments including the initial state or current state and the current action.
// (3) The functions that handles state changes for their associated action(s).

// Example of a reducer function:

// function authReducer(State, actions): AuthState {

// }

// To create an reducer, we will use the createReducer() method. That take arguments (initialState and action);
// Here, reducer take the initial state and action.  it also defines what need to be done upon when action event occurs.
// Here, "on" is a rxjs operator. AuthActions.login is the action event and then a callback function gets executed, which takes the state and login action and it returns the user upon login action or it saves the user in the store memory so that we can use it later on.

// Plugin reducer to the authModule:
// In order to work reducer at the authComponent. We need to the import this reducer to the authModule as follows:

// StoreModule.forFeature('auth', authReducer),



