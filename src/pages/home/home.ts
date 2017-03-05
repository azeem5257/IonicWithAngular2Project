import { Component } from '@angular/core';
import { GETServices } from '../../app/services/get.service';
import { POSTServices } from '../../app/services/post.service';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { ShareDataService } from '../../app/services/shareData.service';
import { CommonService } from '../../app/services/common.service';
import { PopoverPage } from './PopoverPage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  organizations: any = [];
  isBrowser: boolean;
  latlng: any;
  sortOption:string;

  constructor(public navCtrl: NavController, private getService: GETServices,
              private postService: POSTServices,
              private shareDataService: ShareDataService ,
              private commonService: CommonService,
              private popoverCtrl: PopoverController) {  

    //Set Default Sort Option
    this.sortOption = 'distanceFromCurrentLoc';

    //Check whether its device or browser
    this.isBrowser = commonService.getIsBrowser();
    console.log('isBrowser-> '+this.isBrowser);

    commonService.getCurrentLocation().then((position)=> {
      if(this.shareDataService.getOrganizationLatitude() != null && this.shareDataService.getOrganizationLongitude() != null){
           this.getAllOrganization(this.shareDataService.getOrganizationLatitude(), this.shareDataService.getOrganizationLongitude()) ;
      }else{
        alert('Location Not Found');
      }
    });    
  }

  getAllOrganization(latitude, longitude){
    this.getService.getAllOrganizationByLocation(latitude, longitude).subscribe(response =>{
        this.organizations = response;
    });
  }

  likeBtnClickHandler(organization, event:Event){
    this.postService.updateLikesCount(organization.id, true).subscribe(response => {
      organization.numOfLikes = response;
      console.log('LikeBtnClickHandler-> '+response);
    });
  }

  filterOptionPopOver(event) {
    var defaultOption;
    if(this.sortOption === 'distanceFromCurrentLoc'){
      defaultOption = 'sortByLocation'
    }else if(this.sortOption === 'numOfLikes'){
      defaultOption = 'sortByPopularity'
    }
    let popover = this.popoverCtrl.create(PopoverPage,{
      defaultOption: defaultOption
    });

    popover.present({
      ev: event
    });
    popover.onDidDismiss(_sortOption => {
      if(_sortOption === 'sortByLocation'){
          this.sortOption = 'distanceFromCurrentLoc';
        }else if(_sortOption === 'sortByPopularity'){
          this.sortOption = 'numOfLikes';
        }  
    });
  }  
}


