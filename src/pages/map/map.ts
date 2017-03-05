import { Component } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { ShareDataService } from '../../app/services/shareData.service';
import { CommonService } from '../../app/services/common.service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map:any;
  showAddMarkerBtn: boolean;
  showRemoveMarkerBtn: boolean;
  marker:any;
  autocomplete:any
  address:any;

  constructor(public navCtrl: NavController, private shareDataService: ShareDataService, 
              private commonService: CommonService) {
    this.showAddMarkerBtn= true;
    this.showRemoveMarkerBtn= false;
  }

  ionViewDidLoad(){    
    this.loadMap();
  }

  loadMap(){    
    console.log('loading Map....');

    let options = {timeout:10000, enableHighAccuracy:true};   
    let latLng : any;
    // Geolocation.getCurrentPosition(options).then((position) => {
    //   let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
        
    //   this.shareDataService.setOrganizationLatitude(position.coords.latitude);
    //   this.shareDataService.setOrganizationLongitude(position.coords.longitude);
    //   // this.shareDataService.setOrganizationAddressText(locationText);

    //   console.log(position.coords.latitude +', '+ position.coords.longitude);

    //   let mapOptions = {
    //     center: latlng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }

    //   this.map = new google.maps.Map(document.getElementById("map"), mapOptions); 
    //   this.drawSearchBox(this.map);     
    // });

    if(this.shareDataService.getOrganizationLatitude() != null && this.shareDataService.getOrganizationLongitude() != null){
        latLng = new google.maps.LatLng(this.shareDataService.getOrganizationLatitude(), 
                                   this.shareDataService.getOrganizationLongitude());
    }else{
        this.commonService.getCurrentLocation();
        latLng = new google.maps.LatLng(this.shareDataService.getOrganizationLatitude(), 
                                   this.shareDataService.getOrganizationLongitude());
    }    

    let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

     this.map = new google.maps.Map(document.getElementById("map"), mapOptions); 
     this.drawSearchBox(this.map);

    console.log('Map Loaded....');      
  }

  addMarker(){
    this.showAddMarkerBtn= false;
    this.showRemoveMarkerBtn= true;

    var sharedDataService = this.shareDataService;
    var geocoder = new google.maps.Geocoder;
    let locationText : any;

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      draggable:true,
    });
    
    google.maps.event.addListener(this.marker, 'dragend', function(position) {
      sharedDataService.setOrganizationLatitude(position.latLng.lat());
      sharedDataService.setOrganizationLongitude(position.latLng.lng());

      var latlng = new google.maps.LatLng(position.latLng.lat(), position.latLng.lng()) 

      geocoder.geocode({'location': latlng}, function(results, status){
        if (status.toString() === 'OK') {
          sharedDataService.setOrganizationAddressText(results[0].formatted_address);          
        }else{
            console.log('Geocoder failed due to: ' + status);
        }
      });
               
    });        
  
    let content = "<h4>Information!</h4>";          
  
    this.addInfoWindow(this.marker, content);  
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    }); 
  }

  removeMarker(){
    this.showAddMarkerBtn= true;
    this.showRemoveMarkerBtn= false;

    if(this.marker != null){
      this.marker.setMap(null);
    }
  }  

  drawSearchBox(map:any){    
    // Create the search box and link it to the UI element.
    var input = <HTMLInputElement>document.getElementsByClassName('searchbar-input')[0];
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener(map,'bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });      
  }

  doneBtn(){
    this.navCtrl.pop();
  }
}