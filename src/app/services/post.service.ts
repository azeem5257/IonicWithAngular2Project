import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class POSTServices{
    http:any;
    baseUrl: String;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'http://localhost:8080/backend';
    }

    createNewOrganization(newOrganizationData){
        console.log('POSTServices-> '+newOrganizationData);

        let headers  = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let options  = new RequestOptions({ headers: headers });
        let category = '/createOrganization';

        let response = this.postRequest(category, options, null, newOrganizationData);
        return response;
    }

    updateLikesCount(organizationId, isIncrement){
        console.log('Updates Like Count-> '+organizationId);

        let headers  = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let options  = new RequestOptions({ headers: headers });
        let category = '/updateLikeCount';
        let parameters = 'organizationId='+organizationId+'&isIncrement='+isIncrement;

        let response = this.postRequest(category, options, parameters, null);
        return response;
    }

    postRequest(category, options, parameters, data){
        console.log('POSTServices...');
        var url = this.baseUrl + category;

        if(parameters != null){
            url = url + '?'+ parameters;
        }

        console.log('POSTURL: '+ url);

        return this.http.post(url, data, options)
                        .map( res => res.json())
                        .catch(this.handleError);
    }

    handleError(error) {
		console.error(error);
        return Observable.throw(error.json().error || 'Server error, please try again later');
	}
}

