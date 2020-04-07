import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css']
})
export class AgentdashboardComponent implements OnInit {
  @ViewChild('clinicAgentReport') clinicAgentReport: ElementRef;  
  @ViewChild('invAgentReport') invAgentReport: ElementRef; 

  model: any = {};
  clinicReportList : any = {};
  invReportList : any ={};

  loadinggif:boolean = false;
  loading:boolean = false;
  user:User;
  imgsrc:string;

  public agentDashDiv = false;
  public myProfile = false;
  public reportdiv = false;
  public clinicreport= false;
  public invreport = false;
  public profilediv = false;

  display3='none';
  noclinicreport='none';
  noinvreport='none';
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
      this.agentDashDiv = true;
    }
    this.imgsrc="assets/images/Triologo.png";
  }

  agenthome(){
    this.agentDashDiv = true;
    this.myProfile = false;
    this.reportdiv = false;
    this.clinicreport= false;
    this.invreport = false;
    this.profilediv = false;
  }

  onMenuClick(value: string): void {  
    if(value=="clinicreport"){
      this.clinicReport();
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
    this.userService.getAgentMyProfile(localStorage.getItem('userloginPrimaryKeyString'))
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
    this.agentDashDiv = false;
    this.reportdiv = false;
    this.profilediv = false;
  }

  clinicReport() {
    this.userService.getAgentMyProfile(localStorage.getItem('userloginPrimaryKeyString'))
    .subscribe(
        data => {
          this.user=data;

          if(this.user.agentType=="Clinic Agent"){
            this.loadinggif = true;
              this.userService.getClinicAgentReport(this.user.agentCode)
              .subscribe(
                data => {
                    this.clinicReportList = data;
                    if(this.clinicReportList.length==0){
                        this.loadinggif = false;
                        this.agentDashDiv = true;  
                        this.reportdiv = false;           
                        this.clinicreport=false;
                        this.noclinicreport="block";
                    }else {
                        this.loadinggif = false;
                        this.reportdiv = true;           
                        this.clinicreport=true;
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.agentDashDiv = true;
                    this.display3="block"; 
                }
                ); 
            this.invreport = false;
            this.agentDashDiv = false;
            this.profilediv = false;
          }

          if(this.user.agentType=="Investment Agent"){
            this.loadinggif = true;
            this.userService.getInvAgentReport(this.user.agentCode)
              .subscribe(
                data => {
                    this.invReportList = data;
                    if(this.invReportList.length==0){
                        this.loadinggif = false;
                        this.agentDashDiv = true; 
                        this.reportdiv = false;          
                        this.invreport=false;
                        this.noinvreport="block";
                    }else {
                        this.loadinggif = false;
                        this.reportdiv = true;           
                        this.invreport=true;
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.agentDashDiv = true;
                    this.display3="block"; 
                    }
                ); 
            this.clinicreport = false;
            this.agentDashDiv = false;
            this.profilediv = false;
          }


        },
        error => {
        }
    );  
  }

  onCloseHandled(){
    this.display3='none'; 
    this.noclinicreport='none';
    this.noinvreport='none';
    this.updateprofile='none';
  }

  OnEdit(){
    this.myProfile = false;
    this.profilediv = true;
  }

  myprofileback(){
    this.myProfile = true; 
    this.profilediv = false; 
  }

  updateAgentProfile(){
    this.loading= true;   
    this.user.userloginPrimaryKeyString = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.updateAgentProfile(this.user)
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

  DownlodclinicExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.clinicAgentReport.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
    XLSX.writeFile(wb, 'clinicAgentReport.xlsx'); 
  }

  DownlodinvExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.invAgentReport.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
    XLSX.writeFile(wb, 'InvestmentAgentReport.xlsx'); 
  }

}
