import { PopoverController, NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="selectedSortByOption" class="popover-page">
        <ion-list-header>
            Sort Options
        </ion-list-header>          
        <ion-item>
            <ion-label>By Location</ion-label>
            <ion-radio value="sortByLocation" (click)="changeSortOption()"></ion-radio>
        </ion-item>      
        <ion-item>
            <ion-label>By Popularity</ion-label>
            <ion-radio value="sortByPopularity" (click)="changeSortOption()"></ion-radio>
        </ion-item>
    </ion-list>
  `
})
export class PopoverPage {

    selectedSortByOption: any;
    defaultOption: any;

    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    }

    ngOnInit() {
        if (this.navParams.data) {   
            this.selectedSortByOption = this.navParams.get('defaultOption');
        }
    }

    changeSortOption(){        
        this.close(this.selectedSortByOption);
    }

    close(selectedSortByOption) {
        this.viewCtrl.dismiss(selectedSortByOption);
    }
}