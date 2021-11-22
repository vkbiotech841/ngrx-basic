import { loadAllCourses } from './course.actions';
import { AppState } from './../reducers/index';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from '@ngrx/store';
import { tap, first, finalize } from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                tap(() => {
                    if (!this.loading) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                first(),
                finalize(() => this.loading = false)
            );

    }

}





// Router Resolver is a special service, that run before router completes its transition.
// In this case,we wish to get data before /home router reaches. Therefore, first we wish to get the data before /home router hits and once /home hits, we wish to display the data. The target screen (/home) will only visible if the resolver bring the data. Something, happens while resovler is not able to get the data, then the screen transition will be cancelled. So, this a great way for showing screen that contains no data.
// We to specify which data and where (route) resolver need to implimented as follows:
// {
//     path: '',
//     component: HomeComponent,
//     resolve: {
//       courses: CoursesResolver
//     }
//   },

// Here, resolver is looking for the courses data and this resolver has been appliced to the HomeComponent.