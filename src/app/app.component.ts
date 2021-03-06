import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { MenuController } from '@ionic/angular';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loginflag: boolean;
  constructor(
    private router: Router,
    private menu: MenuController,
    private auth: AngularFireAuth
  ) {
    this.initializeApp();
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.loginflag = true;
        this.router.navigateByUrl('/camera');
      } else {
        this.loginflag = false;
        this.router.navigateByUrl('/');
      }
    });
  }

  initializeApp() {
    /* To make sure we provide the fastest app loading experience
       for our users, hide the splash screen automatically
       when the app is ready to be used:

        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */

    SplashScreen.hide();
  }
  goto(location) {
    this.router.navigateByUrl(location);
    this.menu.close();
  }
  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/');
      this.menu.close();
    });
  }
}
