export class Advert{
        longitude: string;
        latitude: string;
        image:any;
        voucher: any;
        startdate: Date;
        enddate: Date;
        
        constructor(longitude, latitude, url,voucher,startdate, enddate){
        this.longitude = longitude; 
        this.latitude = latitude;
        this.image = url
        this.voucher;
        this.startdate = startdate;
        this.enddate = enddate; 
        }
}