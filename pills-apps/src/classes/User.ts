import { Medicine } from "./Medecine";
import {Doctor} from "./Doctor"

export class User {
    name: String;
    phoneNumber: String;
    emailAddress: String;
    password: String;
    prescriptionList: Medicine[];
    flags?: string;
    interactions?: string;
    doctor: Doctor
  
    constructor(
      name: String,
      phoneNumber: String,
      emailAdress: String,
      password: String,
      prescriptionList: Medicine[],
      doctor: Doctor,
      flags?: string,
      interactions?: string,
    ) {
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.emailAddress = emailAdress;
      this.password = password;
      this.prescriptionList = prescriptionList;
      this.doctor = doctor;
    }
  }