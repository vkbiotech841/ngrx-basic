import { User } from './model/user.model';
import { createAction, props } from "@ngrx/store";


// Here, we are creating an action using createAction() method. where we are adding "type and the payload as a props".
// Payload is not necessary. Here, in the case of login payload data is required whereas for logout payload is not required.

export const login = createAction(
    "[Login Page] User Login",
    props<{ user: User }>()
);

export const logout = createAction(
    "[Top Menu] Logout",
)