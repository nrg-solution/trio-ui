import { Component } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index';

import { AlertService, UserService } from '../_services/index';

@Component({ 
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css'],

})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
    user:User;
    display='none';
    display1='none';
    display2='none';
    display3='none';
    imgsrc:string;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

  
 // OnInit calling
    countryList: any = {};
   ngOnInit() {
    this.imgsrc="assets/images/Triologo.png";
     
              this.userService.getCountry()
               .subscribe(
                data => {
                 this.countryList = data;
              },
                  error => {
                      this.display3="block";
                      //alert('Error !!!!');
               }
              );

  
    }
  
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                   this.user=data;
                    console.log('return value -->',this.user.status);

                  if(this.user.status=="userexits") {
                     console.log('If User Exits');
                     this.display1="block";
                     //this.alertService.error('Username is already registered Please try again.');
                     this.loading = false;
                  }

                  if(this.user.status=="success") {
                    console.log('If Success');
                    this.openModal();
                    this.loading = true;
                  }

                  if(this.user.status=="not exit") {
                    //  alert("Agent Code is not exist");
                    //console.log('If Success');
                   this.openModal2();
                    this.loading = true;
                  }


                   if(this.user.status=="otherError") {
                     console.log('If Other Error');
                     this.display3="block";
                     //this.alertService.error('Network Issue Please try again.');
                     this.loading = false;

                   }                
                },
                error => {
                    this.display3="block";
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }
    openModal(){
        this.display="block"; 
      }
      openModal2(){
        this.display2="block"; 
      }

     onCloseHandled(){
        this.display='none'; 
        this.router.navigate(['/login']);
      }
      onCloseHandled1(){
        this.display1='none';
        this.display3='none'; 
      }

      onCloseHandled2(){
        this.display2='none'; 
        this.router.navigate(['/register']);
      }
}
