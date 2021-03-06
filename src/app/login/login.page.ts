import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router:Router) {}

  ngOnInit() {}
  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this.router.navigateByUrl('/camera');
  }

  errorCallback(errorData: FirebaseUISignInFailure) {}

  uiShownCallback() {}
}
