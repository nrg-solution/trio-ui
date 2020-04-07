import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-memberdashboard',
  templateUrl: './memberdashboard.component.html',
  styleUrls: ['./memberdashboard.component.css']
})
export class MemberdashboardComponent implements OnInit {
  
  model: any = {};
  ledgerList: any = {};
  countryList: any = {};

  loadinggif:boolean = false;
  loading:boolean = false;
  user:User;
  imgsrc:string;

  public memberDashDiv = false;
  public ledgerdiv = false;
  public myProfile = false;
  public profilediv = false;
  public withdrawdiv = false;

  display='none';
  display3='none';
  display4='none';
  display9='none';
  display10='none';
  display11='none';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { 

  }

  ngOnInit() {
    if(localStorage.getItem('currentusername')==null){
      this.router.navigate(['/login']);
    }else{ 
      this.memberDashDiv = true;
    }
    this.imgsrc="assets/images/Triologo.png";

    this.userService.getCountry()
          .subscribe(
              data => {
                  this.countryList = data;
              },
              error => {
                  this.display3="block";
              }
          );
  }

  memberhome(){
    this.memberDashDiv = true; 
    this.ledgerdiv = false;
    this.myProfile = false;
    this.profilediv = false;
    this.withdrawdiv = false;
  }

  onMenuClick(value: string): void {   
    if(value=="ProfileEdit"){ 
      this.OnEdit();
    }
    if(value=="myprofileback"){ 
      this.myprofileback();
    }
    if(value=="ledger"){ 
      this.clickLedger();
    }
    if(value=="withdraw"){ 
      this.clickWithdraw();
    }
    if(value=="profile"){     
      this.clickProfile();
    }
  }

  clickLedger(){
    this.loadinggif = true;
    this.ledgerdiv = false;	
    this.ledgerList='';
    this.userService.getLedgerInfo(localStorage.getItem('userloginPrimaryKeyString'),1)
    .subscribe(
     data => {
      console.log("getLedger Details Called.");
         this.ledgerList= data;
         console.log("Values --->"+this.ledgerList);
         this.loadinggif = false;
         this.ledgerdiv = true;
      },
      error => {
          this.loadinggif = false;
          this.ledgerdiv = true;
          this.display3="block";
       }
      );  
    this.profilediv=false;
    this.myProfile = false;
    this.memberDashDiv = false;
    this.withdrawdiv = false;	
  }

  // Load the value from database ...
  clickWithdraw(){
    this.loadinggif = true;
    this.withdrawdiv = false;	
    this.ledgerList=''; 
    this.userService.getLedgerInfo(localStorage.getItem('userloginPrimaryKeyString'),2)
    .subscribe(
     data => {
      console.log("get Withdraw Details Called.");
         this.ledgerList= data;
         console.log("Values --->"+this.ledgerList);
         this.loadinggif = false;
         this.withdrawdiv = true; 
        },
      error => {
        this.loadinggif = false;
        this.display3="block"; 
       }
      );  
      this.profilediv=false;
      this.ledgerdiv = false;
      this.myProfile = false;
      this.memberDashDiv = false;
  }
  
  openWithdraw(value1: string , value2: string, value3: string){  
      this.model.memberID = value1;
      this.model.withdrawDate = value2;
      this.model.status = value3;
      if(value3=="Can't Withdraw") {
          this.display10="block";
      }
      else if(value3=="Requested for Withdraw"){
        this.display11="block";
      }
      else {
          this.userService.openWithdraw(this.model)
          .subscribe(
            data => {
             this.user= data;
             if(this.user.status=="success"){
              this.clickWithdraw();
              this.display9="block";
             }
             else if(this.user.status=="exit"){
              this.clickWithdraw();
              alert("Withdraw already taken.");
          }
          else if(this.user.status=="failure"){
              this.clickWithdraw();
              this.display3="block";
          }
      
          },
          error => {
              this.display3='block';
              this.clickWithdraw();   
           }
        ); 
      }
      
  }

  clickProfile(){
    this.loadinggif = true;
      this.myProfile=false;
      this.userService.getMyProfile(localStorage.getItem('userloginPrimaryKeyString'))
      .subscribe(
         data => {
            this.user=data;
            this.loadinggif = false;
            this.myProfile=true;
        },
        error => {
            this.loadinggif = false;
            this.myProfile=true;
            this.display3="block"; 
        }
    );  
    this.profilediv=false;
    this.memberDashDiv = false;
    this.withdrawdiv = false; 
    this.ledgerdiv = false;
  }

  updateMyProfile(){      
    this.loading= true;   
    this.user.userloginPrimaryKeyString = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.updateMyProfile(this.user)
    .subscribe(
      data => {
        this.user= data;
        if(this.user.status=="success") {
          this.loading= false; 
          this.display4="block";
          this.clickProfile();
        }

         if(this.user.status=="failure") {
              this.loading= false; 
              this.display3="block"; 
              this.clickProfile();
         }
    },
    error => {
        this.loading= false; 
        this.display3="block"; 
     });  
   
  }

  OnEdit (){
    this.profilediv = true;
    this.myProfile = false;    
  }
  myprofileback(){
    this.myProfile = true; 
    this.profilediv = false; 
  }

  openModal(){
    this.display="block"; 
  }
  onCloseHandled(){
    this.display3='none'; 
    this.display9='none';
    this.display10='none';
    this.display4='none';
    this.display11='none';
  }

}
