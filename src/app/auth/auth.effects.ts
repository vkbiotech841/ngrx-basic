import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";


@Injectable()
export class AuthEffects {

    // Side effect method 02: Rxjs way and more type safe way
    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action => {
                    localStorage.setItem('user', JSON.stringify(action.user));
                })
            )
        , { dispatch: false }
    )

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/login');
                })
            )
        , { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private router: Router
    ) {

        // Side effect method 01
        // actions$.subscribe(action => {
        //     if (action.type == "[Login Page] User Login") {
        //         localStorage.setItem('user', JSON.stringify(action["user"]));
        //     }
        // })

    }

}

// Side Effects:
// Side effect is something extra that we want to do in our application after an action has been dispatched and processed by the store. So after reducer linked to the action have been triggered, we want to do something else such save data to the backend or local storage. 

// Side is something to be done in response to the given action. Actions gets dispatched, its reducer gets trigged and then after that we wish to do something else (side effect). In this case as a side effect we wish the store the user details to the browser local storage.

// In order to AuthEffects to work, first we need to plugin AuthEffects to the AuthModule as follows:
// EffectsModule.forFeature([AuthEffects])

//////////////// Side effect method 01 ///////////////////

// Here, we are using Actions (injected into the constructor) from ngrx/effect. Which is an observable.
// Now, based on the action type, we can access the actions stored in the store.
// Now, we are checking the if action.type is equal to the "[Login Page] User Login", then only we will save the user details into the browser local storage.


//////////////// Side effect method 02 ///////////////////

// This entire process can we written in the more refined ngrx way as follows:


