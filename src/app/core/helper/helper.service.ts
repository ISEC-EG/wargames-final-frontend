/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 03/06/2021 - 14:01:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
import { Injectable } from "@angular/core";
import swal from "sweetalert2";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
@Injectable({
  providedIn: "root",
})
export class HelperService {
  userAddress: string = "";
  mailID: string = "";
  registrationWay: string = "";

  durationInSeconds = 4;

  public optionsMailDialog: any;

  constructor(public matDialog: MatDialog) { }

  alert(msg: string, error = false) {
    swal.fire({
      title: error ? "Oops" : "",
      text: msg,
      width: 500,
      showCancelButton: error ? true : false,
      cancelButtonText: "OK",
      showConfirmButton: false,
      cancelButtonColor: "red",
      icon: error ? "error" : "success",
      timer: error ? 100000 : 2000,
    });
  }

  getFormValidationErrors(form: FormGroup) {
    const result = [];
    Object.keys(form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          result.push(`${key}  ${keyError} error!`);
        });
      }
    });
    return result;
  }

  setAddress(address) {
    this.userAddress = address;
  }

  getAddress() {
    if (this.userAddress === "") return "";
    else return this.userAddress;
  }

  setMailID(mailID) {
    this.mailID = mailID;
  }

  getMailID() {
    if (this.mailID === "") return "";
    else return this.mailID;
  }

  setRegistrationWay(key) {
    this.registrationWay = key;
  }

  getRegistrationWay() {
    return this.registrationWay;
  }

}
