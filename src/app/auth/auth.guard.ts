import { isLoggedIn } from './auth.selector';
import { select } from '@ngrx/store';
import { AppState } from './../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.store
            .pipe(
                select(isLoggedIn),
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/login');
                    }
                })
            )
    }

}


// Here, we are implimenting the authGuard based on the loggedIn state.
// First we are using the selector (isLoggedIn) to get the current loggedIn state. if this is true then we can access the /course router otherwise it get redirect to the login screen.