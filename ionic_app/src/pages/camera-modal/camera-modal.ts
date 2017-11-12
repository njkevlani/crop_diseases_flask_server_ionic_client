import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { ImagePicker } from '@ionic-native/image-picker';
import * as $ from 'jquery';
/**
 * Generated class for the CameraModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// import * as $ from 'jquery';
@IonicPage()
@Component({
  selector: 'page-camera-modal',
  templateUrl: 'camera-modal.html',
})
export class CameraModalPage {
	bookmarked;
	bookmarked1;
  locationd;
  hashval;
  options: CameraOptions = {
    quality: 100,
    targetWidth:100,
    targetHeight:100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,private toast: Toast,private geolocation: Geolocation,private nativeStorage: NativeStorage,private imagePicker: ImagePicker) {
  	this.bookmarked = 1;
  	this.bookmarked1 = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraModalPage');
  }
  camerabtn(){
  	if(this.bookmarked)
  		this.bookmarked=0;
  	else
  		this.bookmarked=1;

    this.geolocation.getCurrentPosition().then((resp) => {
        this.locationd = resp;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.camera.getPicture(this.options).then((imageData) => {
        console.log("CAMERA!!!");
        this.nativeStorage.getItem('hashnum')
        .then(
          data => {this.hashval = data;console.log(this.hashval)},
          error => { 
            console.log("error portion");
            this.hashval = (+new Date).toString(36);
            this.nativeStorage.setItem('hashnum', {property: this.hashval, anotherProperty: this.hashval})
              .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
              );
            }
          );

         let base64Image = 'data:image/jpeg;base64,' + imageData;
         console.log(JSON.stringify({"file":imageData,"lat":this.locationd.coords.latitude,"long":this.locationd.coords.longitude,"hash":this.hashval}));
         $.ajax({
          url: "http://192.168.42.203:8080",
          // url: "https://requestb.in/w35pnuw3",
          type: "POST",
          contentType:"application/json;charset=UTF-8",
          // data: "file="+imageData+"&lat="+resp.coords.latitude+"&long="+resp.coords.longitude,
          data:JSON.stringify({"file":imageData,"lat":this.locationd.coords.latitude,"long":this.locationd.coords.longitude,"hash":(this.hashval)["property"]}),
          success: function(html){
            this.toast.create({
                message: "Success",
                duration: 2000
              }).present();
          },
          error: function(xhr, textStatus, errorThrown){
               this.toast.create({
                message: "Failure",
                duration: 2000
              }).present();
          }
        });

        //  $.ajax({
        //   url: "https://requestb.in/1ju9tvw1",
        //   type: "POST",
        //   data: "file="+imageData+"&lat="+resp.coords.latitude+"&long="+resp.coords.longitude,

        //   success: function(html){
            
        //   }
        // });
       });



}
 gallerybtn(){
  	if(this.bookmarked1)
  		this.bookmarked1=0;
  	else
  		this.bookmarked1=1;
    this.geolocation.getCurrentPosition().then((resp) => {
        this.locationd = resp;
    }).catch((error) => {
      console.log('Error getting location', error);
       $.ajax({
          url: "https://requestb.in/t3fbhmt3",
          type: "POST",
          data: "file=Error&y=x&err="+error,

          success: function(html){
            
          }
        });
    });

    let options = {
     maximumImagesCount: 1,
     quality: 100
    };

    this.imagePicker.getPictures(options).then((results) => {
      console.log(results);
    }, (err) => { });
  }

}
