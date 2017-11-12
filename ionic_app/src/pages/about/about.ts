import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  feeds;
  locationd;
  constructor(public navCtrl: NavController,private geolocation: Geolocation) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.locationd = resp;
        $.ajax({
          url: "http://192.168.42.203:8080/init",
          // url: "https://requestb.in/w35pnuw3",
          type: "POST",
          contentType:"application/json;charset=UTF-8",
          // data: "file="+imageData+"&lat="+resp.coords.latitude+"&long="+resp.coords.longitude,
          data:JSON.stringify({"lat":this.locationd.coords.latitude,"long":this.locationd.coords.longitude,"max_dist":2000}),
          success: function(html){
            this.feeds = html;
          },
          error: function(xhr, textStatus, errorThrown){
               
          }
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  thumbsup(e){
  	let b = e.target;
  	let i = $(b).parent().parent().parent().parent().attr("id");
  	let l = $(b).children();
  	console.log(l);
  }

}
