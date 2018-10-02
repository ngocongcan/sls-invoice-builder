import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImageLoaderConfig } from 'ionic-image-loader';

import { LoginPage } from '../pages/login/login';
// import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class SLSInspectorApp {
  rootPage:any = LoginPage;
  @ViewChild('navCtrl') navCtrl: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,imageLoaderConfig: ImageLoaderConfig) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      imageLoaderConfig.setFallbackUrl('assets/images/400x300.png');
      imageLoaderConfig.setImageReturnType('base64');
      imageLoaderConfig.maxCacheSize = 30 * 1024 * 1024; // 20 MB
      imageLoaderConfig.maxCacheAge = 600 * 1000 * 1000; // 10 minute
    });
  }
}
