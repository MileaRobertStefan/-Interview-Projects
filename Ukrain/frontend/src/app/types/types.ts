export interface Offer {
    description: string;
    appUser?: User;
    id?:number
  };


export interface User{
  firstName: string;
  lastName:string;
  email:string;
  telephone:string;
  password:string;
  token?:string;
  id?:Number;
}

export interface PendingOffer{
  id:number,
  appUser:User,
  offer:Offer,
  accepted:boolean,
  createdAt?:any,
  LocalDateTime?:any
}

export class EMPTY_TYPE {
  public static EMPTRY_USER : User = {
    firstName: "",
    lastName:"",
    email:"",
    telephone:"",
    password:"",
    token:"",
    id:0
  }

  public static EMPTY_OFFER:Offer = {
    description:"",
    id:-1
  }
}