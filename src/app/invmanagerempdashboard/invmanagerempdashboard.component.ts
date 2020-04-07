import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import *  as  XLSX from 'xlsx';
 

@Component({
  selector: 'app-invmanagerempdashboard',
  templateUrl: './invmanagerempdashboard.component.html',
  styleUrls: ['./invmanagerempdashboard.component.css']
})
export class InvmanagerempdashboardComponent implements OnInit {
    @ViewChild('empManagerReport') empManagerReport: ElementRef;  

    model: any = {};
    data: any;
    labels :any;
    ledgerList: any = {};
    agentList: any = {};
    empReportList :any = {};
   // Drop down value 
    agList :any = {};
    empList :any = {};
    invagList : any ={};
    countryList : any = {};

    loadinggif:boolean = false;
    loading:boolean = false;
    user:User;
    //person:Person;
    imgsrc:string;
    agentExit='none';
    display='none';
    display3='none';
    display4='none';
    display5='none';
    display6='none';
    display7='none';
    display8='none';
    agentsuccess='none';  
    agentfailure='none';
    noagentinfo='none';
    agentView='none';
    agentRemovesuccess='none';
    agentRemovefail='none';
    agentRemove='none';
    clinicexit='none';
    noreportagentinfo='none';
    noSearchinfo='none';
    noempreport = 'none';
  
    public userguide = false;
    public adminDashDiv = false;
    public registeragent = false;
    public viewagent = false;
    public agentEdit = false;
    public empManagerReportdiv = false;

    employeereporttable=false;

    registerView='none';
  
    constructor(
          private route: ActivatedRoute,
          private router: Router,
          private userService: UserService,
          private authenticationService: AuthenticationService,
          private alertService: AlertService
      ) {
      
       
      }
  
    ngOnInit() {
      if(localStorage.getItem('currentusername')==null){
        this.router.navigate(['/login']);
      }else{ 
        this.adminDashDiv = true;
          this.userService.getCountry()
          .subscribe(
          data => {
              this.countryList = data;
          },
          error => {
          });
      }
      this.imgsrc="assets/images/Triologo.png";
  
    }
  
    employeehome(){
      this.adminDashDiv = true; 
      this.registeragent = false;  
      this.viewagent = false;
      this.agentEdit=false;
      this.userguide=false;
      this.empManagerReportdiv = false;
    }

    onMenuClick(value: string): void {
      if(value=="registeragent"){ 
        this.agentregister();
      }
      if(value=="getAgentInfo"){
        this.getAgentInfo();
      }
      if(value=="back"){
          this.BackToDashboard();
      }
      if(value=="backToAgentInfo"){
          this.backToAgentInfoTable();
      }
  
    } 
  
    BackToDashboard(){
      this.registeragent=false;
      this.viewagent=false;
      this.agentEdit = false;
      this.adminDashDiv = true;
      this.userguide=false;
      this.empManagerReportdiv = false;
    }  
  
    backToAgentInfoTable(){ 
      this.adminDashDiv = false;
      this.registeragent=false;
      this.viewagent=true;
      this.agentEdit = false;
      this.userguide=false;
      this.empManagerReportdiv = false;
    }
      openModal(){
          this.display="block"; 
      }
      onDialogboxClose(){
          this.noagentinfo='none';
          this.adminDashDiv=true;
      }
      onCloseHandled(){
          this.agentExit='none';
          this.display='none';
          this.display3='none'; 
          this.display4='none';
          this.display5='none';
          this.display6='none';
          this.display7='none';
          this.display8='none';    
          this.agentsuccess='none';
          this.agentfailure='none';
          this.agentView='none';
          this.agentRemovesuccess='none';
          this.agentRemovefail='none';
          this.agentRemove='none';
          this.clinicexit='none';
          this.noreportagentinfo='none';
          this.noSearchinfo='none';
          this.noempreport = 'none';
      }
  
      agentregister(){  
          let empRole = 'All';
          this.userService.getEmployeeName(empRole)
          .subscribe(
              data => {
                  this.empList= data;
                 // console.log("Employee List -------->"+this.empList);
              } ,
              error => {
          });      
          this.registeragent = true;
          this.viewagent = false;
          this.agentEdit=false;
          this.adminDashDiv = false;
          this.userguide=false;
          this.empManagerReportdiv = false;
     
          this.model.name='';
          this.model.phoneNumber='';
          this.model.emailID='';
          this.model.address='';
          this.model.bankName='';
          this.model.bankBranchName='';
          this.model.agentType=''; 
          this.model.accountNumber='';
          this.model.refEmploy='';
          this.model.selectedCountry='';
      }
  
      saveAgent(){
          this.registeragent = false;
           this.userService.saveAgent(this.model)
              .subscribe(
                  data => {
                      this.user=data;     
                      if(this.user.status=="success"){
                          this.loadinggif=false;
                          this.registeragent = true;
                          this.agentsuccess='block';
                          this.agentregister();
                      }
  
                      if(this.user.status=="userexits"){
                          this.loadinggif=false;
                          this.registeragent = true;
                          this.agentExit='block';
                          this.agentregister();
                      }
  
  
                      if(this.user.status=="failure"){ 
                          this.loadinggif=false;
                          this.agentfailure='block';   
                          this.agentregister();   
                      }                       
                  },
                  error => {
                      this.display3="block";
                      this.loadinggif = false;
                  });
           
         
           }
     
  
      getAgentInfo(){         
          let empRole = 'All';
          this.userService.getEmployeeName(empRole)
          .subscribe(
              data => {
                  this.empList= data;
                //  console.log("Employee List -------->"+this.empList);
              } ,
              error => {
          }); 
          this.userService.getAgentInfo()
          .subscribe(
              data => {  
                  this.agList= data; 
                  this.ledgerList= data; 
                  this.invagList= data; 
              } ,
              error => {
          }); 
          this.agentList=null;
          this.loadinggif= true;
          this.viewagent = false;
          this.adminDashDiv=false;
          this.userService.getAgentInfo()
          .subscribe(
              data => {
                  this.agentList= data;
                  if(this.agentList.length==0){
                      this.loadinggif= false;  
                      this.viewagent = false;
                      this.noagentinfo='block';
                      this.adminDashDiv = true;
                  }else{
                      this.loadinggif= false;  
                      this.viewagent = true;
                  }
              },
              error => {
                  this.loadinggif= false;
                  this.viewagent = false;
                  this.display3='block'; 
              }
          ); 
          this.registeragent = false;
          this.agentEdit = false;
          this.userguide=false;
          this.empManagerReportdiv = false;
      }
  
      agentAction(agentID: string,actionType:String,agentPK:number){
          let requestType = 'agent';
  
          if(actionType=='view') {
              this.userService.getAgentView(agentPK,agentID,requestType)
              .subscribe(
                  data => {
                      this.user=data;
                      this.agentView="block";
                  },
                  error => {
                      this.display3="block"; 
                  }
              ); 
          }
          if(actionType=='edit') { 
              this.viewagent=false;
              this.userService.getAgentView(agentPK,agentID,requestType)
              .subscribe(
                  data => {
                      this.user=data;
                      this.agentEdit = true;
                  },
                  error => {
                      this.display3="block"; 
                  }
              ); 
          }
          if(actionType=='remove') {
              this.userService.getAgentView(agentPK,agentID,requestType)
              .subscribe(
                  data => {
                      this.user=data;
                      this.agentRemove='block';
                  },
                  error => {
                      this.display3="block"; 
                  }
              ); 
              
          }
  
      }
  
      setAgentUpdate(){
          this.loading=true;
          this.userService.setAgentUpdate(this.user)
          .subscribe(
              data => {
                  this.user = data;
                  this.loading = false;
                  if(this.user.status=="success") {
                      this.loading= false; 
                      this.display4="block";
                      this.getAgentInfo();
                  }
  
                  if(this.user.status=="failure") {
                      this.loading= false; 
                      this.display3="block"; 
                      this.getAgentInfo();
                  }
          },
          error => {
              this.loading= false; 
              this.display3="block"; 
          }); 
      }
  
      onDeleteAgent(agentCode:string,agentPK:number){                            
          this.agentRemove='none';      
          this.userService.setAgentRemove(agentCode,agentPK)
          .subscribe(
              data => { 
                  this.user = data; 
                  if(this.user.status=="success"){
                      this.agentRemovesuccess='block'; 
                      this.getAgentInfo();                                 
  
                  }else if(this.user.status=="failure"){
                      this.agentRemovefail = 'block';
                  }
              },
              error => {
                  this.display3='block'; 
              }
          );
      }
  
  clickUser(){
      this.userguide=true;
      this.adminDashDiv = false; 
      this.registeragent = false;  
      this.viewagent = false;
      this.agentEdit=false;
      this.empManagerReportdiv = false;
  }
  
    searchAgent(){
        this.userService.searchAgent(this.model.selectedCountry,this.model.agentType,
            this.model.name,this.model.agentCode,this.model.bankName)
            .subscribe(
            data => {
                this.agentList= data;
                if(this.agentList.length==0){
                    this.noSearchinfo='block';
                    this.viewagent=true; 
                }else{
                    this.viewagent=true; 
                //  console.log("Agent List -------->"+this.agentList);
                }
            } ,
            error => {
                this.viewagent=false; 
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
                        this.adminDashDiv = true;  
                        this.empManagerReportdiv = false;           
                        this.noempreport="block";
                    }else {
                        this.loadinggif = false;
                        this.empManagerReportdiv = true;           
                    }
                },
                error => {
                    this.loadinggif = false;
                    this.adminDashDiv = true;
                    this.display3="block"; 
                }
              ); 
              
              this.userguide=false;
              this.adminDashDiv = false; 
              this.registeragent = false;  
              this.viewagent = false;
              this.agentEdit=false;
            },
            error => {
            }
        );  
    }

    printToCart(){
        const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.empManagerReport.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
        XLSX.writeFile(wb, 'InvestmentManagerReport.xlsx'); 
    }
    

}