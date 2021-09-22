import { User } from './model/user.model';
import { createAction, props } from "@ngrx/store";


// Here, we are creating an action using createAction() method of ngrx. where we are adding "type and the payload as a props".
// Payload is not necessary. Here, in the case of login payload data is required whereas for logout payload is not required.
// props does not take any argument but it takes a generic type;
// Here, login is not a const but it is a new action creator. Hence, it can called as a function to create a new action. example:
// const newLoginAction = login();
// We are not going to do this in the file, whereas we will do this in the component where we are going to use it. In this case login.component.ts file.

//////////// Grouping of actions ////////////////// 
// actions with related function can be grouped and kept in the same file. Example: in this case login and logout has almost the same purpose. Hence, these two actions can be kept together.

export const login = createAction(
    "[Login Page] User Login",
    props<{ user: User }>()
);

export const logout = createAction(
    "[Top Menu] Logout",
)