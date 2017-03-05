import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from 'ionic-angular';
import { POSTServices } from '../../app/services/post.service';
import { ShareDataService } from '../../app/services/shareData.service';
import { MapPage } from '../map/map';
import { CommonService } from '../../app/services/common.service';

@Component({
  selector: 'createOrganization',
  templateUrl: 'createNewOrganization.html'
})
export class CreateNewOrganizationPage {

  newOrganizationForm : any; 
  organizationModel :  OrganizationModel;
  isBrowser: boolean;
  thumbnailName: String;
  thumbnailBase64Data: String;
  locationValue: String;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private postService: POSTServices
              ,public commonService: CommonService, private shareDataService: ShareDataService) {

    //Check whether its device or browser
    this.isBrowser = commonService.getIsBrowser();    

    this.newOrganizationForm = this.formBuilder.group({
      'orgName': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'thumbnail': ['', Validators.required],
      'location': ['', Validators.required],
      'images': ['', Validators.nullValidator],
      'description':['', Validators.required]
    });        
  }

  ionViewWillEnter() {
    //Perform action when enter this page
    if(this.shareDataService.getOrganizationLatitude() != null && this.shareDataService.getOrganizationLongitude() != null){
        console.log(this.shareDataService.getOrganizationLatitude() +', '+ this.shareDataService.getOrganizationLongitude());
        this.locationValue = this.shareDataService.getOrganizationAddressText();
    }
  }

  insertOrganization(){
    if (this.newOrganizationForm.dirty && this.newOrganizationForm.valid) {

      var location : Location;
      location = {
        latitude: this.shareDataService.getOrganizationLatitude(),
        longitude: this.shareDataService.getOrganizationLongitude()
      }           
     
      var images: String[] = [];
      images.push(this.newOrganizationForm.value.images);

     this.organizationModel = {
       orgName: this.newOrganizationForm.value.orgName,
       userName: this.newOrganizationForm.value.email,
       password: this.newOrganizationForm.value.password,
       thumbnail: this.thumbnailBase64Data,
       description: this.newOrganizationForm.value.description,
       location: location,       
       images:images,
       numOfLikes: 0
     }

      var newOrganizationFormJson: String;
      newOrganizationFormJson = (JSON.stringify(this.organizationModel));

      console.log('createNewOrganization.ts-> '+newOrganizationFormJson);

      this.postService.createNewOrganization(newOrganizationFormJson).subscribe(response =>{
        alert('Organization created...');
        console.log(response);
      });

      //this.navCtrl.push(MapPage);
      //console.log('New Organization Created-> '+ response.res );
    }
  }

  openMapView(){
    console.log('opening google map........');
    this.navCtrl.push(MapPage);
  }

  selectedThumbnail(event) {
    var fileReader:FileReader = new FileReader();
    var files = event.srcElement.files;
    console.log(files[0].name); 

    //Setting Image Name to text field
    this.thumbnailName = files[0].name;  

    fileReader.onload = (file) => {
        this.thumbnailBase64Data = fileReader.result;
        console.log("Encoded file!" + this.thumbnailBase64Data);
    }

    fileReader.readAsDataURL(files[0]);         
  }  
}

interface OrganizationModel{
    orgName: String;
    userName: String;
    password: String;
    location: Location;
    thumbnail: String;
    images: String[];
    description: String;
    numOfLikes: number;    
  }

interface Location{
  latitude: Number;
  longitude: Number;
}