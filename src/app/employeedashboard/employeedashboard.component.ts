import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import *  as  XLSX from 'xlsx';
 

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {
    @ViewChild('empManagerReport') empManagerReport: ElementRef; 

    model: any = {};
    data: any;
    labels :any;
    clinicList: any = {};
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
    clinicView='none';
    clinicRemove = 'none';
    clinicRemovesuccess = 'none';
    clinicRemovefail = 'none';
    clinicexit='none';
    noclinic='none';
    nomanager='none';
    noSearchinfo='none';
    noempreport='none';

    public userguide = false;
    public empManagerReportdiv = false;
    public clinicAllDiv = false;
    public adminDashDiv = false;
    public registeragent = false;
    public viewagent = false;
    public agentEdit = false;
    public clinicEdit = false;
    public registerclinicdiv = false;
  
    public cN1=false;
    public cN2=false;
    public cN3=false;
    public cN4=false;
    public cN5=false;
    public cN6=false;
    public cN7=false;
    public cN8=false;
    public cN9=false;
    public cN10=false;
  
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
      this.registerclinicdiv = false;
      this.clinicEdit = false;
      this.clinicAllDiv = false;
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
      if(value=="registerclinic"){
          this.registerclinic();
      }
      if(value=="viewclinic"){
          this.getClinicInfo();
      }
      if(value=="allClinic"){ 
          this.showClinicList();
      }
  
    } 
  
    BackToDashboard(){
      this.registeragent=false;
      this.viewagent=false;
      this.agentEdit = false;
      this.adminDashDiv = true;
      this.clinicEdit = false;
      this.registerclinicdiv = false; 
      this.clinicAllDiv = false;
      this.userguide=false;
      this.empManagerReportdiv = false;  
    }  
  
    backToAgentInfoTable(){ 
      this.adminDashDiv = false;
      this.registeragent=false;
      this.viewagent=true;
      this.agentEdit = false;
      this.clinicEdit = false;
      this.registerclinicdiv = false; 
      this.clinicAllDiv = false;
      this.userguide=false;
      this.empManagerReportdiv = false;  
    }

    // Clinic Details View
    showClinicList(){
      this.model.name='';
      this.userService.getAgentName()
      .subscribe(
      data => {     
          this.agList= data;
          this.loadinggif=false;
          console.log("Agent List --------->"+this.agList);
      } ,
      error => {
      });
  
      this.loadinggif = true;
      this.clinicAllDiv = false;
      this.userService.getAllClinicList2("All")
      .subscribe(
        data => {
          this.clinicList = data;  
          if(this.clinicList.length==0){
              this.noagentinfo="block";
              this.loadinggif = false;
              this.clinicAllDiv=false;
              this.adminDashDiv = true;
          }else{
          this.loadinggif = false;
          this.clinicAllDiv=true;
          }
        },
        error => {
            this.loadinggif = false;
            this.clinicAllDiv = true;  
            this.display3="block"; 
            }
          );  
          this.adminDashDiv = false;
          this.registeragent = false;
          this.viewagent = false;
          this.agentEdit = false;
          this.registerclinicdiv = false;
          this.clinicAllDiv = false;
          this.clinicEdit = false;
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
          this.nomanager='none';
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
          this.clinicView='none';
          this.clinicRemove = 'none';
          this.clinicRemovesuccess = 'none';
          this.clinicRemovefail = 'none';
          this.clinicexit='none';
          this.noclinic='none';
          this.noSearchinfo='none';
          this.noempreport='none';
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
          this.registerclinicdiv = false;
          this.clinicAllDiv=false;
          this.clinicEdit=false;
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
          this.registerclinicdiv = false;
          this.clinicAllDiv = false;
          this.clinicEdit = false;
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
  
      registerclinic(){
          // Get Clinic Agent Name / Agent code 
          this.userService.getAgentName()
          .subscribe(
              data => {
                  this.agList= data;
              } ,
              error => {
              });
          // Get Empoloyee Name / Employee Code 
          let empRole = 'All';
          this.userService.getEmployeeName(empRole)
          .subscribe(
              data => {
                  this.empList= data;
              } ,
              error => {
              });
  
          
          this.model.clinicName='';
          this.model.name='';
          this.model.empName='';
          this.model.address='';
          this.model.phoneNumber='';
  
          this.registeragent=false;
          this.viewagent=false;
          this.agentEdit = false;
          this.adminDashDiv = false;
          this.registerclinicdiv = true;
          this.clinicAllDiv = false;
          this.clinicEdit = false;
          this.userguide=false;
          this.empManagerReportdiv = false;  
      }
  // Orginal Clinic Name save method on Register Clinic Menu in home page
      saveClinic(){
          this.registerclinicdiv=false;
          this.userService.registerClinic(this.model)
          .subscribe(
              data => {
                  this.user=data;
                  if(this.user.status=="success"){
                      this.loadinggif=false;
                      this.agentsuccess='block';
                      this.registerclinicdiv=true;
                      this.registerclinic();
                  }
  
                  if(this.user.status=="exit"){
                      this.clinicexit='block';
                      this.registerclinicdiv=true;
                  }
  
                  if(this.user.status=="failure"){
                      this.loadinggif=false;
                      this.agentfailure='block';
                      this.registerclinicdiv=true;
                      this.registerclinic();
                  }
              } ,
              error => {
                  this.display3="block";
                  this.loadinggif = false;
                  this.registerclinicdiv=true;
                      this.registerclinic();
              });
      }
  
      getClinicInfo(){
          this.clinicList=null;
          this.loadinggif= true;
          this.clinicAllDiv = false;
          this.adminDashDiv=false;
          this.userService.getClinicInfo()
          .subscribe(
              data => {
                  this.clinicList= data;
                  if(this.clinicList.length==0){
                      this.loadinggif= false;  
                      this.clinicAllDiv = false;
                      this.adminDashDiv = true;
                      this.noagentinfo='block';
                  }else{
                      this.loadinggif= false;  
                      this.clinicAllDiv = true;
                  }
              },
              error => {
                  this.loadinggif= false;
                  this.clinicAllDiv = false;
                  this.display3='block'; 
              }
          );     
          this.registeragent = false;
          this.viewagent = false;
          this.agentEdit = false;
          this.registerclinicdiv = false;
          this.clinicEdit = false;
          this.userguide=false;
          this.empManagerReportdiv = false;  
      }
  // Newlly Added by Alex
  
  clinicAction(actionType:String,code:string,primaryKey:number){
      let requestType="clinic";
      this.userService.getAgentName()
      .subscribe(
          data => {     
              this.agList= data;
             // console.log("Agent List --------->"+this.agList);
          } ,
          error => {
          });
  
      // Get Empoloyee Name / Employee Code 
      let empRole = 'All';
      this.userService.getEmployeeName(empRole)
      .subscribe(
          data => {
              this.empList= data;
          //  console.log("Employee List -------->"+this.empList);
          } ,
          error => {
      });
   
      if(actionType=='edit') {
          this.clinicAllDiv = false;
          this.userService.getClinicView(code,primaryKey,requestType)
          .subscribe(
              data => {
                  this.user=data;
                  this.clinicEdit = true;
              },
              error => {
                  this.display3="block"; 
              }
          ); 
      }
      if(actionType=='remove') {
          this.userService.getClinicView(code,primaryKey,requestType)
          .subscribe(
              data => {
                  this.user=data;
                  this.clinicRemove='block';
              },
              error => {
                  this.display3="block"; 
              }
          ); 
          
      }
  }
  
  setClinicUpdate(){
      this.loading=true;
      this.userService.setClinicUpdate(this.user)
      .subscribe(
          data => {
              this.user = data;
              this.loading = false;
              if(this.user.status=="success") {
                  this.loading= false; 
                  this.display4="block";
                  this.showClinicList();
              }
              if(this.user.status=="failure") {
                  this.loading= false; 
                  this.display3="block"; 
                  this.showClinicList();
              }
      },
      error => {
          this.loading= false; 
          this.display3="block"; 
      }); 
  }
  
  onDeleteClinic(Code:string,clinicPK:number){
      this.clinicRemove='none';
      this.userService.setClinicRemove(Code,clinicPK)
      .subscribe(
          data => { 
              this.user = data;    
              if(this.user.status=="success"){
                  this.clinicRemovesuccess='block'; 
                  this.showClinicList();                                
              }else if(this.user.status=="failure"){
                  this.clinicRemovefail = 'block';
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
      this.registerclinicdiv = false;
      this.clinicEdit = false;
      this.clinicAllDiv = false;
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

    searchClinic(){
        this.userService.searchClinic(this.model.name)
            .subscribe(
            data => {
                this.clinicList= data;
                if(this.clinicList.length==0){
                    this.noSearchinfo='block';
                    this.clinicAllDiv=true; 
                }else{
                    this.clinicAllDiv=true; 
                //  console.log("Clinic List -------->"+this.clinicList.length);
                }
            } ,
            error => {
                this.clinicAllDiv=false; 
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