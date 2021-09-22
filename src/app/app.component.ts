import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { AuthState } from './auth/reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selector';
import { login, logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loading = true;
  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    this.getUserProfileAndStore();
    // this.getStoreDataUsingSubscription();
    this.getStoreDataUsingSelector();
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  public getUserProfileAndStore(): void {
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }))
    }
  }


  // (1) Reading data from ngrx store using Subscription method: 
  // problem with this method is when we will dispatch multiple actions in sequence then for each action a separate value will be emitted for the store observable one after another. For each value emitted by the store observable there will be new value for the isLoggedIn$ and isLoggedOut$.Therefore in this method we will be continueouly updating the value of isLoggedIn$ and isLoggedOut$. This kind of behouvior is not good. What we need is to update the isLoggedIn$ and isLoggedOut$ only once (if it has changed from the last time). That means we need to remove the duplicate value for the state. Therefore, we will remove map() instead of this we will use select() by ngrx. select() method removes duplicate value as well as it also map the value.

  public getStoreDataUsingSubscription(): void {
    this.store.subscribe(state => {
      console.log("store current value", state);
    })

    this.isLoggedIn$ = this.store
      .pipe(
        map(state => !!state["auth"].user)
      );

    this.isLoggedOut$ = this.store
      .pipe(
        map(state => !state["auth"].user)
      );
  }

  // (2) Reading data from ngrx store using Selector method: 
  public getStoreDataUsingSelector(): void {
    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );

    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );
  }

  public logout(): void {
    this.store.dispatch(logout())
  }

}



// NgRx: Angular Reactive Extensions
// It is a popular state management solution for the angular ecosystem based on redux.
// Store is RxJS powered global state management for Angular applications, inspired by Redux. Store is a controlled state container designed to help write performant, consistent applications on top of Angular.

////////////// Why State management solutions are needed?? /////////////////////////

// Generally when we navigate from one page to another page, each APIs call gets executed and it call multiple APIs. This is because these data are bound to the component. Whenever this component is destroyed then next time we need to again fetch the data using APIs calls. In this kind of system, the lifecycle of data is tightly bound to the lifecycle of the component. It is a costly way of loading the data. Hence, to reduce the number of APIs call and fetching data at once and distributed to the other componenent when state changes is required. Hence, state managament solutions are needed.
// Also, when we change a variable at one place then if its value need to change across the platform then generally we first save the data to the backend and data gets fetch and then it gets display. These process need some time.Therefore, in that case state management solution are also required to reduce the timing and prevent reloading of data.
// Therefore, to avoid the above problem. We want to create an "In-momory database a the client side", where we want to keep the our data while the application is still active and it will be indepedend of any component. This will allow data to survice during application navigation.
// Also we will reduce the latency and avoid the data loading time. 
// Also, we will show the data as soon as it gets edited or modified or changed.

////////////  Working with NgRx ////////////////

// Adding NgRx store:
// ng add @ngrx/store
// This will add ngrx store module for the root and also create a reducer folder with index.ts file.
// This storeModule create a in-memory database to our application. Where we can store and read data.
// But NgRx store is not an actual database where there are not using transcactions and query language.
// It is simply a centralized place from where can store and read data independent of the component.
// It also has many methods likes (dispatch(), subscribe());

///////////// Modifiying the store //////////////
// To modify the store we need to inject the store then dispatch() the data (action) to the store.

///////////// Getting data from the store ////////////////
// There are two ways to get data from the store:
// (1) By subscribing the store.
// (2) Using Ngrx Selector.

// Store is an observable. That means to get the current state of the application we need to inject the store then subscribe the store observable.

// Adding NgRx Dev-tools
// ng add @ngrx/store-devtools
// NgRx dev-tools is a browser extension that allows us to see the ngrx store containt in the browser.
// To see the data in the browser, we need to install Redux DevTools Extension.

// Adding ngrx store to the feature module (in this case Auth module):
// ng generate store auth/Auth --module auth.module.ts
// This wil add a ngrx store to the auth module(feature module) and also create a reducer folder with index.ts file.

/////////// Key Concepts of the NgRx Architecture //////////////////

/////// Actions ////////////
// Actions express unique events that happen throughout your application. From user interaction with the page, external interaction through network requests, and direct interaction with device APIs, these and more events are described with actions.
// In order to store a data (action) to the store. First we need to dispatch() an action.
// An action is simply a plan object with type, payload (where actual data goes here).

let actionExample = {
  type: 'login action',
  payload: {}
}

// Type of actions:
// (1) Command action: code to the perform the certain operations.
// (2) Event action: to report something happended at the level of the component.

// Here, we are using auth.action.ts file to create actions.
// Dispatching an action is the only way to modify the state.
// Dispatching an action does not simply affect the store state of the application. Hence, after dispatching an action we need to also change the state of the application using reducer.

/////// Reducer ////////////
// Reducers in NgRx are responsible for handling transitions from one state to the next state in your application. Reducer functions handle these transitions by determining which actions to handle based on the action's type.
// There are a few consistent parts of every piece of state managed by a reducer.
// (1) An interface or type that defines the shape of the state.
// (2) The arguments including the initial state or current state and the current action.
// (3) The functions that handle state changes for their associated action(s).

// Reducer is a simple javascript function which takes current state of the application and actions and returns the new state of the application. Or in simple word, Reducer is a new state creator.
function authReducer(currentState, action): AuthState {
  return;
}

///////// Selector ////////////////////
// We use selector, when we need to retrieve something or select some data from the store.
// Selectors are pure functions used to select, derive and compose pieces of state.
// Selectors provide many features when selecting slices of state:
// => Portability
// => Memoization
// => Composition
// => Testability
// => Type Safety

////////////// NgRx Effects //////////////////////////////
// Side Effects:
// Side effect is something extra that we want to do in our application after an action has been dispatched and processed by the store. So after reducer linked to the action have been triggered, we want to do something else such save data to the backend or local storage. 

// Whenever we change something in the store, at the same time, we also sometimes wish to store those changes to the backend.Here, NgRx effect comes into the picture.
// In order to use the NgRx effect module, first we need to import the app.module as:
// EffectsModule.forRoot([])
// We can also add this to the feature modules as:
// // EffectsModule.forFeature([])
// Here, we want to get the user details and save the browser local storage so the application keep on logged in even after the browser refresh.



// What we are going to implement in this application:
// (1) Defining user authentication state: login and logout functions that will keep the user  logged in between the browser request and we have implemented the authguards to protect the courses route.