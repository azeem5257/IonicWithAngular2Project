export class ShareDataService {  
  
    private organizationLatitude: number;
    private organizationLongitude: number;
    private organizationAddressText: string;
 
    constructor() {         
        this.organizationLatitude = null;
        this.organizationLongitude = null;
        this.organizationAddressText = null;
    }   

    setOrganizationLatitude(latitude){
        this.organizationLatitude = latitude;
    }

    setOrganizationLongitude(longitude){
        this.organizationLongitude = longitude;
    }

    getOrganizationLatitude(){
        return this.organizationLatitude;
    }  

    getOrganizationLongitude(){
        return this.organizationLongitude;
    }  

    setOrganizationAddressText(address){
        this.organizationAddressText = address;
    }

    getOrganizationAddressText(){
        return this.organizationAddressText;
    }
}