import { AuthState } from './reducers/index';
import { createFeatureSelector, createSelector } from "@ngrx/store";

// FeatureSelector:
// State of the feature module (module apart from root module) is called as Feature state. example: Here, auth module is a feature module.
// FeatureSelect retrieves the state of the feature module.
// we use createFeatureSelector() method which take only one argument (name of the property that we want to get from the state).

//////// Selectors //////////////
// selector is plane mapping function (Here, state => state["auth"]) with memory. but unlike mapping function it createSelector method has memory. As long as the input state does not changed so output is not going to be calculated.this type of function is known as "Memorized function"in functional programming. That means, it keep the memory of the previous executions. and it only executes itself if inputs of the function have not been calculated before. After each new execution of the function, the memorized function is going to keep its memory in the cache.

// createSelector method takes multiple arguments (store states, projector function). we need miminum 2 arguments.
// (1) in the argument first we will take the global state of the application, then we splice the part of the state according to our need. Here, we wish to get the auth state. Hence, we are taking the state["auth"]. if would have some more data to be sliced then we would have that one also as another arugment ex (state => state["courses"]).
// (2) Projector function: it takes the all the slices of the state. example: (auth) => !!auth.user.Here (auth) is a sliced state and that we are mapping it to boolean.

///////////// Combining multiple selectors ///////////////////////////
// We can also combine the related selectors into a single file.


// FeatureSelector
// Here, we are using auth as the name of the property of the global state so that we can get the user detail from the store. This will return a auth object which contains user object.
// Here, selectAuthState is a type save method of state => state["auth"]. so, we get autocomplition feature.
export const selectAuthState = createFeatureSelector<AuthState>("auth");

// Selectors
// Here, we are first getting the auth objecting using the selectAuthState and then we are mapping the user object. (!!) means if value is true. and similary in isLoggedOut we are checking if user is not present by !isLoggedIn result.

export const isLoggedIn = createSelector(
    // state => state["auth"],
    selectAuthState,
    (auth) => !!auth.user
)

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
)