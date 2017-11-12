import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraModalPage } from './camera-modal';

@NgModule({
  declarations: [
    CameraModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraModalPage),
  ],
})
export class CameraModalPageModule {}
