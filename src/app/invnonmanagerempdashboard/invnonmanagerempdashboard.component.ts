import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-invnonmanagerempdashboard',
  templateUrl: './invnonmanagerempdashboard.component.html',
  styleUrls: ['./invnonmanagerempdashboard.component.css']
})
export class InvnonmanagerempdashboardComponent implements OnInit {
  @ViewChild('empNonManagerReport') empNonManagerReport: ElementRef;  

  model: any = {};
  empReportList : any = {};
  refempList : any ={};

  loadinggif:boolean = false;
  loading:boolean = false;
  user:User;
  imgsrc:string;

  public employeeDashDiv = false;
  public myProfile = false;
  public profilediv = false;
  public empnonManagerreportdiv = false;

  display3='none';
  noempreport='none';
  updateprofile='none';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('currentusername')==null){
      this.router.navigate(['/login']);
    }else{ 
      this.employeeDashDiv = true;
    }
    this.imgsrc="assets/images/Triologo.png";
  }

  employeehome(){
    this.employeeDashDiv = true;
    this.myProfile = false;
    this.profilediv = false;
    this.empnonManagerreportdiv = false;
  }

  onMenuClick(value: string): void {  
    if(value=="empreport"){
      this.empReport();
    }
    if(value=="profile"){     
      this.clickProfile();
    }
    if(value=="ProfileEdit"){
      this.OnEdit();
    }
    if(value=="myprofileback"){     
      this.myprofileback();
    }
  }

  clickProfile(){
    this.loadinggif = true;
    this.myProfile=false;
    this.userService.getEmployeeProfile(localStorage.getItem('userloginPrimaryKeyString'))
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
    this.employeeDashDiv = false;
    this.profilediv = false;
    this.empnonManagerreportdiv = false;
  }

  OnEdit(){
    this.myProfile = false;
    this.profilediv = true;
  }

  myprofileback(){
    this.myProfile = true; 
    this.profilediv = false; 
  }

  updateEmpProfile(){
    this.loading= true;   
    this.user.userloginPrimaryKeyString = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.updateEmpProfile(this.user)
    .subscribe(
      data => {
        this.user= data;
        if(this.user.status=="success") {
          this.loading= false; 
          this.updateprofile="block";
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

  empReport() {
    this.userService.getEmployeeProfile(localStorage.getItem('userloginPrimaryKeyString'))
    .subscribe(
        data => {
          this.user=data;
          this.loadinggif = true;
          this.userService.getEmpReport(this.user.employeeCode)
          .subscribe(
            data => {
                this.empReportList = data;
                if(this.empReportList.length==0){
                    this.loadinggif = false;
                    this.employeeDashDiv = true;  
                    this.empnonManagerreportdiv = false;           
                    this.noempreport="block";
                }else {
                    this.loadinggif = false;
                    this.empnonManagerreportdiv = true;           
                }
            },
            error => {
                this.loadinggif = false;
                this.employeeDashDiv = true;
                this.display3="block"; 
            }
          ); 
          
          this.employeeDashDiv = false;
          this.profilediv = false;
        },
        error => {
        }
    );  
  }

  onCloseHandled(){
    this.display3='none'; 
    this.noempreport='none';
    this.updateprofile='none';
  }

  printToCart(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.empNonManagerReport.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
    XLSX.writeFile(wb, 'InvestmentNonManagerReport.xlsx'); 
  }

}