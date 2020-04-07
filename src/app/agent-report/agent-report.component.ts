import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-report',
  templateUrl: './agent-report.component.html',
  styleUrls: ['./agent-report.component.css']
})
export class AgentReportComponent implements OnInit {
  public reportmenu2 = false; 
  public imgsrc="assets/images/Triologo.png";
  public pageName:string;
    constructor( private router: Router ) { }
  
    ngOnInit() {
      this.reportmenu2 = true;
      this.imgsrc="assets/images/Triologo.png";
      this.pageName=localStorage.getItem('pageName');
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

    }
}
