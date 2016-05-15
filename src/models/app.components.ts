export class Advert {
  constructor(
    public longitude: number,
    public latitude: number,
    public url: string,
    public voucher: string,
  	public startdate: Date,
  	public enddate: Date
    ) {  }

}