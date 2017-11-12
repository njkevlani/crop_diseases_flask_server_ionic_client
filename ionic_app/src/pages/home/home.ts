import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraModalPage } from '../camera-modal/camera-modal';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ModalController } from 'ionic-angular';
import * as $ from 'jquery';
import { BackgroundFetch, BackgroundFetchConfig } from '@ionic-native/background-fetch';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	temp;
	x=[];
	
	
	

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,private geolocation: Geolocation,public toast: ToastController,public localNotification: PhonegapLocalNotification,public http:Http,private localNotifications: LocalNotifications) {

this.localNotification.requestPermission().then(
	  (permission) => {
	  // 	$.ajax({
   //        url: "http://192.168.42.203:8080/init",
   //        type: "POST",
   //        data: "",
   //        success: function(html){
   //        	this.x.push(html);
          	
   //        }
 		//  });
	  //   if (permission === 'granted') {
	    
	  //  this.localNotifications.schedule(
			// {
			//    id: 1,
			//    text: this.x.toString()
			//   }
  	// 	);

	   


});





// this.geolocation.getCurrentPosition().then((resp) => {
// 		 this.localNotification.requestPermission().then(
// 	  (permission) => {
// 	    if (permission === 'granted') {

// 		    	for(let i=0;i<3;i++){

// 		    	}

// 	    	}
// 		  }
// 		);
//   	let headers = new Headers();
// headers.append('Content-Type', 'application/json');
// let data=JSON.stringify({username:"raja"});
// this.http.post('https://api.myjson.com/bins/d58h3',data,headers)
// .map(res => res.json())
// .subscribe(res => {
// console.log("yes");
// }, (err) => {
// console.log(err);
// });

  //     this.geolocation.getCurrentPosition().then((resp) => {
		//  this.localNotification.requestPermission().then(
	 //  (permission) => {
	 //    if (permission === 'granted') {
	 //         console.log('Background Fetch initialized');
  //         	this.toast.create({
		//         message: "lat="+resp.coords.latitude+"&long="+resp.coords.longitude,
		//         duration: 1000
		//       }).present();
  //         	}
		//   }
		// );
      //     	 $.ajax({

		    //       type: "POST",
		    //       url: "http://192.168.42.11:8080/init",
		    //       // url: "https://api.myjson.com/bins/d58h3/",
		    //       data: JSON.stringify({"id":0,"lat":resp.coords.latitude,"long":resp.coords.longitude,"min_dist":10000}),
		    //       // data:"a=b",
				  // contentType:"application/json;charset=utf-8",
		    //       success: function(result){
		    //       	this.temp=result;
		    //       	console.log(result);
		    //       },error:function(e){console.log(e);
		    //       	this.toast.create({
				  //       message: "lat=lllll",
				  //       duration: 2000
				  //     }).present();



// above working



		        //   	this.toast.create({
				      //   message: "Fail",
				      //   duration: 5000
				      // }).present();
		        //   	$.ajax({
			       //    url: "https://requestb.in/t3fbhmt3",
			       //    type: "POST",
			       //    data: "data:Failed",

			       //    success: function(html){
			       //    }
			        // });



			        // below working



		 //          }
		 //       });
   //        	 	setTimeout(function(){
   //        	 		console.log(this.temp);
   //        	 		this.toast.create({
			// 	        message: "latttt="+resp.coords.latitude+"&longggggg="+resp.coords.longitude,
			// 	        duration: 2000
			// 	      }).present();
		 //          	var data = $.parseJSON(this.temp);
		 //          	this.toast.create({
			// 	        message: this.temp,
			// 	        duration: 3000
			// 	      }).present();
		 //          	this.localNotification.requestPermission().then(
	  // (permission) => {
	  //   if (permission === 'granted') {
	  //        console.log('Background Fetch initialized');
			// 		$.each(data, function(key,value) {
			// 			this.toast.create({
			// 		        message: value.disease,
			// 		        duration: 2000
			// 		      }).present();
					   
			// 		}); 
			// 	}
			// }
			// );
					
   //        	 	},5000);
			// this.toast.create({
		 //        message: "last one",
		 //        duration: 1000
		 //      }).present();
			// $.ajax({
	  //         url: "https://requestb.in/t3fbhmt3",
	  //         type: "POST",
	  //         data: "lat="+resp.coords.latitude+"&long="+resp.coords.longitude,

	  //         success: function(html){
	  //         }
	  //       });
   //  	});
        
   		
  }

  takepickturebtn(){
  	let myModal = this.modalCtrl.create(CameraModalPage);
    myModal.present();
  }

}
