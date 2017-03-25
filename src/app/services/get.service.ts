import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GETServices{
    http:any;
    baseUrl: String;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'http://localhost:8080/backend';
    }    

    getAllOrganization(){
        let headers  = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let options  = new RequestOptions({ headers: headers });
        let category = '/getAllOrganizations';
        
        let response = this.getRequest(category, options, null); 
        return response;                              
    }

    getAllOrganizationByLocation(latitude, longitude){
        let headers  = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let options  = new RequestOptions({ headers: headers });
        let category = '/getOrganizationsByLocation';
        let parameters = 'latitude='+latitude+'&longitude='+longitude;

        let response = this.getRequest(category, options, parameters);
        return response;
    }
    
    getOrganizationInfo(organizationId){
    	let headers  = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let options  = new RequestOptions({ headers: headers });
        let category = '/getAllOrganizations';
        //let parameters = 'organizationId='+organizationId;

        let response = this.getRequest(category, options, null);
        return response;
    }

    getRequest(category, options, parameters){
        console.log('GETServices...');
        var url = this.baseUrl + category + '?'+ parameters;
        return this.http.get(url, options)
                        .map( res => res.json())
                        .catch(this.handleError);
    }

    handleError(error) {
		console.error(error);
        return Observable.throw(error.json().error || 'Server error, please try again later');
	}
}