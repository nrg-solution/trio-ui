import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from '../_models/index';
import { Router } from '@angular/router';
import { HttpRequest, HttpEvent} from '@angular/common/http';
import { ServerURL } from './url';


@Injectable()
export class AuthenticationService implements OnInit {

  constructor(
    private http: HttpClient,
     private router: Router,
     private globalsURL: ServerURL
  ) {

 }

  testResponse: User;
  suburl:string;
  baseurl:string;
  url:string;
  protected baseUrl = this.globalsURL.serverURL;

  ngOnInit(): void {
    //baseUrl = this.globalsURL.serverURL;

    }

    
    resetPassword(pwd: string , uname: string) 
    {
    //  console.log("User name ----->"+uname);
    //  console.log("Password ----->"+pwd);
      return this.http.get<User>(this.baseUrl+"resetPassword?newPassword="+pwd+"&userName="+uname);
    }

    checkUserName(uname: string)
    {
      return this.http.get<User>(this.baseUrl+"Checkuser?username="+uname);
    }

    OTPCheck(otp: string)
    {
      return this.http.get<User>(this.baseUrl+"OTPCheck?otp="+otp);
    }

     login(uname: string, pwd: string) {
         //  console.log('User name --->',uname);
        //   console.log('Password --->',pwd);
           
           this.suburl= '?username='+uname+'&password='+pwd;
           this.baseurl=this.baseUrl + "user";
           this.url=this.baseurl+this.suburl;
           
        //   console.log('Sub URL ----------->',this.suburl);
         //  console.log('Base URL ----------->',this.baseurl);
        //   console.log('URL ----------->',this.url);
           return this.http.get<User>(this.url);
    }

    logout() {
        localStorage.removeItem('currentusername');
        this.router.navigate(['/login']);
    }

    pushFileToStorage(file: File,memberID :string): Observable<HttpEvent<{}>> {
      let formdata: FormData = new FormData();
  
      formdata.append('file', file);
      formdata.append('memberID', memberID);
      const req = new HttpRequest('POST', this.baseUrl+"paymentUplaod", formdata, {
        reportProgress: true,
        responseType: 'text'
      });
  
      return this.http.request(req);
    }

    getMemberIDValidate(memberID:string){
      return this.http.get<User>(this.baseUrl+"getMemberIDValidate?memberID="+memberID);
    }

    getFiles(memberID:string): Observable<string[]> {
      return this.http.get<string[]>(this.baseUrl+"getallfiles?memberID="+memberID);
    }
}