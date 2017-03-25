import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { POSTServices } from '../../app/services/post.service';
import { GETServices } from '../../app/services/get.service';
import { ShareDataService } from '../../app/services/shareData.service';
import { MapPage } from '../map/map';
import { CommonService } from '../../app/services/common.service';

@Component({
  selector: 'owner-home',
  templateUrl: 'organizationOwnerHome.html'
})
export class OrganizationOwnerHomePage {

	organization:any;
	isDataAvailable: boolean = false;

	constructor(private getService: GETServices){
		this.displayOrganizationHomePage('abc');
	}
	
	displayOrganizationHomePage(organizationId){
		this.getOrganizationInfo('asdddd');
	}
	
	getOrganizationInfo(organizationId){
	    this.getService.getOrganizationInfo(organizationId).subscribe(response =>{
	        this.organization = response[0];
	        this.isDataAvailable = true;
	        console.log(this.organization);
	    });
  }
}

