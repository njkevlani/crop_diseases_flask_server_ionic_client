import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CameraModalPage } from '../pages/camera-modal/camera-modal';

import { HttpModule} from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundFetch, BackgroundFetchConfig } from '@ionic-native/background-fetch';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import 'rxjs/Rx';
import { NativeStorage } from '@ionic-native/native-storage';
import { ImagePicker } from '@ionic-native/image-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CameraModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CameraModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Toast,
    Geolocation,
    BackgroundFetch,
    ToastController,
    PhonegapLocalNotification,
    NativeStorage,
    ImagePicker,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
