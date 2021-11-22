import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface AppState {

}

// router: routerReducer  this for Time-travelling debugger.
export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer

};

// creating custom metareducer:
// Since, metareducer a simple function with return a reducer afterward.

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("state before: ", state);
    console.log("action", action);
    return reducer(state, action);
  }

}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];


  // Reducer is a simple javascript function where takes current state of the application and actions and returns the new state of the application. Or simple word it is a new state creator.