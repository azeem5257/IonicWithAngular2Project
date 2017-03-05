import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { POSTServices } from './services/post.service';
import { GETServices } from './services/get.service';
import { TabsPage } from '../pages/tabs/tabs';
import { ShareDataService } from './services/shareData.service';
import { CommonService } from './services/common.service';

@Component({
  templateUrl: 'app.html',
  providers: [GETServices, POSTServices, ShareDataService, CommonService]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
