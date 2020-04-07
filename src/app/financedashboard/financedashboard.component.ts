import { Component, OnInit ,Input } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-financedashboard',
  templateUrl: './financedashboard.component.html',
  styleUrls: ['./financedashboard.component.css']
})
export class FinancedashboardComponent implements OnInit {
    model: any = {};
    data: any;
    labels :any;
    allMemList: any = {};
    clinicList: any = {};
    ledgerList: any = {};
    agentList: any = {};
    employeeList :any = {};
   // Drop down value 
    agList :any = {};
    empList :any = {};
    clinicNameList :any = {};
    clinicReportList :any = {};
    invReportList :any = {};
    invagList : any ={};
    countryList : any = {};
    partnerList: any = {};

    showFile = false
    fileUploads: Observable<string[]>
    @Input() fileUpload: string;

    loadinggif:boolean = false;
    loading:boolean = false;
    user:User;
    //person:Person;
    imgsrc:string;
    agentExit='none';
    display='none';
    display1='none';
    display2='none';
    display3='none';
    display4='none';
    display5='none';
    display6='none';
    display7='none';
    display8='none';
    display13='none';
    display11 ='none';
    display14='none';
    agentsuccess='none';  
    agentfailure='none';
    noagentinfo='none';
    agentView='none';
    agentRemovesuccess='none';
    agentRemovefail='none';
    agentRemove='none';
    employRemove='none';
    employeeView='none';
    clinicView='none';
    clinicRemove = 'none';
    clinicRemovesuccess = 'none';
    clinicRemovefail = 'none';
    employRemovesuccess='none';
    employRemovefail='none';
    clinicexit='none';
    noreportagentinfo='none';
    noclinic='none';
    nomanager='none';
    nosalesreport='none';
    noSearchinfo='none';
    public addclinicName=false;
    public c1=false;
    public c2=false;
    public c3=false;
    public c4=false;
    public c5=false;
    public c6=false;
    public c7=false;
    public c8=false;
    public c9=false;
    public c10=false;
  
    public refemp = false;
    public refempcode = false;
    public refemploycode = false;
    public userguide = false;
  
    public eC1 = false;
    public eC2 = false;
    public eC3 = false;
    public eC4 = false;
    public eC5 = false;
    public eC6 = false;
    public eC7 = false;
    public eC8 = false;
    public eC9 = false;
    public eC10 = false;
    public editclinicName = false;
    
    public clinicdiv = false;
    public addclinic = false;
    public approvemember = false;
    public clinicAllDiv = false;
    public approvewithdraw = false;
    public adminDashDiv = false;
    public registeragent = false;
    public viewagent = false;
    public registeremploy = false;
    public viewemploydetails = false;
    public agentEdit = false;
    public employeeEdit = false;
    public clinicEdit = false;
    public registerclinicdiv = false;
    //public clinicAllDiv = false;
  
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
  
    adminhome(){
      this.adminDashDiv = true; 
      this.registeragent = false;  
      this.viewagent = false;
      this.registeremploy = false;
      this.viewemploydetails = false;
      this.employeeEdit = false;
      this.addclinic = false;
      this.clinicdiv = false;
      this.approvemember = false;
      this.registerclinicdiv = false;
      this.clinicEdit = false;
      this.approvewithdraw = false;
      this.clinicAllDiv = false;
      this.addclinicName=false;
      this.agentEdit=false;
      this.userguide=false;
      this.editclinicName=false;
  }
    onMenuClick(value: string): void {
      if(value=="approvemember"){     
        this.clickMenu5();
      }
      if(value=="addclinic"){ 
        this.clickMenu1();
      }
      if(value=="approvewithdraw"){
        this.clickMenu10();
      }
    
      if(value=="back"){
          this.BackToDashboard();
      }
      if(value=="backToAgentInfo"){
          this.backToAgentInfoTable();
      }
      if(value=="backregisterclinic"){
          this.clickclinicdiv();
      }
  
    } 
  
    onButtonClick(userloginPK: number,requestType: string) {
        this.userService.getApproved(userloginPK,requestType)
        .subscribe(
            approvedResponse => { 
                this.user=   approvedResponse;              
                if(this.user.status=="rejectSuccess"){
                    this.display2="block"; 
                    this.clickMenu5();
                } 
                if(this.user.status=="success"){
                    this.display1="block"; 
                    this.clickMenu5();
                } 
            },
            error => {
                this.display3="block"; 
            }
        );
    } 

    clickMenu5(){
        this.loadinggif = true;
        this.approvemember=false;
        this.adminDashDiv=false;
        this.userService.getAllMemberList("WaitingForApproval")
        .subscribe(
            data => {
                this.allMemList = data;
                if(this.allMemList.length==0){
                    this.display13="block";
                    this.loadinggif = false;
                    this.approvemember=false;
                    this.adminDashDiv = true;
                }else{
                // alert("size not equalto 0");
                this.loadinggif = false;
                this.approvemember=true;
                }
            },
            error => {
                this.loadinggif = false;
                this.approvemember=true;
                this.display3="block"; 
                //alert('Network issue please try again');
            }
        );
        this.registeragent = false;
        this.viewagent = false;
        this.agentEdit = false;
        this.registeremploy = false;
        this.viewemploydetails = false;
        this.employeeEdit = false;
        this.addclinic =false;
        this.clinicdiv = false; 
        this.approvewithdraw = false;
        this.registerclinicdiv = false;
        this.clinicAllDiv = false;
        this.clinicEdit = false;
        this.addclinicName=false;
        this.userguide=false;
        this.editclinicName=false;
    }

    setEmployUpdate(){
        // alert("UPdate");
        this.viewemploydetails=false;
         this.loading=true;
         this.userService.setEmployUpdate(this.user)
         .subscribe(
             data => {
                 this.user = data;
                 this.loading = false;
                 if(this.user.status=="success") {
                     this.loading= false; 
                     this.display4="block";
                    // this.getEmployeeInfo();
                 }
                 if(this.user.status=="failure") {
                     this.loading= false; 
                     this.display3="block"; 
                    // this.getEmployeeInfo();
                 }
         },
         error => {
             this.loading= false; 
             this.display3="block"; 
         }); 
     }

    clickMenu1(){
        this.userService.getinvAgentName()
        .subscribe(
            data => {     
                this.invagList= data;
            } ,
            error => {
        }); 
        this.model.fromDate='';
        this.model.toDate='';
        this.model.agentCode='';
        
        this.loadinggif = true;
        this.addclinic = false;
        this.userService.getAllMemberList("Approved")
        .subscribe(
          data => {
              this.allMemList = data;
              this.loadinggif = false;
              this.addclinic = true;
          },
          error => {
              this.loadinggif = false;
              this.addclinic = true;
              this.display3="block"; 
              }
            );  
    
            this.userService.getClinicName()
            .subscribe(
            data => {
                this.clinicNameList= data;
            } ,
            error => {
                this.display3="block";
            });
            this.model.cliniclist='';
            this.model.clinicName='';
            this.model.clinicName2='';
            this.model.clinicName3='';
            this.model.clinicName4='';
            this.model.clinicName5='';
            this.model.clinicName6='';
            this.model.clinicName7='';
            this.model.clinicName8='';
            this.model.clinicName9='';
            this.model.clinicName10='';
            this.adminDashDiv = false;
            this.registeragent = false;
            this.viewagent = false;
            this.agentEdit = false;
            this.registeremploy = false;
            this.viewemploydetails = false;
            this.employeeEdit = false;
            this.clinicdiv = false; 
            this.approvemember = false;
            this.approvewithdraw = false;
            this.registerclinicdiv = false;
            this.clinicAllDiv = false;
            this.clinicEdit = false;
            this.addclinicName=false;
            this.userguide=false;
            this.editclinicName=false;
        }
    
        getNoClinics(trioNumber: string,noofclinics:number){
            this.addclinicName=false;
    
            this.model.memberID = trioNumber;
            this.model.noofclinics = noofclinics;
            this.addclinic=false;
            if(noofclinics==1){ 
                this.addclinicName=true;         
                this.c1=true; 
                this.c2=false; 
                this.c3=false;
                this.c4=false;
                this.c5=false;
                this.c6=false;
                this.c7=false;
                this.c8=false;
                this.c9=false;
                this.c10=false;
            }else  if(noofclinics==2){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=false;
                this.c4=false;
                this.c5=false;
                this.c6=false;
                this.c7=false;
                this.c8=false;
                this.c9=false;
                this.c10=false;
            }else  if(noofclinics==3){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=true;
                this.c4=false;
                this.c5=false;
                this.c6=false;
                this.c7=false;
                this.c8=false;
                this.c9=false;
                this.c10=false;
            }else  if(noofclinics==4){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=true;
                this.c4=true;
                this.c5=false;
                this.c6=false;
                this.c7=false;
                this.c8=false;
                this.c9=false;
                this.c10=false;
            }else  if(noofclinics==5){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=true;
                this.c4=true;
                this.c5=true;
                this.c6=false;
                this.c7=false;
                this.c8=false;
                this.c9=false;
                this.c10=false;
            }else  if(noofclinics==6){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=true;
                this.c4=true;
                this.c5=true;
                this.c6=true;
                this.c7=false;
                this.c8=false;
                this.c9=false;
                this.c10=false;
            }else  if(noofclinics==7){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=true;
                this.c4=true;
                this.c5=true;
                this.c6=true;
                this.c7=true;
                this.c8=false;
                this.c9=false;
                this.c10=false;
            }else  if(noofclinics==8){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=true;
                this.c4=true;
                this.c5=true;
                this.c6=true;
                this.c7=true;
                this.c8=true;
                this.c9=false;
                this.c10=false;
            }else  if(noofclinics==9){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=true;
                this.c4=true;
                this.c5=true;
                this.c6=true;
                this.c7=true;
                this.c8=true;
                this.c9=true;
                this.c10=false;
            }else  if(noofclinics==10){
                this.addclinicName=true;
                this.c1=true; 
                this.c2=true; 
                this.c3=true;
                this.c4=true;
                this.c5=true;
                this.c6=true;
                this.c7=true;
                this.c8=true;
                this.c9=true;
                this.c10=true;
            }
      }
    
      saveClinicOnMember(){
          this.userService.saveClinicOnMember(this.model)
          .subscribe(
              data => { 
                this.user = data; 
                if(this.user.status=="success") {
                  this.display6='block'; 
                  this.clickMenu1();
                }else if(this.user.status=="failure"){
                  this.display5='none';
                  this.noclinic='block'; 
                  this.clickMenu1();
                }  
                  
              },
              error => {
                  this.display3='block'; 
              }
          );
        }
    
        filterclinic(){
            if(this.model.cliniclist == 'registered'){
                this.addclinic = false; 
                this.clinicdiv = true; 
                this.adminDashDiv = false;
                this.clickclinicdiv();          
            }else if(this.model.cliniclist == 'notregistered'){
                this.addclinic = true; 
                this.clinicdiv = false;
                this.adminDashDiv = false; 
                this.clickMenu1();
            }
        }
    
        
        clickclinicdiv(){
            this.userService.getAgentName()
            .subscribe(
            data => {
                this.agList= data;
            } ,
            error => {
            });
            let empRole = 'All';
            this.userService.getEmployeeName(empRole)
            .subscribe(
                data => {
                    this.empList= data;
                } ,
                error => {
            }); 

            this.model.fromDate='';
            this.model.toDate='';
            this.model.agentCode='';
            this.model.name='';
    
            this.loadinggif = true;
            this.clinicdiv = false;
            this.userService.getAllClinicList("Approved")
            .subscribe(
                data => {
                    this.clinicList = data;
                    this.loadinggif = false;
                    this.clinicdiv = true;
                },
                error => {
                    this.loadinggif = false;
                    this.clinicdiv = true;
                    this.display3="block"; 
                    }
                );   
                this.addclinic = false;
                this.registeragent = false;
                this.viewagent = false;
                this.agentEdit = false;
                this.viewemploydetails = false;
                this.employeeEdit = false;
                this.adminDashDiv = false;
                this.approvemember = false;
                this.approvewithdraw = false;
                this.registerclinicdiv = false;
                this.clinicAllDiv = false;
                this.clinicEdit = false;
                this.addclinicName=false;
                this.userguide=false;
                this.editclinicName=false;
        }
    
        editcliniconmember(trioNumber: string,noofclinics:number){
            this.userService.getEditClinicName(trioNumber)
            .subscribe(
            data => {
                this.clinicNameList= data;
            } ,
            error => {
                this.display3="block";
            });
       
            this.model.clinicName='';
            this.model.clinicName2='';
            this.model.clinicName3='';
            this.model.clinicName4='';
            this.model.clinicName5='';
            this.model.clinicName6='';
            this.model.clinicName7='';
            this.model.clinicName8='';
            this.model.clinicName9='';
            this.model.clinicName10='';
    
            this.model.memberID=trioNumber;
            this.model.noofclinics=noofclinics;
            this.clinicdiv=false;
            if(noofclinics==1){ 
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=false; 
                this.eC3=false;
                this.eC4=false;
                this.eC5=false;
                this.eC6=false;
                this.eC7=false;
                this.eC8=false;
                this.eC9=false;
                this.eC10=false;
            }else if(noofclinics==2){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=false;
                this.eC4=false;
                this.eC5=false;
                this.eC6=false;
                this.eC7=false;
                this.eC8=false;
                this.eC9=false;
                this.eC10=false;
            }else if(noofclinics==3){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=true;
                this.eC4=false;
                this.eC5=false;
                this.eC6=false;
                this.eC7=false;
                this.eC8=false;
                this.eC9=false;
                this.eC10=false;
            }else if(noofclinics==4){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=true;
                this.eC4=true;
                this.eC5=false;
                this.eC6=false;
                this.eC7=false;
                this.eC8=false;
                this.eC9=false;
                this.eC10=false;
            }else if(noofclinics==5){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=true;
                this.eC4=true;
                this.eC5=true;
                this.eC6=false;
                this.eC7=false;
                this.eC8=false;
                this.eC9=false;
                this.eC10=false;
            }else if(noofclinics==6){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=true;
                this.eC4=true;
                this.eC5=true;
                this.eC6=true;
                this.eC7=false;
                this.eC8=false;
                this.eC9=false;
                this.eC10=false;
            }else if(noofclinics==7){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=true;
                this.eC4=true;
                this.eC5=true;
                this.eC6=true;
                this.eC7=true;
                this.eC8=false;
                this.eC9=false;
                this.eC10=false;
            }else if(noofclinics==8){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=true;
                this.eC4=true;
                this.eC5=true;
                this.eC6=true;
                this.eC7=true;
                this.eC8=true;
                this.eC9=false;
                this.eC10=false;
            }else if(noofclinics==9){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=true;
                this.eC4=true;
                this.eC5=true;
                this.eC6=true;
                this.eC7=true;
                this.eC8=true;
                this.eC9=true;
                this.eC10=false;
            }else if(noofclinics==10){
                this.editclinicName=true;         
                this.eC1=true; 
                this.eC2=true; 
                this.eC3=true;
                this.eC4=true;
                this.eC5=true;
                this.eC6=true;
                this.eC7=true;
                this.eC8=true;
                this.eC9=true;
                this.eC10=true;
            }
            
        }
    
        updateClinicOnPartner(){ 
            this.userService.setPartnerClinicUpdate(this.model)
            .subscribe(
                data => {
                    this.user = data;
                    this.loading = false;
                    if(this.user.status=="success") {
                        this.loading= false; 
                        this.display4="block";
                        this.clickclinicdiv();
                    }
    
                    if(this.user.status=="failure") {
                        this.loading= false; 
                        this.display3="block"; 
                        this.clickclinicdiv();
                    }
            },
            error => {
                this.loading= false; 
                this.display3="block"; 
            });
        }  

          
      clickMenu10(){
        this.loadinggif = true;
        this.approvewithdraw = false;
        this.userService.getLedgerInfo('Dummy',3)
        .subscribe(
            data => {
            this.ledgerList = data;
            if(this.ledgerList.length==0){
                    this.display11 ="block";
                    this.loadinggif = false;
                    this.approvewithdraw=false;
                    this.adminDashDiv = true;
            }else{
                this.loadinggif = false;
                this.approvewithdraw=true;
            }          
            },
            error => {
                this.loadinggif = false;
                this.approvewithdraw=true;
                this.display3="block"; 
            }
        );
        this.adminDashDiv = false;
        this.registeragent = false;
        this.viewagent = false;
        this.agentEdit = false;
        this.registeremploy = false;
        this.viewemploydetails = false;
        this.employeeEdit = false;
        this.clinicdiv = false; 
        this.addclinic =false;
        this.approvemember = false;
        this.registerclinicdiv = false;
        this.clinicAllDiv = false;
        this.clinicEdit = false;
        this.addclinicName=false;
        this.userguide=false;
        this.editclinicName=false;
    }


onWithdrawClick(memberNumber:string,requestTypeStr:string,withdrawDate:string){
    this.model.memberID = memberNumber;
    this.model.requestTypeStr = requestTypeStr;
    this.model.withdrawDate = withdrawDate;

    // this.model.status = value3;

    this.userService.getApprovewithdraw(this.model)
    .subscribe(
        approvedResponse => { 
            this.user=   approvedResponse;              
            if(this.user.status=="rejectSuccess"){
                this.display2="block"; 
                this.adminDashDiv= true;
            } 
            if(this.user.status=="success"){
                this.display1="block"; 
                this.adminDashDiv= true;
            } 
        },
        error => {
            this.display3="block"; 
        });
    }
  
    BackToDashboard(){
      this.registeragent=false;
      this.viewagent=false;
      this.agentEdit = false;
      this.registeremploy = false;
      this.viewemploydetails = false;
      this.employeeEdit = false;
      this.adminDashDiv = true;
      this.clinicdiv = false; 
      this.clinicEdit = false;
      this.addclinic =false;
      this.approvemember = false;
      this.approvewithdraw = false;  
      this.registerclinicdiv = false; 
      this.clinicAllDiv = false;
      this.addclinicName=false;
      this.userguide=false;
      this.editclinicName=false;
    }  
  
    backToAgentInfoTable(){ 
      this.adminDashDiv = false;
      this.registeragent=false;
      this.viewagent=true;
      this.agentEdit = false;
      this.registeremploy = false;
      this.viewemploydetails = false;
      this.employeeEdit = false;
      this.clinicdiv = false; 
      this.clinicEdit = false;
      this.addclinic =false;
      this.approvemember = false;
      this.approvewithdraw = false;  
      this.registerclinicdiv = false; 
      this.clinicAllDiv = false;
      this.addclinicName=false;
      this.userguide=false;
      this.editclinicName=false;
    }

    openModal(){
        this.display="block"; 
    }
    onDialogboxClose(){
        this.display13='none';
        this.display14='none';
        this.noagentinfo='none';
        this.adminDashDiv=true;
    }
    onCloseHandled(){
        this.nomanager='none';
        this.agentExit='none';
        this.display='none';
        this.display1='none'; 
        this.display2='none';
        this.display3='none'; 
        this.display4='none';
        this.display5='none';
        this.display6='none';
        this.display7='none';
        this.display8='none';    
        this.display11='none';
        this.agentsuccess='none';
        this.agentfailure='none';
        this.agentView='none';
        this.agentRemovesuccess='none';
        this.agentRemovefail='none';
        this.agentRemove='none';
        this.employRemove='none';
        this.employRemovesuccess='none';
        this.employRemovefail='none';
        this.employeeView='none';
        this.clinicView='none';
        this.clinicRemove = 'none';
        this.clinicRemovesuccess = 'none';
        this.clinicRemovefail = 'none';
        this.clinicexit='none';
        this.noreportagentinfo='none';
        this.noclinic='none';
        this.nosalesreport='none';
        this.noSearchinfo='none';
    }

    viewreceipt(trioNumber: string){
        this.fileUploads = this.authenticationService.getFiles(trioNumber);
        this.display = "block";
    }
 
  clickUser(){
      this.userguide=true;
      this.adminDashDiv = false;
      this.registeragent = false;  
      this.viewagent = false;
      this.registeremploy = false;
      this.viewemploydetails = false;
      this.employeeEdit = false;
      this.addclinic = false;
      this.clinicdiv = false;
      this.approvemember = false;
      this.registerclinicdiv = false;
      this.clinicEdit = false;
      this.approvewithdraw = false;
      this.clinicAllDiv = false;
      this.addclinicName=false;
      this.agentEdit=false;
      this.editclinicName=false;
  }
  
  
  searchPartnerRegisteredClinic(){
    this.userService.searchPartnerClinic(this.model.fromDate,this.model.toDate,
        this.model.agentCode,this.model.name)
        .subscribe(
        data => {
            this.clinicList= data;
            if(this.clinicList.length==0){
                this.noSearchinfo='block';
                this.clinicdiv=true; 
            }else{
                this.clinicdiv=true; 
            }
        } ,
        error => {
            this.clinicdiv=false; 
        }); 
    }

    searchPartnerNotRegisteredClinic(){
        this.userService.searchPartnerNonClinic(this.model.fromDate,this.model.toDate,this.model.agentCode)
            .subscribe(
            data => {
                this.allMemList= data;
                if(this.allMemList.length==0){
                    this.noSearchinfo='block';
                    this.addclinic=true; 
                }else{
                    this.addclinic=true; 
                }
            } ,
            error => {
                this.addclinic=false; 
            }); 
    }

}
