import { User } from "./User";

export class Doctor {
    name: String;
    phoneNumber: String;
    password: String;
    clientsList?: User[];
    email: String;
  
  
    constructor(
      name: String,
      phoneNumber: String,
      password: String,
      email: String,
     
    ) {
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.password = password;
      this.email = email;
    }
  }