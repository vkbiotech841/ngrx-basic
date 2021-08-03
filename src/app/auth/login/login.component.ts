import { AppState } from './../../reducers/index';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { login } from '../auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;
    this.auth.login(val.email, val.password)
      .pipe(
        tap(user => {
          console.log("user", user);
          // saving user profile inside the store;
          // In order to store a action(data) to the store. First we need to dispatch() an action.
          // An action is simply a plan object with type, payload(where actual data goes here).
          // Here, we are using auth.action.ts file to create actions.
          // Dispatching an action does changes the state of the application. Hence, after dispatching an action we need to also change the state of the application using reducer.
          // Reducer is a simple javascript function where takes current state of the application and actions and returns the new state of the application. Or simple word it is a new state creator.
          const newLoginAction = login({ user: user });
          console.log("New Login Actions", newLoginAction);
          this.store.dispatch(newLoginAction);
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        () => alert('Login Failed')
      )


  }

}

