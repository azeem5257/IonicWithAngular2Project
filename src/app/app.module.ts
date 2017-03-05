import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { CreateNewOrganizationPage } from '../pages/createOrganization/createNewOrganization';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/home/PopoverPage';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationFilterPipe } from '../pipes/organization-filter.pipe';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CreateNewOrganizationPage,
    HomePage,
    TabsPage,
    MapPage,
    PopoverPage,
    OrganizationFilterPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    CreateNewOrganizationPage,
    HomePage,
    TabsPage,
    MapPage,
    PopoverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
