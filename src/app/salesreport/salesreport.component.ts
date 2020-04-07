import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService, AuthenticationService, AlertService } from '../_services';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesreportComponent implements OnInit {
  @ViewChild('salesclinicReport') salesclinicReport: ElementRef;
  @ViewChild('salespartnerReport') salespartnerReport: ElementRef;
  @ViewChild('salesmanagerReport') salesmanagerReport: ElementRef;  
  @ViewChild('salesnonManagerReport') salesnonManagerReport: ElementRef;
       
  public pageName:string;
  model: any = {};
  agList :any = {};
  clinicReportList :any = {};
  allMemList :any = {};
  empList :any = {};
  employeeList :any = {};
  display3 = 'none';
  nosalesreport ='none';

  changeName = false;
  changeclinicName = false;    
  changepartnerName = true;
  changeemployeeName = false;
  salesclinicreporttable=false;
  salespartnerreporttable=false;
  salesempmanagerreporttable=false;
  salesempnonmanagerreporttable=false;
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.pageName=localStorage.getItem('pageName');
    this.model.selectedMonth='';
    this.model.reportName='';
    this.model.name='';
    this.model.memberName='';
    this.model.empName='';
  }

  backToReport(){
    if(this.pageName=="admindashboard") {
        this.router.navigate(['/report-menus']);
      }
      if(this.pageName=="itsupportdashboard") {
          this.router.navigate(['/report-menus']);
      }

      if(this.pageName=="financedashboard") {
          this.router.navigate(['/report-menus']);
      }
      
      if(this.pageName=="memberdashboard") {
          this.router.navigate(['/report-menus']);
      }
      
      if(this.pageName=="agentdashboard") {
          this.router.navigate(['/report-menus']);
      }

      if(this.pageName=="invmanagerempdashboard") {
        this.router.navigate(['/invmanagerempdashboard']);
      }

      if(this.pageName=="employeedashboard") {
        this.router.navigate(['/employeedashboard']);
      }
      
      if(this.pageName=="clinicnonmanagerempdashboard") {
        this.router.navigate(['/clinicnonmanagerempdashboard']);
      }

      if(this.pageName=="invnonmanagerempdashboard") {
        this.router.navigate(['/invnonmanagerempdashboard']);
      }

  }

  onCloseHandled(){
    this.nosalesreport = 'none';
    this.display3 = 'none';
  }

  clinicDownload(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.salesclinicReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'salesClinicReport.xlsx'); 
  }

  partnerDownload(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.salespartnerReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'salesPartnerReport.xlsx'); 
  }

  managerDownload(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.salesmanagerReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'salesempManagerReport.xlsx'); 
  }

  nonManagerDownload(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.salesnonManagerReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'salesempNonManagerReport.xlsx'); 
  }

  changeReportName(){
    this.changeName = true;
    if(this.model.reportName=="clinicAgent"){

        this.changeclinicName = true;    
        this.changepartnerName = false;
        this.changeemployeeName = false;
        this.userService.getAgentName()
        .subscribe(
        data => {
            this.agList= data;
        } ,
        error => {
        });

    }else if(this.model.reportName=="partnerAgent"){

        this.changeclinicName = false;    
        this.changepartnerName = true;
        this.changeemployeeName = false;
        this.userService.getPartnerName()
        .subscribe(
        data => {
            this.allMemList= data;
        } ,
        error => {
        });
                 
    }else if(this.model.reportName=="empManager"){

        this.changeclinicName = false;    
        this.changepartnerName = false;
        this.changeemployeeName = true;
        let empRole = 'Manager';
        this.userService.getEmployeeName(empRole)
        .subscribe(
        data => {
            this.empList= data;
        } ,
        error => {
        });
       
    }else if(this.model.reportName=="empNon-Manager"){

        this.changeclinicName = false;    
        this.changepartnerName = false;
        this.changeemployeeName = true;
        let empRole = 'Non-Manager';
        this.userService.getEmployeeName(empRole)
        .subscribe(
        data => {
            this.empList= data;
        } ,
        error => {
        });
    }
}
  
  getSalesReport(){   
    if(this.model.reportName=="clinicAgent"){

      this.salespartnerreporttable = false;    
      this.salesempmanagerreporttable = false;
      this.salesempnonmanagerreporttable = false;
      this.userService.getSalesClincReport(this.model.selectedMonth,this.model.reportName,this.model.name)
      .subscribe(
        data => {
            this.clinicReportList = data;
            if(this.clinicReportList.length==0){
                this.salesclinicreporttable=false;
                this.nosalesreport="block";
            }else {
                this.salesclinicreporttable=true;
            }
        },
        error => {
            this.display3="block"; 
        });   

  }else if(this.model.reportName=="partnerAgent"){

      this.salesclinicreporttable = false;
      this.salesempmanagerreporttable = false;
      this.salesempnonmanagerreporttable = false;
      this.userService.getSalesPartnerReport(this.model.selectedMonth,this.model.reportName,this.model.memberName)
      .subscribe(
        data => {
            this.allMemList = data;
            if(this.allMemList.length==0){
                this.salespartnerreporttable=false;
                this.nosalesreport="block";
            }else {
                this.salespartnerreporttable=true;
            }
        },
        error => {
            this.display3="block"; 
        });

  }else if(this.model.reportName=="empManager"){

      this.salesclinicreporttable = false;
      this.salespartnerreporttable = false;
      this.salesempnonmanagerreporttable = false;
      this.userService.getSalesEmpReport(this.model.selectedMonth,this.model.reportName,this.model.empName)
      .subscribe(
        data => {
            this.empList = data;
            if(this.empList.length==0){
                this.salesempmanagerreporttable=false;
                this.nosalesreport="block";
            }else {
                this.salesempmanagerreporttable=true;
            }
        },
        error => {
            this.display3="block"; 
        });

  }else if(this.model.reportName=="empNon-Manager"){

      this.salesclinicreporttable = false;
      this.salespartnerreporttable = false;
      this.salesempmanagerreporttable = false;
      this.userService.getSalesEmpReport(this.model.selectedMonth,this.model.reportName,this.model.empName)
      .subscribe(
        data => {
            this.employeeList = data;
            if(this.employeeList.length==0){
                this.salesempnonmanagerreporttable=false;
                this.nosalesreport="block";
            }else {
                this.salesempnonmanagerreporttable=true;
            }
        },
        error => {
            this.display3="block"; 
        });

  }  
  }

}