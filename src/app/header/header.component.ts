import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public imgsrc="assets/images/Triologo.png";
    public userRole:string;
    public pageName:string;
    public userguide = false;
    constructor(  private router: Router) {  }

    ngOnInit() {
        // localStorage.setItem('userRole',this.user.userRole);
        this.userRole=localStorage.getItem('userRole');
        this.pageName=localStorage.getItem('pageName');
        this.imgsrc="assets/images/Triologo.png";
    }

    clickUser(){
        this.userguide = true;
    }

    mainHeader(){
        if(this.pageName=="admindashboard") {
            this.router.navigate(['/admindashboard']);

        }
        if(this.pageName=="itsupportdashboard") {
            this.router.navigate(['/itsupportdashboard']);

        }
        if(this.pageName=="financedashboard") {
            this.router.navigate(['/financedashboard']);

        }

        if(this.pageName=="memberdashboard") {
            this.router.navigate(['/memberdashboard']);

        }

        if(this.pageName=="agentdashboard") {
            this.router.navigate(['/agentdashboard']);
        }

        if(this.pageName=="employeedashboard") {
            this.router.navigate(['/employeedashboard']);
        }

        if(this.pageName=="invmanagerempdashboard") {
            this.router.navigate(['/invmanagerempdashboard']);
        }

        if(this.pageName=="clinicnonmanagerempdashboard") {
            this.router.navigate(['/clinicnonmanagerempdashboard']);
        }

        if(this.pageName=="invnonmanagerempdashboard") {
            this.router.navigate(['/invnonmanagerempdashboard']);
        }
        
    }
}
