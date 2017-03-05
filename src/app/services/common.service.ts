import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { ShareDataService } from './shareData.service';


@Injectable()
export class CommonService {

    deviceType: any;
    isBrowser: boolean = false;
    location: any;

    constructor(public plt: Platform, private shareDataService: ShareDataService) {
        this.deviceType = this.plt.platforms;
    }

    getDeviceType(){
        return this.deviceType;
    }

    getCurrentLocation(){
        let latLng : any;
        console.log('Loading Current location....');

        let options = {timeout:10000, enableHighAccuracy:true};        

       return Geolocation.getCurrentPosition(options).then((position) => {
            latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            this.getCurrentLocationText(latLng);
                        
            this.shareDataService.setOrganizationLatitude(position.coords.latitude);
            this.shareDataService.setOrganizationLongitude(position.coords.longitude);  
            console.log('Current Location Cords: '+position.coords.latitude +', '+ position.coords.longitude);          
        });
    }

    getCurrentLocationText(latLng){
        var geocoder = new google.maps.Geocoder;
        var shareDataService = this.shareDataService;

        return new Promise(resolve => {
            geocoder.geocode({'location': latLng}, function(results, status){
                if (status.toString() === 'OK') {
                    shareDataService.setOrganizationAddressText(results[0].formatted_address);
                }else{
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        });
    }

    getIsBrowser(){
        if(this.plt.is('core')){
            this.isBrowser = true;
        }
        return this.isBrowser;
    }
}
