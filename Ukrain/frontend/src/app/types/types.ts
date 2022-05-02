export interface Offer {
    description: string;
    postedBy: string;
  };


export interface User{
  firstName: string;
  lastName:string;
  email:string;
  telephone:string;
  password:string;
  token?:string;
}

export class EMPTY_TYPE {
  public static EMPTRY_USER : User = {
    firstName: "",
    lastName:"",
    email:"",
    telephone:"",
    password:"",
    token:""
  }
}